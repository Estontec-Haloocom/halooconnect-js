import logo from "@/assets/haloo-connect-logo.png";
import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <img 
          src={logo} 
          alt="Haloo Connect" 
          className="h-8 md:h-10 w-auto"
        />
        <Button onClick={scrollToForm} variant="default" size="sm">
          Get Free Demo
        </Button>
      </div>
    </header>
  );
};

export default Header;
