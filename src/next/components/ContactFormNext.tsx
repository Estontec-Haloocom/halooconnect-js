"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import CountryCodeSelect, { getPlaceholderPhone } from "@/components/CountryCodeSelect";
import { CountrySelect, CitySelect } from "@/components/LocationSelect";
import { supabaseNext } from "@/integrations/supabase/next-client";
import { trackLeadConversion } from "@/lib/gtag";
import { executeRecaptcha } from "@/lib/recaptcha";

const ContactFormNext = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState("+65");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

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
        title: "Error",
        description: "Please select your country.",
        variant: "destructive",
      });
      return;
    }

    if (location === "India" && !city) {
      toast({
        title: "Error",
        description: "Please select your city.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const recaptchaToken = await executeRecaptcha("contact_form");
    if (!recaptchaToken) {
      toast({
        title: "Error",
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
        title: "Error",
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
      company: formData.company.trim(),
      email: formData.email.trim(),
      location,
      city: location === "India" ? city : null,
    };

    const { error } = await supabaseNext.from("leads").insert(leadData);
    if (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    trackLeadConversion("Contact Form");
    router.push("/thank-you");

    supabaseNext.functions
      .invoke("send-lead-notification", {
        body: { ...leadData, source: "Contact Form" },
      })
      .catch(console.error);
  };

  const benefits = [
    "Free personalized demo",
    "No credit card required",
    "Setup in under 30 minutes",
    "24/7 dedicated support",
  ];

  return (
    <section id="contact-form" className="bg-background py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Get Started
              </span>
              <h2 className="mt-3 mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Ready to Transform Your <span className="text-gradient">Contact Center?</span>
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Schedule a free demo with our experts and see how Connect 6.0 can
                revolutionize your customer engagement.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-elevated">
              <h3 className="mb-6 text-xl font-semibold text-foreground">
                Request Your Free Demo
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
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
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                    Work Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
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
                      className="flex-1 rounded-l-none"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
                    Company Name *
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Your Company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Country *
                  </label>
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
                </div>

                {location === "India" && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      City *
                    </label>
                    <CitySelect value={city} onChange={setCity} disabled={isSubmitting} />
                  </div>
                )}

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="mt-2 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get Free Demo
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
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

export default ContactFormNext;
