import tataLogo from "@/assets/clients/tata.avif";
import swiggyLogo from "@/assets/clients/swiggy.avif";
import godrejLogo from "@/assets/clients/godrej.avif";
import boschLogo from "@/assets/clients/bosch.avif";

const HeroTrustStrip = () => {
  const logos = [
    { image: tataLogo, alt: "Tata" },
    { image: swiggyLogo, alt: "Swiggy" },
    { image: godrejLogo, alt: "Godrej" },
    { image: boschLogo, alt: "Bosch" },
  ];

  return (
    <div className="flex items-center gap-5 mt-2">
      <span className="text-xs text-white/50 font-medium whitespace-nowrap">Trusted by</span>
      {logos.map((logo, i) => (
        <img
          key={i}
          src={logo.image.src}
          alt={logo.alt}
          className="h-5 md:h-6 w-auto brightness-0 invert opacity-50"
          loading="eager"
        />
      ))}
    </div>
  );
};

export default HeroTrustStrip;
