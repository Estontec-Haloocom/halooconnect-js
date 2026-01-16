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
      {/* Urgency Banner - hidden on smallest mobile for compactness */}
      <div className="hidden sm:flex bg-primary/10 border-b border-primary/20 px-4 py-2.5 items-center justify-center gap-2">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </div>
        <span className="text-xs font-medium text-primary-foreground">
          <span className="font-bold bg-secondary text-primary-foreground">{recentActivity.count} people</span> from {recentActivity.city} requested demo today
        </span>
      </div>

      <div className="p-4 sm:p-6">
        {/* Value Proposition - Compact on mobile */}
        <div className="text-center mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-2 sm:mb-3">
            <Zap className="w-3 h-3 text-green-500" />
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">Free 14-Day Trial</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-1 text-primary-foreground">Get Your Free Demo</h3>
          <p className="text-xs sm:text-sm text-destructive-foreground">Transform your contact center with AI</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Simplified: Name field */}
          <Input 
            name="name" 
            type="text" 
            placeholder={t("form.name")} 
            required 
            value={formData.name} 
            onChange={handleChange} 
            className="h-11 sm:h-12 pl-4 pr-4 text-sm sm:text-base" 
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
              className="rounded-l-none h-11 sm:h-12 flex-1 text-sm sm:text-base" 
              disabled={isSubmitting} 
            />
          </div>
          
          {/* Company - optional, smaller on mobile */}
          <Input 
            name="company" 
            type="text" 
            placeholder={`${t("form.company")} (optional)`} 
            value={formData.company} 
            onChange={handleChange} 
            className="h-11 sm:h-12 text-sm sm:text-base" 
            disabled={isSubmitting} 
          />

          {/* Location Select */}
          <CountrySelect 
            value={location} 
            onChange={(val) => {
              setLocation(val);
              if (val !== "India") setCity("");
            }} 
            disabled={isSubmitting} 
          />

          {/* City Select - Only show for India */}
          {location === "India" && (
            <CitySelect value={city} onChange={setCity} disabled={isSubmitting} />
          )}
          
          {/* High-Converting CTA Button - Slightly smaller on mobile */}
          <Button 
            type="submit" 
            variant="hero" 
            size="lg" 
            className="w-full h-12 sm:h-14 text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Get My Free Demo
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
              </>
            )}
          </Button>

          {/* Trust Signals - Simplified for mobile: 2 items instead of 4 */}
          <div className="grid grid-cols-2 gap-2 pt-1 sm:pt-2">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
              <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 flex-shrink-0" />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
              <span>30 min setup</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              <span>500+ happy customers</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-green-500" />
              <span>Enterprise security</span>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Trust Bar - Hidden on mobile for compactness */}
      <div className="hidden sm:block bg-muted/50 border-t border-border/50 px-4 py-3">
        <div className="flex items-center justify-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-card flex items-center justify-center">
                <span className="text-[8px] font-bold text-foreground/70">👤</span>
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">4.9/5</span> from 500+ reviews
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroForm;
