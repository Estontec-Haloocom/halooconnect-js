import type { Metadata } from "next";
import Link from "next/link";
import AnalysisPageNext from "@/next/pages/AnalysisPageNext";
import JsonLd from "@/next/components/JsonLd";
import AiOverviewSection from "@/components/AiOverviewSection";
import {
  buildMetadata,
  createBreadcrumbSchema,
  createServiceSchema,
  createWebPageSchema,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "AI Contact Center Audit Tool | Readiness Analyzer",
  description:
    "Run a fast AI contact center audit to discover automation gaps, missed-call risks, workflow bottlenecks, and opportunities for customer service AI deployment.",
  path: "/analysis",
  keywords: [
    "AI contact center audit",
    "contact center readiness assessment",
    "customer service automation audit",
    "call center AI assessment",
  ],
});

export default function AnalysisPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "" },
    { name: "AI Readiness Analyzer", path: "/analysis" },
  ]);
  const webPageSchema = createWebPageSchema({
    title: "AI Contact Center Audit Tool | Readiness Analyzer",
    description:
      "Run a fast AI contact center audit to discover automation gaps, missed-call risks, workflow bottlenecks, and opportunities for customer service AI deployment.",
    path: "/analysis",
    about: ["AI contact center audit", "customer service automation assessment"],
  });
  const serviceSchema = createServiceSchema({
    name: "AI Contact Center Readiness Analyzer",
    description:
      "An interactive audit tool that evaluates customer communication workflows, automation maturity, and call center AI readiness.",
    path: "/analysis",
    serviceType: "AI readiness audit",
    areaServed: ["Singapore", "United Arab Emirates", "Malaysia", "Philippines", "India"],
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={serviceSchema} />
      <AnalysisPageNext />
      <AiOverviewSection
        title="How the AI Readiness Analyzer Helps Teams Prioritize"
        summary="The analyzer is designed for leaders who need a clear baseline before investing in AI contact center upgrades. It identifies operational friction and maps practical next steps."
        bullets={[
          "Highlights missed-call, routing, and response bottlenecks.",
          "Flags automation opportunities with measurable business impact.",
          "Provides an actionable readiness report for support and sales operations.",
          "Supports modernization planning across omnichannel customer journeys.",
        ]}
      />
      <section className="border-t border-border/60 bg-muted/20 py-10">
        <div className="container">
          <h2 className="text-xl font-semibold text-foreground">Keep Exploring Haloo Connect</h2>
          <p className="mt-2 text-muted-foreground">
            Dive deeper into platform capabilities, regional deployments, and implementation guidance.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/" className="text-sm font-medium text-primary hover:underline">
              Platform Overview
            </Link>
            <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
              Contact Center Blog
            </Link>
            <Link href="/contact" className="text-sm font-medium text-primary hover:underline">
              Talk to Sales
            </Link>
            <Link href="/singapore" className="text-sm font-medium text-primary hover:underline">
              Singapore
            </Link>
            <Link href="/uae" className="text-sm font-medium text-primary hover:underline">
              UAE
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
