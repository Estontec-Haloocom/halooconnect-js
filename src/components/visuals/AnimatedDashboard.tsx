import { useEffect, useState } from "react";

const AnimatedDashboard = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const bars = [72, 85, 63, 91, 78, 55, 88, 67, 94, 80, 70, 86];

  return (
    <div className="relative w-full h-full min-h-[300px] bg-gradient-to-br from-secondary/5 via-background to-primary/5 rounded-3xl p-6 overflow-hidden">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-4 rounded-2xl bg-background/60 backdrop-blur-xl border border-border/50 shadow-elevated" />

      {/* Floating orbs */}
      <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-primary/15 blur-xl animate-float" />
      <div className="absolute bottom-12 left-6 w-16 h-16 rounded-full bg-secondary/20 blur-xl animate-float animation-delay-300" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col gap-4 p-4">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
            <div className="h-3 w-24 rounded-full bg-secondary/20" />
          </div>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary/40" />
            <div className="w-2 h-2 rounded-full bg-secondary/40" />
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Active", value: "2.4K", color: "bg-primary/10 border-primary/20" },
            { label: "Resolved", value: "87%", color: "bg-secondary/10 border-secondary/20" },
            { label: "Avg Time", value: "1.8s", color: "bg-primary/10 border-primary/20" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl ${stat.color} border backdrop-blur-sm p-3 text-center`}
            >
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Animated bar chart */}
        <div className="flex-1 flex items-end gap-1.5 px-2">
          {bars.map((height, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end">
              <div
                className="rounded-t-sm transition-all duration-700 ease-out"
                style={{
                  height: `${height * ((progress + i * 8) % 100) / 100}%`,
                  minHeight: "4px",
                  background: i % 2 === 0
                    ? "hsl(358 83% 50% / 0.6)"
                    : "hsl(233 65% 27% / 0.5)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom line chart simulation */}
        <div className="h-12 relative overflow-hidden rounded-lg bg-muted/30">
          <svg className="w-full h-full" viewBox="0 0 200 48" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(358 83% 50%)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(233 65% 27%)" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(358 83% 50%)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="hsl(358 83% 50%)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 36 Q25 28 50 30 T100 20 T150 24 T200 12"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2"
              className="animate-pulse"
            />
            <path
              d="M0 36 Q25 28 50 30 T100 20 T150 24 T200 12 V48 H0 Z"
              fill="url(#areaGrad)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnimatedDashboard;
