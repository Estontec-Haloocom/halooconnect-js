import type { Metadata } from "next";
import AdminPageNext from "@/next/pages/AdminPageNext";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Admin",
  description: "Admin access for Haloo Connect.",
  path: "/admin",
  noIndex: true,
});

export default function AdminPage() {
  return <AdminPageNext />;
}
