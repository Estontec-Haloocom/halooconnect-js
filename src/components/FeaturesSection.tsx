import { useTranslation } from "react-i18next";
import { Phone, MessageCircle, Bot, BarChart3, Users, Globe, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Phone,
      title: t("features.voice"),
      description: t("features.voiceDesc")
    },
    {
      icon: MessageCircle,
      title: t("features.omnichannel"),
      description: t("features.omnichannelDesc")
    },
    {
      icon: Bot,
      title: t("features.ai"),
      description: t("features.aiDesc")
    },
    {
      icon: BarChart3,
      title: t("features.analytics"),
      description: t("features.analyticsDesc")
    },
    {
      icon: Users,
      title: t("features.crm"),
      description: t("features.crmDesc")
    },
    {
      icon: Globe,
      title: t("features.social"),
      description: t("features.socialDesc")
    }
  ];

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <section className="py-20 md:py-28 bg-muted/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2" />
      
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-card p-6 rounded-xl border border-border/50 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Button onClick={scrollToForm} variant="hero" size="lg">
            <Headphones className="w-5 h-5" />
            {t("features.scheduleDemo")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;