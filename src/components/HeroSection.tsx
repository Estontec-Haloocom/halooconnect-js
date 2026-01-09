import { CheckCircle, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroBg from "@/assets/hero-bg.png";
import HeroForm from "./HeroForm";

const HeroSection = () => {
  const { t } = useTranslation();
  const benefits = [t("hero.benefit1"), t("hero.benefit2"), t("hero.benefit3"), t("hero.benefit4"), t("hero.benefit5")];

  const scrollToNextSection = () => {
    window.scrollTo({ top: window.innerHeight - 80, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-start lg:items-center pt-24 pb-24 md:pt-28 md:pb-32 overflow-hidden">
      {/* Background with optimized loading */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="" 
          className="w-full h-full object-cover" 
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-secondary/90" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary-foreground leading-tight mb-6 animate-fade-in-up">
              {t("hero.title")}
            </h1>

            <p className="text-lg md:text-xl text-secondary-foreground/70 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-100">
              Connect 6.0 - Your all-in-one omnichannel platform trusted by{" "}
              <span className="text-primary font-semibold">500+ businesses</span>{" "}
              worldwide.
            </p>

            {/* Benefits list */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 animate-fade-in-up animation-delay-200">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-secondary-foreground/80">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-left">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Trust badges */}
            <div className="pt-6 border-t border-secondary-foreground/10 animate-fade-in-up animation-delay-300">
              <div className="flex items-center justify-center lg:justify-start gap-6 md:gap-8 flex-wrap">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-secondary-foreground">100K+</div>
                  <div className="text-xs text-secondary-foreground/60">Global Users</div>
                </div>
                <div className="w-px h-10 bg-secondary-foreground/20" />
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-secondary-foreground">500+</div>
                  <div className="text-xs text-secondary-foreground/60">Happy Clients</div>
                </div>
                <div className="w-px h-10 bg-secondary-foreground/20" />
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-secondary-foreground">30MN+</div>
                  <div className="text-xs text-secondary-foreground/60">Calls/Month</div>
                </div>
                <div className="w-px h-10 bg-secondary-foreground/20" />
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-secondary-foreground">5+</div>
                  <div className="text-xs text-secondary-foreground/60">Countries</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="flex justify-center lg:justify-end animate-fade-in-up animation-delay-200">
            <HeroForm />
          </div>
        </div>
      </div>

      {/* Scroll indicator to encourage scrolling */}
      <button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-secondary-foreground/60 hover:text-primary transition-colors cursor-pointer animate-bounce"
        aria-label="Scroll to see more"
      >
        <span className="text-xs font-medium">Explore More</span>
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
};

export default HeroSection;