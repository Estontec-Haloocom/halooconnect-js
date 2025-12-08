import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Shield, Loader2 } from "lucide-react";
import CountryCodeSelect from "./CountryCodeSelect";
import { supabase } from "@/integrations/supabase/client";

const HeroForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
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
    
    const { error } = await supabase.from("leads").insert({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      country_code: countryCode,
      company: formData.company.trim() || "Not provided",
    });

    if (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    } else {
      navigate("/thank-you");
    }
  };

  return (
    <div className="bg-card/95 backdrop-blur-md rounded-2xl p-6 shadow-elevated border border-border/50 w-full max-w-md">
      <div className="text-center mb-5">
        <h3 className="text-xl font-bold text-foreground mb-1">Get Free Demo</h3>
        <p className="text-sm text-muted-foreground">Setup in under 30 minutes</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          name="name"
          type="text"
          placeholder="Your Name *"
          required
          value={formData.name}
          onChange={handleChange}
          className="h-12"
          disabled={isSubmitting}
        />
        
        <div className="flex">
          <CountryCodeSelect value={countryCode} onChange={setCountryCode} />
          <Input
            name="phone"
            type="tel"
            placeholder="Mobile Number *"
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
          placeholder="Company Name"
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
              Submitting...
            </>
          ) : (
            <>
              Request Callback
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>
      
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
        <Shield className="w-3.5 h-3.5" />
        <span>Your data is 100% secure with us</span>
      </div>
    </div>
  );
};

export default HeroForm;