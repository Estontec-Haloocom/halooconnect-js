import Header from "@/components/Header";
import LocalizedHeroSection from "@/components/LocalizedHeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ChannelsSection from "@/components/ChannelsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import SecuritySection from "@/components/SecuritySection";
import ClientsSection from "@/components/ClientsSection";
import SentimentSection from "@/components/SentimentSection";
import HexaAISection from "@/components/HexaAISection";
import BusinessIntelligenceSection from "@/components/BusinessIntelligenceSection";
import HexaPerformanceSection from "@/components/HexaPerformanceSection";
import DeploymentSection from "@/components/DeploymentSection";
import LocalizedOutcomesSection from "@/components/LocalizedOutcomesSection";
import LocalizedTopFeaturesSection from "@/components/LocalizedTopFeaturesSection";
import LocalizedCTASection from "@/components/LocalizedCTASection";
import MidPageCTA from "@/components/MidPageCTA";
import SEOHead from "@/components/SEOHead";

const singaporeContent = {
  country: "Singapore",
  countryCode: "+65",
  headline: "Enterprise Contact Center Software in",
  subheadline:
    "Singapore's trusted cloud contact center platform. PDPA compliant with AI-powered automation, multilingual support in English, Mandarin, Malay & Tamil.",
  benefits: [
    "PDPA Compliant Platform",
    "Multilingual AI Voice Bot",
    "Singapore Data Center",
    "IMDA Certified Solution",
  ],
  stats: {
    users: "100K+",
    clients: "500+",
    calls: "30MN+",
    countries: "5+",
  },
};

const SingaporeLanding = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Haloo Connect Singapore",
    "description": "Leading AI-powered contact center software provider in Singapore",
    "url": "https://halooconnect.com/singapore",
    "telephone": "+65-83765007",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Singapore",
      "addressCountry": "SG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 1.3521,
      "longitude": 103.8198
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "$$",
    "areaServed": ["Singapore"]
  };

  return (
    <>
      <SEOHead 
        title="Best Contact Center Software Singapore 2025 | Cloud Call Center Solution"
        description="#1 enterprise contact center software in Singapore. PDPA compliant, AI-powered with multilingual voice bot (English, Mandarin, Malay). Free demo + 14-day trial."
        keywords="contact center software Singapore, call center Singapore, cloud contact center Singapore, customer service platform Singapore, AI call center Singapore, PDPA compliant, omnichannel Singapore, cloud telephony Singapore, IVR solutions Singapore, enterprise call center Singapore, best call center software 2025"
        canonical="https://halooconnect.com/singapore"
        schema={localBusinessSchema}
      />
      <main className="min-h-screen">
        <Header />
        <LocalizedHeroSection {...singaporeContent} />
        <LocalizedOutcomesSection country="Singapore" />
        <LocalizedTopFeaturesSection country="Singapore" />
        <MidPageCTA variant="secondary" country="Singapore" />
        <SentimentSection />
        <HexaAISection />
        <MidPageCTA variant="primary" country="Singapore" />
        <BusinessIntelligenceSection />
        <HexaPerformanceSection />
        <DeploymentSection />
        <FeaturesSection />
        <MidPageCTA variant="secondary" country="Singapore" />
        <ChannelsSection />
        <SecuritySection />
        <ClientsSection />
        <TestimonialsSection />
        <ContactForm />
        <LocalizedCTASection country="Singapore" />
        <Footer />
        <FloatingCTA />
      </main>
    </>
  );
};

export default SingaporeLanding;
