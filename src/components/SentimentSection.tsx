import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Real-Time Transcription",
    description: "Every call is automatically transcribed with industry-leading accuracy, creating searchable text records.",
  },
  {
    number: "02",
    title: "Sentiment Detection",
    description: "Our AI analyzes emotional tone, detecting frustration, satisfaction, or urgency.",
  },
  {
    number: "03",
    title: "Intelligent Scoring",
    description: "Automated quality audits score agent performance against customizable criteria and compliance standards.",
  },
  {
    number: "04",
    title: "Actionable Summaries",
    description: "AI-generated call summaries highlight key points, outcomes, and follow-up actions needed.",
  },
];

const SentimentSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary/20 via-primary/10 to-muted overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-secondary/30 to-primary/20 flex items-center justify-center">
                  <div className="w-1/2 h-1/2 rounded-full bg-gradient-to-br from-primary/30 to-secondary/40" />
                </div>
              </div>
              {/* AI Face Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[120px] md:text-[180px] opacity-20 select-none">🤖</div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Advanced Sentiment Analysis <span className="text-gradient">& Quality Assurance</span>
            </h2>

            <div className="space-y-6 mb-8">
              {steps.map((step) => (
                <div key={step.number} className="border-l-2 border-primary/30 pl-6 hover:border-primary transition-colors">
                  <span className="text-primary/50 text-sm font-medium">{step.number}</span>
                  <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mb-6">
              Transform quality assurance from a time-consuming manual process into an intelligent, scalable system that provides coaching opportunities and ensures compliance across every interaction.
            </p>

            <Button
              variant="hero"
              size="lg"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SentimentSection;