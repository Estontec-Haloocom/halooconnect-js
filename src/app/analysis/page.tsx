import type { Metadata } from "next";
import AnalysisPageNext from "@/next/pages/AnalysisPageNext";
import JsonLd from "@/next/components/JsonLd";
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
    </>
  );
}
