import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import CountryCodeSelect, { getPlaceholderPhone } from "./CountryCodeSelect";
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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  setIsSubmitting(true);
  
  try {
    const cleanPhone = formData.phone.trim().replace(/[\s\-\(\)]/g, '');
    const fullPhoneNumber = countryCode.replace('+', '') + cleanPhone;
    
    toast({
      title: "📞 Initiating Call...",
      description: "Our expert will call you in a moment!",
    });
    
    fetch('https://pulse.haloocom.in/webenquiry/make-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber: fullPhoneNumber,
        customer_name: formData.name.trim(),
        campaignId: "CMP1001",
        listId: "LIST2001"
      })
    }).catch(console.error);
  } catch (callError) {
    console.error('Error preparing call:', callError);
  }
  
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
    email: formData.email.trim(),
    country_code: countryCode,
    company: formData.company.trim(),
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
    body: { ...leadData, source: "Hero Form" }
  }).catch(console.error);
};

  return (
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Request a Demo
          </h3>
          <p className="text-sm text-muted-foreground">
            Get a personalized walkthrough of our platform
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            name="name" 
            type="text" 
            placeholder="Full Name *" 
            required 
            value={formData.name} 
            onChange={handleChange} 
            className="h-12 text-sm bg-muted/50 border-border" 
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
              className="rounded-l-none h-12 flex-1 text-sm bg-muted/50 border-border" 
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
            className="h-12 text-sm bg-muted/50 border-border" 
            disabled={isSubmitting} 
          />
          
          <Input 
            name="company" 
            type="text" 
            placeholder="Company Name *" 
            required
            value={formData.company}
            onChange={handleChange} 
            className="h-12 text-sm bg-muted/50 border-border" 
            disabled={isSubmitting} 
          />
          
          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              "Get Free Demo"
            )}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            We'll contact you within 24 hours
          </p>
        </form>
      </div>
    </div>
  );
};

export default HeroForm;
