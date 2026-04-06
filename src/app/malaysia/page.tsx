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
  "Cloud call center software in Malaysia for omnichannel support, predictive dialer workflows, IVR, WhatsApp engagement, analytics, and AI voice automation.";

export const metadata: Metadata = buildMetadata({
  title: "Call Center Software Malaysia | Cloud Contact Center Platform",
  description,
  path: "/malaysia",
  keywords: [
    "call center software Malaysia",
    "cloud call center Malaysia",
    "contact center software Kuala Lumpur",
    "omnichannel contact center Malaysia",
    "predictive dialer Malaysia",
  ],
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is cloud call center software in Malaysia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cloud call center software in Malaysia is a hosted customer communication platform that manages inbound and outbound calls, digital channels, routing, and reporting without on-premise PBX infrastructure.",
      },
    },
    {
      "@type": "Question",
      name: "Can Malaysia teams run WhatsApp and voice support in one platform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Malaysia teams can combine voice, WhatsApp, email, and SMS in one omnichannel environment to improve response consistency and SLA control.",
      },
    },
  ],
};

export default function MalaysiaPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Malaysia", path: "/malaysia" },
  ]);
  const webPageSchema = createWebPageSchema({
    title: "Call Center Software Malaysia | Cloud Contact Center Platform",
    description,
    path: "/malaysia",
    about: ["call center software Malaysia", "cloud contact center Malaysia"],
  });
  const serviceSchema = createRegionalServiceSchema({
    name: "Call Center Software Malaysia",
    description,
    path: "/malaysia",
    country: "Malaysia",
    cities: ["Kuala Lumpur", "Selangor", "Johor"],
    serviceType: "Cloud call center software",
    availableLanguage: ["English", "Malay", "Mandarin", "Tamil"],
    keywords: [
      "call center software Malaysia",
      "cloud call center Malaysia",
      "predictive dialer Malaysia",
    ],
  });

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={serviceSchema} />
      <LocalizedLandingPageNext
        country="Malaysia"
        countryCode="+60"
        headline="Leading Call Center Solution in"
      />
      <AiOverviewSection
        title="Modern Cloud Call Center Platform for Malaysia"
        summary="Malaysia teams use Haloo Connect to streamline high-volume customer communication with intelligent routing, AI-assisted workflows, and omnichannel visibility."
        bullets={[
          "Supports customer service programs across inbound and outbound journeys.",
          "Includes IVR, predictive dialer, and WhatsApp-native workflows.",
          "Improves team productivity through automation and performance reporting.",
          "Designed for scale across Kuala Lumpur, Selangor, Johor, and nationwide operations.",
        ]}
      />
      <section className="border-t border-border/60 bg-background py-10">
        <div className="container max-w-4xl space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">TL;DR for Malaysia Teams</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Deploy voice and digital channels in one cloud contact stack.</li>
            <li>Use IVR and automation to reduce queue pressure and missed calls.</li>
            <li>Track SLA, quality, and team productivity with live analytics.</li>
          </ul>
          <h3 className="text-xl font-semibold text-foreground">What is a cloud call center platform?</h3>
          <p className="text-muted-foreground">
            A cloud call center platform is software hosted online that handles customer interactions across channels,
            including routing, agent tools, and reporting, without requiring legacy telephony hardware.
          </p>
          <h3 className="text-xl font-semibold text-foreground">Why do Malaysia operations teams adopt it?</h3>
          <p className="text-muted-foreground">
            Teams adopt cloud platforms to scale faster, lower maintenance overhead, and standardize service quality
            across locations and shifts.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/contact" className="font-medium text-primary hover:underline">Book a Malaysia Demo</Link>
            <Link href="/analysis" className="font-medium text-primary hover:underline">Run AI Readiness Audit</Link>
            <Link href="/blog" className="font-medium text-primary hover:underline">Read Implementation Guides</Link>
          </div>
        </div>
      </section>
    </>
  );
}
