import { img, type PhotoKey } from "./images";

export type PropertyType =
  | "Penthouse"
  | "Villa"
  | "Mansion"
  | "Apartment"
  | "Estate"
  | "Commercial";

export type Listing = "Buy" | "Rent" | "Invest";

export type Mood =
  | "Luxury"
  | "Romantic"
  | "Family"
  | "Investment"
  | "Beachside"
  | "Work from home"
  | "Smart living"
  | "Minimalist";

export interface Scores {
  investment: number; // 0-100
  luxury: number;
  walkability: number;
  safety: number;
  connectivity: number;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  type: PropertyType;
  listing: Listing[];
  city: string;
  country: string;
  neighborhood: string;
  address: string;
  price: number;
  /** monthly, for rentals */
  rent?: number;
  currency: string;
  beds: number;
  baths: number;
  area: number; // sq ft
  plot?: number; // sq ft
  yearBuilt: number;
  cover: PhotoKey;
  gallery: PhotoKey[];
  moods: Mood[];
  amenities: string[];
  developer: string;
  developerRating: number; // 0-5
  scores: Scores;
  roi: number; // expected annual %
  rentalYield: number; // %
  appreciation: number; // 5yr projected %
  matchBaseline: number; // baseline AI match %
  featured?: boolean;
  exclusive?: boolean;
  description: string;
  coords: { lat: number; lng: number };
}

const AMENITY_POOL = [
  "Infinity Pool",
  "Private Cinema",
  "Wine Cellar",
  "Home Automation",
  "Rooftop Terrace",
  "Spa & Sauna",
  "Private Gym",
  "Staff Quarters",
  "Smart Glass",
  "Helipad Access",
  "Private Elevator",
  "Chef's Kitchen",
  "Wellness Suite",
  "EV Charging",
  "24/7 Concierge",
  "Panoramic Views",
];

