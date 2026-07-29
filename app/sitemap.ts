import type { MetadataRoute } from "next";
import { PROPERTIES } from "@/lib/data/properties";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, freq: "daily" },
    { path: "/properties", priority: 0.9, freq: "daily" },
    { path: "/ai-match", priority: 0.8, freq: "weekly" },
    { path: "/invest", priority: 0.8, freq: "weekly" },
    { path: "/compare", priority: 0.6, freq: "monthly" },
    { path: "/neighborhoods", priority: 0.7, freq: "weekly" },
    { path: "/concierge", priority: 0.6, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "monthly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  const propertyEntries: MetadataRoute.Sitemap = PROPERTIES.map((p) => ({
    url: `${SITE_URL}/properties/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...propertyEntries];
}
