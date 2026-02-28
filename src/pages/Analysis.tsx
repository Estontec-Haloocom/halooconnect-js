import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalysisHero from "@/components/analysis/AnalysisHero";
import ScanningScreen from "@/components/analysis/ScanningScreen";
import AnalysisReport from "@/components/analysis/AnalysisReport";
import LeadCaptureModal from "@/components/analysis/LeadCaptureModal";
import { supabase } from "@/integrations/supabase/client";

type Step = "form" | "scanning" | "report";

const calculateScore = (): number => {
  // Base score 32-58 range
  const base = Math.floor(Math.random() * 27) + 32;
  return base;
};

const Analysis = () => {
  const [step, setStep] = useState<Step>("form");
  const [analysisData, setAnalysisData] = useState({ company: "", website: "", businessType: "" });
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = useCallback(
    async (data: { company: string; website: string; businessType: string }) => {
      setAnalysisData(data);
      const s = calculateScore();
      setScore(s);
      setStep("scanning");

      // Store initial scan data
      try {
        await supabase.from("analysis_leads").insert({
          company_name: data.company,
          website: data.website,
          business_type: data.businessType,
          readiness_score: s,
        });
      } catch (e) {
        // non-blocking
      }
    },
    []
  );

  const handleScanComplete = useCallback(() => {
    setStep("report");
  }, []);

  return (
    <>
      <Helmet>
        <title>AI Contact Center Readiness Analyzer | Haloo Connect</title>
        <meta
          name="description"
          content="Analyze your AI contact center readiness in 60 seconds. Discover automation gaps, missed call risks, and revenue leakage."
        />
      </Helmet>

      <Header />

      <main className="bg-gradient-to-b from-background via-muted/30 to-background min-h-screen">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div key="form" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <AnalysisHero onSubmit={handleFormSubmit} />
            </motion.div>
          )}

          {step === "scanning" && (
            <motion.div key="scanning" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <ScanningScreen companyName={analysisData.company} onComplete={handleScanComplete} />
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

      <Footer />
    </>
  );
};

export default Analysis;
