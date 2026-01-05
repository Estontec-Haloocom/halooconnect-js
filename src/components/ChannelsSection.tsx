import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Mail, Send, Facebook, Instagram, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const channels = [
  { icon: Phone, nameKey: "channels.voiceCalls", color: "bg-green-500" },
  { icon: MessageCircle, nameKey: "channels.whatsapp", color: "bg-emerald-500" },
  { icon: Mail, nameKey: "channels.email", color: "bg-blue-500" },
  { icon: Send, nameKey: "channels.sms", color: "bg-purple-500" },
  { icon: Facebook, nameKey: "channels.facebook", color: "bg-indigo-500" },
  { icon: Instagram, nameKey: "channels.instagram", color: "bg-pink-500" },
];

const ChannelsSection = () => {
  const { t } = useTranslation();

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Channel Icons */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {channels.map((channel, index) => (
                <div 
                  key={channel.nameKey}
                  className="aspect-square rounded-2xl bg-card shadow-soft border border-border/50 flex flex-col items-center justify-center gap-2 p-4 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl ${channel.color} flex items-center justify-center`}>
                    <channel.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-foreground text-center">{t(channel.nameKey)}</span>
                </div>
              ))}
            </div>
            
            {/* Connecting lines decoration */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full opacity-20" viewBox="0 0 400 300">
                <path d="M100,50 Q200,150 300,50" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
                <path d="M50,150 Q200,100 350,150" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
                <path d="M100,250 Q200,150 300,250" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
              </svg>
            </div>
          </div>
          
          {/* Right - Content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">{t("channels.label")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              {t("channels.title")} <span className="text-gradient">{t("channels.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              {t("channels.description")}
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-foreground">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-primary" />
                </div>
                {t("channels.benefit1")}
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-primary" />
                </div>
                {t("channels.benefit2")}
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-primary" />
                </div>
                {t("channels.benefit3")}
              </li>
            </ul>
            
            <Button onClick={scrollToForm} variant="default" size="lg">
              {t("channels.cta")}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChannelsSection;
