import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Bot } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient">
        <img 
          src={heroBg} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-lighten"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/90" />
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 animate-float animation-delay-200">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30">
          <Phone className="w-8 h-8 text-primary-foreground" />
        </div>
      </div>
      <div className="absolute top-1/3 right-20 animate-float animation-delay-400">
        <div className="w-14 h-14 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30">
          <MessageSquare className="w-7 h-7 text-primary-foreground" />
        </div>
      </div>
      <div className="absolute bottom-1/3 left-1/4 animate-float animation-delay-600">
        <div className="w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30">
          <Bot className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              AI-Powered Contact Center
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-in-up animation-delay-100">
            Transform Your
            <span className="block text-primary"> Customer Engagement</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Connect 6.0 - Your all-in-one omnichannel platform with AI-powered voice, WhatsApp, email, and social media integration. Trusted by 500+ businesses worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-300">
            <Button onClick={scrollToForm} variant="hero" size="lg">
              Get Free Demo
            </Button>
            <Button onClick={scrollToForm} variant="heroOutline" size="lg">
              Talk to Sales
            </Button>
          </div>
          
          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-primary-foreground/10 animate-fade-in-up animation-delay-400">
            <p className="text-primary-foreground/60 text-sm mb-4">Trusted by leading enterprises</p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-foreground">100K+</div>
                <div className="text-xs text-primary-foreground/60">Global Users</div>
              </div>
              <div className="w-px h-12 bg-primary-foreground/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-foreground">500+</div>
                <div className="text-xs text-primary-foreground/60">Happy Clients</div>
              </div>
              <div className="w-px h-12 bg-primary-foreground/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-foreground">30M+</div>
                <div className="text-xs text-primary-foreground/60">Calls/Month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
