import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Globe, Award, Target, Lightbulb, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { value: "500+", label: "Enterprise Customers" },
  { value: "120K+", label: "Active Users" },
  { value: "5+", label: "Countries" },
  { value: "1K+", label: "Projects Delivered" },
];

const values = [
  {
    icon: Target,
    title: "Customer First",
    description: "We value our customers and their success is our success. We go above and beyond to deliver exceptional solutions.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We bring the hunger for innovation and passion to every project, constantly pushing the boundaries of what's possible.",
  },
  {
    icon: Heart,
    title: "Dedication",
    description: "Our highly competent and professional team is dedicated to implementing the largest telecom projects around the globe.",
  },
];

const AboutUs = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              Powering the Future of <span className="text-gradient">Voice Technology</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Haloocom is at the forefront of AI-powered telecom solutions, revolutionizing how businesses communicate with their customers through cutting-edge voice technology.
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
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                The Amalgamation of AI & Voice Technology
              </h2>
              <p className="text-muted-foreground mb-4">
                The amalgamation of Artificial Intelligence (AI) and voice technology is revolutionizing the way humans interact with machines. Voice technology, once limited to simple phone and chat communication, has evolved dramatically.
              </p>
              <p className="text-muted-foreground mb-4">
                Haloocom, with its proven expertise of serving over 500 customers and 120K+ active users across 5+ countries, has built cutting-edge enterprise communication systems including IP PBX, Unified Communications, and Contact Center software.
              </p>
              <p className="text-muted-foreground mb-6">
                We have transformed Voice Tech with the power of AI, leveraging natural language processing (NLP), machine learning, and deep learning to deliver superior customer experiences.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Get in Touch
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 md:p-12">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <Users className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-bold text-foreground mb-2">Expert Team</h3>
                    <p className="text-sm text-muted-foreground">Highly skilled engineers offering round-the-clock support</p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <Globe className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-bold text-foreground mb-2">Global Reach</h3>
                    <p className="text-sm text-muted-foreground">Serving enterprises across 5+ countries worldwide</p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <Award className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-bold text-foreground mb-2">Industry Leader</h3>
                    <p className="text-sm text-muted-foreground">Largest implementation of enterprise telecom solutions</p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <Lightbulb className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-bold text-foreground mb-2">Innovation</h3>
                    <p className="text-sm text-muted-foreground">Cutting-edge AI-powered voice technology</p>
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
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-muted-foreground">
              Our core values shape everything we do, from product development to customer support.
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join 500+ enterprises who trust Haloocom for their communication needs.
          </p>
          <Link to="/contact">
            <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90 border-white">
              Contact Us Today
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </main>
  );
};

export default AboutUs;
