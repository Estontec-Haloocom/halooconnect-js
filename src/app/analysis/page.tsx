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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an AI contact center readiness audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI contact center readiness audit is a structured review of workflows, routing logic, missed-call handling, and automation opportunities to prioritize the next implementation steps.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the readiness analyzer take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most teams can complete the assessment quickly and receive a practical output that highlights bottlenecks and opportunities for faster customer response.",
      },
    },
    {
      "@type": "Question",
      name: "What KPIs should we track after an AI assessment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Track first-contact resolution, average handle time, response SLA, repeat contact rate, and conversion or retention outcomes tied to each queue.",
      },
    },
  ],
};

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
      <JsonLd data={faqSchema} />
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
      <section className="border-t border-border/60 bg-background py-10">
        <div className="container max-w-4xl space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">TL;DR: What You Get from This Audit</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>A clear definition of your current automation maturity.</li>
            <li>A ranked list of highest-impact AI opportunities.</li>
            <li>Operational next steps tied to measurable CX and efficiency KPIs.</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">
            What is AI readiness in a contact center?
          </h3>
          <p className="text-muted-foreground">
            AI readiness is the ability of your team, workflows, and systems to deploy automation safely while
            improving service outcomes. It covers data quality, channel orchestration, routing logic, and
            performance governance.
          </p>

          <h3 className="text-xl font-semibold text-foreground">
            Which facts matter most before implementation?
          </h3>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>High repeat-contact queues usually have the fastest automation ROI.</li>
            <li>Agent-assist use cases can improve consistency without replacing human handling.</li>
            <li>Strong handoff design between bots and agents is critical for CSAT protection.</li>
          </ul>

          <blockquote className="rounded-xl border-l-4 border-primary bg-muted/30 px-4 py-3 text-sm italic text-foreground/90">
            "AI creates value fastest when it is deployed against the highest-friction customer journeys first."
          </blockquote>
        </div>
      </section>
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
