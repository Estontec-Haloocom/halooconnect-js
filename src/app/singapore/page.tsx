import type { Metadata } from "next";
import Link from "next/link";
import LocalizedLandingPageNext from "@/next/pages/LocalizedLandingPageNext";
import JsonLd from "@/next/components/JsonLd";
import AiOverviewSection from "@/components/AiOverviewSection";
import {
  buildMetadata,
  createBreadcrumbSchema,
  createRegionalServiceSchema,
  createWebPageSchema,
} from "@/lib/seo";

const description =
  "Enterprise contact center software in Singapore with omnichannel voice, WhatsApp, email, PDPA-conscious workflows, predictive dialer, IVR, and multilingual AI voice automation.";

export const metadata: Metadata = buildMetadata({
  title: "Call Center Software Singapore | AI Cloud CX Platform",
  description,
  path: "/singapore",
  keywords: [
    "contact center software Singapore",
    "cloud call center Singapore",
    "omnichannel customer support software Singapore",
    "AI voice bot Singapore",
    "PDPA contact center software",
  ],
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is enterprise contact center software in Singapore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enterprise contact center software in Singapore is a cloud platform that unifies calls and digital channels while providing routing, analytics, and governance for service operations.",
      },
    },
    {
      "@type": "Question",
      name: "How can teams align contact center automation with PDPA-conscious operations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Teams align automation with PDPA-conscious workflows by applying clear access controls, consent-aware process design, and auditable quality monitoring across channels.",
      },
    },
  ],
};

export default function SingaporePage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Singapore", path: "/singapore" },
  ]);
  const webPageSchema = createWebPageSchema({
    title: "Call Center Software Singapore | AI Cloud CX Platform",
    description,
    path: "/singapore",
    about: ["contact center software Singapore", "cloud call center Singapore"],
  });
  const serviceSchema = createRegionalServiceSchema({
    name: "Call Center Software Singapore",
    description,
    path: "/singapore",
    country: "Singapore",
    cities: ["Singapore"],
    serviceType: "Enterprise contact center software",
    availableLanguage: ["English", "Mandarin", "Malay", "Tamil"],
    keywords: [
      "contact center software Singapore",
      "cloud call center Singapore",
      "PDPA contact center software",
    ],
  });

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={serviceSchema} />
      <LocalizedLandingPageNext
        country="Singapore"
        countryCode="+65"
        headline="Enterprise Contact Center Software in"
      />
      <AiOverviewSection
        title="Enterprise-Ready Contact Center Software for Singapore"
        summary="Haloo Connect helps Singapore teams centralize customer communication operations with AI automation, omnichannel routing, and consistent service-quality monitoring."
        bullets={[
          "PDPA-conscious process design for regulated customer operations.",
          "Omnichannel support across calls, WhatsApp, email, and SMS.",
          "AI voice and workflow automation to improve first response time.",
          "Operational analytics for workforce performance and SLA control.",
        ]}
      />
      <section className="border-t border-border/60 bg-background py-10">
        <div className="container max-w-4xl space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">TL;DR for Singapore Enterprises</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Unify voice, WhatsApp, email, and SMS into one service operation.</li>
            <li>Use AI workflow support to improve response quality and speed.</li>
            <li>Track service consistency with supervisor-level analytics and QA.</li>
          </ul>
          <h3 className="text-xl font-semibold text-foreground">What is a modern cloud call center in Singapore?</h3>
          <p className="text-muted-foreground">
            It is a software-first customer communication platform that supports omnichannel service delivery,
            high availability, and operational governance for enterprise teams.
          </p>
          <h3 className="text-xl font-semibold text-foreground">
            Which implementation facts matter most for rollout planning?
          </h3>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Channel consolidation usually improves visibility and reduces transfer delays.</li>
            <li>Queue-level KPI baselines are needed before automation expansion.</li>
            <li>Agent assist features can boost consistency while preserving human oversight.</li>
          </ul>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/contact" className="font-medium text-primary hover:underline">Request a Demo</Link>
            <Link href="/analysis" className="font-medium text-primary hover:underline">Run Readiness Check</Link>
            <Link href="/blog" className="font-medium text-primary hover:underline">Read Cloud CX Insights</Link>
          </div>
        </div>
      </section>
    </>
  );
}
