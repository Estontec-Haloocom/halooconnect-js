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
  "BPO-friendly contact center software in the Philippines with cloud calling, omnichannel workflows, IVR, predictive dialer, analytics, WhatsApp, and AI automation.";

export const metadata: Metadata = buildMetadata({
  title: "Call Center Software Philippines | BPO Contact Center Platform",
  description,
  path: "/philippines",
  keywords: [
    "call center software Philippines",
    "BPO contact center software",
    "cloud call center Manila",
    "omnichannel contact center Philippines",
    "AI voice bot Philippines",
  ],
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is BPO-ready contact center software in the Philippines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BPO-ready contact center software in the Philippines is a cloud platform designed for high-agent operations with omnichannel routing, workforce visibility, and quality monitoring.",
      },
    },
    {
      "@type": "Question",
      name: "Can Philippine teams use AI automation without replacing agents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Most teams deploy automation for repetitive tasks and keep agents focused on complex conversations and customer retention outcomes.",
      },
    },
  ],
};

export default function PhilippinesPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Philippines", path: "/philippines" },
  ]);
  const webPageSchema = createWebPageSchema({
    title: "Call Center Software Philippines | BPO Contact Center Platform",
    description,
    path: "/philippines",
    about: ["call center software Philippines", "BPO contact center platform"],
  });
  const serviceSchema = createRegionalServiceSchema({
    name: "Call Center Software Philippines",
    description,
    path: "/philippines",
    country: "Philippines",
    cities: ["Manila", "Cebu", "Davao"],
    serviceType: "BPO contact center software",
    availableLanguage: ["English", "Filipino"],
    keywords: [
      "call center software Philippines",
      "BPO contact center software",
      "cloud call center Manila",
    ],
  });

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={serviceSchema} />
      <LocalizedLandingPageNext
        country="Philippines"
        countryCode="+63"
        headline="Best Contact Center Software in"
      />
      <AiOverviewSection
        title="BPO-Friendly Contact Center Software for the Philippines"
        summary="Haloo Connect gives Philippines support and BPO teams a unified AI-enabled platform to manage voice and digital conversations with measurable quality and speed."
        bullets={[
          "Built for large-agent environments with omnichannel coordination.",
          "Optimizes inbound support and outbound campaigns with automation.",
          "Supports operational coaching with analytics and QA visibility.",
          "Ready for high-volume programs across Manila, Cebu, and Davao.",
        ]}
      />
      <section className="border-t border-border/60 bg-background py-10">
        <div className="container max-w-4xl space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">TL;DR for Philippines BPO Operations</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Centralize voice and messaging channels for better queue control.</li>
            <li>Use automation to reduce repetitive handling and improve consistency.</li>
            <li>Measure team performance with real-time analytics and QA signals.</li>
          </ul>
          <h3 className="text-xl font-semibold text-foreground">
            What defines a high-performance BPO contact center stack?
          </h3>
          <p className="text-muted-foreground">
            It combines omnichannel routing, predictable workforce management, and measurable quality controls so
            teams can hit client SLAs at scale.
          </p>
          <h3 className="text-xl font-semibold text-foreground">
            How does AI improve throughput for large-agent teams?
          </h3>
          <p className="text-muted-foreground">
            AI reduces handle-time variance, supports faster agent onboarding, and improves first-response quality
            through guided workflows and automation.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/contact" className="font-medium text-primary hover:underline">Talk to Sales</Link>
            <Link href="/analysis" className="font-medium text-primary hover:underline">Audit Your Readiness</Link>
            <Link href="/blog" className="font-medium text-primary hover:underline">Read BPO Strategy Articles</Link>
          </div>
        </div>
      </section>
    </>
  );
}
