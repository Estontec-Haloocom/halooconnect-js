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
  "Cloud call center software in Malaysia for omnichannel support, predictive dialer workflows, IVR, WhatsApp engagement, analytics, and AI voice automation.";

export const metadata: Metadata = buildMetadata({
  title: "Call Center Software Malaysia | Cloud Contact Center Platform",
  description,
  path: "/malaysia",
  keywords: [
    "call center software Malaysia",
    "cloud call center Malaysia",
    "contact center software Kuala Lumpur",
    "omnichannel contact center Malaysia",
    "predictive dialer Malaysia",
  ],
});

export default function MalaysiaPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Malaysia", path: "/malaysia" },
  ]);
  const webPageSchema = createWebPageSchema({
    title: "Call Center Software Malaysia | Cloud Contact Center Platform",
    description,
    path: "/malaysia",
    about: ["call center software Malaysia", "cloud contact center Malaysia"],
  });
  const serviceSchema = createServiceSchema({
    name: "Call Center Software Malaysia",
    description,
    path: "/malaysia",
    serviceType: "Cloud call center software",
    areaServed: ["Kuala Lumpur", "Selangor", "Johor", "Malaysia"],
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={serviceSchema} />
      <LocalizedLandingPageNext
        country="Malaysia"
        countryCode="+60"
        headline="Leading Call Center Solution in"
      />
    </>
  );
}
