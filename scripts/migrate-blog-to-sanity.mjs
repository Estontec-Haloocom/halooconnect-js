import "dotenv/config";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient as createSanityClient } from "@sanity/client";

const sanityToken = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

const requiredEnv = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
];

for (const name of requiredEnv) {
  if (!process.env[name]) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
}

if (!sanityToken) {
  console.error("Missing required env var: SANITY_API_WRITE_TOKEN (or SANITY_API_READ_TOKEN).");
  process.exit(1);
}

const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

const sanity = createSanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-30",
  token: sanityToken,
  useCdn: false,
});

async function ensureAuthor(name) {
  const id = `author-${slugify(name || "haloo-connect")}`;
  await sanity.createIfNotExists({
    _id: id,
    _type: "author",
    name: name || "Haloo Connect",
  });
  return { _type: "reference", _ref: id };
}

async function ensureCategory(title) {
  if (!title) return undefined;
  const id = `category-${slugify(title)}`;
  await sanity.createIfNotExists({
    _id: id,
    _type: "category",
    title,
    slug: {
      _type: "slug",
      current: slugify(title),
    },
  });
  return { _type: "reference", _ref: id };
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function keywordArray(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function main() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  console.log(`Found ${data.length} Supabase blog posts to migrate.`);

  for (const post of data) {
    const authorRef = await ensureAuthor(post.author);
    const categoryRef = await ensureCategory(post.category);
    const sanityDoc = {
      _id: `post-${post.slug}`,
      _type: "post",
      title: post.title,
      slug: {
        _type: "slug",
        current: post.slug,
      },
      excerpt: post.excerpt || "",
      author: authorRef,
      category: categoryRef,
      tags: post.tags || [],
      publishedAt: post.published_at || post.created_at,
      read_time_minutes: post.read_time_minutes || undefined,
      legacyHtml: post.content || "",
      seo: {
        _type: "seo",
        metaTitle: post.meta_title || post.title,
        metaDescription: post.meta_description || post.excerpt || "",
        metaKeywords: keywordArray(post.meta_keywords),
      },
    };

    if (post.cover_image) {
      sanityDoc.coverImage = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: await uploadImageFromUrl(post.cover_image, `cover-${post.slug}`),
        },
      };
    }

    if (post.og_image) {
      sanityDoc.seo.ogImage = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: await uploadImageFromUrl(post.og_image, `og-${post.slug}`),
        },
      };
    }

    await sanity.createOrReplace(sanityDoc);
    console.log(`Migrated: ${post.slug}`);
  }

  console.log("Migration complete.");
}

async function uploadImageFromUrl(url, filenameBase) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${url}`);
  }

  const contentType = response.headers.get("content-type") || "image/jpeg";
  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await sanity.assets.upload("image", buffer, {
    filename: `${filenameBase}.${contentType.split("/")[1] || "jpg"}`,
    contentType,
  });

  return asset._id;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
