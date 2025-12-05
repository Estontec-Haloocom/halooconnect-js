import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Shield } from "lucide-react";
import CountryCodeSelect from "./CountryCodeSelect";

const HeroForm = () => {
  const { toast } = useToast();
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
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Request Received!",
      description: "Our team will call you within 24 hours.",
    });
    
    setFormData({ name: "", phone: "", company: "" });
    setIsSubmitting(false);
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
          />
        </div>
        
        <Input
          name="company"
          type="text"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          className="h-12"
        />
        
        <Button 
          type="submit" 
          variant="hero" 
          size="lg" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Submitting..."
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
