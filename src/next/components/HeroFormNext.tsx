"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield } from "lucide-react";
import CountryCodeSelect, { getPlaceholderPhone } from "@/components/CountryCodeSelect";
import { supabaseNext } from "@/integrations/supabase/next-client";
import { trackLeadConversion, trackDemoClick } from "@/lib/gtag";
import { executeRecaptcha } from "@/lib/recaptcha";

interface HeroFormNextProps {
  defaultCountryCode?: string;
  fixedCountryCode?: boolean;
}

const HeroFormNext = ({
  defaultCountryCode = "+91",
  fixedCountryCode = false,
}: HeroFormNextProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    trackDemoClick("Hero Form Submit");

    try {
      const cleanPhone = formData.phone.trim().replace(/[\s\-\(\)]/g, "");
      const fullPhoneNumber = countryCode.replace("+", "") + cleanPhone;

      toast({
        title: "Initiating Call...",
        description: "Our expert will call you in a moment!",
      });

      fetch("https://pulse.haloocom.in/webenquiry/make-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: fullPhoneNumber,
          customer_name: formData.name.trim(),
          campaignId: "CMP1001",
          listId: "LIST2001",
        }),
      }).catch(console.error);
    } catch (callError) {
      console.error("Error preparing call:", callError);
    }

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

    trackLeadConversion("Hero Form");
    router.push("/thank-you");

    supabaseNext.functions
      .invoke("send-lead-notification", {
        body: { ...leadData, source: "Hero Form" },
      })
      .catch(console.error);
  };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">
      <div className="p-4 sm:p-6">
        <div className="mb-3 text-center sm:mb-4">
          <h3 className="mb-1 text-lg font-bold text-foreground sm:text-xl">
            Request a Demo
          </h3>
          <p className="text-xs text-muted-foreground">
            Get a personalized walkthrough of our platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
          <Input
            name="name"
            type="text"
            placeholder="Full Name *"
            required
            value={formData.name}
            onChange={handleChange}
            className="h-10 border-border bg-muted/50 text-sm sm:h-11"
            disabled={isSubmitting}
          />

          <div className="flex">
            <CountryCodeSelect
              value={countryCode}
              onChange={setCountryCode}
              disabled={fixedCountryCode}
            />
            <Input
              name="phone"
              type="tel"
              placeholder={getPlaceholderPhone(countryCode)}
              required
              value={formData.phone}
              onChange={handleChange}
              className="h-10 flex-1 rounded-l-none border-border bg-muted/50 text-sm sm:h-11"
              disabled={isSubmitting}
            />
          </div>

          <Input
            name="email"
            type="email"
            placeholder="Email Address *"
            required
            value={formData.email}
            onChange={handleChange}
            className="h-10 border-border bg-muted/50 text-sm sm:h-11"
            disabled={isSubmitting}
          />

          <Input
            name="company"
            type="text"
            placeholder="Company Name *"
            required
            value={formData.company}
            onChange={handleChange}
            className="h-10 border-border bg-muted/50 text-sm sm:h-11"
            disabled={isSubmitting}
          />

          <Button
            type="submit"
            size="lg"
            className="btn-shimmer h-11 w-full bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Get Free Demo"
            )}
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground sm:text-xs">
            <Shield className="h-3 w-3" />
            <span>We'll contact you within 24 hours</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroFormNext;
