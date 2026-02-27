import { useEffect, useState } from "react";

const AnimatedPerformance = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 80);
    return () => clearInterval(interval);
  }, []);

  const gaugeValue = 50 + Math.sin(tick * 0.05) * 30;

  return (
    <div className="relative w-full h-48 md:h-72 rounded-none bg-gradient-to-r from-secondary/10 via-background to-primary/10 overflow-hidden">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />

      {/* Floating orbs */}
      <div className="absolute top-4 left-[10%] w-24 h-24 rounded-full bg-primary/10 blur-2xl animate-float" />
      <div className="absolute bottom-4 right-[15%] w-20 h-20 rounded-full bg-secondary/15 blur-2xl animate-float animation-delay-300" />

      <div className="relative z-10 h-full flex items-center justify-center gap-6 md:gap-12 px-6">
        {/* Gauge */}
        <div className="relative w-28 h-28 md:w-40 md:h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(220 13% 91%)" strokeWidth="8" opacity="0.3" />
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke="hsl(358 83% 50%)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${gaugeValue * 3.14} ${314 - gaugeValue * 3.14}`}
              className="transition-all duration-200"
              opacity="0.8"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl md:text-3xl font-bold text-foreground">{Math.round(gaugeValue)}%</span>
            <span className="text-[10px] text-muted-foreground">Efficiency</span>
          </div>
        </div>

        {/* Mini metrics */}
        <div className="flex flex-col gap-3">
          {[
            { label: "Response", value: "1.2s", trend: "↓" },
            { label: "CSAT", value: "4.8", trend: "↑" },
            { label: "FCR", value: "87%", trend: "↑" },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-3 rounded-xl bg-background/60 backdrop-blur-sm border border-border/30 px-4 py-2">
              <div>
                <div className="text-sm font-bold text-foreground">{m.value}</div>
                <div className="text-[10px] text-muted-foreground">{m.label}</div>
              </div>
              <span className={`text-xs ${m.trend === "↑" ? "text-green-500" : "text-primary"}`}>
                {m.trend}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default AnimatedPerformance;
