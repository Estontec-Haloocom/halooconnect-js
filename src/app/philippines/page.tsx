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
  "BPO-friendly contact center software in the Philippines with cloud calling, omnichannel workflows, IVR, predictive dialer, analytics, WhatsApp, and AI automation.";

export const metadata: Metadata = buildMetadata({
  title: "Call Center Software Philippines | BPO Contact Center Platform",
  description,
  path: "/philippines",
  keywords: [
    "call center software Philippines",
    "BPO contact center software",
    "cloud call center Manila",
    "omnichannel contact center Philippines",
    "AI voice bot Philippines",
  ],
});

export default function PhilippinesPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Philippines", path: "/philippines" },
  ]);
  const webPageSchema = createWebPageSchema({
    title: "Call Center Software Philippines | BPO Contact Center Platform",
    description,
    path: "/philippines",
    about: ["call center software Philippines", "BPO contact center platform"],
  });
  const serviceSchema = createServiceSchema({
    name: "Call Center Software Philippines",
    description,
    path: "/philippines",
    serviceType: "BPO contact center software",
    areaServed: ["Manila", "Cebu", "Davao", "Philippines"],
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={serviceSchema} />
      <LocalizedLandingPageNext
        country="Philippines"
        countryCode="+63"
        headline="Best Contact Center Software in"
      />
    </>
  );
}
