import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

const CTASection = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
            <Zap className="w-4 h-4 text-primary-foreground" />
            <span className="text-primary-foreground text-sm font-medium">Limited Time Offer</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Start Your Free Trial Today
          </h2>
          
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Get 14 days free access to Connect 6.0. No credit card required. Setup in under 30 minutes.
          </p>
          
          <Button 
            onClick={scrollToForm}
            size="xl" 
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-elevated"
          >
            Claim Your Free Demo
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
