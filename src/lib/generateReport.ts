import jsPDF from "jspdf";

interface ReportData {
  companyName: string;
  website: string;
  businessType: string;
  score: number;
  fullName: string;
}

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

const REVENUE: Record<string, string> = {
  Healthcare: "Rs. 18-42 Lakhs",
  Insurance: "Rs. 25-60 Lakhs",
  SaaS: "Rs. 12-35 Lakhs",
  "Real Estate": "Rs. 15-40 Lakhs",
  "E-commerce": "Rs. 20-50 Lakhs",
  Other: "Rs. 15-40 Lakhs",
};

export function generateReport(data: ReportData) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentW = w - margin * 2;
  let y = 20;
  const date = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const addPage = () => {
    doc.addPage();
    y = 20;
    addFooter();
  };

  const checkPage = (needed: number) => {
    if (y + needed > 270) addPage();
  };

  const addFooter = () => {
    const pageNum = doc.getNumberOfPages();
    doc.setFontSize(8);
    doc.setTextColor(160);
    doc.text(`Page ${pageNum}`, w / 2, 290, { align: "center" });
    doc.text("Haloo Connect - AI Contact Center Solutions", margin, 290);
    doc.text(date, w - margin, 290, { align: "right" });
  };

  // --- COVER ---
  doc.setFillColor(26, 31, 113); // Navy
  doc.rect(0, 0, w, 80, "F");

  doc.setTextColor(255);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("AI Contact Center", margin, 35);
  doc.text("Readiness Report", margin, 48);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(data.companyName, margin, 62);
  doc.setFontSize(9);
  doc.text(`Generated on ${date}  |  Prepared for ${data.fullName}`, margin, 70);

  y = 100;
  doc.setTextColor(50);

  // --- EXECUTIVE SUMMARY ---
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 31, 113);
  doc.text("Executive Summary", margin, y);
  y += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80);
  const summary = `This report provides a comprehensive analysis of ${data.companyName}'s AI contact center readiness. Based on our automated assessment of your website (${data.website}) and industry benchmarks for the ${data.businessType} sector, your organization scored ${data.score}/100 on our AI Readiness Index. This indicates significant opportunities for automation, efficiency improvement, and revenue recovery through AI-powered contact center solutions.`;
  const summaryLines = doc.splitTextToSize(summary, contentW);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 5 + 10;

  // --- READINESS SCORE ---
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 31, 113);
  doc.text("Readiness Score", margin, y);
  y += 12;

  // Score box
  doc.setFillColor(245, 245, 250);
  doc.roundedRect(margin, y, contentW, 30, 3, 3, "F");
  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(225, 29, 36);
  doc.text(`${data.score}`, margin + 15, y + 22);
  doc.setFontSize(14);
  doc.setTextColor(120);
  doc.text("/100", margin + 35, y + 22);
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text(`Your ${data.businessType} AI readiness is below industry average.`, margin + 60, y + 15);
  doc.text("Immediate action recommended to prevent further revenue leakage.", margin + 60, y + 22);
  y += 40;

  // --- COMMUNICATION GAP ANALYSIS ---
  checkPage(80);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 31, 113);
  doc.text("Communication Gap Analysis", margin, y);
  y += 10;

  const metrics = [
    ["AI Voice Bot", "Not Installed", "No conversational AI on inbound calls"],
    ["24/7 Call Handling", "Not Available", "After-hours calls go unanswered"],
    ["Missed Call Recovery", "Not Automated", "No callback automation found"],
    ["WhatsApp Automation", "Partial/Missing", "No integrated messaging workflow"],
    ["Lead Qualification", "Low", "Manual screening, no AI scoring"],
    ["Smart Call Routing", "Not Configured", "Skills-based routing absent"],
  ];

  metrics.forEach(([name, status, desc]) => {
    checkPage(14);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(50);
    doc.text(name, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(225, 29, 36);
    doc.text(status, margin + 55, y);
    doc.setTextColor(120);
    doc.text(desc, margin + 95, y);
    y += 8;
  });
  y += 8;

  // --- REVENUE LEAKAGE ---
  checkPage(40);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 31, 113);
  doc.text("Revenue Leakage Estimate", margin, y);
  y += 12;

  doc.setFillColor(255, 245, 245);
  doc.roundedRect(margin, y, contentW, 20, 3, 3, "F");
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(225, 29, 36);
  doc.text(REVENUE[data.businessType] || REVENUE.Other, margin + 10, y + 13);
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text("Estimated annual loss from missed calls, delayed responses, and lost conversions", margin + 80, y + 13);
  y += 30;

  // --- INDUSTRY GAP ---
  checkPage(60);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 31, 113);
  doc.text(`${data.businessType} Industry Benchmark Gaps`, margin, y);
  y += 10;

  const gaps = INDUSTRY_GAPS[data.businessType] || INDUSTRY_GAPS.Other;
  gaps.forEach((gap) => {
    checkPage(8);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(`•  ${gap}`, margin + 5, y);
    y += 7;
  });
  y += 10;

  // --- AI STACK RECOMMENDATION ---
  checkPage(60);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 31, 113);
  doc.text("AI Stack Recommendation", margin, y);
  y += 10;

  const recs = [
    "AI Voice Bot for inbound call handling and qualification",
    "Omnichannel automation (WhatsApp, Voice, Email)",
    "Intelligent call routing with skills-based distribution",
    "Real-time sentiment analysis and agent coaching",
    "Automated missed call recovery with smart callbacks",
    "AI-powered analytics dashboard for performance tracking",
  ];
  recs.forEach((r) => {
    checkPage(8);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80);
    doc.text(`•  ${r}`, margin + 5, y);
    y += 7;
  });
  y += 10;

  // --- 90-DAY PLAN ---
  checkPage(70);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 31, 113);
  doc.text("90-Day Implementation Plan", margin, y);
  y += 12;

  const phases = [
    { title: "Phase 1 (Days 1-30): Foundation", items: ["Deploy AI voice bot on primary line", "Set up WhatsApp business automation", "Configure smart call routing"] },
    { title: "Phase 2 (Days 31-60): Optimization", items: ["Enable sentiment analysis", "Launch missed call recovery", "Implement lead scoring AI"] },
    { title: "Phase 3 (Days 61-90): Scale", items: ["Deploy full omnichannel automation", "Enable predictive analytics", "Launch performance dashboards"] },
  ];

  phases.forEach((phase) => {
    checkPage(30);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(50);
    doc.text(phase.title, margin, y);
    y += 7;
    phase.items.forEach((item) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      doc.text(`•  ${item}`, margin + 8, y);
      y += 6;
    });
    y += 4;
  });

  // --- ROI FORECAST ---
  checkPage(40);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 31, 113);
  doc.text("12-Month ROI Forecast", margin, y);
  y += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80);
  const roiText = `Based on industry data for ${data.businessType} organizations implementing AI contact center solutions, you can expect: 40-60% reduction in missed calls within 60 days, 25-35% improvement in lead conversion rates, 50-70% reduction in average response time, and 3-5x return on investment within 12 months.`;
  const roiLines = doc.splitTextToSize(roiText, contentW);
  doc.text(roiLines, margin, y);

  // Add footer to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter();
  }

  doc.save(`AI-Readiness-Report-${data.companyName.replace(/\s+/g, "-")}.pdf`);
}
