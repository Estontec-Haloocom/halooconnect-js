import { Globe, Users, Clock, ArrowRight, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import hexaImage from "@/assets/hexa-ai-assistant.png";

interface Feature {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

const features: Feature[] = [
  {
    icon: Globe,
    titleKey: "hexaAI.feature1.title",
    descriptionKey: "hexaAI.feature1.description",
  },
  {
    icon: Users,
    titleKey: "hexaAI.feature2.title",
    descriptionKey: "hexaAI.feature2.description",
  },
  {
    icon: Clock,
    titleKey: "hexaAI.feature3.title",
    descriptionKey: "hexaAI.feature3.description",
  },
];

const HexaAISection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 bg-muted/30 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={hexaImage}
                alt="HEXA AI Assistant - Multilingual digital workforce"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("hexaAI.title")} <span className="text-gradient">{t("hexaAI.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              {t("hexaAI.description")}
            </p>

            <div className="space-y-6 mb-8">
              {features.map((feature) => (
                <div
                  key={feature.titleKey}
                  className="bg-card rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-all"
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t(feature.titleKey)}</h3>
                      <p className="text-muted-foreground text-sm">{t(feature.descriptionKey)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="hero"
              size="lg"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t("hexaAI.cta")}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HexaAISection;
