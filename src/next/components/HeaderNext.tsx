"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import logo from "@/assets/haloo-connect-logo.png";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { trackDemoClick } from "@/lib/gtag";
import LanguageSelectorNext from "./LanguageSelectorNext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HeaderNext = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.aboutUs"), href: "/about" },
    { label: t("footer.blog"), href: "/blog" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const regionLinks = [
    { label: t("nav.uae"), href: "/uae" },
    { label: t("nav.singapore"), href: "/singapore" },
    { label: t("nav.malaysia"), href: "/malaysia" },
    { label: "Philippines", href: "/philippines" },
  ];

  const scrollToForm = () => {
    trackDemoClick("Header");
    if (pathname === "/") {
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    router.push("/#contact-form");
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link href="/" prefetch={false}>
          <img src={logo.src} alt="Haloo Connect" className="h-8 w-auto md:h-10" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {t("nav.regions")} <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {regionLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href} prefetch={false} className="cursor-pointer">
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <LanguageSelectorNext />
          </div>
          <Button onClick={scrollToForm} variant="default" size="sm" className="hidden md:flex">
            {t("nav.getFreeDemo")}
          </Button>

          <button
            className="p-2 md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border/50 bg-background md:hidden">
          <nav className="container flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className={`py-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border/50 pt-4">
              <p className="mb-2 text-xs text-muted-foreground">{t("nav.regions")}</p>
              {regionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  className="block py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-2">
              <LanguageSelectorNext />
            </div>
            <Button
              onClick={() => {
                scrollToForm();
                setIsMenuOpen(false);
              }}
              variant="default"
              size="sm"
              className="mt-2 w-full"
            >
              {t("nav.getFreeDemo")}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderNext;
