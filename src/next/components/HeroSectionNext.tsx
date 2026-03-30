"use client";

import { ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import heroContactCenterPoster from "@/assets/hero-contact-center.webp";
import HeroTrustStrip from "@/components/HeroTrustStrip";
import { useIsMobile } from "@/hooks/use-mobile";
import HeroFormNext from "./HeroFormNext";

const HeroSectionNext = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!isMobile) {
      import("@/assets/hero-contact-center.mp4").then((mod) => {
        setVideoSrc(mod.default);
      });
    }
  }, [isMobile]);

  const scrollToNext = () => {
    document.getElementById("trust-banner")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-16 pb-4 md:pt-20 md:pb-8">
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            src={videoSrc}
            poster={heroContactCenterPoster.src}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={heroContactCenterPoster.src}
            alt=""
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        )}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/55 to-black/45" />
      </div>

      <div className="container relative z-10 flex flex-1 flex-col justify-center">
        <div className="grid items-center gap-4 lg:grid-cols-2 lg:gap-12">
          <div className="order-1 text-center lg:text-left">
            <h1 className="mb-2 text-2xl font-bold leading-tight text-white sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl">
              AI-Powered <span className="text-primary">Cloud Contact Center</span> Software
            </h1>

            <p className="mx-auto mb-3 max-w-lg text-sm leading-relaxed text-white/80 md:mb-6 md:text-lg lg:mx-0">
              Unify voice, WhatsApp, email, SMS, IVR, and AI automation in one
              omnichannel customer service platform trusted by enterprise teams.
            </p>

            <div className="mb-4 hidden items-center gap-8 text-white/70 md:flex">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">40%</div>
                <div className="text-sm">Reduced Handling Time</div>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-sm">Customer Satisfaction</div>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">60%</div>
                <div className="text-sm">Cost Reduction</div>
              </div>
            </div>

            <div className="hidden lg:block">
              <HeroTrustStrip />
            </div>
          </div>

          <div className="order-2 flex justify-center lg:justify-end">
            <HeroFormNext />
          </div>
        </div>
      </div>

      <button
        onClick={scrollToNext}
        className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/50 transition-colors hover:text-white/80 md:flex"
        aria-label="Scroll down"
      >
        <span className="text-xs font-medium uppercase tracking-wider">
          {t("hero.explore", { defaultValue: "Explore" })}
        </span>
        <ArrowDown className="h-4 w-4" />
      </button>
    </section>
  );
};

export default HeroSectionNext;
