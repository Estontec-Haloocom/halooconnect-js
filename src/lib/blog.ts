import { supabaseServer } from "@/integrations/supabase/server";
import { sanityFetch } from "@/sanity/lib/client";
import { blogPostBySlugQuery, blogPostsQuery } from "@/sanity/lib/queries";
import { hasSanityEnv, isSanityOnlyBlogMode } from "@/sanity/env";
import type { BlogPost, BlogPostSummary } from "@/sanity/types";

function normalizeSanityPost<T extends BlogPostSummary>(post: T): T {
  return {
    ...post,
    source: "sanity",
  };
}

export async function getAllBlogPosts(): Promise<BlogPostSummary[]> {
  if (hasSanityEnv) {
    const sanityPosts = await sanityFetch<BlogPostSummary[]>({
      query: blogPostsQuery,
      tags: ["blog", "sanity"],
    });

    if (sanityPosts && sanityPosts.length > 0) {
      return sanityPosts.map(normalizeSanityPost);
    }
  }

  if (isSanityOnlyBlogMode) {
    return [];
  }

  const { data } = await supabaseServer
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image, author, read_time_minutes, published_at, created_at, updated_at, category, tags, meta_title, meta_description, meta_keywords, og_image")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return ((data as BlogPostSummary[] | null) || []).map((post) => ({
    ...post,
    source: "supabase",
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (hasSanityEnv) {
    const sanityPost = await sanityFetch<BlogPost>({
      query: blogPostBySlugQuery,
      params: { slug },
      tags: ["blog", `blog:${slug}`],
    });

    if (sanityPost) {
      return normalizeSanityPost(sanityPost) as BlogPost;
    }
  }

  if (isSanityOnlyBlogMode) {
    return null;
  }

  const { data } = await supabaseServer
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!data) {
    return null;
  }

  return {
    ...(data as BlogPost),
    source: "supabase",
  };
}
