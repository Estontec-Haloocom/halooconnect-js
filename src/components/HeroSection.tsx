import { CheckCircle, Phone, MessageCircle, Mail, Sparkles, Play, ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroContactCenterVideo from "@/assets/hero-contact-center.mp4";
import heroContactCenterPoster from "@/assets/hero-contact-center.jpg";
import HeroForm from "./HeroForm";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-20 pb-8 md:pt-24 md:pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <video 
          src={heroContactCenterVideo} 
          poster={heroContactCenterPoster}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/55 to-black/45" />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex-1 flex flex-col">
        <div className="flex-1 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Content - Clean and Professional */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 text-white">
              AI-Powered{" "}
              <span className="text-primary">Contact Center</span>{" "}
              Solutions
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/80 mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Unify Voice, WhatsApp, Email & SMS in one powerful platform. 
              Trusted by 500+ enterprises worldwide.
            </p>

            {/* Key Stats - Simple */}
            <div className="hidden md:flex items-center gap-8 text-white/70">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">40%</div>
                <div className="text-sm">Reduced Handling Time</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-sm">Customer Satisfaction</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">60%</div>
                <div className="text-sm">Cost Reduction</div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <HeroForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
