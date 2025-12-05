import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Operations Head",
    company: "TechSolutions India",
    content: "Connect 6.0 transformed our call center operations. We saw a 40% increase in agent productivity within the first month.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Customer Service Manager",
    company: "FinServe Corp",
    content: "The AI sentiment analysis feature is a game-changer. Our customer satisfaction scores improved significantly.",
    rating: 5
  },
  {
    name: "Ahmed Hassan",
    role: "CTO",
    company: "GlobalConnect LLC",
    content: "Seamless integration with our existing CRM and the omnichannel capabilities made migration effortless.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mt-3 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-secondary-foreground/70 text-lg">
            See what our customers say about Connect 6.0
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-secondary-foreground/5 backdrop-blur-sm rounded-2xl p-6 border border-secondary-foreground/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-primary/30 mb-3" />
              
              <p className="text-secondary-foreground/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="border-t border-secondary-foreground/10 pt-4">
                <p className="font-semibold text-secondary-foreground">{testimonial.name}</p>
                <p className="text-sm text-secondary-foreground/60">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={scrollToForm}
            size="lg" 
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Join 500+ Happy Customers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
