import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { X, ArrowRight, Loader2, Gift } from "lucide-react";
import CountryCodeSelect, { getPlaceholderPhone } from "./CountryCodeSelect";
import { supabase } from "@/integrations/supabase/client";
import { trackLeadConversion } from "@/lib/gtag";
import { executeRecaptcha } from "@/lib/recaptcha";

const POPUP_DISMISSED_KEY = "halooconnect_popup_dismissed";

const PopupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState("+971");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    // Check if popup was already dismissed in this session
    const dismissed = sessionStorage.getItem(POPUP_DISMISSED_KEY);
    if (dismissed) return;

    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(POPUP_DISMISSED_KEY, "true");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Execute reCAPTCHA
    const recaptchaToken = await executeRecaptcha("popup_form");
    if (!recaptchaToken) {
      toast({
        title: t("form.error"),
        description: "reCAPTCHA verification failed. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Verify reCAPTCHA token
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
      country_code: countryCode,
      company: "Not provided",
    };

    const { error } = await supabase.from("leads").insert(leadData);

    if (error) {
      toast({
        title: t("form.error"),
        description: t("form.errorMessage"),
        variant: "destructive",
      });
      setIsSubmitting(false);
    } else {
      trackLeadConversion("Popup Form");
      
      try {
        await supabase.functions.invoke("send-lead-notification", {
          body: { ...leadData, source: "Popup Form" },
        });
      } catch (emailError) {
        console.error("Email notification error:", emailError);
      }
      
      handleClose();
      navigate("/thank-you");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-card rounded-2xl shadow-elevated border border-border/50 w-full max-w-sm relative animate-scale-in">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="p-5">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Gift className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg leading-tight">
                {t("popup.title")}
              </h3>
              <p className="text-xs text-muted-foreground">
                {t("popup.subtitle")}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              name="name"
              type="text"
              placeholder={t("form.name")}
              required
              value={formData.name}
              onChange={handleChange}
              className="h-11 text-sm"
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
                className="rounded-l-none h-11 flex-1 text-sm"
                disabled={isSubmitting}
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="default"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("form.submitting")}
                </>
              ) : (
                <>
                  {t("popup.cta")}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-[10px] text-muted-foreground text-center mt-3">
            {t("form.secureNote")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
