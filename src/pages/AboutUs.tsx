import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Globe, Award, Target, Lightbulb, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const AboutUs = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "500+", label: t("aboutUs.stats.customers") },
    { value: "120K+", label: t("aboutUs.stats.users") },
    { value: "5+", label: t("aboutUs.stats.countries") },
    { value: "1K+", label: t("aboutUs.stats.projects") },
  ];

  const values = [
    {
      icon: Target,
      title: t("aboutUs.values.customerFirst.title"),
      description: t("aboutUs.values.customerFirst.description"),
    },
    {
      icon: Lightbulb,
      title: t("aboutUs.values.innovation.title"),
      description: t("aboutUs.values.innovation.description"),
    },
    {
      icon: Heart,
      title: t("aboutUs.values.dedication.title"),
      description: t("aboutUs.values.dedication.description"),
    },
  ];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Haloocom",
      "description": "AI-powered telecom solutions provider",
      "foundingDate": "2015",
      "numberOfEmployees": "100-500",
      "areaServed": ["Singapore", "UAE", "India", "Malaysia"]
    }
  };

  return (
    <>
      <SEOHead 
        title="About Haloocom | AI-Powered Contact Center Solutions Company"
        description="Learn about Haloocom - the leading AI-powered contact center software company. 500+ enterprise customers, 120K+ users across 5+ countries. Transforming voice technology with AI."
        keywords="about Haloocom, contact center company, AI telecom solutions, enterprise communication, voice technology company"
        canonical="https://halooconnect.com/about"
        schema={aboutSchema}
      />
      <main className="min-h-screen">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                {t("aboutUs.label")}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
                {t("aboutUs.hero.title")} <span className="text-gradient">{t("aboutUs.hero.titleHighlight")}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                {t("aboutUs.hero.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  {t("aboutUs.story.label")}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                  {t("aboutUs.story.title")}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t("aboutUs.story.paragraph1")}
                </p>
                <p className="text-muted-foreground mb-4">
                  {t("aboutUs.story.paragraph2")}
                </p>
                <p className="text-muted-foreground mb-6">
                  {t("aboutUs.story.paragraph3")}
                </p>
                <Link to="/contact">
                  <Button variant="hero" size="lg">
                    {t("aboutUs.story.cta")}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 md:p-12">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-card rounded-2xl p-6 shadow-soft">
                      <Users className="w-10 h-10 text-primary mb-4" />
                      <h3 className="font-bold text-foreground mb-2">{t("aboutUs.features.expertTeam.title")}</h3>
                      <p className="text-sm text-muted-foreground">{t("aboutUs.features.expertTeam.description")}</p>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-soft">
                      <Globe className="w-10 h-10 text-primary mb-4" />
                      <h3 className="font-bold text-foreground mb-2">{t("aboutUs.features.globalReach.title")}</h3>
                      <p className="text-sm text-muted-foreground">{t("aboutUs.features.globalReach.description")}</p>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-soft">
                      <Award className="w-10 h-10 text-primary mb-4" />
                      <h3 className="font-bold text-foreground mb-2">{t("aboutUs.features.industryLeader.title")}</h3>
                      <p className="text-sm text-muted-foreground">{t("aboutUs.features.industryLeader.description")}</p>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-soft">
                      <Lightbulb className="w-10 h-10 text-primary mb-4" />
                      <h3 className="font-bold text-foreground mb-2">{t("aboutUs.features.innovation.title")}</h3>
                      <p className="text-sm text-muted-foreground">{t("aboutUs.features.innovation.description")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                {t("aboutUs.valuesSection.label")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                {t("aboutUs.valuesSection.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("aboutUs.valuesSection.description")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value) => (
                <div key={value.title} className="bg-card rounded-2xl p-8 shadow-soft border border-border/50 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-gradient-to-r from-primary to-secondary">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t("aboutUs.cta.title")}
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              {t("aboutUs.cta.description")}
            </p>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-primary-foreground">
                {t("aboutUs.cta.button")}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>

        <Footer />
        <FloatingCTA />
      </main>
    </>
  );
};

export default AboutUs;