export const PROPERTIES: Property[] = [
  {
    id: "lx-01",
    slug: "the-obsidian-penthouse",
    name: "The Obsidian Penthouse",
    tagline: "A crown above Manhattan's skyline",
    type: "Penthouse",
    listing: ["Buy", "Invest"],
    city: "New York",
    country: "United States",
    neighborhood: "Tribeca",
    address: "1 Vestry Street, Tribeca",
    price: 28_500_000,
    currency: "$",
    beds: 5,
    baths: 6,
    area: 7800,
    yearBuilt: 2023,
    cover: "nycPenthouseView",
    gallery: [
      "nycPenthouseView",
      "warmLivingRoom",
      "marbleKitchen",
      "masterSuite",
      "spaBathroom",
      "libraryStudy",
    ],
    moods: ["Luxury", "Investment", "Smart living"],
    amenities: [
      "Private Elevator",
      "Panoramic Views",
      "Chef's Kitchen",
      "Home Automation",
      "Wine Cellar",
      "24/7 Concierge",
    ],
    developer: "Aurelius Development",
    developerRating: 4.9,
    scores: { investment: 94, luxury: 98, walkability: 96, safety: 90, connectivity: 95 },
    roi: 8.4,
    rentalYield: 4.1,
    appreciation: 34,
    matchBaseline: 92,
    featured: true,
    exclusive: true,
    description:
      "Suspended eighty floors above the Hudson, The Obsidian Penthouse is a full-floor residence wrapped in floor-to-ceiling glass. Interiors by a Milanese atelier pair smoked oak, honed marble and hand-brushed brass. A private elevator opens directly into a gallery foyer that frames the skyline like a living painting.",
    coords: { lat: 40.7215, lng: -74.0094 },
  },
  {
    id: "lx-02",
    slug: "villa-mirage-dubai",
    name: "Villa Mirage",
    tagline: "Desert light, water everywhere",
    type: "Villa",
    listing: ["Buy", "Invest", "Rent"],
    city: "Dubai",
    country: "United Arab Emirates",
    neighborhood: "Palm Jumeirah",
    address: "Frond K, Palm Jumeirah",
    price: 22_900_000,
    rent: 95_000,
    currency: "$",
    beds: 6,
    baths: 8,
    area: 12400,
    plot: 18000,
    yearBuilt: 2024,
    cover: "villaGlassPool",
    gallery: [
      "villaGlassPool",
      "infinityPoolDusk",
      "poolTerrace",
      "openPlanLiving",
      "diningHall",
      "gardenPavilion",
    ],
    moods: ["Luxury", "Beachside", "Family", "Investment"],
    amenities: [
      "Infinity Pool",
      "Private Beach",
      "Spa & Sauna",
      "Home Automation",
      "Staff Quarters",
      "Private Gym",
    ],
    developer: "Meridian Living",
    developerRating: 4.8,
    scores: { investment: 96, luxury: 97, walkability: 62, safety: 94, connectivity: 78 },
    roi: 9.6,
    rentalYield: 6.2,
    appreciation: 41,
    matchBaseline: 89,
    featured: true,
    exclusive: true,
    description:
      "On the outermost frond of the Palm, Villa Mirage dissolves the line between architecture and sea. A 30-metre infinity edge spills toward the Gulf, while interiors of travertine and pale oak stay cool against the desert sun. Six suites, a private beach and a wellness pavilion make this a sanctuary and a rare income asset.",
    coords: { lat: 25.1124, lng: 55.139 },
  },
  {
    id: "lx-03",
    slug: "the-cliff-house-malibu",
    name: "The Cliff House",
    tagline: "Where the Pacific meets the sky",
    type: "Mansion",
    listing: ["Buy"],
    city: "Malibu",
    country: "United States",
    neighborhood: "Paradise Cove",
    address: "27400 Pacific Coast Highway",
    price: 41_000_000,
    currency: "$",
    beds: 7,
    baths: 9,
    area: 14200,
    plot: 65000,
    yearBuilt: 2022,
    cover: "whiteCliffVilla",
    gallery: [
      "whiteCliffVilla",
      "infinityPoolDusk",
      "openPlanLiving",
      "masterSuite",
      "spaBathroom",
      "gardenPavilion",
    ],
    moods: ["Luxury", "Beachside", "Romantic", "Minimalist"],
    amenities: [
      "Infinity Pool",
      "Private Beach",
      "Home Automation",
      "Wellness Suite",
      "Chef's Kitchen",
      "Panoramic Views",
    ],
    developer: "Halcyon Studio",
    developerRating: 4.9,
    scores: { investment: 88, luxury: 99, walkability: 40, safety: 92, connectivity: 60 },
    roi: 7.1,
    rentalYield: 3.4,
    appreciation: 29,
    matchBaseline: 85,
    featured: true,
    description:
      "Cantilevered over a private cove, The Cliff House is a study in restraint — board-formed concrete, glass and California light. Walls of glass retract entirely, letting the Pacific breeze move through open-plan living. A cliffside infinity pool appears to pour directly into the ocean.",
    coords: { lat: 34.0106, lng: -118.7902 },
  },
  {
    id: "lx-04",
    slug: "mayfair-townhouse",
    name: "The Mayfair Residence",
    tagline: "Georgian grandeur, reimagined",
    type: "Estate",
    listing: ["Buy", "Invest"],
    city: "London",
    country: "United Kingdom",
    neighborhood: "Mayfair",
    address: "Charles Street, Mayfair W1J",
    price: 34_800_000,
    currency: "£",
    beds: 6,
    baths: 7,
    area: 9600,
    yearBuilt: 1998,
    cover: "warmLivingRoom",
    gallery: [
      "warmLivingRoom",
      "libraryStudy",
      "diningHall",
      "sculptedStair",
      "masterSuite",
      "spaBathroom",
    ],
    moods: ["Luxury", "Family", "Investment"],
    amenities: [
      "Private Cinema",
      "Wine Cellar",
      "Private Elevator",
      "Staff Quarters",
      "Spa & Sauna",
      "24/7 Concierge",
    ],
    developer: "Belgrave Heritage",
    developerRating: 4.7,
    scores: { investment: 91, luxury: 95, walkability: 98, safety: 88, connectivity: 97 },
    roi: 6.8,
    rentalYield: 3.9,
    appreciation: 26,
    matchBaseline: 83,
    description:
      "Behind a listed Georgian façade in the heart of Mayfair lies a fully reimagined interior — seven storeys connected by a sculpted stone stair and private lift. A double-height library, wine room and spa level meet Charles Street's most coveted address.",
    coords: { lat: 51.5074, lng: -0.1455 },
  },
  {
    id: "lx-05",
    slug: "azure-sky-residence",
    name: "Azure Sky Residence",
    tagline: "Living among the clouds",
    type: "Apartment",
    listing: ["Buy", "Rent", "Invest"],
    city: "Dubai",
    country: "United Arab Emirates",
    neighborhood: "Downtown Dubai",
    address: "Burj Vista, Downtown",
    price: 6_400_000,
    rent: 32_000,
    currency: "$",
    beds: 3,
    baths: 4,
    area: 3800,
    yearBuilt: 2021,
    cover: "cityApartment",
    gallery: [
      "cityApartment",
      "loungeGold",
      "marbleKitchen",
      "softBedroom",
      "spaBathroom",
      "openPlanLiving",
    ],
    moods: ["Luxury", "Smart living", "Investment", "Work from home"],
    amenities: [
      "Smart Glass",
      "Home Automation",
      "Private Gym",
      "Rooftop Terrace",
      "24/7 Concierge",
      "EV Charging",
    ],
    developer: "Meridian Living",
    developerRating: 4.6,
    scores: { investment: 93, luxury: 90, walkability: 88, safety: 93, connectivity: 91 },
    roi: 9.1,
    rentalYield: 6.8,
    appreciation: 38,
    matchBaseline: 87,
    description:
      "A corner residence facing the Burj Khalifa, Azure Sky pairs full-height smart glass with warm minimalist interiors. Automated everything, a private gym floor and one of the highest rental yields in the collection make it a favourite among investors.",
    coords: { lat: 25.1953, lng: 55.2721 },
  },
  {
    id: "lx-06",
    slug: "the-monolith-miami",
    name: "The Monolith",
    tagline: "Waterfront brutalism, softened",
    type: "Villa",
    listing: ["Buy", "Invest"],
    city: "Miami",
    country: "United States",
    neighborhood: "Star Island",
    address: "Star Island Drive",
    price: 19_750_000,
    currency: "$",
    beds: 5,
    baths: 6,
    area: 8900,
    plot: 24000,
    yearBuilt: 2023,
    cover: "brutalistFacade",
    gallery: [
      "brutalistFacade",
      "poolTerrace",
      "openPlanLiving",
      "loungeGold",
      "masterSuite",
      "diningHall",
    ],
    moods: ["Luxury", "Beachside", "Smart living", "Investment"],
    amenities: [
      "Infinity Pool",
      "Private Dock",
      "Home Automation",
      "Wellness Suite",
      "EV Charging",
      "Chef's Kitchen",
    ],
    developer: "Halcyon Studio",
    developerRating: 4.8,
    scores: { investment: 90, luxury: 93, walkability: 55, safety: 89, connectivity: 74 },
    roi: 8.9,
    rentalYield: 5.1,
    appreciation: 33,
    matchBaseline: 84,
    description:
      "On exclusive Star Island, The Monolith balances raw architectural mass with warm interiors and a private dock on Biscayne Bay. Terraces step down toward the water past an infinity pool that mirrors the Miami skyline at dusk.",
    coords: { lat: 25.7717, lng: -80.1533 },
  },
  {
    id: "lx-07",
    slug: "alpine-glass-lodge",
    name: "Alpine Glass Lodge",
    tagline: "A crystal set into the mountainside",
    type: "Estate",
    listing: ["Buy", "Rent"],
    city: "Zermatt",
    country: "Switzerland",
    neighborhood: "Matterhorn Foothills",
    address: "Winkelmatten, Zermatt",
    price: 15_200_000,
    rent: 68_000,
    currency: "$",
    beds: 5,
    baths: 6,
    area: 7200,
    yearBuilt: 2022,
    cover: "glassLakeHouse",
    gallery: [
      "glassLakeHouse",
      "warmLivingRoom",
      "spaBathroom",
      "softBedroom",
      "libraryStudy",
      "diningHall",
    ],
    moods: ["Luxury", "Romantic", "Family", "Minimalist"],
    amenities: [
      "Spa & Sauna",
      "Private Cinema",
      "Wine Cellar",
      "Home Automation",
      "Wellness Suite",
      "Chef's Kitchen",
    ],
    developer: "Alpenweiss",
    developerRating: 4.9,
    scores: { investment: 85, luxury: 96, walkability: 70, safety: 97, connectivity: 65 },
    roi: 6.4,
    rentalYield: 4.5,
    appreciation: 24,
    matchBaseline: 81,
    description:
      "Framing the Matterhorn through walls of insulated glass, the Alpine Glass Lodge marries timber warmth with a subterranean spa and cinema. Ski-in access and a heated infinity edge make it a year-round retreat.",
    coords: { lat: 46.0207, lng: 7.7491 },
  },
  {
    id: "lx-08",
    slug: "the-riviera-pavilion",
    name: "The Riviera Pavilion",
    tagline: "Old-world coast, new-world calm",
    type: "Mansion",
    listing: ["Buy", "Invest"],
    city: "Monaco",
    country: "Monaco",
    neighborhood: "Monte-Carlo",
    address: "Avenue Princesse Grace",
    price: 47_500_000,
    currency: "€",
    beds: 6,
    baths: 8,
    area: 11800,
    plot: 21000,
    yearBuilt: 2020,
    cover: "whiteMediterranean",
    gallery: [
      "whiteMediterranean",
      "infinityPoolDusk",
      "gardenPavilion",
      "loungeGold",
      "masterSuite",
      "spaBathroom",
    ],
    moods: ["Luxury", "Romantic", "Investment", "Beachside"],
    amenities: [
      "Infinity Pool",
      "Private Elevator",
      "Wine Cellar",
      "Staff Quarters",
      "24/7 Concierge",
      "Panoramic Views",
    ],
    developer: "Côte Privé",
    developerRating: 5.0,
    scores: { investment: 95, luxury: 99, walkability: 92, safety: 99, connectivity: 88 },
    roi: 7.6,
    rentalYield: 3.2,
    appreciation: 31,
    matchBaseline: 88,
    exclusive: true,
    description:
      "On Monaco's most storied avenue, The Riviera Pavilion overlooks the Mediterranean from terraced gardens. Interiors of Carrara marble and silk pair with a rooftop pool and a private funicular to the shore — a trophy asset in the world's most tax-advantaged principality.",
    coords: { lat: 43.7455, lng: 7.4402 },
  },
  {
    id: "lx-09",
    slug: "the-quiet-house",
    name: "The Quiet House",
    tagline: "Minimalism as a way of living",
    type: "Villa",
    listing: ["Buy", "Rent"],
    city: "Los Angeles",
    country: "United States",
    neighborhood: "Bel Air",
    address: "Bellagio Road, Bel Air",
    price: 12_900_000,
    rent: 58_000,
    currency: "$",
    beds: 4,
    baths: 5,
    area: 6800,
    plot: 19000,
    yearBuilt: 2024,
    cover: "minimalConcrete",
    gallery: [
      "minimalConcrete",
      "sculptedStair",
      "openPlanLiving",
      "softBedroom",
      "spaBathroom",
      "gardenPavilion",
    ],
    moods: ["Minimalist", "Work from home", "Family", "Smart living"],
    amenities: [
      "Home Automation",
      "Wellness Suite",
      "Private Gym",
      "EV Charging",
      "Smart Glass",
      "Chef's Kitchen",
    ],
    developer: "Halcyon Studio",
    developerRating: 4.7,
    scores: { investment: 87, luxury: 92, walkability: 66, safety: 90, connectivity: 80 },
    roi: 7.8,
    rentalYield: 4.6,
    appreciation: 28,
    matchBaseline: 82,
    description:
      "A meditation on light and silence in the Bel Air hills. Board-formed concrete, courtyards of water and a hidden wellness level create a home tuned for focus and calm — a purpose-built sanctuary for those who work from anywhere.",
    coords: { lat: 34.0955, lng: -118.4682 },
  },
];

export const ALL_AMENITIES = AMENITY_POOL;

export function getProperty(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function getFeatured(): Property[] {
  return PROPERTIES.filter((p) => p.featured);
}

export function relatedProperties(current: Property, count = 3): Property[] {
  return PROPERTIES.filter(
    (p) => p.id !== current.id && (p.type === current.type || p.city === current.city)
  )
    .slice(0, count)
    .concat(PROPERTIES.filter((p) => p.id !== current.id))
    .slice(0, count);
}

/** Re-export so components can build image URLs from a property directly. */
export { img };
