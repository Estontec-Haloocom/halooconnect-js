import { Button } from "@/components/ui/button";
import { ArrowRight, Search, MessageSquare, Filter, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import AnimatedVoiceSearch from "@/components/visuals/AnimatedVoiceSearch";

const BusinessIntelligenceSection = () => {
  const { t } = useTranslation();

  const features = [
    { icon: Search, textKey: "businessIntelligence.feature1" },
    { icon: MessageSquare, textKey: "businessIntelligence.feature2" },
    { icon: Filter, textKey: "businessIntelligence.feature3" },
    { icon: TrendingUp, textKey: "businessIntelligence.feature4" },
  ];

  return (
    <section className="py-20 md:py-28 bg-muted/30 overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("businessIntelligence.title")}{" "}
            <span className="text-gradient">{t("businessIntelligence.titleHighlight")}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
              {t("businessIntelligence.subtitle")}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t("businessIntelligence.description1")}
            </p>
            <p className="text-muted-foreground mb-6">
              {t("businessIntelligence.description2")}
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature.textKey} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{t(feature.textKey)}</span>
                </li>
              ))}
            </ul>

            <Button
              variant="hero"
              size="lg"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t("businessIntelligence.cta")}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Animated Visual */}
          <div className="relative">
            <AnimatedVoiceSearch />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessIntelligenceSection;
