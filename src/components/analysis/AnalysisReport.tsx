import { motion } from "framer-motion";
import {
  AlertTriangle,
  Mic,
  Clock,
  PhoneMissed,
  MessageSquare,
  Users,
  Route,
  Lock,
  TrendingDown,
  Download,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalysisData {
  company: string;
  website: string;
  businessType: string;
}

interface AnalysisReportProps {
  data: AnalysisData;
  score: number;
  onUnlock: () => void;
}

const METRICS = [
  { icon: Mic, title: "AI Voice Bot", status: "Not Installed", desc: "No conversational AI detected on inbound calls" },
  { icon: Clock, title: "24/7 Call Handling", status: "Not Available", desc: "After-hours calls go unanswered" },
  { icon: PhoneMissed, title: "Missed Call Recovery", status: "Not Automated", desc: "No callback or follow-up automation found" },
  { icon: MessageSquare, title: "WhatsApp Automation", status: "Partial / Missing", desc: "No integrated messaging workflow detected" },
  { icon: Users, title: "Lead Qualification", status: "Low", desc: "Manual screening with no AI scoring layer" },
  { icon: Route, title: "Smart Call Routing", status: "Not Configured", desc: "Skills-based routing not implemented" },
];

const INDUSTRY_GAPS: Record<string, string[]> = {
  Healthcare: ["No AI triage system for patient inquiries", "No appointment auto-confirmation workflow", "No multilingual voice bot for diverse patients", "No emergency routing automation"],
  Insurance: ["No claims intake automation", "No AI lead scoring for policy inquiries", "No automated document collection", "No renewal reminder automation"],
  "Real Estate": ["No AI property inquiry handler", "No automated viewing scheduling", "No lead nurture sequences", "No virtual tour integration"],
  "E-commerce": ["No order status voice bot", "No AI return/exchange handler", "No proactive delivery notification system", "No cart abandonment follow-up calls"],
  SaaS: ["No AI onboarding call assistant", "No automated support ticket triage", "No churn prediction call system", "No usage-based upsell automation"],
  "Banking & Finance": ["No AI fraud detection voice system", "No automated KYC verification calls", "No loan inquiry automation", "No transaction alert voice bot"],
  Education: ["No AI enrollment inquiry handler", "No automated class scheduling bot", "No student support automation", "No attendance notification system"],
  "Logistics & Supply Chain": ["No shipment tracking voice bot", "No automated dispatch notifications", "No delivery confirmation automation", "No supplier communication bot"],
  Telecom: ["No AI plan recommendation engine", "No automated outage notification", "No billing inquiry voice bot", "No churn prevention automation"],
  "Hospitality & Travel": ["No AI booking assistant", "No automated check-in/check-out calls", "No guest feedback automation", "No reservation confirmation bot"],
  Retail: ["No order tracking voice bot", "No AI product recommendation calls", "No return/exchange automation", "No loyalty program voice engagement"],
  Manufacturing: ["No supply chain communication bot", "No automated quality alert system", "No vendor coordination automation", "No maintenance scheduling bot"],
  Automotive: ["No AI service booking assistant", "No automated recall notifications", "No test drive scheduling bot", "No customer follow-up automation"],
  "Media & Entertainment": ["No subscription management bot", "No AI content recommendation calls", "No viewer feedback automation", "No event notification system"],
  "Government & Public Sector": ["No citizen inquiry automation", "No AI appointment scheduling", "No automated status update system", "No multilingual support bot"],
  "Legal Services": ["No AI case inquiry handler", "No automated appointment scheduling", "No document request automation", "No client follow-up bot"],
  "Staffing & HR": ["No AI candidate screening calls", "No automated interview scheduling", "No onboarding call automation", "No employee query bot"],
  "Energy & Utilities": ["No outage notification bot", "No billing inquiry automation", "No meter reading confirmation", "No service request voice handler"],
  "Pharma & Life Sciences": ["No AI HCP engagement bot", "No automated adverse event reporting", "No drug information voice handler", "No clinical trial inquiry automation"],
  Other: ["No AI call handler detected", "No automated workflow for inquiries", "No smart routing for departments", "No after-hours automation"],
};

const REVENUE_LEAKAGE: Record<string, string> = {
  Healthcare: "₹18–₹42 Lakhs", Insurance: "₹25–₹60 Lakhs", SaaS: "₹12–₹35 Lakhs",
  "Real Estate": "₹15–₹40 Lakhs", "E-commerce": "₹20–₹50 Lakhs",
  "Banking & Finance": "₹30–₹70 Lakhs", Education: "₹10–₹28 Lakhs",
  "Logistics & Supply Chain": "₹15–₹45 Lakhs", Telecom: "₹22–₹55 Lakhs",
  "Hospitality & Travel": "₹18–₹48 Lakhs", Retail: "₹20–₹50 Lakhs",
  Manufacturing: "₹12–₹38 Lakhs", Automotive: "₹15–₹42 Lakhs",
  "Media & Entertainment": "₹10–₹30 Lakhs", "Government & Public Sector": "₹8–₹25 Lakhs",
  "Legal Services": "₹12–₹35 Lakhs", "Staffing & HR": "₹15–₹40 Lakhs",
  "Energy & Utilities": "₹14–₹38 Lakhs", "Pharma & Life Sciences": "₹20–₹55 Lakhs",
  Other: "₹15–₹40 Lakhs",
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

const AnalysisReport = ({ data, score, onUnlock }: AnalysisReportProps) => {
  const gaps = INDUSTRY_GAPS[data.businessType] || INDUSTRY_GAPS.Other;
  const leakage = REVENUE_LEAKAGE[data.businessType] || REVENUE_LEAKAGE.Other;

  return (
    <div className="min-h-screen py-12 md:py-16 px-4">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-1">AI Readiness Report</h2>
          <p className="text-sm text-muted-foreground">{data.company} — {data.website}</p>
        </motion.div>

        {/* Score */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex flex-col items-center mb-10">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
              <motion.circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--primary))" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 52}
                initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - score / 100) }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-foreground">{score}</span>
              <span className="text-xs text-muted-foreground font-medium">/100</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-medium">Readiness Score</p>
        </motion.div>

        {/* Status Banner */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-destructive/5 border border-destructive/15 mb-8"
        >
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
          <p className="text-sm font-medium text-foreground">
            No AI Contact Center Platform Detected — Basic communication setup found with no AI automation installed.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {METRICS.map((m, i) => (
            <motion.div key={m.title} custom={i} initial="hidden" animate="visible" variants={cardVariants}
              className="p-4 rounded-2xl border border-border bg-card shadow-soft"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center">
                  <m.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{m.title}</h3>
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <XCircle className="w-3.5 h-3.5 text-destructive shrink-0" />
                <p className="text-sm font-bold text-destructive">{m.status}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Industry Gap */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="p-5 md:p-7 rounded-2xl border border-border bg-card shadow-soft mb-6"
        >
          <h3 className="text-base font-bold text-foreground mb-3">{data.businessType} Industry Gap Analysis</h3>
          <ul className="space-y-2.5">
            {gaps.map((gap, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                {gap}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Revenue Leakage */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="p-5 md:p-7 rounded-2xl border border-primary/15 bg-primary/[0.02] shadow-soft mb-10"
        >
          <p className="text-xs font-medium text-muted-foreground mb-1">Estimated Annual Revenue Leakage</p>
          <p className="text-2xl md:text-3xl font-extrabold text-primary mb-1">{leakage}</p>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
            Based on industry benchmarks for {data.businessType.toLowerCase()} companies without AI contact center automation.
          </p>
        </motion.div>

        {/* Blurred Locked Section */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="relative rounded-2xl overflow-hidden mb-10">
          <div className="blur-md pointer-events-none select-none p-8 bg-card border border-border rounded-2xl space-y-4 opacity-60">
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-muted rounded-xl" />
              <div className="h-24 bg-muted rounded-xl" />
              <div className="h-24 bg-muted rounded-xl" />
              <div className="h-24 bg-muted rounded-xl" />
            </div>
            <div className="h-32 bg-muted rounded-xl" />
          </div>
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center max-w-md px-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">Unlock Full AI Readiness Report</h3>
              <ul className="text-sm text-muted-foreground space-y-1.5 mb-5 text-left">
                {["Complete automation score (0–100)", "AI maturity index", "Missed call heatmap estimate", "Competitor benchmark comparison", "90-day AI implementation roadmap", "12-month ROI projection"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button onClick={onUnlock} variant="hero" size="lg" className="w-full">
                <Download className="w-4 h-4" />
                Download Full Report
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalysisReport;
