const clients = [
  "Bluedart", "VU", "CNN", "KDC", "Delhivery", "Microfinance",
  "Quess", "Exim", "TVS", "SMC", "TVF", "Plus91", "Timex"
];

const ClientsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by <span className="text-gradient">Industry Leaders</span> Worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            Connect 6.0 powers customer interactions for leading organizations across diverse sectors. Our proven platform is trusted by global brands for its reliability, innovation, and impact on the customer experience.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 items-center">
          {clients.map((client) => (
            <div
              key={client}
              className="bg-card rounded-xl p-4 md:p-6 border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg flex items-center justify-center"
            >
              <span className="text-muted-foreground font-medium text-sm md:text-base">{client}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12">
          Join the ranks of businesses transforming their customer experience with Connect 6.0.
        </p>
      </div>
    </section>
  );
};

export default ClientsSection;