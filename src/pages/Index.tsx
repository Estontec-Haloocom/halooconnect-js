import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
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

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <OutcomesSection />
      <TopFeaturesSection />
      <SentimentSection />
      <HexaAISection />
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
  );
};

export default Index;