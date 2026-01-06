import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  schema?: object;
  noindex?: boolean;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords,
  canonical,
  ogImage = "https://halooconnect.com/og-image.png",
  schema,
  noindex = false
}: SEOHeadProps) => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Haloocom",
    "alternateName": "Haloo Connect",
    "url": "https://halooconnect.com",
    "logo": "https://halooconnect.com/favicon.ico",
    "description": "AI-powered contact center software solutions",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SG"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+65-83765007",
        "contactType": "sales",
        "areaServed": "SG",
        "availableLanguage": ["English", "Mandarin", "Malay"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+971-508293464",
        "contactType": "sales",
        "areaServed": "AE",
        "availableLanguage": ["English", "Arabic"]
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/haloocom",
      "https://twitter.com/haloocom"
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Connect 6.0",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "description": description,
    "featureList": [
      "AI-powered voice bot",
      "Omnichannel support",
      "WhatsApp Business API",
      "Predictive dialing",
      "Real-time sentiment analysis",
      "CRM integration"
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name" content="Haloo Connect" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(softwareSchema)}
      </script>
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
