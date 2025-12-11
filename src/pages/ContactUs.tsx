import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Phone, Mail, MapPin, Clock, Loader2 } from "lucide-react";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import { supabase } from "@/integrations/supabase/client";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+971-508293464", "+65-8376 5007", "+91-9513391279"]
  },
  {
    icon: Mail,
    title: "Email",
    details: ["enquiry@haloocom.com"]
  },
  {
    icon: MapPin,
    title: "Office",
    details: ["Singapore", "UAE", "India"]
  },
  {
    icon: Clock,
    title: "Support",
    details: ["24/7 Customer Support", "Round the clock assistance"]
  }
];

const ContactUs = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // ✅ Default country = Singapore
  const [countryCode, setCountryCode] = useState("+65");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      country_code: countryCode,
      company: formData.company.trim() || "Not provided",
      email: formData.email.trim() || null
    };

    const { error } = await supabase.from("leads").insert(leadData);

    if (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Send email notification
    try {
      await supabase.functions.invoke("send-lead-notification", {
        body: { ...leadData, source: "Contact Page" }
      });
    } catch (emailError) {
      console.error("Email notification error:", emailError);
    }

    navigate("/thank-you");
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              Let's Start a <span className="text-gradient">Conversation</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to transform your customer engagement? Our team is here to help you get started with Connect 6.0.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="font-bold text-foreground mb-3">{info.title}</h3>

                {/* Vertical spacing for details */}
                <div className="flex flex-col items-center space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Content */}
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Get in Touch
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                  We'd Love to Hear From You
                </h2>
                <p className="text-muted-foreground mb-8">
                  Whether you have a question about our products, pricing, need a demo, or anything else, our team is ready to answer all your questions.
                </p>

                <div className="space-y-6">
                  {/* Call Us */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Call Us</h3>

                      {/* Vertical phone numbers */}
                      <div className="text-muted-foreground text-sm flex flex-col space-y-1">
                        {["+65-83765007", "+971-504298422", "+91-9513391279"].map(
                          (num, i) => (
                            <span key={i}>{num}</span>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                      <p className="text-muted-foreground">enquiry@haloocom.com</p>
                    </div>
                  </div>

                  {/* Support */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">24/7 Support</h3>
                      <p className="text-muted-foreground">We're here to assist you anytime</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-card rounded-2xl p-8 shadow-elevated border border-border/50">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Send us a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      name="name"
                      type="text"
                      placeholder="John Smith"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number *
                    </label>

                    <div className="flex">
                      <CountryCodeSelect value={countryCode} onChange={setCountryCode} />

                      {/* ✅ Default SG placeholder */}
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="8123 4567"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="rounded-l-none flex-1"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company Name
                    </label>
                    <Input
                      name="company"
                      type="text"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Tell us about your requirements..."
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Submit */}
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
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
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

      <Footer />
      <FloatingCTA />
    </main>
  );
};

export default ContactUs;
