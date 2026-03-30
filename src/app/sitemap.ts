import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    { route: "", priority: 1, changeFrequency: "weekly" as const },
    { route: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/uae", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/singapore", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/malaysia", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/philippines", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/blog", priority: 0.8, changeFrequency: "daily" as const },
    { route: "/analysis", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ route, priority, changeFrequency }) => ({
    url: `https://halooconnect.com${route}`,
    lastModified: new Date("2026-03-30"),
    priority,
    changeFrequency,
  }));

  const posts = await getAllBlogPosts();

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://halooconnect.com/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.created_at),
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticEntries, ...blogEntries];
}
