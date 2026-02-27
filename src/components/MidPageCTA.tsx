import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import { trackDemoClick } from "@/lib/gtag";
interface MidPageCTAProps {
  variant?: "primary" | "secondary";
  country?: string;
}
const MidPageCTA = ({
  variant = "primary",
  country
}: MidPageCTAProps) => {
  const {
    t
  } = useTranslation();
  const scrollToForm = () => {
    trackDemoClick("Mid Page CTA");
    document.getElementById("contact-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  const getPhone = () => {
    switch (country) {
      case "UAE & Dubai":
        return "+971-508293464";
      case "Singapore":
        return "+65-83765007";
      case "Malaysia":
        return "+60-1548525268";
      default:
        return "+65-83765007";
    }
  };
  if (variant === "secondary") {
    return <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("cta.title")}
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToForm} variant="hero" size="lg">
                <Calendar className="w-5 h-5" />
                {t("cta.scheduleDemo")}
              </Button>
              <Button onClick={() => window.open(`tel:${getPhone()}`)} variant="outline" size="lg">
                <Phone className="w-5 h-5" />
                {t("cta.callUs")}
              </Button>
            </div>
          </div>
        </div>
      </section>;
  }
  return <section className="py-16 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">Start Your Free Trial Today</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-primary-foreground/90">
                  <CheckCircle className="w-5 h-5" />
                  <span>No credit card required</span>
                </li>
                <li className="flex items-center gap-2 text-primary-foreground/90">
                  <CheckCircle className="w-5 h-5" />
                  <span>Full access to all features</span>
                </li>
                <li className="flex items-center gap-2 text-primary-foreground/90">
                  <CheckCircle className="w-5 h-5" />
                  <span>Dedicated onboarding support</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
              <Button onClick={scrollToForm} size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Get Free Demo
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button onClick={() => window.open(`tel:${getPhone()}`)} size="xl" variant="heroOutline">
                <Phone className="w-5 h-5" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default MidPageCTA;