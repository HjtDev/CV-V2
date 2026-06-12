<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Key invariants — do not violate

- **`output: 'standalone'`** is set in `next.config.ts`. The production Docker image copies only `.next/standalone` + `.next/static` + `public`. Any runtime file dependency that doesn't end up in those directories will silently break production.
- **Never import `server-api.ts` from a client component** (`'use client'`). It uses Node.js APIs and accesses `API_URL` (server-only env). Use `api.ts` (axios) in client components.
- **`NEXT_PUBLIC_API_URL` is baked at build time.** Changing it in `.env.prod` without rebuilding the image has no effect on the client bundle.
- **`SiteStatus` is a singleton** — always access via `SiteStatus.get()` and save via the model instance; never construct with an arbitrary `pk`.
- **Cache invalidation is automatic** — `Project.save()` and `SiteStatus.save()` call `invalidate_cache()`. Don't manually manage Redis keys for these models.
- **Fonts must stay local** — `app/fonts/*.woff2`. Build environment has no access to Google Fonts CDN.

## Adding translations

Every user-visible string belongs in `app/translations/en.ts` and `app/translations/fa.ts`. The `Translations` type is inferred from `en.ts` — TypeScript will error if `fa.ts` is missing a key. Access strings in components with `const { t } = useLanguage()`.

## Adding a Django API endpoint

1. Add view to the relevant app (`portfolio` for public read, `contact` for form submissions).
2. Decorate read-only views with `@drf_cached_response(ttl=..., cache_prefix='unique_prefix', user_aware=False)`.
3. Wire into `urls.py` under `api/v1/`.
4. If the endpoint backs a server component, add a fetch function to `server-api.ts` with `AbortSignal.timeout(5000)` and a `next: { revalidate: N }` cache hint.
