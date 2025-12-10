import { useEffect } from "react";
import { Globe } from "lucide-react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages?: string;
            layout?: number;
            autoDisplay?: boolean;
          },
          elementId: string
        ) => void;
      };
    };
  }
}

const TranslateWidget = () => {
  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ar,ms,zh-CN,hi,ta,ml,te",
          layout: 0,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Check if script already exists
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript();
    }
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div id="google_translate_element" className="translate-widget" />
      <style>{`
        .translate-widget .goog-te-gadget {
          font-family: inherit !important;
          font-size: 0 !important;
        }
        .translate-widget .goog-te-gadget-simple {
          background-color: transparent !important;
          border: 1px solid hsl(var(--border)) !important;
          border-radius: 6px !important;
          padding: 4px 8px !important;
          font-size: 12px !important;
        }
        .translate-widget .goog-te-gadget-simple span {
          color: hsl(var(--muted-foreground)) !important;
          font-size: 12px !important;
        }
        .translate-widget .goog-te-gadget-simple:hover {
          border-color: hsl(var(--primary)) !important;
        }
        .translate-widget .goog-te-gadget img {
          display: none !important;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default TranslateWidget;
