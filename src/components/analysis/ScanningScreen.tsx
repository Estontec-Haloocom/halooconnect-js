import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

const SCAN_STEPS = [
  "Scanning website infrastructure...",
  "Detecting communication stack...",
  "Checking AI automation signals...",
  "Benchmarking against industry competitors...",
  "Calculating missed engagement probability...",
];

interface ScanningScreenProps {
  onComplete: () => void;
  companyName: string;
}

const ScanningScreen = ({ onComplete, companyName }: ScanningScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const duration = 6000;
    const interval = 50;
    const increment = 100 / (duration / interval);
    const stepInterval = duration / SCAN_STEPS.length;

    const timer = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + increment, 100);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
        }
        return next;
      });
    }, interval);

    const stepTimer = setInterval(() => {
      setCurrentStep((s) => {
        if (s >= SCAN_STEPS.length - 1) {
          clearInterval(stepTimer);
          return s;
        }
        return s + 1;
      });
    }, stepInterval);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="inline-flex mb-8"
        >
          <Loader2 className="w-12 h-12 text-primary" />
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Analyzing {companyName}
        </h2>
        <p className="text-muted-foreground mb-10">Please wait while we scan your setup</p>

        {/* Progress bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-8">
          <motion.div
            className="h-full bg-cta-gradient rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="h-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-medium text-muted-foreground"
            >
              {SCAN_STEPS[currentStep]}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="text-xs text-muted-foreground/60 mt-6">{Math.round(progress)}% complete</p>
      </motion.div>
    </div>
  );
};

export default ScanningScreen;
