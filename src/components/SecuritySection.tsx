import { Shield, Lock, FileCheck, Database, Heart, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LucideIcon } from "lucide-react";

interface Certification {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

const certifications: Certification[] = [
  {
    icon: Shield,
    titleKey: "security.iso.title",
    descriptionKey: "security.iso.description",
  },
  {
    icon: Lock,
    titleKey: "security.dpdp.title",
    descriptionKey: "security.dpdp.description",
  },
  {
    icon: FileCheck,
    titleKey: "security.gdpr.title",
    descriptionKey: "security.gdpr.description",
  },
  {
    icon: CheckCircle,
    titleKey: "security.pci.title",
    descriptionKey: "security.pci.description",
  },
  {
    icon: Database,
    titleKey: "security.soc2.title",
    descriptionKey: "security.soc2.description",
  },
  {
    icon: Heart,
    titleKey: "security.hipaa.title",
    descriptionKey: "security.hipaa.description",
  },
];

const SecuritySection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("security.title")} <span className="text-gradient">{t("security.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("security.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.titleKey}
              className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <cert.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{t(cert.titleKey)}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t(cert.descriptionKey)}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12">
          {t("security.footer")}
        </p>
      </div>
    </section>
  );
};

export default SecuritySection;
