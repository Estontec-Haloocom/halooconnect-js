import { useEffect, useState } from "react";

const AnimatedSentiment = () => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  const sentiments = [
    { emoji: "😊", label: "Positive", pct: 64, color: "hsl(358 83% 50%)" },
    { emoji: "😐", label: "Neutral", pct: 24, color: "hsl(233 65% 27%)" },
    { emoji: "😟", label: "Negative", pct: 12, color: "hsl(220 9% 46%)" },
  ];

  return (
    <div className="relative w-full aspect-square rounded-3xl bg-gradient-to-br from-secondary/5 via-background to-primary/5 p-6 overflow-hidden">
      {/* Glassmorphism card */}
      <div className="absolute inset-4 rounded-2xl bg-background/60 backdrop-blur-xl border border-border/50 shadow-elevated" />

      {/* Floating accents */}
      <div className="absolute top-6 left-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl animate-float" />
      <div className="absolute bottom-8 right-8 w-20 h-20 rounded-full bg-secondary/15 blur-2xl animate-float animation-delay-300" />

      <div className="relative z-10 h-full flex flex-col justify-between p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-2.5 h-2.5 rounded-full bg-primary transition-all duration-500 ${pulse ? "scale-150 opacity-60" : "scale-100 opacity-100"}`} />
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">Live Sentiment</span>
        </div>

        {/* Donut chart simulation */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-36 h-36 md:w-44 md:h-44">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              {sentiments.map((s, i) => {
                const offset = sentiments.slice(0, i).reduce((a, b) => a + b.pct, 0);
                return (
                  <circle
                    key={s.label}
                    cx="60" cy="60" r="48"
                    fill="none"
                    stroke={s.color}
                    strokeWidth="14"
                    strokeDasharray={`${s.pct * 3.01} ${300 - s.pct * 3.01}`}
                    strokeDashoffset={-offset * 3.01}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                    opacity={0.8}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">64%</span>
              <span className="text-[10px] text-muted-foreground">Positive</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-4">
          {sentiments.map((s) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              <span className="text-[10px] text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Chat bubbles */}
        <div className="space-y-2 mt-4">
          {[
            { text: "Great service!", sentiment: "positive" },
            { text: "Quick resolution", sentiment: "positive" },
          ].map((msg, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 backdrop-blur-sm border transition-all duration-500 ${
                i === 0 ? "bg-primary/5 border-primary/20" : "bg-secondary/5 border-secondary/20"
              } ${pulse && i === 0 ? "translate-x-1" : ""}`}
            >
              <span className="text-xs">😊</span>
              <span className="text-xs text-foreground">{msg.text}</span>
              <span className="ml-auto text-[10px] text-primary font-medium">+{90 + i * 3}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedSentiment;
