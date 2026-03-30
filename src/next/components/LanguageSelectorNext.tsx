"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Globe, ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "EN" },
  { code: "ar", name: "Arabic", nativeName: "Arabic", flag: "AR" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "MS" },
];

const routeLanguageMap: Record<string, string> = {
  "/uae": "ar",
  "/malaysia": "ms",
  "/singapore": "en",
};

const LanguageSelectorNext = () => {
  const pathname = usePathname();
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<Language>(
    languages.find((language) => language.code === i18n.language) || languages[0],
  );
  const [suggestedLang, setSuggestedLang] = useState<Language | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    const suggestedCode = routeLanguageMap[pathname];
    if (suggestedCode && currentLang.code === "en") {
      const suggested = languages.find((language) => language.code === suggestedCode);
      if (suggested) {
        setSuggestedLang(suggested);
        setShowSuggestion(true);
        const timer = setTimeout(() => setShowSuggestion(false), 10000);
        return () => clearTimeout(timer);
      }
    } else {
      setSuggestedLang(null);
      setShowSuggestion(false);
    }
  }, [pathname, currentLang.code]);

  const changeLanguage = (langCode: string) => {
    const lang = languages.find((language) => language.code === langCode);
    if (!lang) {
      return;
    }

    setCurrentLang(lang);
    setShowSuggestion(false);
    i18n.changeLanguage(langCode);
    document.documentElement.dir = langCode === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="relative flex items-center gap-2">
      {showSuggestion && suggestedLang && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[220px] animate-fade-in rounded-lg border border-border bg-card p-3 shadow-lg">
          <p className="mb-2 text-xs text-muted-foreground">Translate to:</p>
          <button
            onClick={() => changeLanguage(suggestedLang.code)}
            className="flex w-full items-center gap-2 rounded-md p-2 text-left transition-colors hover:bg-muted"
          >
            <span className="text-sm font-medium text-foreground">
              {suggestedLang.nativeName}
            </span>
          </button>
          <button
            onClick={() => setShowSuggestion(false)}
            className="mt-2 w-full text-center text-xs text-muted-foreground hover:text-foreground"
          >
            Dismiss
          </button>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-9 gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="hidden text-sm sm:inline">
              {currentLang.flag} {currentLang.name}
            </span>
            <span className="text-sm sm:hidden">{currentLang.flag}</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[180px] bg-popover">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="cursor-pointer"
            >
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{lang.name}</span>
                  <span className="text-xs text-muted-foreground">{lang.nativeName}</span>
                </div>
                {currentLang.code === lang.code && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelectorNext;
