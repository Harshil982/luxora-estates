import type { PhotoKey } from "./images";

export interface Stat {
  value: string;
  label: string;
  sublabel?: string;
}

export const STATS: Stat[] = [
  { value: "$14.2B", label: "In curated residences", sublabel: "Under management" },
  { value: "38", label: "Global cities", sublabel: "On six continents" },
  { value: "9.4%", label: "Avg. investor ROI", sublabel: "Trailing 12 months" },
  { value: "2,400+", label: "Private clients", sublabel: "Ultra-high-net-worth" },
];

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  location: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Luxora didn't sell me a home — they understood a life I hadn't fully imagined yet. The penthouse they found feels inevitable in hindsight.",
    name: "Alexandra Voss",
    title: "Founder, Voss Capital",
    location: "New York",
    rating: 5,
  },
  {
    quote:
      "The most discreet, most precise property experience I've had in twenty years of collecting homes. Every detail anticipated.",
    name: "Rashid Al-Farsi",
    title: "Private Investor",
    location: "Dubai",
    rating: 5,
  },
  {
    quote:
      "Their investment desk modelled the yield down to the finish materials. We closed on the Palm villa in nine days.",
    name: "Sophie Laurent",
    title: "Family Office Principal",
    location: "Monaco",
    rating: 5,
  },
  {
    quote:
      "I told the AI concierge I wanted 'quiet, water, and light.' It returned three homes. We bought the second.",
    name: "James Whitmore",
    title: "Tech Executive",
    location: "Malibu",
    rating: 5,
  },
];

export interface Service {
  title: string;
  description: string;
  icon: string; // lucide icon name
  image: PhotoKey;
}

export const SERVICES: Service[] = [
  {
    title: "Interior Design",
    description:
      "In-house ateliers translate your life into space — from a single room to a full architectural narrative.",
    icon: "Sofa",
    image: "loungeGold",
  },
  {
    title: "Home Automation",
    description:
      "Lighting, climate, security and sound orchestrated into a single, invisible intelligence.",
    icon: "Cpu",
    image: "openPlanLiving",
  },
  {
    title: "Property Management",
    description:
      "White-glove stewardship of your assets worldwide — staffed, maintained, always ready.",
    icon: "KeyRound",
    image: "gardenPavilion",
  },
  {
    title: "Legal & Mortgage",
    description:
      "Cross-border structuring, private banking introductions and bespoke financing in every jurisdiction.",
    icon: "Scale",
    image: "libraryStudy",
  },
  {
    title: "Relocation & VIP",
    description:
      "Schools, staff, aviation, and citizenship advisory — your move handled end to end.",
    icon: "Plane",
    image: "diningHall",
  },
  {
    title: "Wellness & Spa Design",
    description:
      "Private spas, cold plunges and recovery suites engineered by longevity specialists.",
    icon: "Sparkles",
    image: "spaBathroom",
  },
];

export interface Neighborhood {
  name: string;
  city: string;
  image: PhotoKey;
  luxuryIndex: number;
  growth: number; // yoy %
  blurb: string;
}

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    name: "Palm Jumeirah",
    city: "Dubai",
    image: "villaGlassPool",
    luxuryIndex: 97,
    growth: 18.4,
    blurb: "Man-made archipelago of trophy waterfront villas and beach clubs.",
  },
  {
    name: "Tribeca",
    city: "New York",
    image: "nycPenthouseView",
    luxuryIndex: 95,
    growth: 9.2,
    blurb: "Cast-iron lofts and glass towers — Manhattan's quiet power address.",
  },
  {
    name: "Monte-Carlo",
    city: "Monaco",
    image: "whiteMediterranean",
    luxuryIndex: 99,
    growth: 11.7,
    blurb: "The world's densest concentration of wealth, tax-free by the sea.",
  },
  {
    name: "Bel Air",
    city: "Los Angeles",
    image: "minimalConcrete",
    luxuryIndex: 93,
    growth: 7.8,
    blurb: "Gated hillside estates above the city, home to modern icons.",
  },
];

export const MOODS = [
  "Luxury",
  "Romantic",
  "Family",
  "Investment",
  "Beachside",
  "Work from home",
  "Smart living",
  "Minimalist",
] as const;

export const AWARDS = [
  "Awwwards · Site of the Day",
  "FWA of the Day",
  "CSS Design Awards",
  "Robb Report · Best of the Best",
  "Architectural Digest",
];
