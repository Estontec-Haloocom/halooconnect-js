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

const malaysiaContent = {
  country: "Malaysia",
  countryCode: "+60",
  headline: "Leading Call Center Solution in",
  subheadline:
    "Malaysia's premier cloud contact center software. PDPA Malaysia compliant with Bahasa Melayu, English & Mandarin AI voice support for seamless customer engagement.",
  benefits: [
    "Bahasa Melayu AI Voice Bot",
    "PDPA Malaysia Compliant",
    "Local Data Hosting Available",
    "24/7 Support in KL Timezone",
  ],
  stats: {
    users: "100K+",
    clients: "500+",
    calls: "30MN+",
    countries: "5+",
  },
};

const MalaysiaLanding = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Haloo Connect Malaysia",
    "description": "Top cloud call center software in Malaysia. PDPA compliant contact center with Bahasa Melayu voice bot.",
    "url": "https://halooconnect.com/malaysia",
    "telephone": "+60-123456789",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kuala Lumpur",
      "addressCountry": "MY"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Malaysia"
    },
    "priceRange": "$$"
  };

  return (
    <>
      <SEOHead 
        title="Best Call Center Software Malaysia 2025 | Cloud Contact Center Kuala Lumpur"
        description="Top cloud call center software in Malaysia. PDPA compliant contact center with Bahasa Melayu voice bot, omnichannel support, and AI-powered customer engagement. Free demo."
        keywords="call center software Malaysia, contact center Kuala Lumpur, cloud call center Malaysia, customer service software Malaysia, AI call center Malaysia, PDPA compliant Malaysia, Bahasa Melayu voice bot, omnichannel Malaysia, cloud telephony Malaysia, IVR solutions KL, best call center software 2025"
        canonical="https://halooconnect.com/malaysia"
        schema={localBusinessSchema}
      />
      <main className="min-h-screen">
        <Header />
        <LocalizedHeroSection {...malaysiaContent} />
        <Suspense fallback={<SectionLoader />}>
          <LocalizedOutcomesSection country="Malaysia" />
          <LocalizedTopFeaturesSection country="Malaysia" />
          <MidPageCTA variant="secondary" country="Malaysia" />
          <SentimentSection />
          <HexaAISection />
          <MidPageCTA variant="primary" country="Malaysia" />
          <BusinessIntelligenceSection />
          <HexaPerformanceSection />
          <DeploymentSection />
          <FeaturesSection />
          <MidPageCTA variant="secondary" country="Malaysia" />
          <ChannelsSection />
          <SecuritySection />
          <ClientsSection />
          <TestimonialsSection />
          <ContactForm />
          <LocalizedCTASection country="Malaysia" />
          <Footer />
          <FloatingCTA />
          <ExitIntentPopup />
        </Suspense>
      </main>
    </>
  );
};

export default MalaysiaLanding;
