import { useState } from "react";
import { ChevronDown } from "lucide-react";

const countries = [
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
  { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
  { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+971", country: "AE", flag: "🇦🇪", name: "UAE" },
  { code: "+966", country: "SA", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore" },
  { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
  { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
  { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
  { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
  { code: "+55", country: "BR", flag: "🇧🇷", name: "Brazil" },
  { code: "+52", country: "MX", flag: "🇲🇽", name: "Mexico" },
  { code: "+27", country: "ZA", flag: "🇿🇦", name: "South Africa" },
  { code: "+234", country: "NG", flag: "🇳🇬", name: "Nigeria" },
];

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CountryCodeSelect = ({ value, onChange }: CountryCodeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCountry = countries.find(c => c.code === value) || countries[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 h-12 px-3 rounded-l-xl border-2 border-r-0 border-border bg-muted/50 hover:bg-muted transition-colors min-w-[90px]"
      >
        <span className="text-xl">{selectedCountry.flag}</span>
        <span className="text-sm font-medium text-foreground">{selectedCountry.code}</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-card border border-border rounded-xl shadow-elevated z-50">
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onChange(country.code);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-muted transition-colors ${
                  value === country.code ? "bg-primary/10" : ""
                }`}
              >
                <span className="text-xl">{country.flag}</span>
                <span className="text-sm font-medium text-foreground">{country.name}</span>
                <span className="text-sm text-muted-foreground ml-auto">{country.code}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CountryCodeSelect;
