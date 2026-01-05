import { useTranslation } from "react-i18next";
import { 
  Phone, 
  PhoneIncoming, 
  GitBranch, 
  User, 
  Users, 
  Share2, 
  MessageSquare, 
  Link, 
  Brain, 
  BarChart3, 
  LineChart, 
  FileText,
  LucideIcon
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

const features: Feature[] = [
  {
    icon: Phone,
    titleKey: "topFeatures.predictiveDialing",
    descriptionKey: "topFeatures.predictiveDialingDesc",
  },
  {
    icon: PhoneIncoming,
    titleKey: "topFeatures.blendedCalls",
    descriptionKey: "topFeatures.blendedCallsDesc",
  },
  {
    icon: GitBranch,
    titleKey: "topFeatures.ivr",
    descriptionKey: "topFeatures.ivrDesc",
  },
  {
    icon: User,
    titleKey: "topFeatures.stickyAgents",
    descriptionKey: "topFeatures.stickyAgentsDesc",
  },
  {
    icon: Users,
    titleKey: "topFeatures.inbuiltCrm",
    descriptionKey: "topFeatures.inbuiltCrmDesc",
  },
  {
    icon: Share2,
    titleKey: "topFeatures.socialMedia",
    descriptionKey: "topFeatures.socialMediaDesc",
  },
  {
    icon: MessageSquare,
    titleKey: "topFeatures.whatsapp",
    descriptionKey: "topFeatures.whatsappDesc",
  },
  {
    icon: Link,
    titleKey: "topFeatures.thirdPartyCrm",
    descriptionKey: "topFeatures.thirdPartyCrmDesc",
  },
  {
    icon: Brain,
    titleKey: "topFeatures.sentiment",
    descriptionKey: "topFeatures.sentimentDesc",
  },
  {
    icon: BarChart3,
    titleKey: "topFeatures.scoring",
    descriptionKey: "topFeatures.scoringDesc",
  },
  {
    icon: LineChart,
    titleKey: "topFeatures.bi",
    descriptionKey: "topFeatures.biDesc",
  },
  {
    icon: FileText,
    titleKey: "topFeatures.transcription",
    descriptionKey: "topFeatures.transcriptionDesc",
  },
];

const TopFeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("topFeatures.headline")} <span className="text-gradient">Connect 6.0</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("topFeatures.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.titleKey}
              className="flex gap-4 p-4 rounded-xl hover:bg-card transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{t(feature.titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(feature.descriptionKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopFeaturesSection;
