# Mohammad Hojjat Nikoobakht — Portfolio & CV

A bilingual (English / Farsi) personal portfolio and CV site built with Next.js 16, Django 5, and Docker.

## See the Project Live

[mhnikoobakht.ir](https://mhnikoobakht.ir)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (App Router, `output: standalone`), React 19, TypeScript 5 |
| Styling | Tailwind CSS v4, Framer Motion 12 |
| Icons | react-icons v5 (Simple Icons + Font Awesome) |
| Backend | Django 5 + Django REST Framework, Gunicorn |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Analytics | Umami (self-hosted, privacy-first) |
| Containerisation | Docker + Docker Compose (dev & prod profiles) |
| Deployment | SSH + rsync via `deploy/deploy-prod.sh` |

## Project Structure

```
resume-site/
├── app/                    # Next.js App Router
│   ├── components/         # Shared UI components (Navbar, Hero, Contact, Footer…)
│   │   └── interactive/    # CursorSpotlight, OrbField, CircuitSVG animations
│   ├── cv/                 # /cv page — full-stack developer resume
│   ├── embedded/           # /embedded page — electrical engineering resume
│   │   └── components/     # SystemsNav, SystemsHero, SystemsIoT, SystemsPLC
│   ├── context/            # LanguageContext (EN / FA, RTL toggle)
│   ├── translations/       # en.ts + fa.ts — full bilingual string maps
│   ├── lib/                # API client, types
│   ├── layout.tsx          # Root layout with SEO metadata + Umami script
│   ├── page.tsx            # Main portfolio page
│   ├── sitemap.ts          # Dynamic sitemap (/, /cv, /embedded, /resume.pdf)
│   └── robots.ts           # robots.txt
├── backend/                # Django project
│   ├── contact/            # Contact form API (CBV, rate-limited at 3/hour)
│   ├── portfolio/          # Projects & site-status API
│   └── core/               # Settings, URLs
├── deploy/                 # Prod deploy helpers (SSH + rsync script, env example)
├── public/
│   └── resume.pdf          # Downloadable PDF resume (web dev)
├── docker-compose.yml      # Development stack
├── docker-compose.prod.yml # Production stack
├── Dockerfile              # Production frontend image
└── Dockerfile.dev          # Development frontend image (hot reload)
```

## Local Development

### Prerequisites

- Docker & Docker Compose v2
- Node.js 20+ (only needed if running outside Docker)

### First-time setup

```bash
# 1. Copy the environment template
cp .env.example .env

# 2. Start the full stack (Postgres + Redis + Django + Next.js + Umami)
docker compose up --build
```

The frontend is available at `http://localhost:3000`, the Django API at `http://localhost:8000`, and the Umami dashboard at `http://localhost:3001`.

Hot reload is enabled for both frontend and backend services via bind-mounted source directories.

### Running without Docker

```bash
# Frontend
npm install
npm run dev          # starts Next.js on port 3000

# Backend (separate terminal — requires Postgres + Redis running locally)
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `API_URL` | `http://backend:8000` | Internal backend URL (server-side) |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Backend URL visible to the browser |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Canonical site URL (used in SEO metadata) |
| `POSTGRES_DB` | `portfolio_db` | Database name |
| `POSTGRES_USER` | `portfolio_user` | Database user |
| `POSTGRES_PASSWORD` | — | Database password (required in prod) |
| `SECRET_KEY` | — | Django secret key (required in prod) |
| `REDIS_URL` | `redis://redis:6379/0` | Redis connection URL |
| `UMAMI_DB_PASSWORD` | — | Password for the Umami PostgreSQL database |
| `UMAMI_APP_SECRET` | — | Secret key for Umami session signing (min 32 chars in prod) |
| `UMAMI_PORT` | `3001` | Host port Umami dashboard is exposed on |
| `NEXT_PUBLIC_UMAMI_SCRIPT_URL` | — | URL of the Umami tracking script (baked in at build time) |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | — | Website ID from Umami dashboard (baked in at build time) |

## Analytics Setup (Umami)

Umami runs as a separate service alongside the main stack. First-time setup:

1. Start the stack — Umami is available at `http://localhost:3001` (dev) or `https://analytics.mhnikoobakht.ir` (prod)
2. Log in with the default credentials: `admin` / `umami` — **change the password immediately**
3. Go to **Settings → Websites → Add website**, enter your domain, and copy the **Website ID**
4. Set `NEXT_PUBLIC_UMAMI_WEBSITE_ID` in `.env` (dev) or `.env.prod` (prod)
5. Rebuild the frontend — the tracking script is baked in at build time:
   ```bash
   # dev
   docker compose up --build frontend

   # prod
   docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build frontend
   ```

The tracking script only loads when `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set, so the site works fine before setup.

> **Note:** During `next build`, server-side API calls to `backend` will log `ENOTFOUND` errors — this is expected. The build container has no network access to other services; everything resolves correctly at runtime.

## Production Deployment

```bash
# 1. Copy and fill in the deployment config
cp deploy/deploy.prod.env.example deploy/deploy.prod.env

# 2. Run the deploy script (rsync + remote docker compose up)
./deploy/deploy-prod.sh

# 3. Tail logs after deploy (optional)
./deploy/deploy-prod.sh --follow
```

The production build uses `output: 'standalone'` for a minimal Docker image footprint. Umami is bound to `127.0.0.1:3001` in production and proxied through nginx at `analytics.mhnikoobakht.ir`.

## Key Features

- **Bilingual** — full EN / FA translations with automatic RTL layout (`dir="rtl"` on `<html>`) when Farsi is active
- **Three-page structure** — portfolio (`/`), full-stack CV (`/cv`), and electrical engineering resume (`/embedded`); all navbars cross-link
- **Embedded systems page** (`/embedded`) — secondary resume covering PLC programming (Delta, Siemens LOGO!), microcontroller firmware (STM32, ESP32, Raspberry Pi, Arduino/AVR), IoT and industrial automation in C/C++ and MicroPython
- **CV page** (`/cv`) — dedicated resume with scroll-driven timeline animations, animated year counter, and skills grid
- **PDF resume** — downloadable at `/resume.pdf` (web development CV), linked from the CV page and navbar
- **Live backend status** — hero availability badge fetches real-time status from the Django API
- **Contact form** — rate-limited at 3 requests/hour per IP (DRF `ScopedRateThrottle` via CBV); 429 responses show an inline amber banner above the form so the user's typed content is preserved
- **Scroll-driven timeline** — education nodes glow one-by-one scrolling down, all at once scrolling up
- **Interactive backgrounds** — mouse-repelling physics orbs (`OrbField`), cursor spotlight (`CursorSpotlight`), and animated PCB circuit traces (`CircuitSVG`)
- **Analytics** — self-hosted Umami tracking with no cookies and no third-party data sharing
- **SEO** — per-page Open Graph, Twitter Card, hreflang alternates, canonical URLs, and sitemap

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
