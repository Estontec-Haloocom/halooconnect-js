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
  "Enterprise contact center software in Singapore with omnichannel voice, WhatsApp, email, PDPA-conscious workflows, predictive dialer, IVR, and multilingual AI voice automation.";

export const metadata: Metadata = buildMetadata({
  title: "Contact Center Software Singapore | AI Cloud Call Center",
  description,
  path: "/singapore",
  keywords: [
    "contact center software Singapore",
    "cloud call center Singapore",
    "omnichannel customer support software Singapore",
    "AI voice bot Singapore",
    "PDPA contact center software",
  ],
});

export default function SingaporePage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Singapore", path: "/singapore" },
  ]);
  const webPageSchema = createWebPageSchema({
    title: "Contact Center Software Singapore | AI Cloud Call Center",
    description,
    path: "/singapore",
    about: ["contact center software Singapore", "cloud call center Singapore"],
  });
  const serviceSchema = createServiceSchema({
    name: "Contact Center Software Singapore",
    description,
    path: "/singapore",
    serviceType: "Enterprise contact center software",
    areaServed: ["Singapore"],
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={serviceSchema} />
      <LocalizedLandingPageNext
        country="Singapore"
        countryCode="+65"
        headline="Enterprise Contact Center Software in"
      />
    </>
  );
}
