import type { Metadata } from "next";

export const SITE_NAME = "Haloo Connect";
export const SITE_URL = "https://halooconnect.com";
export const DEFAULT_DESCRIPTION =
  "AI-powered cloud contact center software with omnichannel support, WhatsApp Business API, IVR, predictive dialer, analytics, and AI voice automation.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;

const DEFAULT_KEYWORDS = [
  "AI contact center software",
  "cloud call center software",
  "contact center platform",
  "omnichannel contact center",
  "WhatsApp Business API",
  "predictive dialer software",
  "IVR software",
  "AI voice bot",
  "customer service automation",
];

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
  images?: string[];
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  noIndex = false,
  images = [DEFAULT_OG_IMAGE],
}: BuildMetadataInput): Metadata {
  const canonical = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    alternates: {
      canonical,
    },
    category: "technology",
    openGraph: {
      type,
      url: canonical,
      title,
      description,
      siteName: SITE_NAME,
      locale: "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
        }
      : {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: "Haloocom Technologies",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  email: "enquiry@haloocom.com",
  sameAs: [
    "https://www.facebook.com/haloocom/",
    "https://www.instagram.com/haloocomglobal_?igsh=MmlyaTgwNHZzZ3U=",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "enquiry@haloocom.com",
      telephone: "+65-83765007",
      areaServed: ["SG", "MY", "PH"],
      availableLanguage: ["English", "Mandarin", "Malay", "Tamil"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "enquiry@haloocom.com",
      telephone: "+971-508293464",
      areaServed: ["AE"],
      availableLanguage: ["English", "Arabic"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "enquiry@haloocom.com",
      telephone: "+91-9513391279",
      areaServed: ["IN", "SG", "AE", "MY", "PH"],
      availableLanguage: ["English"],
    },
  ],
  areaServed: ["Singapore", "United Arab Emirates", "Malaysia", "Philippines", "India"],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "en",
};

export function createBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function createWebPageSchema(input: {
  title: string;
  description: string;
  path: string;
  about?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${input.path}#webpage`,
    url: `${SITE_URL}${input.path}`,
    name: input.title,
    description: input.description,
    inLanguage: "en",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: input.about,
  };
}

export function createServiceSchema(input: {
  name: string;
  description: string;
  path: string;
  areaServed: string[];
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: input.serviceType,
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: input.areaServed,
    availableChannel: ["Phone", "Email", "Web", "WhatsApp"],
  };
}
