import { Phone, MessageCircle, Bot, BarChart3, Users, Globe, Headphones, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
const features = [{
  icon: Phone,
  title: "Voice Excellence",
  description: "Predictive dialing, blended call handling, and intelligent routing for maximum agent productivity."
}, {
  icon: MessageCircle,
  title: "Omnichannel Messaging",
  description: "WhatsApp, Telegram, Email, SMS - all unified in one powerful platform."
}, {
  icon: Bot,
  title: "AI Powered",
  description: "Real-time sentiment analysis, AI scoring, and intelligent call transcription."
}, {
  icon: BarChart3,
  title: "Advanced Analytics",
  description: "Real-time dashboards, performance metrics, and actionable insights."
}, {
  icon: Users,
  title: "CRM Integration",
  description: "Seamless integration with popular CRM and ERP systems."
}, {
  icon: Globe,
  title: "Social Media",
  description: "Facebook, Instagram integration for complete social engagement."
}];
const FeaturesSection = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="py-20 md:py-28 bg-muted/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2" />
      
      <div className="container relative z-10">
        
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {})}
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Button onClick={scrollToForm} variant="hero" size="lg">
            <Headphones className="w-5 h-5" />
            Schedule Your Demo Now
          </Button>
        </div>
      </div>
    </section>;
};
export default FeaturesSection;