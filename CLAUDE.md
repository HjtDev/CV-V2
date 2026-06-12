# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

### Frontend (Next.js)

```bash
# Local dev without Docker (requires Postgres + Redis running separately)
npm run dev          # Turbopack is the default — fine for local dev

# Lint
npm run lint

# Production build (always force webpack — Turbopack fails on the private npm mirror)
npx next build --webpack
```

### Backend (Django)

```bash
cd backend
python manage.py runserver          # dev server
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic --noinput
```

### Docker (development)

```bash
# First time or after changing credentials — wipe the postgres volume
docker compose down -v

# Start everything (hot-reload for both frontend and backend)
docker compose up --build

# Tail logs for a single service
docker compose logs -f backend
```

### Docker (production)

```bash
# Deploy to production server via rsync + SSH
# Requires deploy/deploy.prod.env (copy from deploy/deploy.prod.env.example)
./deploy/deploy-prod.sh           # deploy and exit
./deploy/deploy-prod.sh --follow  # deploy then tail logs
```

---

## Architecture

### Stack overview

```
Browser
  └─ nginx (SSL termination, /api/* proxy to backend)
       ├─ Next.js standalone (port 3000)      — frontend container
       └─ Gunicorn/Django (port 8000)          — backend container
            ├─ PostgreSQL                       — postgres container
            └─ Redis                            — redis container
```

### Frontend: Next.js App Router

Single-page portfolio. `app/page.tsx` is an **async server component** that fetches `projects` and `siteStatus` from the Django backend at render time and passes them as props.

**Two API clients with different scopes:**

| File | Used by | Base URL source |
|---|---|---|
| `app/lib/server-api.ts` | Server components (SSR) | `API_URL` env var → `http://backend:8000` (Docker internal) |
| `app/lib/api.ts` | Client components (browser) | `NEXT_PUBLIC_API_URL` env var → `https://mhnikoobakht.ir` (through nginx) |

`NEXT_PUBLIC_API_URL` is baked into the bundle at **build time**. `API_URL` is read at runtime. Never use `server-api.ts` in client components or `api.ts` in server components.

### Language system (bilingual EN/FA)

Language is determined in three layers, in priority order:
1. `lang` cookie (set when user explicitly switches)
2. `Accept-Language` request header (parsed server-side in `layout.tsx`)
3. Timezone detection client-side in `LanguageContext.tsx` — catches Iranian users with English browsers (`Asia/Tehran`, `Asia/Kabul`, `Asia/Dushanbe`)

`LanguageProvider` holds `{ lang, t, dir }`. All static copy lives in `app/translations/en.ts` and `app/translations/fa.ts` as a typed `Translations` object. To add copy, add the key to both files. RTL layout for Farsi is applied via `dir="rtl"` on `<html>` — no separate layout needed.

Django models with bilingual content have parallel `*_fa` fields (e.g. `name`/`name_fa`, `description`/`description_fa`).

### Backend: Django + DRF

Django apps:
- `portfolio` — `Project` and `SiteStatus` models; read-only public API at `/api/v1/projects/` and `/api/v1/status/`
- `contact` — contact form submission endpoint
- `shared` — `drf_cached_response` decorator and `invalidate_cache` utility

**Caching pattern:** views use `@drf_cached_response(ttl=..., cache_prefix='...', user_aware=False)` from `shared/cache.py`. Cache is Redis with a `portfolio` key prefix. Models call `invalidate_cache(prefix)` in their `save()` and `delete()` hooks so data is never stale after an admin edit.

`SiteStatus` is a singleton (always `pk=1`, enforced in `save()`). Read it with `SiteStatus.get()`.

**Security settings in production** (`DEBUG=False`):
- `SECURE_SSL_REDIRECT` defaults to `True` but is overridden to `False` in `docker-compose.prod.yml` — nginx handles SSL termination and container-to-container traffic is plain HTTP. Do not re-enable it.
- `SECURE_PROXY_SSL_HEADER` is set so Django trusts nginx's `X-Forwarded-Proto: https` header.

### Docker volumes and credential gotcha

The `postgres_data` named volume is initialised with `POSTGRES_PASSWORD` only on **first creation**. If you change the password in `.env` or `.env.prod` after the volume already exists, postgres will start but Django will fail to authenticate. Fix: `docker compose down -v` (wipes all volumes) or `ALTER USER portfolio_user PASSWORD '...'` inside the running container.

### Fonts

All fonts are served locally from `app/fonts/` via `next/font/local`. Do not switch back to `next/font/google` — the Docker build environment cannot reach Google's servers.

| Variable | File |
|---|---|
| `--font-inter` | `inter-latin.woff2` (variable, 100–900) |
| `--font-space-mono` | `space-mono-400-latin.woff2` + `space-mono-700-latin.woff2` |
| `--font-vazirmatn` | `vazirmatn-arabic.woff2` (variable, 400–800) |

### Production build quirk

**Always use `--webpack` when building inside Docker.** Next.js 16 defaults to Turbopack, and `@vercel/turbopack-next` is not available on the private npm mirror (`npm.devneeds.ir`). The `ENV TURBOPACK=0` approach does not work — any non-empty string is truthy in JS and would enable Turbopack rather than disable it.
