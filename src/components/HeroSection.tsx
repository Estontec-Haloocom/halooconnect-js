import { CheckCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import HeroForm from "./HeroForm";

const benefits = [
  "AI-Powered Voice & Chat",
  "WhatsApp, Email, SMS Integration",
  "Real-time Analytics Dashboard",
  "24/7 Dedicated Support",
];

const HeroSection = () => {
  return (
    <section
      className="
        relative 
        min-h-screen 
        flex 
        items-start lg:items-center 
        pt-24 pb-24 
        md:pt-28 md:pb-32 
        overflow-hidden
      "
    >
      {/* Background with contact center image + dark overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Contact center background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay to improve text visibility */}
        <div className="absolute inset-0 bg-secondary/90" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-in-up" />

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary-foreground leading-tight mb-6 animate-fade-in-up animation-delay-100">
              Transform Your
              <span className="block text-primary"> Customer Engagement</span>
            </h1>

            <p className="text-lg md:text-xl text-secondary-foreground/70 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
              Connect 6.0 - Your all-in-one omnichannel platform trusted by{" "}
              <span className="text-primary font-semibold">500+ businesses</span>{" "}
              worldwide.
            </p>

            {/* Benefits list */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 animate-fade-in-up animation-delay-300">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-2 text-secondary-foreground/80"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Trust badges */}
            <div className="pt-6 border-t border-secondary-foreground/10 animate-fade-in-up animation-delay-400">
              <div className="flex items-center justify-center lg:justify-start gap-6 md:gap-8 flex-wrap">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-secondary-foreground">
                    100K+
                  </div>
                  <div className="text-xs text-secondary-foreground/60">
                    Global Users
                  </div>
                </div>
                <div className="w-px h-10 bg-secondary-foreground/20" />
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-secondary-foreground">
                    500+
                  </div>
                  <div className="text-xs text-secondary-foreground/60">
                    Happy Clients
                  </div>
                </div>
                <div className="w-px h-10 bg-secondary-foreground/20" />
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-secondary-foreground">
                    30MN+
                  </div>
                  <div className="text-xs text-secondary-foreground/60">
                    Calls/Month
                  </div>
                </div>
              </div>
              
              {/* Countries */}
              <div className="mt-4 flex items-center justify-center lg:justify-start gap-2 flex-wrap">
                <span className="text-xs text-secondary-foreground/50">Trusted in:</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg" title="India">🇮🇳</span>
                  <span className="text-lg" title="United States">🇺🇸</span>
                  <span className="text-lg" title="United Kingdom">🇬🇧</span>
                  <span className="text-lg" title="United Arab Emirates">🇦🇪</span>
                  <span className="text-lg" title="Singapore">🇸🇬</span>
                  <span className="text-lg" title="Australia">🇦🇺</span>
                  <span className="text-lg" title="Canada">🇨🇦</span>
                  <span className="text-xs text-secondary-foreground/60">+15 more</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="flex justify-center lg:justify-end animate-fade-in-up animation-delay-300">
            <HeroForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
