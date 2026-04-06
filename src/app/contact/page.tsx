import type { Metadata } from "next";
import ContactPageNext from "@/next/pages/ContactPageNext";
import JsonLd from "@/next/components/JsonLd";
import {
  buildMetadata,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Haloo Connect | Book a Contact Center Software Demo",
  description:
    "Talk to Haloo Connect about AI contact center software, cloud call center migration, WhatsApp automation, IVR, predictive dialer, and omnichannel customer support.",
  path: "/contact",
  keywords: [
    "contact center software demo",
    "book call center software demo",
    "AI contact center consultation",
    "cloud call center pricing",
  ],
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I book a Haloo Connect demo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Submit the contact form with your requirements and the team will follow up to schedule a tailored product demo.",
      },
    },
    {
      "@type": "Question",
      name: "Can we discuss regional rollout plans during the consultation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The consultation can cover rollout planning across Singapore, UAE, Malaysia, Philippines, and India along with channel and integration priorities.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide AI readiness guidance before implementation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Teams can review workflow bottlenecks and automation opportunities before committing to broader deployment phases.",
      },
    },
  ],
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "Organization",
    name: "Haloo Connect",
    email: "enquiry@haloocom.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+65-83765007",
        contactType: "sales",
        areaServed: "SG",
      },
      {
        "@type": "ContactPoint",
        telephone: "+971-508293464",
        contactType: "sales",
        areaServed: "AE",
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-9513391279",
        contactType: "customer support",
        areaServed: "IN",
      },
    ],
  },
};

export default function ContactPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Contact", path: "/contact" },
  ]);
  const webPageSchema = createWebPageSchema({
    title: "Contact Haloo Connect | Book a Contact Center Software Demo",
    description:
      "Talk to Haloo Connect about AI contact center software, cloud call center migration, WhatsApp automation, IVR, predictive dialer, and omnichannel customer support.",
    path: "/contact",
    about: ["contact center software demo", "cloud call center consultation"],
  });

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={contactSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <ContactPageNext />
    </>
  );
}
