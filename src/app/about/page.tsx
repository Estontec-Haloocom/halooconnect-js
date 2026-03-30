import type { Metadata } from "next";
import AboutPageNext from "@/next/pages/AboutPageNext";
import JsonLd from "@/next/components/JsonLd";
import {
  buildMetadata,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

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
      <JsonLd data={aboutSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <AboutPageNext />
    </>
  );
}
