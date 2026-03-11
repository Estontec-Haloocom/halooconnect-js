import { lazy, Suspense, useState, useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import TrustBanner from "@/components/TrustBanner";
import ScrollReveal from "@/components/ScrollReveal";

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


const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));

// Simple loading placeholder
const SectionLoader = () => <div className="min-h-[200px]" />;

const Index = () => {
  const [showPopupForm, setShowPopupForm] = useState(false);

  const handleFormClick = useCallback(() => {
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
        title="Best AI Call Center Software 2025 | Cloud Contact Center Solution | Haloo Connect"
        description="Top-rated AI-powered cloud contact center software. Predictive dialer, IVR, WhatsApp Business API, CRM integration, AI voice bot in 120+ languages. Free demo. Trusted by 500+ enterprises."
        keywords="best call center software, AI contact center, cloud call center software, predictive dialer, IVR software, omnichannel contact center, WhatsApp Business API, AI voice bot, call center CRM, automatic call distribution, workforce management, quality monitoring software, outbound dialer, inbound call center software, customer service platform, call center analytics, speech analytics, sentiment analysis software"
        canonical="https://halooconnect.com"
        schema={faqSchema}
      />
      <main className="min-h-screen pb-16 sm:pb-0">
        <Header />
        <HeroSection />
        <TrustBanner />
        <Suspense fallback={<SectionLoader />}>
          <ScrollReveal><OutcomesSection /></ScrollReveal>
          <ScrollReveal delay={50}><TopFeaturesSection /></ScrollReveal>
          <MidPageCTA variant="secondary" />
          <ScrollReveal><SentimentSection /></ScrollReveal>
          <ScrollReveal delay={50}><HexaAISection /></ScrollReveal>
          <MidPageCTA variant="primary" />
          <ScrollReveal><BusinessIntelligenceSection /></ScrollReveal>
          <ScrollReveal delay={50}><HexaPerformanceSection /></ScrollReveal>
          <ScrollReveal><DeploymentSection /></ScrollReveal>
          <ScrollReveal><ChannelsSection /></ScrollReveal>
          <MidPageCTA variant="secondary" />
          <ScrollReveal><SecuritySection /></ScrollReveal>
          <ScrollReveal><ClientsSection /></ScrollReveal>
          <ScrollReveal><TestimonialsSection /></ScrollReveal>
          <div id="contact-form">
            <ScrollReveal><ContactForm /></ScrollReveal>
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
