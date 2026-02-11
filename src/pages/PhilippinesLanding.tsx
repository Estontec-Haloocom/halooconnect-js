import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import LocalizedHeroSection from "@/components/LocalizedHeroSection";
import SEOHead from "@/components/SEOHead";

const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const ChannelsSection = lazy(() => import("@/components/ChannelsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactForm = lazy(() => import("@/components/ContactForm"));
const Footer = lazy(() => import("@/components/Footer"));
const FloatingCTA = lazy(() => import("@/components/FloatingCTA"));
const SecuritySection = lazy(() => import("@/components/SecuritySection"));
const ClientsSection = lazy(() => import("@/components/ClientsSection"));
const SentimentSection = lazy(() => import("@/components/SentimentSection"));
const HexaAISection = lazy(() => import("@/components/HexaAISection"));
const BusinessIntelligenceSection = lazy(() => import("@/components/BusinessIntelligenceSection"));
const HexaPerformanceSection = lazy(() => import("@/components/HexaPerformanceSection"));
const DeploymentSection = lazy(() => import("@/components/DeploymentSection"));
const LocalizedOutcomesSection = lazy(() => import("@/components/LocalizedOutcomesSection"));
const LocalizedTopFeaturesSection = lazy(() => import("@/components/LocalizedTopFeaturesSection"));
const LocalizedCTASection = lazy(() => import("@/components/LocalizedCTASection"));
const MidPageCTA = lazy(() => import("@/components/MidPageCTA"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));

const SectionLoader = () => <div className="min-h-[200px]" />;

const philippinesContent = {
  country: "Philippines",
  countryCode: "+63",
  headline: "Best Contact Center Software in",
  subheadline:
    "The Philippines' leading cloud contact center platform. NPC compliant with AI-powered automation, multilingual support in Filipino, English & Cebuano for BPO and enterprise operations.",
  benefits: [
    "NPC & Data Privacy Act Compliant",
    "Filipino & English AI Voice Bot",
    "BPO-Ready Omnichannel Platform",
    "24/7 Local Support in Manila",
  ],
  stats: {
    users: "100K+",
    clients: "500+",
    calls: "30MN+",
    countries: "5+",
  },
};

const PhilippinesLanding = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Haloo Connect Philippines",
    "description": "Leading AI-powered contact center software provider in the Philippines for BPO and enterprise",
    "url": "https://halooconnect.com/philippines",
    "telephone": "+63-9171234567",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Manila",
      "addressRegion": "Metro Manila",
      "addressCountry": "PH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 14.5995,
      "longitude": 120.9842
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "$$",
    "areaServed": ["Manila", "Cebu", "Davao", "Philippines"]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Contact Center Software",
    "provider": {
      "@type": "Organization",
      "name": "Haloocom"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Philippines"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Contact Center Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "BPO Contact Center Platform",
            "description": "Enterprise-grade contact center solution for Philippine BPO industry"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Voice Bot",
            "description": "Filipino & English speaking AI voice assistant"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Omnichannel Platform",
            "description": "WhatsApp, Viber, voice, email, SMS integration"
          }
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Best Call Center Software Philippines 2025 | BPO Contact Center Solution Manila"
        description="#1 contact center software in the Philippines. AI-powered BPO solution with Filipino voice bot, omnichannel support, Viber & WhatsApp integration. Free demo + 14-day trial. Trusted by 500+ businesses."
        keywords="call center software Philippines, contact center Philippines, BPO software Philippines, cloud call center Manila, best call center software Philippines 2025, customer service platform Philippines, AI call center Philippines, omnichannel contact center Philippines, cloud telephony Manila, IVR solutions Philippines, CRM dialer Philippines, BPO contact center solution, call center software Cebu, call center software Davao, outbound dialer Philippines, predictive dialer Philippines, Viber business API Philippines"
        canonical="https://halooconnect.com/philippines"
        schema={localBusinessSchema}
      />
      <main className="min-h-screen">
        <Header />
        <LocalizedHeroSection {...philippinesContent} />
        <Suspense fallback={<SectionLoader />}>
          <LocalizedOutcomesSection country="Philippines" />
          <LocalizedTopFeaturesSection country="Philippines" />
          <MidPageCTA variant="secondary" country="Philippines" />
          <SentimentSection />
          <HexaAISection />
          <MidPageCTA variant="primary" country="Philippines" />
          <BusinessIntelligenceSection />
          <HexaPerformanceSection />
          <DeploymentSection />
          <FeaturesSection />
          <MidPageCTA variant="secondary" country="Philippines" />
          <ChannelsSection />
          <SecuritySection />
          <ClientsSection />
          <TestimonialsSection />
          <ContactForm />
          <LocalizedCTASection country="Philippines" />
          <Footer />
          <FloatingCTA />
          <ExitIntentPopup />
        </Suspense>
      </main>
    </>
  );
};

export default PhilippinesLanding;
