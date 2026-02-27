import { useEffect, useState } from "react";
import { Search, MessageSquare, Filter, TrendingUp } from "lucide-react";

const AnimatedVoiceSearch = () => {
  const [activeWave, setActiveWave] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWave((prev) => (prev + 1) % 12);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const waveHeights = [20, 35, 50, 70, 85, 65, 45, 75, 55, 40, 60, 30];

  return (
    <div className="relative w-full h-full min-h-[300px] rounded-3xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-6 overflow-hidden">
      {/* Glassmorphism */}
      <div className="absolute inset-4 rounded-2xl bg-background/60 backdrop-blur-xl border border-border/50 shadow-elevated" />

      {/* Orbs */}
      <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-primary/15 blur-xl animate-float" />
      <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-secondary/15 blur-xl animate-float animation-delay-300" />

      <div className="relative z-10 h-full flex flex-col gap-5 p-4">
        {/* Search bar simulation */}
        <div className="flex items-center gap-2 bg-muted/40 backdrop-blur-sm rounded-xl px-4 py-3 border border-border/50">
          <Search className="w-4 h-4 text-primary/60" />
          <div className="flex-1 flex items-center gap-1">
            <span className="text-sm text-muted-foreground">Search conversations...</span>
            <div className="w-0.5 h-4 bg-primary/50 animate-pulse" />
          </div>
        </div>

        {/* Voice waveform */}
        <div className="flex items-center justify-center gap-1 py-4">
          {waveHeights.map((h, i) => (
            <div
              key={i}
              className="w-2 rounded-full transition-all duration-200"
              style={{
                height: `${i === activeWave ? h : h * 0.4}px`,
                background: i === activeWave
                  ? "hsl(358 83% 50%)"
                  : i % 2 === 0
                  ? "hsl(358 83% 50% / 0.3)"
                  : "hsl(233 65% 27% / 0.3)",
              }}
            />
          ))}
        </div>

        {/* Keyword tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {["billing", "support", "refund", "upgrade"].map((tag, i) => (
            <span
              key={tag}
              className={`text-[10px] px-3 py-1 rounded-full backdrop-blur-sm border ${
                i === 0
                  ? "bg-primary/10 border-primary/20 text-primary"
                  : "bg-secondary/10 border-secondary/20 text-secondary"
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Mini insights */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          {[
            { icon: MessageSquare, label: "Calls Analyzed", value: "12.4K" },
            { icon: TrendingUp, label: "Trending", value: "+23%" },
            { icon: Filter, label: "Topics", value: "48" },
            { icon: Search, label: "Queries", value: "3.2K" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-lg bg-muted/30 backdrop-blur-sm p-2.5 border border-border/30"
            >
              <item.icon className="w-3.5 h-3.5 text-primary/60" />
              <div>
                <div className="text-xs font-semibold text-foreground">{item.value}</div>
                <div className="text-[9px] text-muted-foreground">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedVoiceSearch;
