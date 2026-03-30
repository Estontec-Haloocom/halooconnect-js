import type { Metadata } from "next";
import ThankYouPageNext from "@/next/components/ThankYouPageNext";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Thank You | Demo Request Received",
  description: "Your Haloo Connect demo request has been received.",
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return <ThankYouPageNext />;
}
