import { Server, Cloud, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import onPremiseVideo from "@/assets/on-premise-server.mp4";
import onPremisePoster from "@/assets/on-premise-server.png";
import cloudVideo from "@/assets/cloud-deployment.mp4";
import cloudPoster from "@/assets/cloud-deployment.png";

const DeploymentSection = () => {
  const { t } = useTranslation();

  const onPremiseFeatures = [
    t("deployment.onPremise.feature1"),
    t("deployment.onPremise.feature2"),
    t("deployment.onPremise.feature3"),
    t("deployment.onPremise.feature4"),
  ];

  const cloudFeatures = [
    t("deployment.cloud.feature1"),
    t("deployment.cloud.feature2"),
    t("deployment.cloud.feature3"),
    t("deployment.cloud.feature4"),
  ];

  return (
    <section className="py-20 md:py-28 bg-muted/30 overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("deployment.title")}{" "}
            <span className="text-gradient">{t("deployment.titleHighlight")}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* On-Premise */}
          <div className="bg-card rounded-2xl overflow-hidden border border-border/50">
            <div className="aspect-video overflow-hidden">
              <video
                src={onPremiseVideo}
                poster={onPremisePoster}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">{t("deployment.onPremise.title")}</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                {t("deployment.onPremise.description")}
              </p>
              <ul className="space-y-2">
                {onPremiseFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cloud */}
          <div className="bg-card rounded-2xl overflow-hidden border border-border/50">
            <div className="aspect-video overflow-hidden">
              <video
                src={cloudVideo}
                poster={cloudPoster}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Cloud className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">{t("deployment.cloud.title")}</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                {t("deployment.cloud.description")}
              </p>
              <ul className="space-y-2">
                {cloudFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Hybrid Note */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex gap-4 items-start">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">{t("deployment.hybrid.title")}</h4>
            <p className="text-muted-foreground text-sm">
              {t("deployment.hybrid.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeploymentSection;
