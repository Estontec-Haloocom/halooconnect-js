import type { Metadata } from "next";
import AdminBlogPageNext from "@/next/pages/AdminBlogPageNext";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Legacy Blog Editor",
  description: "Legacy Supabase blog management for Haloo Connect.",
  path: "/admin/blog/legacy",
  noIndex: true,
});

export default function AdminBlogLegacyPage() {
  return <AdminBlogPageNext />;
}
