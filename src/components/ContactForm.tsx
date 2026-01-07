import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import CountryCodeSelect, { getPlaceholderPhone } from "./CountryCodeSelect";
import { trackLeadConversion } from "@/lib/gtag";

const ContactForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState("+65");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    
    const leadData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      country_code: countryCode,
      company: formData.company.trim() || "Not provided",
      email: formData.email.trim() || null,
    };

    const { error } = await supabase.from("leads").insert(leadData);

    if (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    } else {
      // Track Google Ads conversion
      trackLeadConversion("Contact Form");
      
      // Send email notification
      try {
        await supabase.functions.invoke("send-lead-notification", {
          body: { ...leadData, source: "Contact Form" },
        });
      } catch (emailError) {
        console.error("Email notification error:", emailError);
      }
      navigate("/thank-you");
    }
  };

  const benefits = [
    "Free personalized demo",
    "No credit card required",
    "Setup in under 30 minutes",
    "24/7 dedicated support"
  ];

  return (
    <section id="contact-form" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get Started</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Ready to Transform Your <span className="text-gradient">Contact Center?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Schedule a free demo with our experts and see how Connect 6.0 can revolutionize your customer engagement.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Form */}
            <div className="bg-card rounded-2xl p-8 shadow-elevated border border-border/50">
              <h3 className="text-xl font-semibold text-foreground mb-6">Request Your Free Demo</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Smith"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Work Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <div className="flex">
                    <CountryCodeSelect value={countryCode} onChange={setCountryCode} />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={getPlaceholderPhone(countryCode)}
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="rounded-l-none flex-1"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    Company Name
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get Free Demo
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  By submitting, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;