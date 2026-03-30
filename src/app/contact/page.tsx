import type { Metadata } from "next";
import ContactPageNext from "@/next/pages/ContactPageNext";
import JsonLd from "@/next/components/JsonLd";
import {
  buildMetadata,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

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
      <JsonLd data={contactSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <ContactPageNext />
    </>
  );
}
