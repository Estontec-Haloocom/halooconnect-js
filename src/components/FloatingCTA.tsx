import { Phone } from "lucide-react";
import whatsappIcon from "@/assets/whatsapp-icon.svg";

const FloatingCTA = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href="https://wa.me/919886620544?text=Hi%2C%20I%27m%20interested%20in%20Connect%206.0%20demo"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-elevated hover:scale-110 transition-transform duration-300 group"
        title="Chat on WhatsApp"
      >
        <img src={whatsappIcon} alt="WhatsApp" className="w-8 h-8" />
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-card text-foreground text-sm font-medium shadow-soft opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          WhatsApp Us
        </span>
      </a>
      
      {/* Phone */}
      <a
        href="tel:+919886620544"
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-elevated hover:scale-110 transition-transform duration-300 animate-pulse-glow group"
        title="Call Us"
      >
        <Phone className="w-7 h-7 text-primary-foreground" />
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-card text-foreground text-sm font-medium shadow-soft opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Call Now
        </span>
      </a>
    </div>
  );
};

export default FloatingCTA;
