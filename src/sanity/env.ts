export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION ||
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  "2026-03-30";

export const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  "production";

export const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  "";

export const useCdn = process.env.NODE_ENV === "production";

export const hasSanityEnv = Boolean(projectId && dataset);

export const blogSourceMode =
  process.env.NEXT_PUBLIC_BLOG_SOURCE_MODE === "sanity-only"
    ? "sanity-only"
    : "fallback";

export const isSanityOnlyBlogMode = blogSourceMode === "sanity-only";
