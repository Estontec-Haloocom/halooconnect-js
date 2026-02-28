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
  Healthcare: [
    "No AI triage system for patient inquiries",
    "No appointment auto-confirmation workflow",
    "No multilingual voice bot for diverse patients",
    "No emergency routing automation",
  ],
  Insurance: [
    "No claims intake automation",
    "No AI lead scoring for policy inquiries",
    "No automated document collection",
    "No renewal reminder automation",
  ],
  "Real Estate": [
    "No AI property inquiry handler",
    "No automated viewing scheduling",
    "No lead nurture sequences",
    "No virtual tour integration",
  ],
  "E-commerce": [
    "No order status voice bot",
    "No AI return/exchange handler",
    "No proactive delivery notification system",
    "No cart abandonment follow-up calls",
  ],
  SaaS: [
    "No AI onboarding call assistant",
    "No automated support ticket triage",
    "No churn prediction call system",
    "No usage-based upsell automation",
  ],
  Other: [
    "No AI call handler detected",
    "No automated workflow for inquiries",
    "No smart routing for departments",
    "No after-hours automation",
  ],
};

const REVENUE_LEAKAGE: Record<string, string> = {
  Healthcare: "₹18–₹42 Lakhs",
  Insurance: "₹25–₹60 Lakhs",
  SaaS: "₹12–₹35 Lakhs",
  "Real Estate": "₹15–₹40 Lakhs",
  "E-commerce": "₹20–₹50 Lakhs",
  Other: "₹15–₹40 Lakhs",
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

const AnalysisReport = ({ data, score, onUnlock }: AnalysisReportProps) => {
  const gaps = INDUSTRY_GAPS[data.businessType] || INDUSTRY_GAPS.Other;
  const leakage = REVENUE_LEAKAGE[data.businessType] || REVENUE_LEAKAGE.Other;

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
            AI Readiness Report
          </h2>
          <p className="text-muted-foreground">{data.company} — {data.website}</p>
        </motion.div>

        {/* Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
              <motion.circle
                cx="60" cy="60" r="52" fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 52}
                initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - score / 100) }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-foreground">{score}</span>
              <span className="text-sm text-muted-foreground font-medium">/100</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3 font-medium">Readiness Score</p>
        </motion.div>

        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-destructive/5 border border-destructive/15 mb-10"
        >
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
          <p className="text-sm font-medium text-foreground">
            No AI Contact Center Platform Detected — Basic communication setup found with no AI automation installed.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.title}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="p-5 rounded-2xl border border-border bg-card shadow-soft"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center">
                  <m.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{m.title}</h3>
              </div>
              <p className="text-sm font-bold text-destructive mb-1">{m.status}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Industry Gap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 md:p-8 rounded-2xl border border-border bg-card shadow-soft mb-8"
        >
          <h3 className="text-lg font-bold text-foreground mb-4">
            {data.businessType} Industry Gap Analysis
          </h3>
          <ul className="space-y-3">
            {gaps.map((gap, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <TrendingDown className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                {gap}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Revenue Leakage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 md:p-8 rounded-2xl border border-primary/15 bg-primary/[0.02] shadow-soft mb-12"
        >
          <p className="text-sm font-medium text-muted-foreground mb-1">Estimated Annual Revenue Leakage</p>
          <p className="text-3xl md:text-4xl font-extrabold text-primary mb-2">{leakage}</p>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
            Based on industry benchmarks for {data.businessType.toLowerCase()} companies without AI contact center automation, accounting for missed calls, delayed responses, and lost lead conversions.
          </p>
        </motion.div>

        {/* Blurred Locked Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="relative rounded-2xl overflow-hidden mb-12"
        >
          {/* Blurred background content */}
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
            <div className="h-20 bg-muted rounded-xl" />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center max-w-md px-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Unlock Full AI Readiness Report
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6 text-left">
                {[
                  "Complete automation score (0–100)",
                  "AI maturity index",
                  "Missed call heatmap estimate",
                  "Competitor benchmark comparison",
                  "90-day AI implementation roadmap",
                  "12-month ROI projection",
                ].map((item) => (
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
