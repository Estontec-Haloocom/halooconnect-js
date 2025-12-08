import { 
  Phone, 
  PhoneIncoming, 
  GitBranch, 
  User, 
  Users, 
  Share2, 
  MessageSquare, 
  Link, 
  Brain, 
  BarChart3, 
  LineChart, 
  FileText 
} from "lucide-react";

const features = [
  {
    icon: Phone,
    title: "Predictive Dialing",
    description: "Maximize agent talk time by automatically dialing numbers and connecting available agents only to live calls.",
  },
  {
    icon: PhoneIncoming,
    title: "Blended Call Handling",
    description: "Seamlessly manage both inbound and outbound calls, optimizing agent productivity and customer service.",
  },
  {
    icon: GitBranch,
    title: "Drag & Drop IVR",
    description: "Effortlessly design intuitive interactive voice response menus with a user-friendly visual interface.",
  },
  {
    icon: User,
    title: "Sticky Agents",
    description: "Ensure customers are routed to the same agent for continuity, enhancing personalization and resolution rates.",
  },
  {
    icon: Users,
    title: "Inbuilt CRM",
    description: "Access comprehensive customer data and interaction history directly within the platform for informed service.",
  },
  {
    icon: Share2,
    title: "Social Media Integration",
    description: "Engage customers on popular platforms like Facebook and Instagram for a truly omnichannel experience.",
  },
  {
    icon: MessageSquare,
    title: "Communication Channels",
    description: "Connect via Email, WhatsApp, and SMS, providing diverse options for customer interaction.",
  },
  {
    icon: Link,
    title: "3rd Party CRM & ERP",
    description: "Integrate with existing CRM and ERP systems for a unified data view and streamlined workflows.",
  },
  {
    icon: Brain,
    title: "AI Sentiment Analysis",
    description: "Understand customer emotions in real-time, allowing supervisors to respond proactively.",
  },
  {
    icon: BarChart3,
    title: "AI Scoring Model",
    description: "Utilize AI to evaluate agent performance and customer interactions, driving continuous improvement.",
  },
  {
    icon: LineChart,
    title: "AI Business Intelligence",
    description: "Gain actionable insights from your data with AI-powered analytics, optimizing strategies and outcomes.",
  },
  {
    icon: FileText,
    title: "Transcription & Summary",
    description: "Automatically transcribe voice calls and generate concise summaries for easy review and compliance.",
  },
];

const TopFeaturesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Top Features of <span className="text-gradient">Connect 6.0</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore the innovative functionalities that make Connect 6.0 the leading AI-powered contact center solution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 p-4 rounded-xl hover:bg-card transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopFeaturesSection;