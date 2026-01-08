import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Shield, Loader2 } from "lucide-react";
import CountryCodeSelect, { getPlaceholderPhone } from "./CountryCodeSelect";
import { supabase } from "@/integrations/supabase/client";
import { trackLeadConversion } from "@/lib/gtag";
import { executeRecaptcha } from "@/lib/recaptcha";

interface HeroFormProps {
  defaultCountryCode?: string;
  fixedCountryCode?: boolean;
}

const HeroForm = ({ defaultCountryCode = "+65", fixedCountryCode = false }: HeroFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: ""
  });

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
    const recaptchaToken = await executeRecaptcha("hero_form");
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
      company: formData.company.trim() || "Not provided",
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
      // Track Google Ads conversion
      trackLeadConversion("Hero Form");
      
      // Send email notification
      try {
        await supabase.functions.invoke("send-lead-notification", {
          body: { ...leadData, source: "Hero Form" },
        });
      } catch (emailError) {
        console.error("Email notification error:", emailError);
      }
      navigate("/thank-you");
    }
  };

  return (
    <div className="bg-card/95 backdrop-blur-md rounded-2xl p-6 shadow-elevated border border-border/50 w-full max-w-md">
      <div className="text-center mb-5">
        <h3 className="text-xl font-bold text-foreground mb-1">{t("form.title")}</h3>
        <p className="text-sm text-muted-foreground">{t("form.subtitle")}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          name="name"
          type="text"
          placeholder={t("form.name")}
          required
          value={formData.name}
          onChange={handleChange}
          className="h-12"
          disabled={isSubmitting}
        />
        
        <div className="flex">
          <CountryCodeSelect value={countryCode} onChange={setCountryCode} disabled={fixedCountryCode} />
          <Input
            name="phone"
            type="tel"
            placeholder={getPlaceholderPhone(countryCode)}
            required
            value={formData.phone}
            onChange={handleChange}
            className="rounded-l-none h-12 flex-1"
            disabled={isSubmitting}
          />
        </div>
        
        <Input
          name="company"
          type="text"
          placeholder={t("form.company")}
          value={formData.company}
          onChange={handleChange}
          className="h-12"
          disabled={isSubmitting}
        />
        
        <Button 
          type="submit" 
          variant="hero" 
          size="lg" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t("form.submitting")}
            </>
          ) : (
            <>
              {t("form.submit")}
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>
      
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
        <Shield className="w-3.5 h-3.5" />
        <span>{t("form.secureNote")}</span>
      </div>
    </div>
  );
};

export default HeroForm;