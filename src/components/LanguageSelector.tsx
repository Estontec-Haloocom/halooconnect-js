import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇦🇪" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾" },
];

// Map routes to suggested languages
const routeLanguageMap: Record<string, string> = {
  "/uae": "ar",
  "/malaysia": "ms",
  "/singapore": "en",
};

const LanguageSelector = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<Language>(
    languages.find((l) => l.code === i18n.language) || languages[0]
  );
  const [suggestedLang, setSuggestedLang] = useState<Language | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);

  // Check for suggested language based on route
  useEffect(() => {
    const suggestedCode = routeLanguageMap[location.pathname];
    if (suggestedCode && currentLang.code === "en") {
      const suggested = languages.find((l) => l.code === suggestedCode);
      if (suggested) {
        setSuggestedLang(suggested);
        setShowSuggestion(true);
        // Auto-hide suggestion after 10 seconds
        const timer = setTimeout(() => setShowSuggestion(false), 10000);
        return () => clearTimeout(timer);
      }
    } else {
      setSuggestedLang(null);
      setShowSuggestion(false);
    }
  }, [location.pathname, currentLang.code]);

  const changeLanguage = (langCode: string) => {
    const lang = languages.find((l) => l.code === langCode);
    if (lang) {
      setCurrentLang(lang);
      setShowSuggestion(false);
      i18n.changeLanguage(langCode);
      
      // Set RTL for Arabic
      if (langCode === "ar") {
        document.documentElement.dir = "rtl";
      } else {
        document.documentElement.dir = "ltr";
      }
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* Language suggestion toast */}
      {showSuggestion && suggestedLang && (
        <div className="absolute top-full right-0 mt-2 p-3 bg-card border border-border rounded-lg shadow-lg z-50 min-w-[220px] animate-fade-in">
          <p className="text-xs text-muted-foreground mb-2">Translate to:</p>
          <button
            onClick={() => changeLanguage(suggestedLang.code)}
            className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-muted transition-colors text-left"
          >
            <span className="text-lg">{suggestedLang.flag}</span>
            <span className="text-sm font-medium text-foreground">
              {suggestedLang.nativeName}
            </span>
          </button>
          <button
            onClick={() => setShowSuggestion(false)}
            className="text-xs text-muted-foreground hover:text-foreground mt-2 w-full text-center"
          >
            Dismiss
          </button>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2 h-9">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm hidden sm:inline">{currentLang.flag} {currentLang.name}</span>
            <span className="text-lg sm:hidden">{currentLang.flag}</span>
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[180px] bg-popover">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{lang.name}</span>
                  <span className="text-xs text-muted-foreground">{lang.nativeName}</span>
                </div>
              </div>
              {currentLang.code === lang.code && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelector;
