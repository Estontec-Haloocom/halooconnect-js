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
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const {
    t
  } = useTranslation();
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
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
  // ==================== INITIATE CALL IMMEDIATELY ====================
  try {
    // Format phone number: remove any spaces, dashes, or special characters
    const cleanPhone = formData.phone.trim().replace(/[\s\-\(\)]/g, '');
    // Combine country code with phone number (remove + from country code)
    const fullPhoneNumber = countryCode.replace('+', '') + cleanPhone;
    // Show immediate feedback to user
    toast({
      title: "📞 Initiating Call...",
      description: "Our expert will call you in a moment!",
    });
    // Initiate call immediately (non-blocking)
    fetch('https://pulse.haloocom.in/webenquiry/make-call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: fullPhoneNumber,
        customer_name: formData.name.trim(),
        campaignId: "CMP1001",
        listId: "LIST2001"
      })
    }).then(response => {
      if (response.ok) {
        console.log('Call initiated successfully');
      } else {
        console.error('Call initiation failed');
      }
    }).catch(error => {
      console.error('Error initiating call:', error);
    });
  } catch (callError) {
    console.error('Error preparing call:', callError);
  }
  // ================================================================
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
  // Track conversion
  trackLeadConversion("Hero Form");
  // Navigate to thank you page
  navigate("/thank-you");
  // Send notification (non-blocking)
  supabase.functions.invoke("send-lead-notification", {
    body: { ...leadData, source: "Hero Form" }
  }).catch(console.error);
};
  return <div className="bg-white dark:bg-card rounded-2xl shadow-2xl border border-gray-200 dark:border-border w-full max-w-md overflow-hidden">
      {/* Urgency Banner - visible on all devices for conversion */}
      <div className="flex bg-gradient-to-r from-secondary to-secondary/90 px-3 py-2 sm:px-4 sm:py-2.5 items-center justify-center gap-2">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </div>
        <span className="text-[10px] sm:text-xs font-semibold text-white">
          🔥 <span className="font-bold">{recentActivity.count} demos</span> booked from {recentActivity.city} today
        </span>
      </div>
      <div className="p-4 sm:p-6 bg-white dark:bg-card">
        {/* Value Proposition - Stronger urgency */}
        <div className="text-center mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/40 mb-2">
            <Clock className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wide">Limited Slots Today</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-1 text-gray-900 dark:text-foreground">Get Your Demo in 2 Minutes</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-muted-foreground">No commitment • Expert will call you back</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
          {/* Name + Phone side by side on larger mobile for compactness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input name="name" type="text" placeholder="Your Name *" required value={formData.name} onChange={handleChange} className="h-11 sm:h-12 pl-4 pr-4 text-sm bg-gray-50 dark:bg-background border-gray-300 dark:border-input text-gray-900 dark:text-foreground placeholder:text-gray-500 dark:placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20" disabled={isSubmitting} />
            
            {/* Phone with country code */}
            <div className="flex">
              <CountryCodeSelect value={countryCode} onChange={setCountryCode} disabled={fixedCountryCode} />
              <Input name="phone" type="tel" placeholder={getPlaceholderPhone(countryCode)} required value={formData.phone} onChange={handleChange} className="rounded-l-none h-11 sm:h-12 flex-1 text-sm bg-gray-50 dark:bg-background border-gray-300 dark:border-input text-gray-900 dark:text-foreground placeholder:text-gray-500 dark:placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20" disabled={isSubmitting} />
            </div>
          </div>
          
          {/* Company + Location side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input name="company" type="text" placeholder="Company (optional)" value={formData.company} onChange={handleChange} className="h-11 sm:h-12 text-sm bg-gray-50 dark:bg-background border-gray-300 dark:border-input text-gray-900 dark:text-foreground placeholder:text-gray-500 dark:placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20" disabled={isSubmitting} />
            <CountrySelect value={location} onChange={val => {
            setLocation(val);
            if (val !== "India") setCity("");
          }} disabled={isSubmitting} />
          </div>
          {/* City Select - Only show for India */}
          {location === "India" && <CitySelect value={city} onChange={setCity} disabled={isSubmitting} />}
          
          {/* High-Converting CTA Button with stronger copy */}
          <Button type="submit" variant="hero" size="lg" className="w-full h-12 sm:h-14 text-sm sm:text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/95 hover:to-primary text-white" disabled={isSubmitting}>
            {isSubmitting ? <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="ml-2">Booking Your Slot...</span>
              </> : <>
                Book My Free Demo Now
              </>}
          </Button>
          {/* Immediate callback promise */}
          
          {/* Trust Signals - Always visible */}
          
        </form>
      </div>
      {/* Bottom Trust Bar - Visible on all with click-to-call */}
      <div className="bg-gray-50 dark:bg-muted/50 border-t border-gray-200 dark:border-border px-4 py-3 sm:px-5 sm:py-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex -space-x-1.5">
              {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-white dark:border-card flex items-center justify-center shadow-sm">
                  <span className="text-[8px] sm:text-[10px]">👤</span>
                </div>)}
            </div>
            <div className="flex items-center gap-1.5 text-sm sm:text-base">
              <span className="text-yellow-500 text-base">★</span>
              <span className="font-bold text-gray-900 dark:text-foreground">4.9</span>
              <span className="text-gray-600 dark:text-muted-foreground">rating</span>
            </div>
          </div>
          <a href="tel:+919876543210" className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white text-xs sm:text-sm font-semibold hover:bg-green-600 transition-colors shadow-md whitespace-nowrap">
            📞 <span className="hidden xs:inline">Prefer a</span> Call<span className="hidden xs:inline">?</span>
          </a>
        </div>
      </div>
    </div>;
};
export default HeroForm;
