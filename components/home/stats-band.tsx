"use client";

import { motion } from "framer-motion";
import { STATS, AWARDS } from "@/lib/data/site";

export function StatsBand() {
  return (
    <section className="relative border-y border-champagne/10 bg-onyx py-16">
      {/* Awards marquee */}
      <div className="mb-14 overflow-hidden">
        <div className="flex w-max animate-marquee gap-16">
          {[...AWARDS, ...AWARDS, ...AWARDS].map((award, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-3 text-sm tracking-[0.15em] text-fog"
            >
              <span className="h-1 w-1 rounded-full bg-champagne" />
              {award.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-5 md:grid-cols-4 md:px-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1"
          >
            <span className="font-display text-4xl font-light text-gold-gradient md:text-6xl">
              {stat.value}
            </span>
            <span className="text-sm font-medium text-pearl">{stat.label}</span>
            {stat.sublabel && (
              <span className="text-xs text-fog">{stat.sublabel}</span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
