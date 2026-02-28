import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BUSINESS_TYPES = [
  "Healthcare",
  "Insurance",
  "Real Estate",
  "E-commerce",
  "SaaS",
  "Banking & Finance",
  "Education",
  "Logistics & Supply Chain",
  "Telecom",
  "Hospitality & Travel",
  "Retail",
  "Manufacturing",
  "Automotive",
  "Media & Entertainment",
  "Government & Public Sector",
  "Legal Services",
  "Staffing & HR",
  "Energy & Utilities",
  "Pharma & Life Sciences",
  "Other",
];

interface AnalysisHeroProps {
  onSubmit: (data: { company: string; website: string; businessType: string }) => void;
}

const AnalysisHero = ({ onSubmit }: AnalysisHeroProps) => {
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filtered = useMemo(
    () => BUSINESS_TYPES.filter((t) => t.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const validate = () => {
    const e: Record<string, string> = {};
    if (!company.trim()) e.company = "Required";
    if (!website.trim()) e.website = "Required";
    else if (!/^https?:\/\/.+\..+/i.test(website.trim()) && !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(website.trim()))
      e.website = "Enter a valid URL";
    if (!businessType) e.businessType = "Select one";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ company: company.trim(), website: website.trim(), businessType });
    }
  };

  const selectType = (t: string) => {
    setBusinessType(t);
    setSearch("");
    setDropdownOpen(false);
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[720px]"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight text-center mb-2">
          Is Your Contact Center{" "}
          <span className="text-gradient">AI-Ready?</span>
        </h1>
        <p className="text-sm md:text-base text-muted-foreground text-center mb-6 max-w-[500px] mx-auto">
          Get your free readiness score in 60 seconds.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-5 md:p-8 shadow-elevated space-y-4 text-left"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Company Name</label>
              <Input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme Corp"
                className={`h-10 text-sm ${errors.company ? "border-destructive" : ""}`}
              />
              {errors.company && <p className="text-xs text-destructive mt-0.5">{errors.company}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Website URL</label>
              <Input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="e.g. https://acme.com"
                className={`h-10 text-sm ${errors.website ? "border-destructive" : ""}`}
              />
              {errors.website && <p className="text-xs text-destructive mt-0.5">{errors.website}</p>}
            </div>
          </div>

          {/* Searchable Business Type Dropdown */}
          <div className="relative">
            <label className="block text-xs font-semibold text-foreground mb-1.5">Business Type</label>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center justify-between w-full h-10 rounded-xl border-2 bg-background px-4 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                errors.businessType ? "border-destructive" : "border-border"
              } ${businessType ? "text-foreground" : "text-muted-foreground"}`}
            >
              {businessType || "Select business type"}
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {errors.businessType && <p className="text-xs text-destructive mt-0.5">{errors.businessType}</p>}

            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-elevated overflow-hidden"
              >
                <div className="p-2 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search..."
                      className="w-full h-8 pl-8 pr-3 text-sm rounded-lg bg-muted/50 border-0 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
                      autoFocus
                    />
                  </div>
                </div>
                <div className="max-h-48 overflow-y-auto py-1">
                  {filtered.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-3">No results</p>
                  ) : (
                    filtered.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => selectType(t)}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-muted/50 transition-colors ${
                          businessType === t ? "bg-primary/5 text-primary font-medium" : "text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full mt-2">
            Check My AI Readiness Score
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AnalysisHero;
