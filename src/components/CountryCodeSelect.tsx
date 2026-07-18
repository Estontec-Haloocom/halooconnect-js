import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const countryNames =
  typeof Intl !== "undefined" && "DisplayNames" in Intl
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

const preferredCountryByCode: Record<string, string> = {
  "+1": "US",
  "+44": "GB",
  "+61": "AU",
  "+7": "RU",
};

const countries = getCountries()
  .map((country) => {
    const code = `+${getCountryCallingCode(country)}`;
    const name = countryNames?.of(country) || country;

    return {
      code,
      country,
      name,
      searchValue: `${country} ${name} ${code}`,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export const getPlaceholderPhone = (countryCode: string) => {
  switch (countryCode) {
    case "+1": return "201 555 0123";
    case "+44": return "7400 123456";
    case "+63": return "917 123 4567";
    case "+65": return "8376 5007";
    case "+971": return "50 429 8422";
    case "+60": return "12 345 6789";
    case "+91": return "95133 91279";
    default: return "Phone number";
  }
};

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const CountryCodeSelect = ({ value, onChange, disabled = false }: CountryCodeSelectProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCountryIso, setSelectedCountryIso] = useState<string>();
  const preferredCountry = preferredCountryByCode[value];
  const selectedCountry =
    countries.find((country) => country.code === value && country.country === selectedCountryIso) ||
    countries.find((country) => country.code === value && country.country === preferredCountry) ||
    countries.find((country) => country.code === value) ||
    countries.find((country) => country.country === "IN") ||
    countries[0];

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          aria-expanded={open}
          className="h-10 min-w-[92px] justify-between gap-2 rounded-l-lg rounded-r-none border-r-0 px-3 text-foreground sm:h-11 sm:min-w-[104px]"
        >
          <span className="text-xs font-semibold sm:text-sm">{selectedCountry.country}</span>
          <span className="text-xs font-medium sm:text-sm">{selectedCountry.code}</span>
          {!disabled && <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[min(22rem,calc(100vw-2rem))] p-0">
        <Command>
          <CommandInput placeholder="Search country or code..." />
          <CommandList className="max-h-72">
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.country}
                  value={country.searchValue}
                  onSelect={() => {
                    setSelectedCountryIso(country.country);
                    onChange(country.code);
                    setOpen(false);
                  }}
                  className="gap-3"
                >
                  <Check
                    className={cn(
                      "h-4 w-4 shrink-0",
                      selectedCountry.country === country.country ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="w-8 shrink-0 text-sm font-semibold text-foreground">{country.country}</span>
                  <span className="min-w-0 flex-1 truncate text-sm text-foreground">{country.name}</span>
                  <span className="shrink-0 text-sm text-muted-foreground">{country.code}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountryCodeSelect;
