import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sanity Studio",
  description: "Content studio for Haloo Connect.",
  path: "/studio",
  noIndex: true,
});

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
