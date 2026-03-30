import type { Metadata } from "next";
import HomePageNext from "@/next/pages/HomePageNext";
import JsonLd from "@/next/components/JsonLd";
import {
  buildMetadata,
  createBreadcrumbSchema,
  createServiceSchema,
  createWebPageSchema,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "AI Contact Center Software | Cloud Call Center Platform",
  description:
    "AI-powered cloud contact center software for omnichannel voice, WhatsApp, email, SMS, IVR, predictive dialer, analytics, and multilingual AI voice bots.",
  path: "",
  keywords: [
    "AI contact center software",
    "cloud call center platform",
    "omnichannel customer service software",
    "predictive dialer software",
    "call center CRM integration",
    "WhatsApp Business API software",
    "multilingual AI voice bot",
  ],
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is AI contact center software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI contact center software combines cloud calling, IVR, omnichannel routing, analytics, and automation tools such as AI voice bots to help customer service teams handle conversations faster and more consistently.",
      },
    },
    {
      "@type": "Question",
      name: "Does Haloo Connect support WhatsApp, voice, email, and SMS in one platform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Haloo Connect is designed as an omnichannel contact center platform, so teams can manage voice calls, WhatsApp conversations, email, SMS, and related workflows from one system.",
      },
    },
    {
      "@type": "Question",
      name: "Is this cloud call center software suitable for enterprise teams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The platform is built for growing and enterprise customer support teams that need routing logic, analytics, agent performance visibility, CRM integrations, and scalable cloud deployment.",
      },
    },
    {
      "@type": "Question",
      name: "Can Haloo Connect help with outbound calling and predictive dialer workflows?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Teams can use dialer workflows, automation, and reporting to improve outbound productivity while keeping customer interactions aligned with operational goals.",
      },
    },
  ],
};

export default function Home() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "" },
  ]);
  const webPageSchema = createWebPageSchema({
    title: "AI Contact Center Software | Cloud Call Center Platform",
    description:
      "AI-powered cloud contact center software for omnichannel voice, WhatsApp, email, SMS, IVR, predictive dialer, analytics, and multilingual AI voice bots.",
    path: "",
    about: [
      "AI contact center software",
      "cloud call center software",
      "omnichannel customer service platform",
    ],
  });
  const serviceSchema = createServiceSchema({
    name: "AI Contact Center Software",
    description:
      "Cloud contact center software with omnichannel routing, IVR, predictive dialer, analytics, and AI voice automation.",
    path: "",
    serviceType: "Cloud contact center software",
    areaServed: ["Singapore", "United Arab Emirates", "Malaysia", "Philippines", "India"],
  });

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={serviceSchema} />
      <HomePageNext />
    </>
  );
}
