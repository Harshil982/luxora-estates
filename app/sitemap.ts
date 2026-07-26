import type { MetadataRoute } from "next";
import { PROPERTIES } from "@/lib/data/properties";

const BASE = "https://luxora-estates.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/properties",
    "/ai-match",
    "/invest",
    "/compare",
    "/neighborhoods",
    "/concierge",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const properties = PROPERTIES.map((p) => ({
    url: `${BASE}/properties/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...properties];
}
