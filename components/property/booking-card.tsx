"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Download, Phone, Check, Star } from "lucide-react";
import { formatFull, formatPrice } from "@/lib/utils";
import type { Property } from "@/lib/data/properties";

export function BookingCard({ property }: { property: Property }) {
  const [sent, setSent] = useState(false);
  const [date, setDate] = useState("");

  return (
    <div className="lg:sticky lg:top-24">
      <div className="rounded-3xl glass-strong p-7">
        <p className="text-xs uppercase tracking-widest text-fog">
          {property.listing.includes("Rent") && property.rent ? "Guide price" : "Asking price"}
        </p>
        <div className="mt-1 flex items-end gap-2">
          <span className="font-display text-4xl text-gold-gradient">
            {formatPrice(property.price, property.currency)}
          </span>
          <span className="mb-1 text-sm text-mist">{formatFull(property.price, property.currency)}</span>
        </div>
        {property.rent && (
          <p className="mt-1 text-sm text-mist">
            or {formatFull(property.rent, property.currency)}
            <span className="text-fog"> / month</span>
          </p>
        )}

        {/* Agent */}
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-champagne/12 bg-obsidian/40 p-4">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold to-brass font-display text-lg text-ink">
            {property.developer.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-pearl">{property.developer}</p>
            <p className="flex items-center gap-1 text-xs text-mist">
              <Star className="h-3 w-3 fill-gold text-gold" /> {property.developerRating} · Private
              advisor
            </p>
          </div>
        </div>

        {/* Booking */}
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-emerald-500/15 text-emerald-300">
                <Check className="h-5 w-5" />
              </span>
              <p className="font-display text-lg text-pearl">Request received</p>
              <p className="text-xs text-mist">
                A private advisor will confirm your viewing within hours.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" className="mt-6 space-y-3">
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-fog">
                  Preferred viewing date
                </span>
                <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-champagne/15 bg-obsidian/40 px-4 py-3">
                  <Calendar className="h-4 w-4 text-champagne" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent text-sm text-pearl focus:outline-none [color-scheme:dark]"
                  />
                </div>
              </label>
              <button
                onClick={() => setSent(true)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-bright py-3.5 font-medium text-ink transition-all hover:shadow-[0_0_40px_-8px_rgba(201,169,106,0.6)]"
              >
                <Calendar className="h-4 w-4" />
                Book a private viewing
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-full border border-champagne/25 py-3 text-sm text-pearl transition-colors hover:bg-champagne/10">
            <Phone className="h-4 w-4 text-champagne" /> Call
          </button>
          <button className="flex items-center justify-center gap-2 rounded-full border border-champagne/25 py-3 text-sm text-pearl transition-colors hover:bg-champagne/10">
            <Download className="h-4 w-4 text-champagne" /> Brochure
          </button>
        </div>
      </div>

      {/* Investment snapshot */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { label: "ROI", value: `${property.roi}%` },
          { label: "Yield", value: `${property.rentalYield}%` },
          { label: "5yr", value: `+${property.appreciation}%` },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-champagne/12 bg-graphite/40 p-4 text-center"
          >
            <p className="font-display text-xl text-gold-gradient">{m.value}</p>
            <p className="text-[0.65rem] uppercase tracking-widest text-fog">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
