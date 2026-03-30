import type { Metadata } from "next";
import AdminBlogHubPageNext from "@/next/pages/AdminBlogHubPageNext";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Blog CMS",
  description: "Sanity-first blog publishing and migration dashboard for Haloo Connect.",
  path: "/admin/blog",
  noIndex: true,
});

export default function AdminBlogPage() {
  return <AdminBlogHubPageNext />;
}
