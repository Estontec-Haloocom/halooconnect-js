import Header from "@/components/Header";
import LocalizedHeroSection from "@/components/LocalizedHeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ChannelsSection from "@/components/ChannelsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import OutcomesSection from "@/components/OutcomesSection";
import SecuritySection from "@/components/SecuritySection";
import ClientsSection from "@/components/ClientsSection";
import TopFeaturesSection from "@/components/TopFeaturesSection";
import SentimentSection from "@/components/SentimentSection";
import HexaAISection from "@/components/HexaAISection";
import BusinessIntelligenceSection from "@/components/BusinessIntelligenceSection";
import HexaPerformanceSection from "@/components/HexaPerformanceSection";
import DeploymentSection from "@/components/DeploymentSection";
import { Helmet } from "react-helmet-async";

const malaysiaContent = {
  country: "Malaysia",
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
  return (
    <>
      <Helmet>
        <title>Best Call Center Software Malaysia | Cloud Contact Center Kuala Lumpur</title>
        <meta
          name="description"
          content="Top cloud call center software in Malaysia. PDPA compliant contact center with Bahasa Melayu voice bot, omnichannel support, and AI-powered customer engagement."
        />
        <meta
          name="keywords"
          content="call center software Malaysia, contact center Kuala Lumpur, cloud call center Malaysia, customer service software Malaysia, AI call center Malaysia, PDPA compliant Malaysia"
        />
      </Helmet>
      <main className="min-h-screen">
        <Header />
        <LocalizedHeroSection {...malaysiaContent} />
        <OutcomesSection />
        <TopFeaturesSection />
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
        <CTASection />
        <Footer />
        <FloatingCTA />
      </main>
    </>
  );
};

export default MalaysiaLanding;
