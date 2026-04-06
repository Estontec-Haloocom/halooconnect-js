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
  "AI-powered call center software for Dubai and the UAE with Arabic voice bot support, omnichannel routing, WhatsApp Business API, IVR, and predictive dialer automation.";

export const metadata: Metadata = buildMetadata({
  title: "Call Center Software Dubai & UAE | AI Cloud Contact Center",
  description,
  path: "/uae",
  keywords: [
    "call center software Dubai",
    "contact center software UAE",
    "cloud contact center Dubai",
    "Arabic AI voice bot UAE",
    "WhatsApp Business API UAE",
  ],
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is AI call center software for UAE operations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI call center software for UAE operations is a cloud platform that combines omnichannel routing, automation, and analytics to improve customer response and sales follow-up performance.",
      },
    },
    {
      "@type": "Question",
      name: "Does the platform support Arabic and English customer journeys?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. UAE teams can support multilingual customer communication, including Arabic and English workflows, across inbound and outbound operations.",
      },
    },
  ],
};

export default function UaePage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "" },
    { name: "UAE", path: "/uae" },
  ]);
  const webPageSchema = createWebPageSchema({
    title: "Call Center Software Dubai & UAE | AI Cloud Contact Center",
    description,
    path: "/uae",
    about: ["call center software Dubai", "contact center software UAE"],
  });
  const serviceSchema = createRegionalServiceSchema({
    name: "Call Center Software Dubai & UAE",
    description,
    path: "/uae",
    country: "United Arab Emirates",
    cities: ["Dubai", "Abu Dhabi", "Sharjah"],
    serviceType: "Cloud contact center software",
    availableLanguage: ["English", "Arabic"],
    keywords: [
      "call center software Dubai",
      "contact center software UAE",
      "Arabic AI voice bot UAE",
    ],
  });

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={serviceSchema} />
      <LocalizedLandingPageNext
        country="UAE & Dubai"
        countryCode="+971"
        headline="Best Call Center Software in"
      />
      <AiOverviewSection
        title="AI Contact Center Platform for UAE Operations"
        summary="For UAE teams in sales and customer support, Haloo Connect combines multilingual automation with omnichannel workflows to reduce missed opportunities and improve response speed."
        bullets={[
          "Supports Arabic and English service journeys.",
          "Handles inbound service and outbound campaign workflows in one platform.",
          "Improves oversight with real-time performance analytics for supervisors.",
          "Built for scalable deployments across Dubai, Abu Dhabi, and Sharjah.",
        ]}
      />
      <section className="border-t border-border/60 bg-background py-10">
        <div className="container max-w-4xl space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">TL;DR for UAE Teams</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Run multilingual customer support and sales in one cloud system.</li>
            <li>Improve queue efficiency with routing, IVR, and AI-assisted workflows.</li>
            <li>Use analytics to reduce missed opportunities and service inconsistency.</li>
          </ul>
          <h3 className="text-xl font-semibold text-foreground">
            What makes a UAE-ready contact center platform effective?
          </h3>
          <p className="text-muted-foreground">
            Effective platforms align local language needs, omnichannel operations, and measurable performance
            controls so supervisors can scale service quality while keeping response times predictable.
          </p>
          <h3 className="text-xl font-semibold text-foreground">
            How do growing teams measure impact after deployment?
          </h3>
          <p className="text-muted-foreground">
            Most teams track first-response time, conversion from inbound inquiries, call abandonment, and
            quality-assurance trends at queue level.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/contact" className="font-medium text-primary hover:underline">Book UAE Demo</Link>
            <Link href="/analysis" className="font-medium text-primary hover:underline">Evaluate Readiness</Link>
            <Link href="/blog" className="font-medium text-primary hover:underline">Read Implementation Insights</Link>
          </div>
        </div>
      </section>
    </>
  );
}
