import { useEffect, useState } from "react";
import { Server, Cloud, Shield, Zap } from "lucide-react";

interface AnimatedDeploymentProps {
  variant: "on-premise" | "cloud";
}

const AnimatedDeployment = ({ variant }: AnimatedDeploymentProps) => {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const isCloud = variant === "cloud";
  const Icon = isCloud ? Cloud : Server;
  const accentColor = isCloud ? "primary" : "secondary";

  const nodes = isCloud
    ? [
        { icon: Cloud, label: "CDN" },
        { icon: Zap, label: "Edge" },
        { icon: Shield, label: "WAF" },
        { icon: Server, label: "API" },
      ]
    : [
        { icon: Server, label: "Core" },
        { icon: Shield, label: "Firewall" },
        { icon: Zap, label: "Gateway" },
        { icon: Server, label: "DB" },
      ];

  return (
    <div className="relative w-full aspect-video rounded-2xl bg-gradient-to-br from-secondary/5 via-background to-primary/5 overflow-hidden">
      {/* Glassmorphism */}
      <div className="absolute inset-3 rounded-xl bg-background/60 backdrop-blur-xl border border-border/50" />

      {/* Accent orb */}
      <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-${accentColor}/15 blur-xl animate-float`} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 p-4">
        {/* Central icon */}
        <div className={`w-12 h-12 rounded-xl bg-${accentColor}/10 border border-${accentColor}/20 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${accentColor}`} />
        </div>

        {/* Connected nodes */}
        <div className="flex items-center gap-3 w-full justify-center">
          {nodes.map((node, i) => (
            <div key={node.label} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${
                  i === activeNode
                    ? `bg-${accentColor}/20 border border-${accentColor}/40 scale-110`
                    : "bg-muted/30 border border-border/30 scale-100"
                }`}
              >
                <node.icon
                  className={`w-3.5 h-3.5 transition-colors duration-500 ${
                    i === activeNode ? `text-${accentColor}` : "text-muted-foreground/50"
                  }`}
                />
              </div>
              <span className="text-[9px] text-muted-foreground">{node.label}</span>
            </div>
          ))}
        </div>

        {/* Connection lines */}
        <div className="w-3/4 h-1 rounded-full bg-muted/30 relative overflow-hidden">
          <div
            className={`absolute h-full rounded-full bg-${accentColor}/50 transition-all duration-500`}
            style={{
              left: `${(activeNode / 3) * 100}%`,
              width: "25%",
            }}
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-muted-foreground">
            {isCloud ? "99.99% Uptime" : "Secure & Active"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnimatedDeployment;
