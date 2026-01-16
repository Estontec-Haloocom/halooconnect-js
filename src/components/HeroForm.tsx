import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Shield, Loader2, CheckCircle, Clock, Users, Zap } from "lucide-react";
import CountryCodeSelect, { getPlaceholderPhone } from "./CountryCodeSelect";
import { CountrySelect, CitySelect } from "./LocationSelect";
import { supabase } from "@/integrations/supabase/client";
import { trackLeadConversion } from "@/lib/gtag";
import { executeRecaptcha } from "@/lib/recaptcha";

interface HeroFormProps {
  defaultCountryCode?: string;
  fixedCountryCode?: boolean;
}

const HeroForm = ({
  defaultCountryCode = "+91",
  fixedCountryCode = false
}: HeroFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: ""
  });

  // Live activity simulation for social proof
  const [recentActivity, setRecentActivity] = useState({
    count: 12,
    city: "Mumbai"
  });
  const cities = ["Mumbai", "Delhi", "Bangalore", "Dubai", "Singapore", "Chennai", "Hyderabad"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRecentActivity({
        count: Math.floor(Math.random() * 15) + 8,
        city: cities[Math.floor(Math.random() * cities.length)]
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate location
    if (!location) {
      toast({
        title: t("form.error"),
        description: "Please select your country.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate city if India is selected
    if (location === "India" && !city) {
      toast({
        title: t("form.error"),
        description: "Please select your city.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    const recaptchaToken = await executeRecaptcha("hero_form");
    if (!recaptchaToken) {
      toast({
        title: t("form.error"),
        description: "reCAPTCHA verification failed. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    const { data: verifyData, error: verifyError } = await supabase.functions.invoke("verify-recaptcha", {
      body: { token: recaptchaToken }
    });

    if (verifyError || !verifyData?.success) {
      toast({
        title: t("form.error"),
        description: "Security verification failed. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    const leadData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      country_code: countryCode,
      company: formData.company.trim() || "Not provided",
      location: location,
      city: location === "India" ? city : null
    };

    const { error } = await supabase.from("leads").insert(leadData);
    if (error) {
      toast({
        title: t("form.error"),
        description: t("form.errorMessage"),
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    trackLeadConversion("Hero Form");
    navigate("/thank-you");
    supabase.functions.invoke("send-lead-notification", {
      body: {
        ...leadData,
        source: "Hero Form"
      }
    }).catch(console.error);
  };

  return (
    <div className="bg-card/98 backdrop-blur-lg rounded-2xl shadow-elevated border border-border/50 w-full max-w-md overflow-hidden">
      {/* Urgency Banner - visible on all devices for conversion */}
      <div className="flex bg-gradient-to-r from-green-500/20 to-primary/10 border-b border-green-500/30 px-3 py-2 sm:px-4 sm:py-2.5 items-center justify-center gap-2">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </div>
        <span className="text-[10px] sm:text-xs font-medium text-primary-foreground">
          🔥 <span className="font-bold text-green-600">{recentActivity.count} demos</span> booked from {recentActivity.city} today
        </span>
      </div>

      <div className="p-4 sm:p-6">
        {/* Value Proposition - Stronger urgency */}
        <div className="text-center mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 mb-2">
            <Clock className="w-3 h-3 text-primary animate-pulse" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-wide">Limited Slots Today</span>
          </div>
          <h3 className="text-base sm:text-xl font-bold mb-0.5 text-primary-foreground">Get Your Demo in 2 Minutes</h3>
          <p className="text-[10px] sm:text-sm text-muted-foreground">No commitment • Expert will call you back</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
          {/* Name + Phone side by side on larger mobile for compactness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <Input 
              name="name" 
              type="text" 
              placeholder="Your Name *" 
              required 
              value={formData.name} 
              onChange={handleChange} 
              className="h-10 sm:h-11 pl-3 pr-3 text-sm" 
              disabled={isSubmitting} 
            />
            
            {/* Phone with country code */}
            <div className="flex">
              <CountryCodeSelect value={countryCode} onChange={setCountryCode} disabled={fixedCountryCode} />
              <Input 
                name="phone" 
                type="tel" 
                placeholder={getPlaceholderPhone(countryCode)} 
                required 
                value={formData.phone} 
                onChange={handleChange} 
                className="rounded-l-none h-10 sm:h-11 flex-1 text-sm" 
                disabled={isSubmitting} 
              />
            </div>
          </div>
          
          {/* Company + Location side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <Input 
              name="company" 
              type="text" 
              placeholder="Company (optional)" 
              value={formData.company} 
              onChange={handleChange} 
              className="h-10 sm:h-11 text-sm" 
              disabled={isSubmitting} 
            />

            <CountrySelect 
              value={location} 
              onChange={(val) => {
                setLocation(val);
                if (val !== "India") setCity("");
              }} 
              disabled={isSubmitting} 
            />
          </div>

          {/* City Select - Only show for India */}
          {location === "India" && (
            <CitySelect value={city} onChange={setCity} disabled={isSubmitting} />
          )}
          
          {/* High-Converting CTA Button with stronger copy */}
          <Button 
            type="submit" 
            variant="hero" 
            size="lg" 
            className="w-full h-11 sm:h-12 text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Booking Your Slot...
              </>
            ) : (
              <>
                🚀 Book My Free Demo Now
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>

          {/* Immediate callback promise */}
          <p className="text-center text-[10px] sm:text-xs text-muted-foreground">
            ⚡ We'll call you within <span className="font-bold text-primary">5 minutes</span>
          </p>

          {/* Trust Signals - Always visible */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 pt-1">
            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span>Free trial</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
              <Shield className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
              <Users className="w-3 h-3 text-blue-500 flex-shrink-0" />
              <span>500+ clients</span>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Trust Bar - Visible on all with click-to-call */}
      <div className="bg-muted/50 border-t border-border/50 px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-card flex items-center justify-center">
                  <span className="text-[6px] sm:text-[8px]">👤</span>
                </div>
              ))}
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">4.9★</span> reviews
            </div>
          </div>
          <a 
            href="tel:+919876543210" 
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-[10px] sm:text-xs font-medium text-green-600 hover:bg-green-500/20 transition-colors"
          >
            📞 Prefer a call?
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroForm;
