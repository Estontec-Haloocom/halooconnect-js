import { useTranslation } from "react-i18next";
import { TrendingUp, Clock, Award, Globe } from "lucide-react";

const StatsSection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: TrendingUp,
      value: "40%",
      label: t("stats.productivity"),
      description: t("stats.productivityDesc")
    },
    {
      icon: Clock,
      value: "30min",
      label: t("stats.setup"),
      description: t("stats.setupDesc")
    },
    {
      icon: Award,
      value: "99.9%",
      label: t("stats.uptime"),
      description: t("stats.uptimeDesc")
    },
    {
      icon: Globe,
      value: "5+",
      label: t("stats.countries"),
      description: t("stats.countriesDesc")
    }
  ];

  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">{stat.value}</div>
              <div className="text-primary-foreground font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-primary-foreground/60">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;