import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BUSINESS_TYPES = [
  "Healthcare",
  "Insurance",
  "Real Estate",
  "E-commerce",
  "SaaS",
  "Other",
];

interface AnalysisHeroProps {
  onSubmit: (data: { company: string; website: string; businessType: string }) => void;
}

const AnalysisHero = ({ onSubmit }: AnalysisHeroProps) => {
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!company.trim()) e.company = "Company name is required";
    if (!website.trim()) e.website = "Website URL is required";
    else if (!/^https?:\/\/.+\..+/i.test(website.trim()) && !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(website.trim()))
      e.website = "Enter a valid URL";
    if (!businessType) e.businessType = "Select a business type";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ company: company.trim(), website: website.trim(), businessType });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-[800px] text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-sm font-medium text-primary mb-8"
        >
          <Sparkles className="w-4 h-4" />
          AI-Powered Analysis
        </motion.div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
          Analyze Your AI Contact Center{" "}
          <span className="text-gradient">Readiness in 60 Seconds</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] mx-auto mb-12">
          Discover automation gaps, missed call risks, AI voice bot opportunities, and revenue leakage.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-elevated space-y-5 text-left"
        >
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Company Name</label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Acme Corp"
              className={errors.company ? "border-destructive" : ""}
            />
            {errors.company && <p className="text-sm text-destructive mt-1">{errors.company}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Website URL</label>
            <Input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="e.g. https://acme.com"
              className={errors.website ? "border-destructive" : ""}
            />
            {errors.website && <p className="text-sm text-destructive mt-1">{errors.website}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Business Type</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className={`flex h-12 w-full rounded-xl border-2 bg-background px-4 py-3 text-base transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                errors.businessType ? "border-destructive" : "border-border focus-visible:border-primary"
              }`}
            >
              <option value="">Select business type</option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.businessType && <p className="text-sm text-destructive mt-1">{errors.businessType}</p>}
          </div>

          <Button type="submit" variant="hero" size="xl" className="w-full mt-4">
            Check My AI Readiness Score
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AnalysisHero;
