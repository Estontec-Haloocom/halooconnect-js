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
import BusinessIntelligenceSection from "@/components/BusinessIntelligenceSection";
import HexaPerformanceSection from "@/components/HexaPerformanceSection";
import DeploymentSection from "@/components/DeploymentSection";
import MidPageCTA from "@/components/MidPageCTA";
import SEOHead from "@/components/SEOHead";
import PopupForm from "@/components/PopupForm";

const Index = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Connect 6.0?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Connect 6.0 is an AI-powered omnichannel contact center platform that unifies voice, WhatsApp, email, SMS, and social media communications for enterprises."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I set up Connect 6.0?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Connect 6.0 can be set up in under 30 minutes with our cloud deployment option. Our team provides dedicated onboarding support."
        }
      },
      {
        "@type": "Question",
        "name": "Does Connect 6.0 support multiple languages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our HEXA AI voice bot supports over 120 languages including English, Arabic, Mandarin, Malay, and Tamil."
        }
      }
    ]
  };

  return (
    <>
      <SEOHead 
        title="Haloo Connect | #1 AI-Powered Contact Center Software Dubai, UAE & Singapore"
        description="Transform customer engagement with Connect 6.0 - AI-powered omnichannel contact center. Voice, WhatsApp, Email unified. 500+ enterprises trust us. Free 14-day trial. Setup in 30 mins."
        keywords="contact center software, AI call center, omnichannel platform, cloud contact center Dubai, call center UAE, customer engagement Singapore, WhatsApp business API, predictive dialing, CRM integration, best call center software 2025"
        canonical="https://halooconnect.com"
        schema={faqSchema}
      />
      <main className="min-h-screen">
        <Header />
        <HeroSection />
        <OutcomesSection />
        <TopFeaturesSection />
        <MidPageCTA variant="secondary" />
        <SentimentSection />
        <HexaAISection />
        <MidPageCTA variant="primary" />
        <BusinessIntelligenceSection />
        <HexaPerformanceSection />
        <DeploymentSection />
        <ChannelsSection />
        <MidPageCTA variant="secondary" />
        <SecuritySection />
        <ClientsSection />
        <TestimonialsSection />
        <ContactForm />
        <CTASection />
        <Footer />
        <FloatingCTA />
        <PopupForm />
      </main>
    </>
  );
};

export default Index;
