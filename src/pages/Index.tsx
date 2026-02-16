import { lazy, Suspense, useState, useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import TrustBanner from "@/components/TrustBanner";

// Lazy load below-fold sections for better FCP/LCP
const OutcomesSection = lazy(() => import("@/components/OutcomesSection"));
const TopFeaturesSection = lazy(() => import("@/components/TopFeaturesSection"));
const MidPageCTA = lazy(() => import("@/components/MidPageCTA"));
const SentimentSection = lazy(() => import("@/components/SentimentSection"));
const HexaAISection = lazy(() => import("@/components/HexaAISection"));
const BusinessIntelligenceSection = lazy(() => import("@/components/BusinessIntelligenceSection"));
const HexaPerformanceSection = lazy(() => import("@/components/HexaPerformanceSection"));
const DeploymentSection = lazy(() => import("@/components/DeploymentSection"));
const ChannelsSection = lazy(() => import("@/components/ChannelsSection"));
const SecuritySection = lazy(() => import("@/components/SecuritySection"));
const ClientsSection = lazy(() => import("@/components/ClientsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactForm = lazy(() => import("@/components/ContactForm"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));
const FloatingCTA = lazy(() => import("@/components/FloatingCTA"));

const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));

// Simple loading placeholder
const SectionLoader = () => <div className="min-h-[200px]" />;

const Index = () => {
  const [showPopupForm, setShowPopupForm] = useState(false);

  const handleFormClick = useCallback(() => {
    // Scroll to contact form section
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

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
      <main className="min-h-screen pb-16 sm:pb-0">
        <Header />
        <HeroSection />
        <TrustBanner />
        <Suspense fallback={<SectionLoader />}>
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
          <div id="contact-form">
            <ContactForm />
          </div>
          <CTASection />
          <Footer />
          <FloatingCTA />
          
          <ExitIntentPopup />
        </Suspense>
        <StickyMobileCTA onFormClick={handleFormClick} />
      </main>
    </>
  );
};

export default Index;
