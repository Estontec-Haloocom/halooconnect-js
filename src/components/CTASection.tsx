import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Zap, Phone, Calendar } from "lucide-react";
import { trackDemoClick } from "@/lib/gtag";
const CTASection = () => {
  const {
    t
  } = useTranslation();
  const scrollToForm = () => {
    trackDemoClick("CTA Section");
    document.getElementById("contact-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="py-20 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      
      {/* Animated dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-primary-foreground/30 rounded-full animate-pulse" />
        <div className="absolute top-20 right-20 w-3 h-3 bg-primary-foreground/20 rounded-full animate-pulse animation-delay-200" />
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-primary-foreground/30 rounded-full animate-pulse animation-delay-400" />
        <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-primary-foreground/25 rounded-full animate-pulse animation-delay-600" />
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
            <Zap className="w-4 h-4 text-primary-foreground" />
            <span className="text-primary-foreground text-sm font-medium">{t("cta.limitedOffer")}</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            {t("cta.title")}
          </h2>
          
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            {t("cta.subtitle")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button onClick={scrollToForm} size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-elevated">
              <Calendar className="w-5 h-5" />
              {t("cta.scheduleDemo")}
            </Button>
            <Button onClick={() => window.open('tel:+919876543210')} size="xl" variant="heroOutline">
              <Phone className="w-5 h-5" />
              {t("cta.callUs")}
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-primary-foreground/60 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t("cta.noCreditCard")}
            </span>
            
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t("cta.cancelAnytime")}
            </span>
          </div>
        </div>
      </div>
    </section>;
};
export default CTASection;