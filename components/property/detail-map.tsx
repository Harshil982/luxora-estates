"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Cross,
  UtensilsCrossed,
  ShoppingBag,
  Plane,
  TrainFront,
  MapPin,
  ExternalLink,
} from "lucide-react";

interface Poi {
  icon: React.ElementType;
  label: string;
  name: string;
  dist: string;
}

// Deterministic "nearby" set derived from the property — presentation only.
function nearby(seed: number): Poi[] {
  const d = (base: number) => `${(base + (seed % 5) * 0.3).toFixed(1)} mi`;
  return [
    { icon: GraduationCap, label: "Education", name: "International Academy", dist: d(0.8) },
    { icon: Cross, label: "Healthcare", name: "Cedar Medical Center", dist: d(1.2) },
    { icon: UtensilsCrossed, label: "Dining", name: "Two Michelin-star row", dist: d(0.4) },
    { icon: ShoppingBag, label: "Retail", name: "Luxury Mile", dist: d(0.6) },
    { icon: Plane, label: "Aviation", name: "Private Jet Terminal", dist: d(9.4) },
    { icon: TrainFront, label: "Transit", name: "Express Metro", dist: d(0.5) },
  ];
}

export function DetailMap({
  lat,
  lng,
  neighborhood,
  city,
}: {
  lat: number;
  lng: number;
  neighborhood: string;
  city: string;
}) {
  const pois = nearby(Math.round((lat + lng) * 10));
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      {/* Stylized map */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-[4/3] overflow-hidden rounded-3xl border border-champagne/12 bg-onyx lg:aspect-auto"
      >
        {/* Faux street grid */}
        <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden>
          <defs>
            <pattern id="streets" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M0 32 H64 M32 0 V64" stroke="rgba(201,169,106,0.12)" strokeWidth="1" />
              <path d="M0 0 H64 M0 0 V64" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <radialGradient id="mapglow" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="rgba(201,169,106,0.18)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#streets)" />
          {/* Curved boulevards */}
          <path
            d="M-20 80 Q 200 40 420 140 T 900 120"
            fill="none"
            stroke="rgba(201,169,106,0.22)"
            strokeWidth="2"
          />
          <path
            d="M60 -20 Q 120 200 300 260 T 500 520"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="6"
          />
          <rect width="100%" height="100%" fill="url(#mapglow)" />
        </svg>

        {/* Pin */}
        <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 animate-[pulse-ring_2.4s_ease-out_infinite] rounded-full bg-champagne/40" />
          <span className="relative grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold to-brass text-ink shadow-[0_0_30px_-4px_rgba(201,169,106,0.8)]">
            <MapPin className="h-5 w-5" />
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-obsidian to-transparent p-5">
          <div>
            <p className="text-xs tracking-widest text-champagne">{city.toUpperCase()}</p>
            <p className="font-display text-xl text-pearl">{neighborhood}</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs text-pearl">
            Open in Maps <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </a>

      {/* Nearby list */}
      <div className="rounded-3xl border border-champagne/12 bg-graphite/40 p-6">
        <h3 className="font-display text-xl font-light text-pearl">In the neighborhood</h3>
        <div className="mt-5 space-y-1">
          {pois.map((poi, i) => {
            const Icon = poi.icon;
            return (
              <motion.div
                key={poi.label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-pearl/[0.03]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-champagne/15 text-champagne">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm text-pearl">{poi.name}</p>
                    <p className="text-xs text-fog">{poi.label}</p>
                  </div>
                </div>
                <span className="text-sm text-mist">{poi.dist}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
