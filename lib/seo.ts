import type { Property } from "@/lib/data/properties";
import { img } from "@/lib/data/images";

/**
 * Central SEO configuration + JSON-LD (schema.org) builders.
 * Everything canonical/structured resolves off a single site URL so the whole
 * site stays consistent once deployed to a real domain.
 */

export const SITE_NAME = "Luxora Estates";
export const SITE_TAGLINE = "Where Extraordinary Living Begins.";
export const SITE_DESCRIPTION =
  "Luxora Estates curates the world's most exceptional residences — penthouses, villas and mansions across New York, Dubai, London, Malibu, Monaco and beyond. Discover luxury real estate reimagined, with AI property matching and live investment intelligence.";

/**
 * Resolve the canonical site origin.
 * Priority: explicit env → Vercel production URL (auto on Vercel) → sensible default.
 * Set NEXT_PUBLIC_SITE_URL to your real domain in production.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "https://luxora-estates.vercel.app";
}

export const SITE_URL = getSiteUrl();

/** Absolute URL for a path against the site origin. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export const SITE_KEYWORDS = [
  "Luxora Estates",
  "Luxora",
  "Luxora real estate",
  "luxury real estate",
  "luxury properties",
  "luxury homes for sale",
  "penthouses",
  "luxury villas",
  "mansions",
  "waterfront estates",
  "Dubai luxury property",
  "New York penthouse",
  "London luxury apartments",
  "Malibu mansions",
  "Monaco real estate",
  "luxury real estate investment",
  "AI property matching",
  "high ROI property",
];

const CURRENCY_ISO: Record<string, string> = { $: "USD", "£": "GBP", "€": "EUR" };
export function currencyIso(symbol: string): string {
  return CURRENCY_ISO[symbol] ?? "USD";
}

/** schema.org accommodation type for a property. */
function accommodationType(type: Property["type"]): string {
  switch (type) {
    case "Penthouse":
    case "Apartment":
      return "Apartment";
    case "Villa":
    case "Mansion":
    case "Estate":
      return "House";
    default:
      return "Residence";
  }
}

/* ---------------------------------- JSON-LD --------------------------------- */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "Luxora",
    url: SITE_URL,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/opengraph-image"),
    description: SITE_DESCRIPTION,
    slogan: SITE_TAGLINE,
    areaServed: [
      "New York",
      "Dubai",
      "London",
      "Los Angeles",
      "Malibu",
      "Miami",
      "Monaco",
      "Zermatt",
    ],
    knowsAbout: [
      "luxury real estate",
      "property investment",
      "penthouses",
      "villas",
      "mansions",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/properties?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function propertySchema(p: Property) {
  return {
    "@context": "https://schema.org",
    "@type": accommodationType(p.type),
    name: p.name,
    description: p.description,
    url: absoluteUrl(`/properties/${p.slug}`),
    image: p.gallery.slice(0, 4).map((key) => img(key, 1200)),
    numberOfRooms: p.beds,
    numberOfBathroomsTotal: p.baths,
    floorSize: {
      "@type": "QuantitativeValue",
      value: p.area,
      unitCode: "FTK", // square foot
    },
    yearBuilt: p.yearBuilt,
    address: {
      "@type": "PostalAddress",
      streetAddress: p.address,
      addressLocality: p.city,
      addressCountry: p.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: p.coords.lat,
      longitude: p.coords.lng,
    },
    amenityFeature: p.amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: currencyIso(p.currency),
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/properties/${p.slug}`),
    },
  };
}
