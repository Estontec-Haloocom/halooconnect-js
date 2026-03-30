"use client";

import { lazy, Suspense } from "react";
import HeaderNext from "@/next/components/HeaderNext";
import FooterNext from "@/next/components/FooterNext";
import ContactFormNext from "@/next/components/ContactFormNext";
import ExitIntentPopupNext from "@/next/components/ExitIntentPopupNext";
import LocalizedHeroSectionNext from "@/next/components/LocalizedHeroSectionNext";
import ScrollReveal from "@/components/ScrollReveal";
import SeoContentSection from "@/next/components/SeoContentSection";
import FaqSection from "@/next/components/FaqSection";

const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const ChannelsSection = lazy(() => import("@/components/ChannelsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const SecuritySection = lazy(() => import("@/components/SecuritySection"));
const ClientsSection = lazy(() => import("@/components/ClientsSection"));
const SentimentSection = lazy(() => import("@/components/SentimentSection"));
const HexaAISection = lazy(() => import("@/components/HexaAISection"));
const BusinessIntelligenceSection = lazy(() => import("@/components/BusinessIntelligenceSection"));
const HexaPerformanceSection = lazy(() => import("@/components/HexaPerformanceSection"));
const DeploymentSection = lazy(() => import("@/components/DeploymentSection"));
const LocalizedOutcomesSection = lazy(() => import("@/components/LocalizedOutcomesSection"));
const LocalizedTopFeaturesSection = lazy(() => import("@/components/LocalizedTopFeaturesSection"));
const LocalizedCTASection = lazy(() => import("@/components/LocalizedCTASection"));
const MidPageCTA = lazy(() => import("@/components/MidPageCTA"));

const SectionLoader = () => <div className="min-h-[200px]" />;

interface LocalizedLandingPageNextProps {
  country: string;
  countryCode: string;
  headline: string;
}

const LocalizedLandingPageNext = ({
  country,
  countryCode,
  headline,
}: LocalizedLandingPageNextProps) => {
  const countryKey = country.toLowerCase();
  const localizedFaqs = [
    {
      question: `How do I choose the right contact center software in ${country}?`,
      answer: `Focus on omnichannel coverage, cloud scalability, routing, analytics, integration flexibility, and compliance fit. Teams in ${country} usually compare platforms based on deployment speed, reliability, and support for voice plus messaging channels.`,
    },
    {
      question: `Is cloud call center software a good fit for businesses in ${country}?`,
      answer: `Yes. Cloud call center software helps businesses in ${country} reduce infrastructure overhead, support hybrid teams, scale faster, and centralize reporting across customer service, sales, and outbound engagement workflows.`,
    },
    {
      question: `Does Haloo Connect support WhatsApp and AI voice automation for ${country} teams?`,
      answer: `Yes. Haloo Connect supports omnichannel customer engagement workflows, including voice and messaging automation, which helps teams in ${country} improve response speed and streamline routine customer interactions.`,
    },
    {
      question: `Can Haloo Connect help ${country} companies improve outbound and inbound performance?`,
      answer: `Yes. The platform combines inbound routing, IVR, analytics, and outbound productivity tools so companies in ${country} can improve service levels, reduce missed conversations, and make agent performance easier to manage.`,
    },
  ];

  return (
    <main className="min-h-screen">
      <HeaderNext />
      <LocalizedHeroSectionNext
        country={country}
        countryCode={countryCode}
        headline={headline}
      />
      <Suspense fallback={<SectionLoader />}>
        <ScrollReveal><LocalizedOutcomesSection country={country} /></ScrollReveal>
        <ScrollReveal delay={50}><LocalizedTopFeaturesSection country={country} /></ScrollReveal>
        <MidPageCTA variant="secondary" country={country} />
        <ScrollReveal><SentimentSection /></ScrollReveal>
        <ScrollReveal delay={50}><HexaAISection /></ScrollReveal>
        <MidPageCTA variant="primary" country={country} />
        <ScrollReveal><BusinessIntelligenceSection /></ScrollReveal>
        <ScrollReveal delay={50}><HexaPerformanceSection /></ScrollReveal>
        <ScrollReveal><DeploymentSection /></ScrollReveal>
        <ScrollReveal><FeaturesSection /></ScrollReveal>
        <MidPageCTA variant="secondary" country={country} />
        <ScrollReveal><ChannelsSection /></ScrollReveal>
        <ScrollReveal><SecuritySection /></ScrollReveal>
        <ScrollReveal><ClientsSection /></ScrollReveal>
        <ScrollReveal><TestimonialsSection /></ScrollReveal>
        <SeoContentSection
          eyebrow={`${country} SEO`}
          title={`Why businesses in ${country} compare cloud contact center software carefully`}
          description={`This page targets high-intent regional searches such as contact center software ${country}, cloud call center ${country}, omnichannel customer service software ${country}, and AI-powered call center platform ${country}. The copy is written to support those searches naturally instead of repeating keywords mechanically.`}
          sections={[
            {
              title: `Cloud contact center software in ${country}`,
              body: `Businesses in ${country} increasingly want faster deployment, simpler scaling, and centralized reporting. A cloud contact center platform makes it easier to manage distributed teams, inbound service, outbound workflows, and customer data in one place.`,
            },
            {
              title: `Omnichannel support for ${country} teams`,
              body: `Modern support teams in ${country} need voice, WhatsApp, email, and SMS to work together. Omnichannel customer service software reduces context switching and helps agents keep conversations consistent across every touchpoint.`,
            },
            {
              title: "AI automation and analytics",
              body: `AI voice automation, IVR, workflow rules, dashboards, and routing logic help companies in ${country} reduce missed opportunities, improve service quality, and make customer support operations more measurable.`,
            },
          ]}
          links={[
            { href: "/contact", label: "Book a Demo" },
            { href: "/analysis", label: "Run an AI Contact Center Audit" },
            { href: "/blog", label: "Read Contact Center Insights" },
            ...(countryKey.includes("singapore")
              ? [{ href: "/", label: "Explore the Main Platform" }]
              : []),
          ]}
        />
        <FaqSection
          title={`Frequently asked questions about contact center software in ${country}`}
          intro={`These FAQs expand the page around commercial-intent searches related to call center software, cloud contact center platforms, and omnichannel support in ${country}.`}
          items={localizedFaqs}
        />
        <ContactFormNext />
        <LocalizedCTASection country={country} />
        <FooterNext />
        <ExitIntentPopupNext />
      </Suspense>
    </main>
  );
};

export default LocalizedLandingPageNext;
