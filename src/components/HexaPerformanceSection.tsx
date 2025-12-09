import hexaPerformanceImage from "@/assets/hexa-performance.png";

const stats = [
  {
    value: "87%",
    title: "Call Resolution Rate",
    description: "HEXA successfully resolves customer inquiries without human intervention",
  },
  {
    value: "3x",
    title: "Capacity Increase",
    description: "Handle triple the customer interactions with the same team size",
  },
  {
    value: "65%",
    title: "Cost Reduction",
    description: "Lower operational expenses while improving customer satisfaction scores",
  },
  {
    value: "<2s",
    title: "Response Time",
    description: "Instant answers that keep customers engaged and satisfied",
  },
];

const HexaPerformanceSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      {/* Hero Image */}
      <div className="w-full h-48 md:h-72 overflow-hidden relative mb-12">
        <img
          src={hexaPerformanceImage}
          alt="HEXA AI in action - Call center performance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            HEXA AI in Action:{" "}
            <span className="text-gradient">Real-World Performance</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {stats.map((stat) => (
            <div key={stat.title} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="font-semibold text-foreground mb-1">{stat.title}</div>
              <p className="text-muted-foreground text-sm">{stat.description}</p>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground text-center max-w-4xl mx-auto">
          HEXA AI delivers measurable results that impact your bottom line. Organizations leveraging our voice bot technology see dramatic improvements
          in efficiency, customer satisfaction, and operational costs within the first quarter of deployment.
        </p>
      </div>
    </section>
  );
};

export default HexaPerformanceSection;
