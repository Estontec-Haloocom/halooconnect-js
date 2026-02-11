import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "@/assets/haloo-connect-logo.png";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.aboutUs"), href: "/about" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const regionLinks = [
    { label: t("nav.uae"), href: "/uae" },
    { label: t("nav.singapore"), href: "/singapore" },
    { label: t("nav.malaysia"), href: "/malaysia" },
    { label: "Philippines", href: "/philippines" },
  ];

  const scrollToForm = () => {
    if (location.pathname === "/") {
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact-form";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/">
          <img 
            src={logo} 
            alt="Haloo Connect" 
            className="h-8 md:h-10 w-auto"
          />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Regions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {t("nav.regions")} <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {regionLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link to={link.href} className="cursor-pointer">
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <LanguageSelector />
          </div>
          <Button onClick={scrollToForm} variant="default" size="sm" className="hidden md:flex">
            {t("nav.getFreeDemo")}
          </Button>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/50">
          <nav className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium py-2 transition-colors hover:text-primary ${
                  location.pathname === link.href ? "text-primary" : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border/50 pt-4">
              <p className="text-xs text-muted-foreground mb-2">{t("nav.regions")}</p>
              {regionLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium py-2 block transition-colors hover:text-primary text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-2">
              <LanguageSelector />
            </div>
            <Button onClick={() => { scrollToForm(); setIsMenuOpen(false); }} variant="default" size="sm" className="w-full mt-2">
              {t("nav.getFreeDemo")}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;