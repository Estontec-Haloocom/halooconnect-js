# Haloo Connect

AI-powered cloud contact center website built on Next.js.

## Stack

- Next.js App Router
- TypeScript
- React 18
- Tailwind CSS
- Supabase
- Sanity Studio

## Local Development

```sh
npm install
npm run dev
```

## Core Scripts

```sh
npm run dev
npm run build
npm run start
npm run sanity
npm run sanity:deploy
npm run migrate:blog-to-sanity
```

## Sanity

Sanity Studio is mounted at `/studio`.

Required environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=""
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-03-30"
SANITY_API_READ_TOKEN=""
SANITY_API_WRITE_TOKEN=""
NEXT_PUBLIC_BLOG_SOURCE_MODE="fallback"
```

Detailed migration notes:

- [docs/sanity-migration.md](./docs/sanity-migration.md)

## Blog Source of Truth

- Current public blog routes support Sanity-first content with Supabase fallback.
- Set `NEXT_PUBLIC_BLOG_SOURCE_MODE="sanity-only"` when all migrated content is verified and you want Sanity to become the only live blog source.
- `/admin/blog` is now the Sanity-first publishing hub.
- Legacy Supabase blog management still exists at `/admin/blog/legacy` during migration.
- New content should be created in Sanity Studio.
