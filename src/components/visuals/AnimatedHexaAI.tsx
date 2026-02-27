import { useEffect, useState } from "react";
import { Globe, Users, Clock, Bot } from "lucide-react";

const AnimatedHexaAI = () => {
  const [typingIndex, setTypingIndex] = useState(0);
  const messages = [
    { from: "user", text: "How can I reset my password?" },
    { from: "ai", text: "I'll help you reset it right away! Check your email." },
    { from: "user", text: "Got it, thanks!" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingIndex((prev) => (prev + 1) % (messages.length + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="relative w-full aspect-square rounded-3xl bg-gradient-to-br from-secondary/5 via-background to-primary/5 p-6 overflow-hidden">
      {/* Glassmorphism */}
      <div className="absolute inset-4 rounded-2xl bg-background/60 backdrop-blur-xl border border-border/50 shadow-elevated" />

      {/* Floating orbs */}
      <div className="absolute top-8 left-8 w-20 h-20 rounded-full bg-secondary/15 blur-2xl animate-float" />
      <div className="absolute bottom-6 right-6 w-16 h-16 rounded-full bg-primary/10 blur-xl animate-float animation-delay-300" />

      <div className="relative z-10 h-full flex flex-col p-4 gap-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Hexa AI</div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-muted-foreground">Online</span>
            </div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs transition-all duration-500 ${
                i < typingIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              } ${
                msg.from === "user"
                  ? "self-end bg-primary/10 border border-primary/20 text-foreground"
                  : "self-start bg-secondary/10 border border-secondary/20 text-foreground"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* Typing indicator */}
          {typingIndex < messages.length && (
            <div className="self-start flex items-center gap-1 px-4 py-2.5 rounded-2xl bg-secondary/10 border border-secondary/20">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-secondary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-secondary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Globe, label: "Languages", value: "40+" },
            { icon: Users, label: "Handled", value: "98%" },
            { icon: Clock, label: "Avg Time", value: "0.8s" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center rounded-xl bg-muted/30 backdrop-blur-sm border border-border/30 p-2"
            >
              <stat.icon className="w-3.5 h-3.5 text-primary/60 mx-auto mb-1" />
              <div className="text-xs font-bold text-foreground">{stat.value}</div>
              <div className="text-[9px] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedHexaAI;
