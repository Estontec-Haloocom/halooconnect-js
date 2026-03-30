"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeaderNext from "@/next/components/HeaderNext";
import FooterNext from "@/next/components/FooterNext";
import AnalysisHero from "@/components/analysis/AnalysisHero";
import ScanningScreen from "@/components/analysis/ScanningScreen";
import AnalysisReport from "@/components/analysis/AnalysisReport";
import LeadCaptureModal from "@/components/analysis/LeadCaptureModal";
import { supabaseNext } from "@/integrations/supabase/next-client";

type Step = "form" | "scanning" | "report";

const calculateScore = (): number => Math.floor(Math.random() * 27) + 32;

const AnalysisPageNext = () => {
  const [step, setStep] = useState<Step>("form");
  const [analysisData, setAnalysisData] = useState({
    company: "",
    website: "",
    businessType: "",
  });
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = useCallback(
    async (data: { company: string; website: string; businessType: string }) => {
      setAnalysisData(data);
      const nextScore = calculateScore();
      setScore(nextScore);
      setStep("scanning");

      try {
        await supabaseNext.from("analysis_leads").insert({
          company_name: data.company,
          website: data.website,
          business_type: data.businessType,
          readiness_score: nextScore,
        });
      } catch {
        // non-blocking
      }
    },
    [],
  );

  return (
    <>
      <HeaderNext />
      <main className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div key="form" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <AnalysisHero onSubmit={handleFormSubmit} />
            </motion.div>
          )}
          {step === "scanning" && (
            <motion.div key="scanning" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <ScanningScreen
                companyName={analysisData.company}
                onComplete={() => setStep("report")}
              />
            </motion.div>
          )}
          {step === "report" && (
            <motion.div
              key="report"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnalysisReport
                data={analysisData}
                score={score}
                onUnlock={() => setShowModal(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <LeadCaptureModal
        open={showModal}
        onClose={() => setShowModal(false)}
        analysisData={analysisData}
        score={score}
      />
      <FooterNext />
    </>
  );
};

export default AnalysisPageNext;
