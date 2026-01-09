import { CheckCircle, Phone, MessageCircle, Mail, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroBg from "@/assets/hero-bg.png";
import HeroForm from "./HeroForm";

const HeroSection = () => {
  const { t } = useTranslation();
  const benefits = [t("hero.benefit1"), t("hero.benefit2"), t("hero.benefit3"), t("hero.benefit4"), t("hero.benefit5")];

  const channels = [
    { icon: Phone, label: "Voice" },
    { icon: MessageCircle, label: "WhatsApp" },
    { icon: Mail, label: "Email" },
  ];

  const stats = [
    { value: "100K+", label: "Global Users" },
    { value: "500+", label: "Happy Clients" },
    { value: "30MN+", label: "Calls/Month" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-8 md:pt-24 md:pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="" 
          className="w-full h-full object-cover" 
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-secondary/95" />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/90 to-secondary" />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex-1 flex flex-col">
        <div className="flex-1 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content - Mobile First */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">AI-Powered Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary-foreground leading-[1.1] mb-4 animate-fade-in-up animation-delay-100">
              {t("hero.title")}
            </h1>

            <p className="text-base sm:text-lg text-secondary-foreground/70 mb-6 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
              Connect 6.0 - Your all-in-one omnichannel platform trusted by{" "}
              <span className="text-primary font-semibold">500+ businesses</span>{" "}
              worldwide.
            </p>

            {/* Channel pills - Mobile visual hook */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 animate-fade-in-up animation-delay-200">
              {channels.map((channel, i) => (
                <div 
                  key={channel.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-foreground/5 border border-secondary-foreground/10"
                  style={{ animationDelay: `${200 + i * 100}ms` }}
                >
                  <channel.icon className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-secondary-foreground/80">{channel.label}</span>
                </div>
              ))}
              <div className="px-2 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-xs font-semibold text-primary">+5 more</span>
              </div>
            </div>

            {/* Benefits - Compact on mobile */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 animate-fade-in-up animation-delay-300">
              {benefits.slice(0, 4).map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-secondary-foreground/80">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-left">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Stats - Horizontal scroll on mobile */}
            <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4 border-t border-secondary-foreground/10 animate-fade-in-up animation-delay-400">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center flex-shrink-0">
                  <div className="text-xl sm:text-2xl font-bold text-secondary-foreground">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-secondary-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form - Shows first on mobile */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 animate-fade-in-up">
            <HeroForm />
          </div>
        </div>

        {/* Scroll hint - subtle arrow animation */}
        <div className="hidden md:flex justify-center pt-8 animate-fade-in-up animation-delay-500">
          <div className="flex flex-col items-center gap-1 text-secondary-foreground/40">
            <div className="w-5 h-8 rounded-full border-2 border-secondary-foreground/20 flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-secondary-foreground/40 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;