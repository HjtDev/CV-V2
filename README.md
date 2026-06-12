# Mohammad Hojjat Nikoobakht — Portfolio & CV

A bilingual (English / Farsi) personal portfolio and CV site built with Next.js 16, Django 5, and Docker.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (App Router, `output: standalone`), React 19, TypeScript 5 |
| Styling | Tailwind CSS v4, Framer Motion 12 |
| Icons | react-icons v5 (Simple Icons + Font Awesome) |
| Backend | Django 5 + Django REST Framework, Gunicorn |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Containerisation | Docker + Docker Compose (dev & prod profiles) |
| Deployment | SSH + rsync via `deploy/deploy-prod.sh` |

## Project Structure

```
resume-site/
├── app/                    # Next.js App Router
│   ├── components/         # Shared UI components (Navbar, Hero, Contact, Footer…)
│   ├── cv/                 # /cv page — CVHero, CVEducation, CVExperience, CVSkills, CVContact
│   ├── context/            # LanguageContext (EN / FA, RTL toggle)
│   ├── translations/       # en.ts + fa.ts — full bilingual string maps
│   ├── lib/                # API client, types
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main portfolio page
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # robots.txt
├── backend/                # Django project
│   ├── contact/            # Contact form API
│   ├── portfolio/          # Projects & site-status API
│   └── core/               # Settings, URLs
├── deploy/                 # Prod deploy helpers (SSH + rsync script, env example)
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

# 2. Start the full stack (Postgres + Redis + Django + Next.js)
docker compose up --build
```

The frontend is available at `http://localhost:3000` and the Django API at `http://localhost:8000`.

Hot reload is enabled for both services via bind-mounted source directories.

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

## Production Deployment

```bash
# 1. Copy and fill in the deployment config
cp deploy/deploy.prod.env.example deploy/deploy.prod.env

# 2. Run the deploy script (rsync + remote docker compose up)
./deploy/deploy-prod.sh

# 3. Tail logs after deploy (optional)
./deploy/deploy-prod.sh --follow
```

The production build uses `output: 'standalone'` for a minimal Docker image footprint.

## Key Features

- **Bilingual** — full EN / FA translations with automatic RTL layout (`dir="rtl"` on `<html>`) when Farsi is active
- **CV page** (`/cv`) — dedicated resume page with scroll-driven timeline animations, animated year counter, and skills grid
- **Live backend status** — hero availability badge fetches real-time status from the Django API
- **Contact form** — messages posted to `/api/v1/contact/` and stored in the database
- **Scroll-driven timeline** — education nodes glow one-by-one scrolling down, all at once scrolling up
- **Interactive backgrounds** — mouse-repelling physics orbs (`OrbField`) and cursor spotlight effects
- **SEO** — per-page Open Graph, Twitter Card, hreflang alternates, canonical URLs, and sitemap

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
