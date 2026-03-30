import type { Metadata } from "next";
import LocalizedLandingPageNext from "@/next/pages/LocalizedLandingPageNext";
import JsonLd from "@/next/components/JsonLd";
import {
  buildMetadata,
  createBreadcrumbSchema,
  createServiceSchema,
  createWebPageSchema,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

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
  const serviceSchema = createServiceSchema({
    name: "Call Center Software Dubai & UAE",
    description,
    path: "/uae",
    serviceType: "Cloud contact center software",
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "United Arab Emirates"],
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={serviceSchema} />
      <LocalizedLandingPageNext
        country="UAE & Dubai"
        countryCode="+971"
        headline="Best Call Center Software in"
      />
    </>
  );
}
