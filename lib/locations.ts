export interface Location {
  slug: string;
  city: string;
  country: string;
  flag: string;
  region: "Europe" | "North America" | "Oceania" | "UK" | "Middle East";
  currency: "EUR" | "USD" | "GBP" | "CAD" | "AUD" | "AED";
  currencySymbol: string;
  timezone: string; // e.g., "CET", "EST"
  minRate: number; // minimum project size in that currency
}

export const locations: Location[] = [
  {
    slug: "berlin",
    city: "Berlin",
    country: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    timezone: "CET",
    minRate: 2000,
  },
  {
    slug: "london",
    city: "London",
    country: "United Kingdom",
    flag: "🇬🇧",
    region: "UK",
    currency: "GBP",
    currencySymbol: "£",
    timezone: "GMT",
    minRate: 1800,
  },
  {
    slug: "new-york",
    city: "New York",
    country: "USA",
    flag: "🇺🇸",
    region: "North America",
    currency: "USD",
    currencySymbol: "$",
    timezone: "EST",
    minRate: 2500,
  },
  {
    slug: "toronto",
    city: "Toronto",
    country: "Canada",
    flag: "🇨🇦",
    region: "North America",
    currency: "CAD",
    currencySymbol: "$",
    timezone: "EST",
    minRate: 3000,
  },
  {
    slug: "sydney",
    city: "Sydney",
    country: "Australia",
    flag: "🇦🇺",
    region: "Oceania",
    currency: "AUD",
    currencySymbol: "$",
    timezone: "AEST",
    minRate: 3500,
  },
  {
    slug: "amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    flag: "🇳🇱",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    timezone: "CET",
    minRate: 2000,
  },
  {
    slug: "dubai",
    city: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    region: "Middle East",
    currency: "AED",
    currencySymbol: "AED",
    timezone: "GST",
    minRate: 8000,
  },
  {
    slug: "frankfurt",
    city: "Frankfurt",
    country: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    timezone: "CET",
    minRate: 2500,
  },
  {
    slug: "san-francisco",
    city: "San Francisco",
    country: "USA",
    flag: "🇺🇸",
    region: "North America",
    currency: "USD",
    currencySymbol: "$",
    timezone: "PST",
    minRate: 3000,
  },
  {
    slug: "melbourne",
    city: "Melbourne",
    country: "Australia",
    flag: "🇦🇺",
    region: "Oceania",
    currency: "AUD",
    currencySymbol: "$",
    timezone: "AEST",
    minRate: 3500,
  }
];
