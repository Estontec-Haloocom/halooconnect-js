import { Button } from "@/components/ui/button";
import { ArrowRight, Search, MessageSquare, Filter, TrendingUp } from "lucide-react";
import voiceSearchImage from "@/assets/voice-search-ai.png";

const features = [
  {
    icon: Search,
    text: "Search millions of recordings in seconds",
  },
  {
    icon: MessageSquare,
    text: "Natural language queries that understand context",
  },
  {
    icon: Filter,
    text: "Filter by agent, date, sentiment, or custom parameters",
  },
  {
    icon: TrendingUp,
    text: "Surface trends and patterns automatically",
  },
];

const BusinessIntelligenceSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30 overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            AI-Powered Business Intelligence:{" "}
            <span className="text-gradient">Search at the Speed of Thought</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
              Google-Like Search Across Voice Data
            </h3>
            <p className="text-muted-foreground mb-4">
              Imagine having the power to search through millions of voice recordings as easily as
              searching the web. Connect 6.0's revolutionary AI-based Business Intelligence tool
              transforms your voice data into actionable insights.
            </p>
            <p className="text-muted-foreground mb-6">
              Our advanced text-based search engine indexes every conversation, making it
              effortless to find specific interactions, topics, or customer mentions across your entire
              call history. No more endless listening sessions – just instant, relevant results.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{feature.text}</span>
                </li>
              ))}
            </ul>

            <Button
              variant="hero"
              size="lg"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore BI Features
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={voiceSearchImage}
                alt="AI-Powered Voice Search visualization"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/30 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessIntelligenceSection;
