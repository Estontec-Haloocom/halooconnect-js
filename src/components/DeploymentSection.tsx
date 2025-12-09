import { Server, Cloud, Check } from "lucide-react";
import onPremiseImage from "@/assets/on-premise-server.png";
import cloudImage from "@/assets/cloud-deployment.png";

const onPremiseFeatures = [
  "Complete data sovereignty and control",
  "Enhanced security for sensitive communications",
  "Integration with existing systems",
  "Customizable to unique requirements",
];

const cloudFeatures = [
  "Rapid deployment in days, not months",
  "Predictable, affordable pricing",
  "Automatic updates and scaling",
  "99.9% uptime guarantee",
];

const DeploymentSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30 overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Flexible Deployment:{" "}
            <span className="text-gradient">Your Way, Your Environment</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* On-Premise */}
          <div className="bg-card rounded-2xl overflow-hidden border border-border/50">
            <div className="aspect-video overflow-hidden">
              <img
                src={onPremiseImage}
                alt="On-Premise Server Infrastructure"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">On-Premise Deployment</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                For organizations with strict security requirements or regulatory compliance needs, Connect 6.0 can be deployed entirely within your infrastructure.
              </p>
              <ul className="space-y-2">
                {onPremiseFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cloud */}
          <div className="bg-card rounded-2xl overflow-hidden border border-border/50">
            <div className="aspect-video overflow-hidden">
              <img
                src={cloudImage}
                alt="Cloud Deployment Infrastructure"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Cloud className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Cloud Deployment</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Get up and running quickly with our cloud-hosted solution, offering enterprise-grade capabilities without the infrastructure investment.
              </p>
              <ul className="space-y-2">
                {cloudFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Hybrid Note */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex gap-4 items-start">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Hybrid Options Available:</h4>
            <p className="text-muted-foreground text-sm">
              Combine the best of both worlds with hybrid deployment, keeping sensitive data on-premise while leveraging cloud scalability for peak periods.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeploymentSection;
