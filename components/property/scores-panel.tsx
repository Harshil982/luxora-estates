"use client";

import { motion } from "framer-motion";
import { Gem, Footprints, ShieldCheck, TrainFront, TrendingUp } from "lucide-react";
import type { Scores } from "@/lib/data/properties";

const META = [
  { key: "luxury", label: "Luxury", icon: Gem },
  { key: "investment", label: "Investment", icon: TrendingUp },
  { key: "walkability", label: "Walkability", icon: Footprints },
  { key: "safety", label: "Safety", icon: ShieldCheck },
  { key: "connectivity", label: "Connectivity", icon: TrainFront },
] as const;

export function ScoresPanel({ scores }: { scores: Scores }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {META.map((m, i) => {
        const value = scores[m.key];
        const Icon = m.icon;
        return (
          <motion.div
            key={m.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="flex flex-col items-center gap-2 rounded-2xl border border-champagne/12 bg-graphite/40 p-4 text-center"
          >
            <Ring value={value} />
            <Icon className="h-4 w-4 text-champagne" />
            <span className="text-xs text-mist">{m.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

function Ring({ value }: { value: number }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center">
      <svg width="68" height="68" className="-rotate-90">
        <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
        <motion.circle
          cx="34"
          cy="34"
          r={r}
          fill="none"
          stroke="url(#ringgold)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ - (value / 100) * circ }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="ringgold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4b675" />
            <stop offset="100%" stopColor="#e6cf9a" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute font-display text-lg text-pearl">{value}</span>
    </div>
  );
}
