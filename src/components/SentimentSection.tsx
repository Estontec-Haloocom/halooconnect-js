import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import sentimentVideo from "@/assets/sentiment-analysis.mp4";

const SentimentSection = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: "01",
      titleKey: "sentiment.step1.title",
      descriptionKey: "sentiment.step1.description",
    },
    {
      number: "02",
      titleKey: "sentiment.step2.title",
      descriptionKey: "sentiment.step2.description",
    },
    {
      number: "03",
      titleKey: "sentiment.step3.title",
      descriptionKey: "sentiment.step3.description",
    },
    {
      number: "04",
      titleKey: "sentiment.step4.title",
      descriptionKey: "sentiment.step4.description",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <video
                src={sentimentVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/30 rounded-full blur-3xl" />
          </div>

          {/* Content Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t("sentiment.title")} <span className="text-gradient">{t("sentiment.titleHighlight")}</span>
            </h2>

            <div className="space-y-6 mb-8">
              {steps.map((step) => (
                <div key={step.number} className="border-l-2 border-primary/30 pl-6 hover:border-primary transition-colors">
                  <span className="text-primary/50 text-sm font-medium">{step.number}</span>
                  <h3 className="font-semibold text-foreground mb-1">{t(step.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm">{t(step.descriptionKey)}</p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mb-6">
              {t("sentiment.description")}
            </p>

            <Button
              variant="hero"
              size="lg"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t("common.learnMore")}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SentimentSection;
