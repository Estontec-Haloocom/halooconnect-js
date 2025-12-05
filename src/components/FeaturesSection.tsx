import { 
  Phone, 
  MessageCircle, 
  Bot, 
  BarChart3, 
  Users, 
  Globe,
  Headphones,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Phone,
    title: "Voice Excellence",
    description: "Predictive dialing, blended call handling, and intelligent routing for maximum agent productivity."
  },
  {
    icon: MessageCircle,
    title: "Omnichannel Messaging",
    description: "WhatsApp, Telegram, Email, SMS - all unified in one powerful platform."
  },
  {
    icon: Bot,
    title: "AI Powered",
    description: "Real-time sentiment analysis, AI scoring, and intelligent call transcription."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Real-time dashboards, performance metrics, and actionable insights."
  },
  {
    icon: Users,
    title: "CRM Integration",
    description: "Seamless integration with popular CRM and ERP systems."
  },
  {
    icon: Globe,
    title: "Social Media",
    description: "Facebook, Instagram integration for complete social engagement."
  }
];

const FeaturesSection = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-muted/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Everything You Need to <span className="text-gradient">Connect Better</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            One platform. Every channel. Unlimited possibilities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border/50 hover:border-primary/30 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Button onClick={scrollToForm} variant="hero" size="lg">
            <Headphones className="w-5 h-5" />
            Schedule Your Demo Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
