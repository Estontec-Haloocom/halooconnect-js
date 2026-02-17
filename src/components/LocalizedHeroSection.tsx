import heroContactCenterVideo from "@/assets/hero-contact-center.mp4";
import heroContactCenterPoster from "@/assets/hero-contact-center.jpg";
import HeroForm from "./HeroForm";

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
  subheadline,
}: LocalizedHeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-20 pb-8 md:pt-24 md:pb-16 overflow-hidden">
      {/* Background Video */}
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
          
          {/* Left Content */}
          <div className="text-center lg:text-left order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 text-white">
              {headline}{" "}
              <span className="text-primary">{country}</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {subheadline}
            </p>

            {/* Key Stats */}
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
          <div className="flex justify-center lg:justify-end order-2">
            <HeroForm defaultCountryCode={countryCode} fixedCountryCode={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalizedHeroSection;
