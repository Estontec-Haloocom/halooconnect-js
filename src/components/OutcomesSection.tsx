import { useEffect, useRef, useState } from "react";

interface OutcomeCircle {
  value: string;
  title: string;
  description: string;
  percentage: number;
}

const outcomes: OutcomeCircle[] = [
  {
    value: "3X",
    title: "Productivity Boost",
    description: "Increase in overall workforce output and agent effectiveness.",
    percentage: 75,
  },
  {
    value: "5X",
    title: "Operational Efficiency",
    description: "Improvement across all business processes, from handling inquiries to issue resolution.",
    percentage: 83,
  },
  {
    value: "3X",
    title: "Data Processing Speed",
    description: "Faster analysis of customer interactions for quicker insights and decision-making.",
    percentage: 75,
  },
  {
    value: "30-50%",
    title: "Cost Reduction",
    description: "Significant savings on operational expenses through automation and optimized resource allocation.",
    percentage: 50,
  },
];

const CircleProgress = ({ percentage, value, isVisible }: { percentage: number; value: string; isVisible: boolean }) => {
  const radius = 70;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = isVisible ? circumference - (percentage / 100) * circumference : circumference;

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          stroke="hsl(var(--muted))"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress circle */}
        <circle
          stroke="url(#gradient)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{ 
            strokeDashoffset,
            transition: "stroke-dashoffset 1.5s ease-out"
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
        <span className="text-3xl font-bold text-foreground">{value}</span>
      </div>
    </div>
  );
};

const OutcomesSection = () => {
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
            Guaranteed Outcomes with <span className="text-gradient">Connect 6.0</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Connect 6.0 delivers measurable and impactful results across your organization, ensuring a significant return on your investment:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {outcomes.slice(0, 3).map((outcome) => (
            <div key={outcome.title} className="text-center">
              <CircleProgress percentage={outcome.percentage} value={outcome.value} isVisible={isVisible} />
              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">{outcome.title}</h3>
              <p className="text-muted-foreground text-sm">{outcome.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-sm mx-auto text-center">
          <CircleProgress percentage={outcomes[3].percentage} value={outcomes[3].value} isVisible={isVisible} />
          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">{outcomes[3].title}</h3>
          <p className="text-muted-foreground text-sm">{outcomes[3].description}</p>
        </div>
      </div>
    </section>
  );
};

export default OutcomesSection;