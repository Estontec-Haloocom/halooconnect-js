import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Shield, Loader2, CheckCircle, Clock, Users, Zap } from "lucide-react";
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
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const {
    t
  } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
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
    const {
      data: verifyData,
      error: verifyError
    } = await supabase.functions.invoke("verify-recaptcha", {
      body: {
        token: recaptchaToken
      }
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
      company: formData.company.trim() || "Not provided"
    };
    const {
      error
    } = await supabase.from("leads").insert(leadData);
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
  return <div className="bg-card/98 backdrop-blur-lg rounded-2xl shadow-elevated border border-border/50 w-full max-w-md overflow-hidden">
      {/* Urgency Banner */}
      <div className="bg-primary/10 border-b border-primary/20 px-4 py-2.5 flex items-center justify-center gap-2">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </div>
        <span className="text-xs font-medium text-primary-foreground">
          <span className="font-bold bg-secondary text-primary-foreground">{recentActivity.count} people</span> from {recentActivity.city} requested demo today
        </span>
      </div>

      <div className="p-6">
        {/* Value Proposition */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3">
            <Zap className="w-3 h-3 text-green-500" />
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">Free 14-Day Trial</span>
          </div>
          <h3 className="text-xl font-bold mb-1 text-primary-foreground">Get Your Personalized Demo</h3>
          <p className="text-sm text-destructive-foreground">See how Connect 6.0 can transform your business</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Input name="name" type="text" placeholder={t("form.name")} required value={formData.name} onChange={handleChange} className="h-12 pl-4 pr-4 text-base" disabled={isSubmitting} />
          </div>
          
          <div className="flex">
            <CountryCodeSelect value={countryCode} onChange={setCountryCode} disabled={fixedCountryCode} />
            <Input name="phone" type="tel" placeholder={getPlaceholderPhone(countryCode)} required value={formData.phone} onChange={handleChange} className="rounded-l-none h-12 flex-1 text-base" disabled={isSubmitting} />
          </div>
          
          <Input name="company" type="text" placeholder={t("form.company")} value={formData.company} onChange={handleChange} className="h-12 text-base" disabled={isSubmitting} />
          
          {/* High-Converting CTA Button */}
          <Button type="submit" variant="hero" size="lg" className="w-full h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow" disabled={isSubmitting}>
            {isSubmitting ? <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </> : <>
                Get My Free Demo
                <ArrowRight className="w-5 h-5 ml-1" />
              </>}
          </Button>

          {/* Trust Signals */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Setup in 30 minutes</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              <span>500+ happy customers</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-green-500" />
              <span>Enterprise security</span>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Trust Bar */}
      <div className="bg-muted/50 border-t border-border/50 px-4 py-3">
        <div className="flex items-center justify-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-card flex items-center justify-center">
                <span className="text-[8px] font-bold text-foreground/70">👤</span>
              </div>)}
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">4.9/5</span> from 500+ reviews
          </div>
        </div>
      </div>
    </div>;
};
export default HeroForm;