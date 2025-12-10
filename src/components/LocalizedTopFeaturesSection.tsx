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
  FileText,
} from "lucide-react";

interface LocalizedTopFeaturesSectionProps {
  country?: string;
}

const getLocalizedFeatures = (country?: string) => {
  const isUAE = country?.includes("UAE") || country?.includes("Dubai");
  const isSingapore = country?.includes("Singapore");
  const isMalaysia = country?.includes("Malaysia");

  return [
    {
      icon: Phone,
      title: "Predictive Dialing",
      description: isUAE
        ? "Maximize agent talk time in UAE call centers with intelligent auto-dialing and live call connection."
        : isSingapore
        ? "Boost Singapore contact center productivity with smart predictive dialing technology."
        : isMalaysia
        ? "Optimize Malaysian call center efficiency with automated predictive dialing solutions."
        : "Maximize agent talk time by automatically dialing numbers and connecting available agents only to live calls.",
    },
    {
      icon: PhoneIncoming,
      title: "Blended Call Handling",
      description: isUAE
        ? "Seamlessly manage inbound and outbound calls for Dubai businesses with intelligent routing."
        : isSingapore
        ? "Handle blended calls efficiently for Singapore enterprises with smart call distribution."
        : isMalaysia
        ? "Unified inbound and outbound call management for Malaysian contact centers."
        : "Seamlessly manage both inbound and outbound calls, optimizing agent productivity and customer service.",
    },
    {
      icon: GitBranch,
      title: "Drag & Drop IVR",
      description: isUAE
        ? "Design Arabic and English IVR menus with intuitive visual interface for UAE customers."
        : isSingapore
        ? "Create multilingual IVR flows for Singapore's diverse customer base with easy visual builder."
        : isMalaysia
        ? "Build Bahasa Melayu and English IVR menus effortlessly for Malaysian customers."
        : "Effortlessly design intuitive interactive voice response menus with a user-friendly visual interface.",
    },
    {
      icon: User,
      title: "Sticky Agents",
      description: isUAE
        ? "Route UAE customers to their preferred agent for personalized Arabic or English service."
        : isSingapore
        ? "Ensure Singapore customers connect with familiar agents for improved satisfaction."
        : isMalaysia
        ? "Connect Malaysian customers with dedicated agents for consistent service experience."
        : "Ensure customers are routed to the same agent for continuity, enhancing personalization and resolution rates.",
    },
    {
      icon: Users,
      title: "Inbuilt CRM",
      description: isUAE
        ? "Access complete customer data for UAE businesses with integrated CRM capabilities."
        : isSingapore
        ? "PDPA-compliant CRM integration for Singapore contact centers with full customer history."
        : isMalaysia
        ? "Comprehensive CRM features for Malaysian enterprises with local data compliance."
        : "Access comprehensive customer data and interaction history directly within the platform for informed service.",
    },
    {
      icon: Share2,
      title: "Social Media Integration",
      description: isUAE
        ? "Engage UAE customers on Instagram, Facebook, and popular Middle East platforms."
        : isSingapore
        ? "Connect with Singapore customers across WeChat, Facebook, Instagram, and more."
        : isMalaysia
        ? "Reach Malaysian customers on Facebook, Instagram, WhatsApp, and local platforms."
        : "Engage customers on popular platforms like Facebook and Instagram for a truly omnichannel experience.",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Business API",
      description: isUAE
        ? "Official WhatsApp Business API for UAE enterprises with Arabic template support."
        : isSingapore
        ? "WhatsApp Business integration for Singapore businesses with multilingual messaging."
        : isMalaysia
        ? "WhatsApp Business API for Malaysian companies with Bahasa Melayu support."
        : "Connect via Email, WhatsApp, and SMS, providing diverse options for customer interaction.",
    },
    {
      icon: Link,
      title: "3rd Party CRM & ERP",
      description: isUAE
        ? "Integrate with SAP, Salesforce, and popular CRM systems used in UAE enterprises."
        : isSingapore
        ? "Seamless integration with Singapore enterprise systems including SAP and Oracle."
        : isMalaysia
        ? "Connect with Malaysian enterprise tools and popular CRM platforms."
        : "Integrate with existing CRM and ERP systems for a unified data view and streamlined workflows.",
    },
    {
      icon: Brain,
      title: "AI Sentiment Analysis",
      description: isUAE
        ? "Real-time Arabic and English sentiment detection for UAE customer interactions."
        : isSingapore
        ? "Multilingual sentiment analysis for Singapore's diverse customer conversations."
        : isMalaysia
        ? "AI-powered sentiment detection in Bahasa Melayu and English for Malaysian customers."
        : "Understand customer emotions in real-time, allowing supervisors to respond proactively.",
    },
    {
      icon: BarChart3,
      title: "AI Scoring Model",
      description: isUAE
        ? "AI-driven agent performance scoring for UAE contact center optimization."
        : isSingapore
        ? "Intelligent scoring system for Singapore contact center quality management."
        : isMalaysia
        ? "Automated performance scoring for Malaysian call center agents."
        : "Utilize AI to evaluate agent performance and customer interactions, driving continuous improvement.",
    },
    {
      icon: LineChart,
      title: "AI Business Intelligence",
      description: isUAE
        ? "Advanced analytics and BI dashboards tailored for UAE business insights."
        : isSingapore
        ? "Enterprise-grade BI analytics for Singapore contact center decision-making."
        : isMalaysia
        ? "Data-driven insights and analytics for Malaysian enterprise optimization."
        : "Gain actionable insights from your data with AI-powered analytics, optimizing strategies and outcomes.",
    },
    {
      icon: FileText,
      title: "Transcription & Summary",
      description: isUAE
        ? "Arabic and English call transcription with AI-generated summaries for UAE compliance."
        : isSingapore
        ? "Multilingual transcription with auto-summaries for Singapore regulatory compliance."
        : isMalaysia
        ? "Bahasa Melayu and English transcription with automated call summaries."
        : "Automatically transcribe voice calls and generate concise summaries for easy review and compliance.",
    },
  ];
};

const LocalizedTopFeaturesSection = ({ country }: LocalizedTopFeaturesSectionProps) => {
  const features = getLocalizedFeatures(country);

  const getHeadline = () => {
    if (country?.includes("UAE") || country?.includes("Dubai")) {
      return "Contact Center Features for UAE";
    }
    if (country?.includes("Singapore")) {
      return "Enterprise Features for Singapore";
    }
    if (country?.includes("Malaysia")) {
      return "Call Center Features for Malaysia";
    }
    return "Top Features of";
  };

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {getHeadline()} <span className="text-gradient">Connect 6.0</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore the innovative functionalities that make Connect 6.0 the leading AI-powered
            contact center solution.
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
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalizedTopFeaturesSection;
