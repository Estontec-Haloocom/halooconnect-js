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

const uaeContent = {
  country: "UAE & Dubai",
  headline: "Best Call Center Software in",
  subheadline:
    "Leading Cloud Contact Center Solution in Dubai & UAE. Trusted by 500+ enterprises for AI-powered customer engagement, omnichannel support, and Arabic language capabilities.",
  benefits: [
    "Arabic & English AI Voice Bot",
    "WhatsApp Business API Integration",
    "Dubai DED Compliant Platform",
    "24/7 Local Support in UAE",
  ],
  stats: {
    users: "100K+",
    clients: "500+",
    calls: "30MN+",
    countries: "5+",
  },
};

const UAELanding = () => {
  return (
    <>
      <Helmet>
        <title>Best Call Center Software in Dubai & UAE | Cloud Contact Center Solution</title>
        <meta
          name="description"
          content="Leading cloud call center software in UAE & Dubai. AI-powered contact center with WhatsApp integration, Arabic voice bot, and omnichannel customer support platform."
        />
        <meta
          name="keywords"
          content="call center software UAE, contact center Dubai, cloud call center UAE, customer service software Dubai, AI call center UAE, WhatsApp business API UAE, Arabic voice bot, omnichannel contact center UAE, cloud telephony Dubai, IVR solutions UAE"
        />
      </Helmet>
      <main className="min-h-screen">
        <Header />
        <LocalizedHeroSection {...uaeContent} />
        <LocalizedOutcomesSection country="UAE & Dubai" />
        <LocalizedTopFeaturesSection country="UAE & Dubai" />
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
        <LocalizedCTASection country="UAE & Dubai" />
        <Footer />
        <FloatingCTA />
      </main>
    </>
  );
};

export default UAELanding;
