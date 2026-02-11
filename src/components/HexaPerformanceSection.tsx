import { useTranslation } from "react-i18next";
import hexaPerformanceVideo from "@/assets/hexa-performance.mp4";
import hexaPerformancePoster from "@/assets/hexa-performance.png";

const HexaPerformanceSection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      value: "87%",
      titleKey: "hexaPerformance.stat1.title",
      descriptionKey: "hexaPerformance.stat1.description",
    },
    {
      value: "3x",
      titleKey: "hexaPerformance.stat2.title",
      descriptionKey: "hexaPerformance.stat2.description",
    },
    {
      value: "65%",
      titleKey: "hexaPerformance.stat3.title",
      descriptionKey: "hexaPerformance.stat3.description",
    },
    {
      value: "<2s",
      titleKey: "hexaPerformance.stat4.title",
      descriptionKey: "hexaPerformance.stat4.description",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      {/* Hero Image */}
      <div className="w-full h-48 md:h-72 overflow-hidden relative mb-12">
        <video
          src={hexaPerformanceVideo}
          poster={hexaPerformancePoster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("hexaPerformance.title")}{" "}
            <span className="text-gradient">{t("hexaPerformance.titleHighlight")}</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {stats.map((stat) => (
            <div key={stat.titleKey} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="font-semibold text-foreground mb-1">{t(stat.titleKey)}</div>
              <p className="text-muted-foreground text-sm">{t(stat.descriptionKey)}</p>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground text-center max-w-4xl mx-auto">
          {t("hexaPerformance.description")}
        </p>
      </div>
    </section>
  );
};

export default HexaPerformanceSection;
