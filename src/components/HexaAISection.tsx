import { Globe, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Globe,
    title: "120+ Languages",
    description: "Interact naturally with customers worldwide in over 120 languages, breaking down communication barriers and expanding your global reach effortlessly.",
  },
  {
    icon: Users,
    title: "Multi-Persona Capability",
    description: "HEXA adapts its personality and approach based on the task – becoming a persuasive sales representative, a patient support specialist, or a firm collections agent as needed.",
  },
  {
    icon: Clock,
    title: "Always Available",
    description: "Provide 24/7 customer service without the overhead, handling routine inquiries while seamlessly escalating complex issues to human agents.",
  },
];

const HexaAISection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/20 to-muted overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center">
                  <div className="w-1/2 h-1/2 rounded-full bg-gradient-to-br from-secondary/30 to-primary/40" />
                </div>
              </div>
              {/* AI Robot Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[120px] md:text-[180px] opacity-25 select-none">🤖</div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet HEXA AI: Your <span className="text-gradient">Multilingual Digital Workforce</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              HEXA AI isn't just a bot – it's a versatile digital employee that speaks your customers' language, literally.
            </p>

            <div className="space-y-6 mb-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-card rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-all"
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="hero"
              size="lg"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Experience HEXA AI
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HexaAISection;