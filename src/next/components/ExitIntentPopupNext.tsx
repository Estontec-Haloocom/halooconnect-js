"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { X, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import CountryCodeSelect, { getPlaceholderPhone } from "@/components/CountryCodeSelect";
import { CountrySelect, CitySelect } from "@/components/LocationSelect";
import { supabaseNext } from "@/integrations/supabase/next-client";
import { trackLeadConversion } from "@/lib/gtag";
import { executeRecaptcha } from "@/lib/recaptcha";

const EXIT_POPUP_KEY = "halooconnect_exit_popup_dismissed";
const EXIT_POPUP_SHOWN_KEY = "halooconnect_exit_popup_shown_date";

const ExitIntentPopupNext = () => {
  const { toast } = useToast();
  const router = useRouter();
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
    const dismissed = sessionStorage.getItem(EXIT_POPUP_KEY);
    if (dismissed) {
      return;
    }

    const lastShown = localStorage.getItem(EXIT_POPUP_SHOWN_KEY);
    if (lastShown) {
      const daysSinceShown = (Date.now() - Number.parseInt(lastShown, 10)) / (1000 * 60 * 60 * 24);
      if (daysSinceShown < 3) {
        return;
      }
    }

    const popupDismissed = sessionStorage.getItem("halooconnect_popup_dismissed");
    if (popupDismissed) {
      return;
    }

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 5 && !isVisible) {
        setIsVisible(true);
        localStorage.setItem(EXIT_POPUP_SHOWN_KEY, Date.now().toString());
      }
    };

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!location) {
      toast({
        title: t("form.error"),
        description: "Please select your country.",
        variant: "destructive",
      });
      return;
    }

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

    const { data: verifyData, error: verifyError } =
      await supabaseNext.functions.invoke("verify-recaptcha", {
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
      location,
      city: location === "India" ? city : null,
    };

    const { error } = await supabaseNext.from("leads").insert(leadData);
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
    router.push("/thank-you");

    supabaseNext.functions
      .invoke("send-lead-notification", {
        body: { ...leadData, source: "Exit Intent Popup" },
      })
      .catch(console.error);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-3 backdrop-blur-md sm:p-4">
      <div className="relative w-full max-w-sm animate-scale-in overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
          aria-label="Close popup"
        >
          <X className="h-3.5 w-3.5 text-gray-600" />
        </button>

        <div className="bg-gradient-to-r from-primary to-primary/80 px-5 py-3 text-center">
          <h2 className="text-lg font-extrabold text-white sm:text-xl">Before You Go!</h2>
          <p className="mt-0.5 text-xs text-white/90">Get a free personalized demo</p>
        </div>

        <div className="p-4 sm:p-5">
          <div className="mb-3">
            <h3 className="mb-2 text-center text-sm font-bold text-foreground sm:text-base">
              Let us show you how Connect 6.0 can help
            </h3>
            <div className="space-y-1">
              {[
                "Free personalized demo session",
                "Priority onboarding support",
                "30-day money-back guarantee",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-muted-foreground">
                  <CheckCircle className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
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
              className="h-9 rounded-lg border-border text-sm sm:h-10"
              disabled={isSubmitting}
            />

            <Input
              name="email"
              type="email"
              placeholder="Email Address *"
              required
              value={formData.email}
              onChange={handleChange}
              className="h-9 rounded-lg border-border text-sm sm:h-10"
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
                className="h-9 flex-1 rounded-l-none rounded-r-lg border-border text-sm sm:h-10"
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
              className="h-9 rounded-lg border-border text-sm sm:h-10"
              disabled={isSubmitting}
            />

            <CountrySelect
              value={location}
              onChange={(value) => {
                setLocation(value);
                if (value !== "India") {
                  setCity("");
                }
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
              className="h-10 w-full rounded-lg text-sm font-bold sm:h-11 sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Get Free Demo
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-3 text-center text-[10px] text-muted-foreground sm:text-xs">
            No credit card required • We'll contact you within 24 hours
          </p>

          <button
            onClick={handleClose}
            className="mt-2 w-full py-1.5 text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            No thanks, maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopupNext;
