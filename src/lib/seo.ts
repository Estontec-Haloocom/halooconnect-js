import type { Metadata } from "next";

export const SITE_NAME = "Haloo Connect";
export const SITE_URL = "https://connect.haloocom.com";
const DEFAULT_OG_ALT = "Haloo Connect AI Contact Center Platform";
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
  const ogImages = images.map((image) => ({
    url: image,
    width: 1200,
    height: 630,
    alt: DEFAULT_OG_ALT,
  }));

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
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((image) => image.url),
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
  description: DEFAULT_DESCRIPTION,
  inLanguage: "en",
  about: [
    "AI contact center software",
    "cloud call center platform",
    "omnichannel customer communication",
    "enterprise customer service automation",
  ],
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?query={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "Haloo Connect AI Contact Center Platform",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  serviceArea: ["Singapore", "United Arab Emirates", "Malaysia", "Philippines", "India"],
  featureList: [
    "Omnichannel support for voice, WhatsApp, email, and SMS",
    "AI voice automation and multilingual bot workflows",
    "Predictive dialer and IVR orchestration",
    "Real-time analytics and supervisor dashboards",
    "CRM and business system integrations",
  ],
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/contact`,
    availability: "https://schema.org/InStock",
    description: "Pricing is tailored to deployment requirements. Contact sales for a quote.",
  },
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

export function createRegionalServiceSchema(input: {
  name: string;
  description: string;
  path: string;
  country: string;
  cities: string[];
  serviceType: string;
  availableLanguage: string[];
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${input.path}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    url: `${SITE_URL}${input.path}`,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: [
      {
        "@type": "Country",
        name: input.country,
      },
      ...input.cities.map((city) => ({
        "@type": "City",
        name: city,
      })),
    ],
    availableChannel: ["Phone", "Email", "Web", "WhatsApp"],
    availableLanguage: input.availableLanguage,
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Customer support, sales, and operations teams",
    },
    keywords: input.keywords.join(", "),
  };
}
