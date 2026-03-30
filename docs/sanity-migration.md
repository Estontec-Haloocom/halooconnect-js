# Sanity Migration Guide

This project now supports a Sanity-first blog flow with Supabase fallback.

## Current State

- Public blog routes prefer Sanity content when Sanity is configured.
- If Sanity is not configured, or a post does not exist in Sanity, the site falls back to Supabase `blog_posts`.
- The main admin blog route at `/admin/blog` is now a Sanity-first control hub.
- The legacy Supabase editor still exists at `/admin/blog/legacy` during transition.
- The new editorial destination is `/studio`.

## Environment Variables

Add these values in `.env`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-03-30"
SANITY_API_READ_TOKEN="your_sanity_token"
SANITY_API_WRITE_TOKEN="your_sanity_write_token"
NEXT_PUBLIC_BLOG_SOURCE_MODE="fallback"
```

## Useful Commands

```bash
npm run sanity
npm run sanity:deploy
npm run migrate:blog-to-sanity
```

## Recommended Migration Order

1. Configure the Sanity environment variables.
2. Run `npm run sanity` and confirm Studio opens at `/studio`.
3. Run `npm run migrate:blog-to-sanity` to import existing Supabase blog posts.
4. Review imported posts in Studio.
5. Convert the imported `legacyHtml` field into structured Portable Text for high-value posts.
6. Create all new blog posts directly in Sanity Studio.
7. Switch `NEXT_PUBLIC_BLOG_SOURCE_MODE` from `fallback` to `sanity-only`.
8. Once all legacy posts are migrated and verified, remove the old Supabase blog editor and `blog_posts` dependency.

## What The Migration Script Does

The migration script:

- reads all posts from Supabase `blog_posts`
- creates author documents in Sanity
- creates category documents in Sanity
- uploads cover and OG images into Sanity assets
- stores the old HTML body in `legacyHtml`
- maps SEO fields into the Sanity `seo` object

## Important Limitation

Imported posts are stored with `legacyHtml` as a fallback. This preserves rendering immediately, but it is not as editor-friendly as Portable Text.

For the best long-term CMS workflow:

- keep `legacyHtml` only as a migration bridge
- gradually rewrite key posts in Portable Text inside Sanity

## Final Sanity-Only Cutover

When all content is verified in Studio:

- set `NEXT_PUBLIC_BLOG_SOURCE_MODE="sanity-only"`
- redeploy the site
- verify `/blog` and a sample of post URLs no longer depend on Supabase fallback
- then remove the legacy editor and Supabase `blog_posts` dependency

## Final Cleanup Target

After migration is complete:

- remove Supabase blog CRUD from `/admin/blog/legacy`
- remove the legacy HTML fallback
- use Sanity as the single source of truth for all blog content
