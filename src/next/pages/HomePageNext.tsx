"use client";

import { lazy, Suspense } from "react";
import HeaderNext from "@/next/components/HeaderNext";
import HeroSectionNext from "@/next/components/HeroSectionNext";
import TrustBanner from "@/components/TrustBanner";
import ScrollReveal from "@/components/ScrollReveal";
import ContactFormNext from "@/next/components/ContactFormNext";
import FooterNext from "@/next/components/FooterNext";
import ExitIntentPopupNext from "@/next/components/ExitIntentPopupNext";
import SeoContentSection from "@/next/components/SeoContentSection";
import FaqSection from "@/next/components/FaqSection";

const OutcomesSection = lazy(() => import("@/components/OutcomesSection"));
const TopFeaturesSection = lazy(() => import("@/components/TopFeaturesSection"));
const MidPageCTA = lazy(() => import("@/components/MidPageCTA"));
const SentimentSection = lazy(() => import("@/components/SentimentSection"));
const HexaAISection = lazy(() => import("@/components/HexaAISection"));
const BusinessIntelligenceSection = lazy(() => import("@/components/BusinessIntelligenceSection"));
const HexaPerformanceSection = lazy(() => import("@/components/HexaPerformanceSection"));
const DeploymentSection = lazy(() => import("@/components/DeploymentSection"));
const ChannelsSection = lazy(() => import("@/components/ChannelsSection"));
const SecuritySection = lazy(() => import("@/components/SecuritySection"));
const ClientsSection = lazy(() => import("@/components/ClientsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const CTASection = lazy(() => import("@/components/CTASection"));

const SectionLoader = () => <div className="min-h-[200px]" />;

const homeFaqs = [
  {
    question: "What is AI contact center software?",
    answer:
      "AI contact center software combines cloud calling, IVR, omnichannel routing, analytics, and automation tools such as AI voice bots to help customer service teams handle conversations faster and more consistently.",
  },
  {
    question: "Does Haloo Connect support WhatsApp, voice, email, and SMS in one platform?",
    answer:
      "Yes. Haloo Connect is designed as an omnichannel contact center platform, so teams can manage voice calls, WhatsApp conversations, email, SMS, and related workflows from one system.",
  },
  {
    question: "Is this cloud call center software suitable for enterprise teams?",
    answer:
      "Yes. The platform is built for growing and enterprise customer support teams that need routing logic, analytics, agent performance visibility, CRM integrations, and scalable cloud deployment.",
  },
  {
    question: "Can Haloo Connect help with outbound calling and predictive dialer workflows?",
    answer:
      "Yes. Teams can use dialer workflows, automation, and reporting to improve outbound productivity while keeping customer interactions aligned with operational goals.",
  },
];

export default function HomePageNext() {
  return (
    <main className="min-h-screen">
      <HeaderNext />
      <HeroSectionNext />
      <TrustBanner />
      <Suspense fallback={<SectionLoader />}>
        <ScrollReveal><OutcomesSection /></ScrollReveal>
        <ScrollReveal delay={50}><TopFeaturesSection /></ScrollReveal>
        <MidPageCTA variant="secondary" />
        <ScrollReveal><SentimentSection /></ScrollReveal>
        <ScrollReveal delay={50}><HexaAISection /></ScrollReveal>
        <MidPageCTA variant="primary" />
        <ScrollReveal><BusinessIntelligenceSection /></ScrollReveal>
        <ScrollReveal delay={50}><HexaPerformanceSection /></ScrollReveal>
        <ScrollReveal><DeploymentSection /></ScrollReveal>
        <ScrollReveal><ChannelsSection /></ScrollReveal>
        <MidPageCTA variant="secondary" />
        <ScrollReveal><SecuritySection /></ScrollReveal>
        <ScrollReveal><ClientsSection /></ScrollReveal>
        <ScrollReveal><TestimonialsSection /></ScrollReveal>
        <SeoContentSection
          eyebrow="Platform SEO"
          title="Cloud contact center software built for modern customer conversations"
          description="Haloo Connect is positioned around the search terms enterprise buyers actually use when they compare AI contact center software, cloud call center platforms, omnichannel customer service software, predictive dialer tools, IVR systems, and WhatsApp Business API solutions."
          sections={[
            {
              title: "AI Contact Center Software",
              body: "Use one platform for inbound and outbound voice, agent workflows, conversational AI, performance monitoring, and customer engagement automation without stitching together separate tools for each channel.",
            },
            {
              title: "Cloud Call Center Platform",
              body: "Move from on-premise complexity to a cloud call center stack with faster deployment, remote-team flexibility, scalable routing, analytics, and easier CRM integration across sales and support operations.",
            },
            {
              title: "Omnichannel Customer Service",
              body: "Support customers on voice, WhatsApp, email, and SMS while keeping context unified. That helps teams reduce missed conversations, improve response times, and deliver more consistent service quality.",
            },
          ]}
          links={[
            { href: "/singapore", label: "Contact Center Software Singapore" },
            { href: "/uae", label: "Call Center Software UAE" },
            { href: "/malaysia", label: "Call Center Software Malaysia" },
            { href: "/philippines", label: "Call Center Software Philippines" },
            { href: "/analysis", label: "AI Contact Center Audit Tool" },
            { href: "/blog", label: "Contact Center Blog" },
          ]}
        />
        <FaqSection
          title="Frequently asked questions about AI call center software"
          intro="These answers support the same high-intent commercial topics that buyers search before booking demos or shortlisting contact center platforms."
          items={homeFaqs}
        />
        <ScrollReveal><ContactFormNext /></ScrollReveal>
        <CTASection />
        <FooterNext />
        <ExitIntentPopupNext />
      </Suspense>
    </main>
  );
}
