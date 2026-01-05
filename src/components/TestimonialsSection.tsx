import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const testimonials = [
  {
    nameKey: "testimonials.testimonial1.name",
    roleKey: "testimonials.testimonial1.role",
    companyKey: "testimonials.testimonial1.company",
    contentKey: "testimonials.testimonial1.content",
    rating: 5
  },
  {
    nameKey: "testimonials.testimonial2.name",
    roleKey: "testimonials.testimonial2.role",
    companyKey: "testimonials.testimonial2.company",
    contentKey: "testimonials.testimonial2.content",
    rating: 5
  },
  {
    nameKey: "testimonials.testimonial3.name",
    roleKey: "testimonials.testimonial3.role",
    companyKey: "testimonials.testimonial3.company",
    contentKey: "testimonials.testimonial3.content",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const { t } = useTranslation();

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">{t("testimonials.label")}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mt-3 mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-secondary-foreground/70 text-lg">
            {t("testimonials.subtitle")}
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
                "{t(testimonial.contentKey)}"
              </p>
              
              <div className="border-t border-secondary-foreground/10 pt-4">
                <p className="font-semibold text-secondary-foreground">{t(testimonial.nameKey)}</p>
                <p className="text-sm text-secondary-foreground/60">
                  {t(testimonial.roleKey)}, {t(testimonial.companyKey)}
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
            {t("testimonials.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
