import { useTranslation } from "react-i18next";
import bluedartLogo from "@/assets/clients/bluedart.webp";
import vuLogo from "@/assets/clients/vu.webp";
import quessLogo from "@/assets/clients/quess.webp";
import tvsLogo from "@/assets/clients/tvs.webp";
import boschLogo from "@/assets/clients/bosch.avif";
import cnnLogo from "@/assets/clients/cnn.avif";
import delhiveryLogo from "@/assets/clients/delhivery.avif";
import godrejLogo from "@/assets/clients/godrej.avif";
import swiggyLogo from "@/assets/clients/swiggy.avif";
import tataLogo from "@/assets/clients/tata.avif";

const clients = [
  { name: "Blue Dart", logo: bluedartLogo },
  { name: "VU", logo: vuLogo },
  { name: "CNN News 18", logo: cnnLogo },
  { name: "Delhivery", logo: delhiveryLogo },
  { name: "Quess", logo: quessLogo },
  { name: "TVS", logo: tvsLogo },
  { name: "Bosch", logo: boschLogo },
  { name: "Godrej", logo: godrejLogo },
  { name: "Swiggy", logo: swiggyLogo },
  { name: "Tata", logo: tataLogo },
];

const ClientsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("clients.title")} <span className="text-gradient">{t("clients.titleHighlight")}</span> {t("clients.titleEnd")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("clients.description")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 items-center">
          {clients.map((client) => (
            <div
              key={client.name}
              className="bg-card rounded-xl p-6 md:p-8 border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg flex items-center justify-center h-24 md:h-32"
            >
              <img 
                src={client.logo} 
                alt={`${client.name} logo`}
                className="max-h-12 md:max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12">
          {t("clients.footer")}
        </p>
      </div>
    </section>
  );
};

export default ClientsSection;
