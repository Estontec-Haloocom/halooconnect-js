"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import HeaderNext from "@/next/components/HeaderNext";
import FooterNext from "@/next/components/FooterNext";
import FloatingCTA from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Phone, Mail, MapPin, Clock, Loader2 } from "lucide-react";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import { CountrySelect, CitySelect } from "@/components/LocationSelect";
import { supabaseNext } from "@/integrations/supabase/next-client";
import { trackLeadConversion } from "@/lib/gtag";
import { executeRecaptcha } from "@/lib/recaptcha";

const ContactPageNext = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("+65");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    { icon: Phone, title: t("contactUs.info.phone.title"), details: ["+971-508293464", "+65-8376 5007", "+91-9513391279"] },
    { icon: Mail, title: t("contactUs.info.email.title"), details: ["enquiry@haloocom.com"] },
    { icon: MapPin, title: t("contactUs.info.office.title"), details: [t("contactUs.info.office.singapore"), t("contactUs.info.office.uae"), t("contactUs.info.office.india")] },
    { icon: Clock, title: t("contactUs.info.support.title"), details: [t("contactUs.info.support.line1"), t("contactUs.info.support.line2")] },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
      toast({ title: t("form.error"), description: "Please select your country.", variant: "destructive" });
      return;
    }
    if (location === "India" && !city) {
      toast({ title: t("form.error"), description: "Please select your city.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    const recaptchaToken = await executeRecaptcha("contact_page");
    if (!recaptchaToken) {
      toast({ title: t("form.error"), description: "reCAPTCHA verification failed. Please try again.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    const { data: verifyData, error: verifyError } = await supabaseNext.functions.invoke("verify-recaptcha", { body: { token: recaptchaToken } });
    if (verifyError || !verifyData?.success) {
      toast({ title: t("form.error"), description: "Security verification failed. Please try again.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    const leadData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      country_code: countryCode,
      company: formData.company.trim() || "Not provided",
      email: formData.email.trim() || null,
      location,
      city: location === "India" ? city : null,
    };

    const { error } = await supabaseNext.from("leads").insert(leadData);
    if (error) {
      toast({ title: t("form.error"), description: t("form.errorMessage"), variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    trackLeadConversion("Contact Page");
    try {
      await supabaseNext.functions.invoke("send-lead-notification", { body: { ...leadData, source: "Contact Page" } });
    } catch (emailError) {
      console.error("Email notification error:", emailError);
    }
    router.push("/thank-you");
  };

  return (
    <main className="min-h-screen">
      <HeaderNext />
      <section className="bg-gradient-to-b from-primary/5 to-background pt-32 pb-20">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">{t("contactUs.label")}</span>
            <h1 className="mt-4 mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              {t("contactUs.hero.title")} <span className="text-gradient">{t("contactUs.hero.titleHighlight")}</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">{t("contactUs.hero.description")}</p>
          </div>
        </div>
      </section>
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info) => (
              <div key={info.title} className="rounded-2xl border border-border/50 bg-card p-6 text-center shadow-soft">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <info.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 font-bold text-foreground">{info.title}</h3>
                <div className="flex flex-col items-center space-y-1">
                  {info.details.map((detail) => <p key={detail} className="text-sm text-muted-foreground">{detail}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">{t("contactUs.form.sectionLabel")}</span>
                <h2 className="mt-3 mb-6 text-3xl font-bold text-foreground md:text-4xl">{t("contactUs.form.title")}</h2>
                <p className="mb-8 text-muted-foreground">{t("contactUs.form.description")}</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10"><Mail className="h-6 w-6 text-primary" /></div>
                    <div><h3 className="mb-1 font-semibold text-foreground">{t("contactUs.sidebar.emailUs")}</h3><p className="text-muted-foreground">enquiry@haloocom.com</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10"><Clock className="h-6 w-6 text-primary" /></div>
                    <div><h3 className="mb-1 font-semibold text-foreground">{t("contactUs.sidebar.support")}</h3><p className="text-muted-foreground">{t("contactUs.sidebar.supportDesc")}</p></div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-elevated">
                <h3 className="mb-6 text-xl font-semibold text-foreground">{t("contactUs.form.formTitle")}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div><label className="mb-2 block text-sm font-medium text-foreground">{t("form.name")}</label><Input name="name" type="text" placeholder="John Smith" required value={formData.name} onChange={handleChange} disabled={isSubmitting} /></div>
                  <div><label className="mb-2 block text-sm font-medium text-foreground">{t("form.email")}</label><Input name="email" type="email" placeholder="john@company.com" value={formData.email} onChange={handleChange} disabled={isSubmitting} /></div>
                  <div><label className="mb-2 block text-sm font-medium text-foreground">{t("form.phone")} *</label><div className="flex"><CountryCodeSelect value={countryCode} onChange={setCountryCode} /><Input name="phone" type="tel" placeholder="8123 4567" required value={formData.phone} onChange={handleChange} className="flex-1 rounded-l-none" disabled={isSubmitting} /></div></div>
                  <div><label className="mb-2 block text-sm font-medium text-foreground">{t("form.company")}</label><Input name="company" type="text" placeholder="Your Company" value={formData.company} onChange={handleChange} disabled={isSubmitting} /></div>
                  <div><label className="mb-2 block text-sm font-medium text-foreground">Country *</label><CountrySelect value={location} onChange={(value) => { setLocation(value); if (value !== "India") setCity(""); }} disabled={isSubmitting} /></div>
                  {location === "India" && <div><label className="mb-2 block text-sm font-medium text-foreground">City *</label><CitySelect value={city} onChange={setCity} disabled={isSubmitting} /></div>}
                  <div><label className="mb-2 block text-sm font-medium text-foreground">{t("form.message")}</label><Textarea name="message" placeholder={t("contactUs.form.messagePlaceholder")} rows={4} value={formData.message} onChange={handleChange} disabled={isSubmitting} /></div>
                  <Button type="submit" variant="hero" size="lg" className="mt-2 w-full" disabled={isSubmitting}>
                    {isSubmitting ? <><Loader2 className="h-5 w-5 animate-spin" />{t("form.submitting")}</> : <>{t("contactUs.form.submitButton")}<ArrowRight className="h-5 w-5" /></>}
                  </Button>
                  <p className="mt-4 text-center text-xs text-muted-foreground">{t("contactUs.form.disclaimer")}</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-border/60 bg-muted/20 py-12">
        <div className="container max-w-4xl space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">TL;DR: Contacting Haloo Connect</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Book a tailored demo based on your team size, channels, and KPIs.</li>
            <li>Review rollout options for cloud migration and AI-assisted workflows.</li>
            <li>Get practical next steps for implementation and measurement.</li>
          </ul>
          <h3 className="text-xl font-semibold text-foreground">
            What should you prepare before a contact center demo?
          </h3>
          <p className="text-muted-foreground">
            Bring your current channel mix, target service levels, and top operational bottlenecks so the team can
            map features and rollout priorities to real business outcomes.
          </p>
          <h3 className="text-xl font-semibold text-foreground">
            How quickly can teams start implementation?
          </h3>
          <p className="text-muted-foreground">
            Pilot timelines vary by integration depth, but most organizations begin with high-impact workflows and
            expand in controlled phases.
          </p>
          <blockquote className="rounded-xl border-l-4 border-primary bg-background px-4 py-3 text-sm italic text-foreground/90">
            "The fastest ROI usually comes from fixing the highest-volume customer journeys first."
          </blockquote>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/analysis" className="font-medium text-primary hover:underline">Run AI Readiness Analyzer</Link>
            <Link href="/blog" className="font-medium text-primary hover:underline">Read Implementation Articles</Link>
            <Link href="/about" className="font-medium text-primary hover:underline">About Haloo Connect</Link>
            <Link href="/thank-you" className="font-medium text-primary hover:underline">View Confirmation Page</Link>
          </div>
        </div>
      </section>
      <FooterNext />
      <FloatingCTA />
    </main>
  );
};

export default ContactPageNext;
