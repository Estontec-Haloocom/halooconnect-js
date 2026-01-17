import { useState } from "react";
import { ChevronDown } from "lucide-react";

const countries = [
  { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore" },
  { code: "+971", country: "AE", flag: "🇦🇪", name: "UAE" },
  { code: "+60", country: "MY", flag: "🇲🇾", name: "Malaysia" },
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
];

export const getPlaceholderPhone = (countryCode: string) => {
  switch (countryCode) {
    case "+65": return "8376 5007";
    case "+971": return "50 429 8422";
    case "+60": return "12 345 6789";
    case "+91": return "95133 91279";
    default: return "8376 5007";
  }
};

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const CountryCodeSelect = ({ value, onChange, disabled = false }: CountryCodeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCountry = countries.find(c => c.code === value) || countries[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center gap-1 h-10 sm:h-11 px-2 sm:px-3 rounded-l-lg border border-r-0 border-input bg-background transition-colors min-w-[72px] sm:min-w-[90px] ${disabled ? 'cursor-default' : 'hover:bg-accent'}`}
      >
        <span className="text-base sm:text-xl">{selectedCountry.flag}</span>
        <span className="text-xs sm:text-sm font-medium text-foreground">{selectedCountry.code}</span>
        {!disabled && <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />}
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
