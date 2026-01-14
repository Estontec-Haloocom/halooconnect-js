import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const countries = [
  { value: "India", label: "India" },
  { value: "UAE", label: "UAE" },
  { value: "Singapore", label: "Singapore" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "Qatar", label: "Qatar" },
  { value: "Bahrain", label: "Bahrain" },
  { value: "Kuwait", label: "Kuwait" },
  { value: "Oman", label: "Oman" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States", label: "United States" },
  { value: "Australia", label: "Australia" },
  { value: "Canada", label: "Canada" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "South Africa", label: "South Africa" },
  { value: "Philippines", label: "Philippines" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Thailand", label: "Thailand" },
  { value: "Vietnam", label: "Vietnam" },
  { value: "Other", label: "Other" },
];

export const indianCities = [
  { value: "Mumbai", label: "Mumbai" },
  { value: "Delhi", label: "Delhi" },
  { value: "Bangalore", label: "Bangalore" },
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Chennai", label: "Chennai" },
  { value: "Kolkata", label: "Kolkata" },
  { value: "Pune", label: "Pune" },
  { value: "Ahmedabad", label: "Ahmedabad" },
  { value: "Jaipur", label: "Jaipur" },
  { value: "Lucknow", label: "Lucknow" },
  { value: "Surat", label: "Surat" },
  { value: "Kanpur", label: "Kanpur" },
  { value: "Nagpur", label: "Nagpur" },
  { value: "Indore", label: "Indore" },
  { value: "Thane", label: "Thane" },
  { value: "Bhopal", label: "Bhopal" },
  { value: "Visakhapatnam", label: "Visakhapatnam" },
  { value: "Patna", label: "Patna" },
  { value: "Vadodara", label: "Vadodara" },
  { value: "Ghaziabad", label: "Ghaziabad" },
  { value: "Ludhiana", label: "Ludhiana" },
  { value: "Agra", label: "Agra" },
  { value: "Nashik", label: "Nashik" },
  { value: "Faridabad", label: "Faridabad" },
  { value: "Meerut", label: "Meerut" },
  { value: "Rajkot", label: "Rajkot" },
  { value: "Varanasi", label: "Varanasi" },
  { value: "Srinagar", label: "Srinagar" },
  { value: "Aurangabad", label: "Aurangabad" },
  { value: "Dhanbad", label: "Dhanbad" },
  { value: "Amritsar", label: "Amritsar" },
  { value: "Navi Mumbai", label: "Navi Mumbai" },
  { value: "Allahabad", label: "Allahabad" },
  { value: "Ranchi", label: "Ranchi" },
  { value: "Howrah", label: "Howrah" },
  { value: "Coimbatore", label: "Coimbatore" },
  { value: "Jabalpur", label: "Jabalpur" },
  { value: "Gwalior", label: "Gwalior" },
  { value: "Vijayawada", label: "Vijayawada" },
  { value: "Jodhpur", label: "Jodhpur" },
  { value: "Madurai", label: "Madurai" },
  { value: "Raipur", label: "Raipur" },
  { value: "Kota", label: "Kota" },
  { value: "Chandigarh", label: "Chandigarh" },
  { value: "Guwahati", label: "Guwahati" },
  { value: "Solapur", label: "Solapur" },
  { value: "Hubli-Dharwad", label: "Hubli-Dharwad" },
  { value: "Mysore", label: "Mysore" },
  { value: "Tiruchirappalli", label: "Tiruchirappalli" },
  { value: "Bareilly", label: "Bareilly" },
  { value: "Other", label: "Other" },
];

interface LocationSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const CountrySelect = ({ value, onChange, disabled }: LocationSelectProps) => (
  <Select value={value} onValueChange={onChange} disabled={disabled}>
    <SelectTrigger className="w-full h-11 bg-background">
      <SelectValue placeholder="Select Country *" />
    </SelectTrigger>
    <SelectContent className="bg-background border border-border z-50 max-h-[300px]">
      {countries.map((country) => (
        <SelectItem key={country.value} value={country.value}>
          {country.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export const CitySelect = ({ value, onChange, disabled }: LocationSelectProps) => (
  <Select value={value} onValueChange={onChange} disabled={disabled}>
    <SelectTrigger className="w-full h-11 bg-background">
      <SelectValue placeholder="Select City *" />
    </SelectTrigger>
    <SelectContent className="bg-background border border-border z-50 max-h-[300px]">
      {indianCities.map((city) => (
        <SelectItem key={city.value} value={city.value}>
          {city.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default CountrySelect;
