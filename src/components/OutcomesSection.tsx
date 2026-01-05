import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface OutcomeCircle {
  value: string;
  titleKey: string;
  descriptionKey: string;
  percentage: number;
}

const outcomes: OutcomeCircle[] = [
  {
    value: "3X",
    titleKey: "outcomes.productivity",
    descriptionKey: "outcomes.productivityDesc",
    percentage: 75,
  },
  {
    value: "5X",
    titleKey: "outcomes.efficiency",
    descriptionKey: "outcomes.efficiencyDesc",
    percentage: 83,
  },
  {
    value: "3X",
    titleKey: "outcomes.dataSpeed",
    descriptionKey: "outcomes.dataSpeedDesc",
    percentage: 75,
  },
  {
    value: "30–50%",
    titleKey: "outcomes.costReduction",
    descriptionKey: "outcomes.costReductionDesc",
    percentage: 50,
  },
];

const CircleProgress = ({
  percentage,
  value,
  isVisible,
  size = 180,
}: {
  percentage: number;
  value: string;
  isVisible: boolean;
  size?: number;
}) => {
  const radius = size / 2;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = isVisible
    ? circumference - (percentage / 100) * circumference
    : circumference;

  const isLongValue = value.length > 3;

  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size }}
    >
      <svg height={size} width={size} className="transform -rotate-90">
        <circle
          stroke="hsl(var(--muted))"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="url(#gradient)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 1.5s ease-out",
          }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`font-bold text-foreground ${
            isLongValue
              ? "text-2xl md:text-3xl"
              : "text-3xl md:text-5xl"
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

const OutcomesSection = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("outcomes.headline")}{" "}
            <span className="text-gradient">Connect 6.0</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("outcomes.description")}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {outcomes.map((outcome) => (
            <div
              key={outcome.titleKey}
              className="text-center flex flex-col items-center"
            >
              <CircleProgress
                percentage={outcome.percentage}
                value={outcome.value}
                isVisible={isVisible}
                size={160}
              />
              <h3 className="text-base md:text-lg font-semibold text-foreground mt-4 mb-2">
                {t(outcome.titleKey)}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                {t(outcome.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutcomesSection;
