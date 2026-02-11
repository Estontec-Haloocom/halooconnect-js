import { useState } from "react";
import { ChevronDown } from "lucide-react";

const countries = [
  { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore" },
  { code: "+971", country: "AE", flag: "🇦🇪", name: "UAE" },
  { code: "+63", country: "PH", flag: "🇵🇭", name: "Philippines" },
  { code: "+60", country: "MY", flag: "🇲🇾", name: "Malaysia" },
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India" }
];

/**
 * Used by phone input placeholder
 */
export const getPlaceholderPhone = (countryCode: string) => {
  switch (countryCode) {
    case "+65":
      return "8376 5007";
    case "+971":
      return "50 429 8422";
    case "+63":
      return "9123 456 789";
    case "+60":
      return "12 345 6789";
    case "+91":
      return "95133 91279";
    default:
      return "Phone number";
  }
};

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

/**
 * 🔒 Country selector DISABLED (no dropdown)
 * UI stays visible before mobile number
 */
const CountryCodeSelect = ({
  value,
  onChange,
  disabled = true
}: CountryCodeSelectProps) => {
  // Dropdown permanently disabled
  const selectedCountry =
    countries.find(c => c.code === value) || countries[0];

  return (
    <div className="relative">
      <div
        className="flex items-center gap-1 h-10 sm:h-11 px-2 sm:px-3
                   rounded-l-lg border border-r-0 border-input bg-muted
                   min-w-[72px] sm:min-w-[90px] cursor-not-allowed opacity-80"
      >
        <span className="text-base sm:text-xl">
          {selectedCountry.flag}
        </span>
        <span className="text-xs sm:text-sm font-medium text-foreground">
          {selectedCountry.code}
        </span>

        {/* Chevron kept but visually muted */}
        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground opacity-40" />
      </div>
    </div>
  );
};

export default CountryCodeSelect;

