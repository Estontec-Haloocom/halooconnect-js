import { CheckCircle, Phone, MessageCircle, Mail, Sparkles, Play, ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroContactCenter from "@/assets/hero-contact-center.jpg";
import HeroForm from "./HeroForm";

// Client logos for social proof
import tataLogo from "@/assets/clients/tata.avif";
import swiggyLogo from "@/assets/clients/swiggy.avif";
import godrejLogo from "@/assets/clients/godrej.avif";
import boschLogo from "@/assets/clients/bosch.avif";

const HeroSection = () => {
  const { t } = useTranslation();
  
  const benefits = [
    { text: "Reduce call handling time by 40%", highlight: "40%" },
    { text: "Boost customer satisfaction to 95%", highlight: "95%" },
    { text: "Cut operational costs by 60%", highlight: "60%" },
  ];
  
  const channels = [
    { icon: Phone, label: "Voice", color: "text-green-400" },
    { icon: MessageCircle, label: "WhatsApp", color: "text-emerald-400" },
    { icon: Mail, label: "Email", color: "text-blue-400" },
  ];

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-6 md:pt-24 md:pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroContactCenter} 
          alt="" 
          className="w-full h-full object-cover" 
          loading="eager" 
          fetchPriority="high" 
        />
        <div className="absolute inset-0 bg-secondary/85" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F71]/90 via-secondary/85 to-secondary/90" />
        {/* Animated gradient orbs - hidden on mobile for performance */}
        <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="hidden md:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float animation-delay-200" />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex-1 flex flex-col">
        <div className="flex-1 grid lg:grid-cols-2 gap-6 lg:gap-16 items-start lg:items-center">
          
          {/* Left Content - Optimized for mobile above-the-fold */}
          <div className="text-center lg:text-left order-2 lg:order-1 mt-2 lg:mt-0">
            {/* Live Badge - smaller on mobile */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 mb-3 md:mb-5 animate-fade-in-up">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </div>
              <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-wide">
                🔥 Trusted by 500+ Enterprises
              </span>
            </div>

            {/* Main Headline - Compact on mobile for above-the-fold visibility */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] mb-3 md:mb-5 animate-fade-in-up animation-delay-100">
              <span className="block text-white drop-shadow-lg">Transform Your</span>
              <span className="block bg-gradient-to-r from-primary via-red-400 to-primary bg-clip-text text-transparent drop-shadow-lg" style={{ WebkitTextStroke: '0.5px rgba(255,255,255,0.1)' }}>
                Contact Center
              </span>
              <span className="block text-white drop-shadow-lg">With AI Power</span>
            </h1>

            {/* Subheadline - Condensed for mobile */}
            <p className="text-base md:text-xl text-white/90 mb-4 md:mb-6 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-200 leading-relaxed">
              Unify Voice, WhatsApp, Email & SMS in one platform.
              <span className="text-primary font-bold"> Setup in 30 min.</span>
            </p>

            {/* Channel Pills - Hidden on mobile, visible on tablet+ */}
            <div className="hidden sm:flex items-center justify-center lg:justify-start gap-3 mb-6 animate-fade-in-up animation-delay-250 flex-wrap">
              {channels.map((channel, i) => (
                <div 
                  key={channel.label} 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-colors cursor-default"
                >
                  <channel.icon className={`w-4 h-4 ${channel.color}`} />
                  <span className="text-sm font-medium text-white">{channel.label}</span>
                </div>
              ))}
              <div className="px-3 py-2 rounded-full bg-primary/30 border border-primary/40">
                <span className="text-sm font-bold text-primary">+5 more</span>
              </div>
            </div>

            {/* Benefits - Compact grid on mobile, stack on desktop */}
            <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2 md:gap-3 mb-4 md:mb-6 animate-fade-in-up animation-delay-300">
              {benefits.map((benefit, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-2 md:gap-3 text-white justify-center lg:justify-start bg-white/5 sm:bg-transparent rounded-lg px-3 py-2 sm:p-0"
                >
                  <div className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500/30 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-400" />
                  </div>
                  <span className="text-sm md:text-base font-medium">
                    {benefit.text.split(benefit.highlight).map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="font-bold text-primary">{benefit.highlight}</span>
                        )}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>

            {/* Client Logos - Smaller on mobile */}
            <div className="animate-fade-in-up animation-delay-400 hidden sm:block">
              <p className="text-xs text-white/60 uppercase tracking-wider mb-3 text-center lg:text-left font-semibold">
                Trusted by industry leaders
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-6 opacity-80">
                {[tataLogo, swiggyLogo, godrejLogo, boschLogo].map((logo, i) => (
                  <img 
                    key={i} 
                    src={logo} 
                    alt="Client logo" 
                    className="h-6 sm:h-7 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right - Form: prioritized on mobile (order-1) */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 animate-fade-in-up">
            <HeroForm />
          </div>
        </div>

        {/* Scroll Indicator - Desktop only */}
        <div 
          className="hidden md:flex justify-center pt-6 animate-fade-in-up animation-delay-500 cursor-pointer"
          onClick={scrollToNextSection}
        >
          <div className="flex flex-col items-center gap-2 text-secondary-foreground/40 hover:text-secondary-foreground/60 transition-colors group">
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
