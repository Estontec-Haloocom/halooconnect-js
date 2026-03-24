import { useEffect, useState } from "react";
import heroContactCenterPoster from "@/assets/hero-contact-center.webp";
import HeroForm from "./HeroForm";
import HeroTrustStrip from "./HeroTrustStrip";
import { useIsMobile } from "@/hooks/use-mobile";

interface LocalizedHeroProps {
  country: string;
  countryCode: string;
  headline: string;
  subheadline: string;
  benefits: string[];
  stats: {
    users: string;
    clients: string;
    calls: string;
    countries: string;
  };
}

const LocalizedHeroSection = ({
  country,
  countryCode,
  headline,
}: LocalizedHeroProps) => {
  const isMobile = useIsMobile();
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!isMobile) {
      import("@/assets/hero-contact-center.mp4").then((mod) => {
        setVideoSrc(mod.default);
      });
    }
  }, [isMobile]);

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center pt-16 pb-4 md:pt-20 md:pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {videoSrc ? (
          <video 
            src={videoSrc} 
            poster={heroContactCenterPoster}
            autoPlay 
            loop 
            muted 
            playsInline
            preload="none"
            className="w-full h-full object-cover" 
          />
        ) : (
          <img 
            src={heroContactCenterPoster} 
            alt="" 
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
        )}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/55 to-black/45" />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left order-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 md:mb-4 text-white">
              {headline}{" "}
              <span className="text-primary">{country}</span>
            </h1>

            <p className="text-sm md:text-lg text-white/80 mb-3 md:mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              AI-powered omnichannel contact center. Unify calls, WhatsApp & email.
            </p>

            {/* Key Stats - Desktop only */}
            <div className="hidden md:flex items-center gap-8 text-white/70 mb-4">
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

            <div className="hidden lg:block">
              <HeroTrustStrip />
            </div>
          </div>

          {/* Right - Form */}
          <div className="flex justify-center lg:justify-end order-2">
            <HeroForm defaultCountryCode={countryCode} fixedCountryCode={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalizedHeroSection;
