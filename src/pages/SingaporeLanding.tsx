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
import { Helmet } from "react-helmet-async";

const singaporeContent = {
  country: "Singapore",
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
  return (
    <>
      <Helmet>
        <title>Best Contact Center Software Singapore | Cloud Call Center Solution</title>
        <meta
          name="description"
          content="Enterprise cloud contact center software in Singapore. PDPA compliant with AI automation, multilingual support, and omnichannel customer engagement platform."
        />
        <meta
          name="keywords"
          content="contact center software Singapore, call center Singapore, cloud contact center Singapore, customer service platform Singapore, AI call center Singapore, PDPA compliant, omnichannel Singapore, cloud telephony Singapore, IVR solutions Singapore, enterprise call center"
        />
      </Helmet>
      <main className="min-h-screen">
        <Header />
        <LocalizedHeroSection {...singaporeContent} />
        <LocalizedOutcomesSection country="Singapore" />
        <LocalizedTopFeaturesSection country="Singapore" />
        <SentimentSection />
        <HexaAISection />
        <BusinessIntelligenceSection />
        <HexaPerformanceSection />
        <DeploymentSection />
        <FeaturesSection />
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
