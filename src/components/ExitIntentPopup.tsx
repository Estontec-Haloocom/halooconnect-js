import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { X, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import CountryCodeSelect, { getPlaceholderPhone } from "./CountryCodeSelect";
import { CountrySelect, CitySelect } from "./LocationSelect";
import { supabase } from "@/integrations/supabase/client";
import { trackLeadConversion } from "@/lib/gtag";
import { executeRecaptcha } from "@/lib/recaptcha";

const EXIT_POPUP_KEY = "halooconnect_exit_popup_dismissed";
const EXIT_POPUP_SHOWN_KEY = "halooconnect_exit_popup_shown_date";

const ExitIntentPopup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
  });

  useEffect(() => {
    // Don't show if already dismissed this session
    const dismissed = sessionStorage.getItem(EXIT_POPUP_KEY);
    if (dismissed) return;
    
    // Don't show more than once per 3 days
    const lastShown = localStorage.getItem(EXIT_POPUP_SHOWN_KEY);
    if (lastShown) {
      const daysSinceShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
      if (daysSinceShown < 3) return;
    }
    
    // Don't show if popup form was already submitted or shown
    const popupDismissed = sessionStorage.getItem("halooconnect_popup_dismissed");
    if (popupDismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves to top of viewport (exit intent)
      if (e.clientY <= 5 && !isVisible) {
        setIsVisible(true);
        localStorage.setItem(EXIT_POPUP_SHOWN_KEY, Date.now().toString());
      }
    };

    // Add a longer delay (30s) before listening - much less aggressive
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 30000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(EXIT_POPUP_KEY, "true");
  };

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
        variant: "destructive",
      });
      return;
    }
    
    // Validate city if India is selected
    if (location === "India" && !city) {
      toast({
        title: t("form.error"),
        description: "Please select your city.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const recaptchaToken = await executeRecaptcha("exit_popup_form");
    if (!recaptchaToken) {
      toast({
        title: t("form.error"),
        description: "reCAPTCHA verification failed. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const { data: verifyData, error: verifyError } = await supabase.functions.invoke("verify-recaptcha", {
      body: { token: recaptchaToken },
    });

    if (verifyError || !verifyData?.success) {
      toast({
        title: t("form.error"),
        description: "Security verification failed. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const leadData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      country_code: countryCode,
      company: formData.company.trim(),
      location: location,
      city: location === "India" ? city : null
    };

    const { error } = await supabase.from("leads").insert(leadData);

    if (error) {
      toast({
        title: t("form.error"),
        description: t("form.errorMessage"),
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    trackLeadConversion("Exit Intent Popup");
    handleClose();
    navigate("/thank-you");
    
    supabase.functions.invoke("send-lead-notification", {
      body: { ...leadData, source: "Exit Intent Popup" },
    }).catch(console.error);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm relative animate-scale-in overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-3.5 h-3.5 text-gray-600" />
        </button>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-primary to-primary/80 px-5 py-3 text-center">
          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            Before You Go!
          </h2>
          <p className="text-white/90 text-xs mt-0.5">Get a free personalized demo</p>
        </div>

        <div className="p-4 sm:p-5">
          <div className="mb-3">
            <h3 className="text-sm sm:text-base font-bold text-foreground text-center mb-2">
              Let us show you how Connect 6.0 can help
            </h3>
            <div className="space-y-1">
              {[
                "Free personalized demo session",
                "Priority onboarding support",
                "30-day money-back guarantee"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-muted-foreground">
                  <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            <Input
              name="name"
              type="text"
              placeholder="Full Name *"
              required
              value={formData.name}
              onChange={handleChange}
              className="h-9 sm:h-10 text-sm rounded-lg border-border"
              disabled={isSubmitting}
            />

            <Input
              name="email"
              type="email"
              placeholder="Email Address *"
              required
              value={formData.email}
              onChange={handleChange}
              className="h-9 sm:h-10 text-sm rounded-lg border-border"
              disabled={isSubmitting}
            />

            <div className="flex">
              <CountryCodeSelect value={countryCode} onChange={setCountryCode} />
              <Input
                name="phone"
                type="tel"
                placeholder={getPlaceholderPhone(countryCode)}
                required
                value={formData.phone}
                onChange={handleChange}
                className="rounded-l-none rounded-r-lg h-9 sm:h-10 flex-1 text-sm border-border"
                disabled={isSubmitting}
              />
            </div>

            <Input
              name="company"
              type="text"
              placeholder="Company Name *"
              required
              value={formData.company}
              onChange={handleChange}
              className="h-9 sm:h-10 text-sm rounded-lg border-border"
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

            {location === "India" && (
              <CitySelect value={city} onChange={setCity} disabled={isSubmitting} />
            )}

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full h-10 sm:h-11 text-sm sm:text-base font-bold rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Get Free Demo
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-[10px] sm:text-xs text-muted-foreground text-center mt-3">
            No credit card required • We'll contact you within 24 hours
          </p>

          <button
            onClick={handleClose}
            className="w-full text-center text-xs text-muted-foreground hover:text-foreground mt-2 py-1.5 transition-colors"
          >
            No thanks, maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
