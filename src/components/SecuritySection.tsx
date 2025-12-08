import { Shield, Lock, FileCheck, Database, Heart, CheckCircle } from "lucide-react";

const certifications = [
  {
    icon: Shield,
    title: "ISO Certified",
    description: "Adherence to ISO 9001:2015 for Quality Management and ISO 27001:2013 for Information Security Management, ensuring robust systems and processes.",
  },
  {
    icon: Lock,
    title: "AI Solution: DPDP Act Compliant",
    description: "Our AI solution fully complies with Digital Personal Data Protection (DPDP) Act, ensuring the highest standards of data privacy for Indian users.",
  },
  {
    icon: FileCheck,
    title: "Voice Solution: GDPR Compliant",
    description: "Haloocom's voice solutions meet the rigorous requirements of the General Data Protection Regulation, safeguarding customer privacy in the EU.",
  },
  {
    icon: CheckCircle,
    title: "PCI Compliant",
    description: "Our voice solutions are Payment Card Industry Data Security Standard (PCI DSS) compliant, ensuring secure handling of sensitive payment information.",
  },
  {
    icon: Database,
    title: "Datacenters: SOC 2 Compliant",
    description: "Our data centers undergo independent SOC 2 audits, verifying stringent controls for security, availability, processing integrity, confidentiality, and privacy.",
  },
  {
    icon: Heart,
    title: "HIPPA Compliant",
    description: "Our Healthcare Products are HIPPA Compliant, ensuring data security with an On-Premise deployment.",
  },
];

const SecuritySection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Unwavering Security & <span className="text-gradient">Compliance</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Haloocom is built on a foundation of trust and security. Our platforms and operations adhere to the highest international standards, ensuring your data and communications are always protected.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <cert.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{cert.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{cert.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12">
          Rest assured, your business and customer data are in safe hands with Connect 6.0's comprehensive security framework.
        </p>
      </div>
    </section>
  );
};

export default SecuritySection;