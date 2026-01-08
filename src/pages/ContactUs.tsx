import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import SEOHead from "@/components/SEOHead";
import { trackLeadConversion } from "@/lib/gtag";
import { executeRecaptcha } from "@/lib/recaptcha";

const ContactUs = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState("+65");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: t("contactUs.info.phone.title"),
      details: ["+971-508293464", "+65-8376 5007", "+91-9513391279"]
    },
    {
      icon: Mail,
      title: t("contactUs.info.email.title"),
      details: ["enquiry@haloocom.com"]
    },
    {
      icon: MapPin,
      title: t("contactUs.info.office.title"),
      details: [t("contactUs.info.office.singapore"), t("contactUs.info.office.uae"), t("contactUs.info.office.india")]
    },
    {
      icon: Clock,
      title: t("contactUs.info.support.title"),
      details: [t("contactUs.info.support.line1"), t("contactUs.info.support.line2")]
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Execute reCAPTCHA
    const recaptchaToken = await executeRecaptcha("contact_page");
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
      email: formData.email.trim() || null
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

    // Track Google Ads conversion
    trackLeadConversion("Contact Page");

    try {
      await supabase.functions.invoke("send-lead-notification", {
        body: { ...leadData, source: "Contact Page" }
      });
    } catch (emailError) {
      console.error("Email notification error:", emailError);
    }

    navigate("/thank-you");
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Haloocom",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+65-83765007",
          "contactType": "sales",
          "areaServed": "SG"
        },
        {
          "@type": "ContactPoint",
          "telephone": "+971-508293464",
          "contactType": "sales",
          "areaServed": "AE"
        }
      ]
    }
  };

  return (
    <>
      <SEOHead 
        title="Contact Haloo Connect | Get Free Demo - Call Center Software"
        description="Contact Haloocom for a free demo of Connect 6.0. Call +65-83765007 (Singapore), +971-508293464 (UAE). 24/7 support available. Get started in 30 minutes."
        keywords="contact Haloocom, call center demo, contact center consultation, free demo, sales inquiry"
        canonical="https://halooconnect.com/contact"
        schema={contactSchema}
      />
      <main className="min-h-screen">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                {t("contactUs.label")}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
                {t("contactUs.hero.title")} <span className="text-gradient">{t("contactUs.hero.titleHighlight")}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                {t("contactUs.hero.description")}
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
                    {t("contactUs.form.sectionLabel")}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                    {t("contactUs.form.title")}
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    {t("contactUs.form.description")}
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{t("contactUs.sidebar.callUs")}</h3>
                        <div className="text-muted-foreground text-sm flex flex-col space-y-1">
                          {["+65-83765007", "+971-504298422", "+91-9513391279"].map((num, i) => (
                            <span key={i}>{num}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{t("contactUs.sidebar.emailUs")}</h3>
                        <p className="text-muted-foreground">enquiry@haloocom.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{t("contactUs.sidebar.support")}</h3>
                        <p className="text-muted-foreground">{t("contactUs.sidebar.supportDesc")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="bg-card rounded-2xl p-8 shadow-elevated border border-border/50">
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    {t("contactUs.form.formTitle")}
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("form.name")}
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

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("form.email")}
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

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("form.phone")} *
                      </label>
                      <div className="flex">
                        <CountryCodeSelect value={countryCode} onChange={setCountryCode} />
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

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("form.company")}
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

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("form.message")}
                      </label>
                      <Textarea
                        name="message"
                        placeholder={t("contactUs.form.messagePlaceholder")}
                        rows={4}
                        value={formData.message}
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
                          {t("form.submitting")}
                        </>
                      ) : (
                        <>
                          {t("contactUs.form.submitButton")}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      {t("contactUs.form.disclaimer")}
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
    </>
  );
};

export default ContactUs;
