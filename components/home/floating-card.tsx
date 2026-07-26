"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";
import { img } from "@/lib/data/images";
import { formatPrice } from "@/lib/utils";
import { getFeatured } from "@/lib/data/properties";

/** A live, floating property vignette that drifts in the hero. */
export function FloatingCard() {
  const p = getFeatured()[1] ?? getFeatured()[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, rotate: 4 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ duration: 1.4, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto animate-float-slow"
    >
      <div className="w-[300px] overflow-hidden rounded-[1.5rem] glass-strong p-3 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src={img(p.cover, 700)}
            alt={p.name}
            fill
            sizes="300px"
            className="object-cover"
          />
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full glass px-2.5 py-1 text-[0.62rem] text-pearl">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live listing
          </div>
        </div>
        <div className="px-1.5 pb-1 pt-3">
          <div className="flex items-center justify-between">
            <p className="font-display text-lg text-pearl">{p.name}</p>
            <span className="flex items-center gap-1 text-xs text-gold">
              <Star className="h-3 w-3 fill-gold" /> {p.developerRating}
            </span>
          </div>
          <p className="text-xs text-mist">
            {p.neighborhood}, {p.city}
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-champagne/15 pt-3">
            <span className="font-display text-lg text-gold-gradient">
              {formatPrice(p.price, p.currency)}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" /> {p.roi}% ROI
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
