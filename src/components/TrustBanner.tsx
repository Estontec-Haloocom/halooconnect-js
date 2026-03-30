import tataLogo from "@/assets/clients/tata.avif";
import swiggyLogo from "@/assets/clients/swiggy.avif";
import godrejLogo from "@/assets/clients/godrej.avif";
import boschLogo from "@/assets/clients/bosch.avif";
import delhiveryLogo from "@/assets/clients/delhivery.avif";
import quessLogo from "@/assets/clients/quess.webp";
import ScrollReveal from "./ScrollReveal";

const TrustBanner = () => {
  const logos = [
    { image: tataLogo, alt: "Tata" },
    { image: swiggyLogo, alt: "Swiggy" },
    { image: godrejLogo, alt: "Godrej" },
    { image: boschLogo, alt: "Bosch" },
    { image: delhiveryLogo, alt: "Delhivery" },
    { image: quessLogo, alt: "Quess" },
  ];

  return (
    <section id="trust-banner" className="py-6 md:py-10 bg-muted/30 border-y border-border">
      <ScrollReveal>
        <div className="container">
          <p className="text-center text-sm text-muted-foreground mb-5 font-medium">
            Trusted by 500+ leading enterprises worldwide
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {logos.map((logo, i) => (
              <img
                key={i}
                src={logo.image.src}
                alt={logo.alt}
                className="h-8 md:h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default TrustBanner;
