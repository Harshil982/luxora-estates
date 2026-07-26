"use client";

import { motion } from "framer-motion";

/** Horizontal gold bars for comparing categorical values (e.g. yields by city). */
export function BarChart({
  data,
  suffix = "%",
}: {
  data: { label: string; value: number }[];
  suffix?: string;
}) {
  const max = Math.max(...data.map((d) => d.value)) * 1.1;
  return (
    <div className="space-y-4">
      {data.map((d, i) => (
        <div key={d.label} className="flex items-center gap-4">
          <span className="w-24 shrink-0 text-sm text-mist">{d.label}</span>
          <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-pearl/8">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brass to-gold-bright"
              initial={{ width: 0 }}
              whileInView={{ width: `${(d.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span className="w-14 shrink-0 text-right font-display text-base text-pearl">
            {d.value}
            {suffix}
          </span>
        </div>
      ))}
    </div>
  );
}
