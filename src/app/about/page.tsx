import type { Metadata } from "next";
import AboutPageNext from "@/next/pages/AboutPageNext";
import JsonLd from "@/next/components/JsonLd";
import {
  buildMetadata,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Haloo Connect | AI Contact Center Software Company",
  description:
    "Learn about Haloo Connect, the team behind AI-powered cloud contact center software for enterprise voice, WhatsApp, email, and customer service automation.",
  path: "/about",
  keywords: [
    "about Haloo Connect",
    "contact center software company",
    "AI customer service company",
    "cloud call center provider",
  ],
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Haloo Connect specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Haloo Connect specializes in AI-powered cloud contact center software for voice and digital customer communication operations.",
      },
    },
    {
      "@type": "Question",
      name: "Which markets does Haloo Connect serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Haloo Connect supports enterprise and growth teams across Singapore, UAE, Malaysia, Philippines, India, and related regional operations.",
      },
    },
  ],
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  mainEntity: {
    "@type": "Organization",
    name: "Haloo Connect",
    description: "AI-powered cloud contact center software provider",
    foundingDate: "2015",
    numberOfEmployees: "100-500",
    areaServed: ["Singapore", "United Arab Emirates", "India", "Malaysia", "Philippines"],
  },
};

export default function AboutPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "" },
    { name: "About", path: "/about" },
  ]);
  const webPageSchema = createWebPageSchema({
    title: "About Haloo Connect | AI Contact Center Software Company",
    description:
      "Learn about Haloo Connect, the team behind AI-powered cloud contact center software for enterprise voice, WhatsApp, email, and customer service automation.",
    path: "/about",
    about: ["contact center software company", "AI customer support automation"],
  });

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={aboutSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <AboutPageNext />
    </>
  );
}
