"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bath, BedDouble, Heart, Maximize, MapPin, TrendingUp } from "lucide-react";
import { useState } from "react";
import { img, type Property } from "@/lib/data/properties";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const luxeEase = [0.16, 1, 0.3, 1] as const;

export function PropertyCard({
  property,
  index = 0,
  priority = false,
  className,
}: {
  property: Property;
  index?: number;
  priority?: boolean;
  className?: string;
}) {
  const [fav, setFav] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: luxeEase, delay: (index % 3) * 0.1 }}
      className={cn("group relative", className)}
    >
      <Link href={`/properties/${property.slug}`} className="block">
        <div className="lux-elevate relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-graphite">
          <Image
            src={img(property.cover, 1000)}
            alt={property.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
          />

          {/* Gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-obsidian/30" />

          {/* Top row: tags + favorite */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full glass px-3 py-1 text-[0.68rem] font-medium tracking-wide text-pearl">
                {property.type}
              </span>
              {property.exclusive && (
                <span className="rounded-full bg-gradient-to-r from-gold to-gold-bright px-3 py-1 text-[0.68rem] font-semibold tracking-wide text-ink">
                  Exclusive
                </span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setFav((f) => !f);
              }}
              aria-label="Save property"
              className="grid h-10 w-10 place-items-center rounded-full glass text-pearl transition-colors hover:text-gold"
            >
              <Heart
                className={cn("h-4 w-4 transition-all", fav && "fill-gold text-gold")}
              />
            </button>
          </div>

          {/* Investment score chip */}
          <div className="absolute right-5 top-1/2 flex -translate-y-1/2 translate-x-16 flex-col items-center gap-1 rounded-2xl glass px-3 py-3 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100">
            <TrendingUp className="h-4 w-4 text-gold" />
            <span className="font-display text-lg leading-none text-pearl">
              {property.scores.investment}
            </span>
            <span className="text-[0.55rem] tracking-widest text-mist">SCORE</span>
          </div>

          {/* Bottom content */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="flex items-center gap-1.5 text-xs text-mist">
              <MapPin className="h-3.5 w-3.5 text-champagne" />
              {property.neighborhood}, {property.city}
            </div>
            <h3 className="mt-1.5 font-display text-2xl font-light leading-tight text-pearl">
              {property.name}
            </h3>

            <div className="mt-4 flex items-center justify-between border-t border-champagne/15 pt-4">
              <div>
                <p className="text-[0.68rem] uppercase tracking-widest text-fog">
                  {property.listing.includes("Rent") && property.rent
                    ? "From"
                    : "Price"}
                </p>
                <p className="font-display text-xl text-gold-gradient">
                  {formatPrice(property.price, property.currency)}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-mist">
                <span className="flex items-center gap-1">
                  <BedDouble className="h-3.5 w-3.5" /> {property.beds}
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="h-3.5 w-3.5" /> {property.baths}
                </span>
                <span className="flex items-center gap-1">
                  <Maximize className="h-3.5 w-3.5" />{" "}
                  {(property.area / 1000).toFixed(1)}k
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
