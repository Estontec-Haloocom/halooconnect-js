import { MessageSquare } from "lucide-react";
import whatsappIcon from "@/assets/whatsapp-icon.svg";
import { trackDemoClick } from "@/lib/gtag";

interface StickyMobileCTAProps {
  onFormClick: () => void;
}

const StickyMobileCTA = ({ onFormClick }: StickyMobileCTAProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
      <div className="bg-card/95 backdrop-blur-lg border-t border-border shadow-elevated">
        <div className="flex items-center justify-center gap-3 px-4 py-3">
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919886620544?text=Hi%2C%20I%27m%20interested%20in%20Connect%206.0%20demo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-sm shadow-lg hover:bg-[#20bd5a] transition-all animate-pulse hover:animate-none hover:scale-105"
          >
            <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5" />
            <span>WhatsApp Us</span>
          </a>
          
          {/* Form Button */}
          <button
            onClick={() => { trackDemoClick("Sticky Mobile CTA"); onFormClick(); }}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg hover:bg-primary/90 transition-all animate-pulse hover:animate-none hover:scale-105"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Get Demo</span>
          </button>
        </div>
        
        {/* Safe area padding for devices with home indicator */}
        <div className="h-safe-area-inset-bottom bg-card/95" />
      </div>
    </div>
  );
};

export default StickyMobileCTA;
