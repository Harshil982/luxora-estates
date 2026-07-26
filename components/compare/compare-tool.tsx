"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X, Crown, Star } from "lucide-react";
import { PROPERTIES, type Property } from "@/lib/data/properties";
import { img } from "@/lib/data/images";
import { formatPrice, cn } from "@/lib/utils";

type Row = {
  label: string;
  get: (p: Property) => number;
  format: (p: Property) => string;
  best: "high" | "low";
};

const ROWS: Row[] = [
  { label: "Price", get: (p) => p.price, format: (p) => formatPrice(p.price, p.currency), best: "low" },
  { label: "Interior area", get: (p) => p.area, format: (p) => `${p.area.toLocaleString()} ft²`, best: "high" },
  { label: "Bedrooms", get: (p) => p.beds, format: (p) => `${p.beds}`, best: "high" },
  { label: "Investment score", get: (p) => p.scores.investment, format: (p) => `${p.scores.investment}`, best: "high" },
  { label: "Luxury score", get: (p) => p.scores.luxury, format: (p) => `${p.scores.luxury}`, best: "high" },
  { label: "Expected ROI", get: (p) => p.roi, format: (p) => `${p.roi}%`, best: "high" },
  { label: "Rental yield", get: (p) => p.rentalYield, format: (p) => `${p.rentalYield}%`, best: "high" },
  { label: "5yr appreciation", get: (p) => p.appreciation, format: (p) => `+${p.appreciation}%`, best: "high" },
  { label: "Developer rating", get: (p) => p.developerRating, format: (p) => `${p.developerRating}★`, best: "high" },
  { label: "Neighborhood score", get: (p) => p.scores.connectivity, format: (p) => `${p.scores.connectivity}`, best: "high" },
];

export function CompareTool() {
  const [selected, setSelected] = useState<Property[]>([
    PROPERTIES[0],
    PROPERTIES[1],
    PROPERTIES[7],
  ]);
  const [picking, setPicking] = useState(false);

  const add = (p: Property) => {
    if (selected.length < 4 && !selected.find((s) => s.id === p.id)) {
      setSelected([...selected, p]);
    }
    setPicking(false);
  };
  const remove = (id: string) => setSelected(selected.filter((s) => s.id !== id));

  const bestFor = (row: Row) => {
    const vals = selected.map(row.get);
    return row.best === "high" ? Math.max(...vals) : Math.min(...vals);
  };

  const available = PROPERTIES.filter((p) => !selected.find((s) => s.id === p.id));

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-28 md:px-8">
      <div className="overflow-x-auto rounded-3xl border border-champagne/12 bg-graphite/30">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-40 bg-graphite/60 p-4 text-left align-bottom">
                <span className="text-xs uppercase tracking-widest text-fog">
                  {selected.length} residences
                </span>
              </th>
              {selected.map((p) => (
                <th key={p.id} className="min-w-[200px] p-4 align-bottom">
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={img(p.cover, 500)}
                        alt={p.name}
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                      <button
                        onClick={() => remove(p.id)}
                        aria-label="Remove"
                        className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full glass text-pearl"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <Link
                    href={`/properties/${p.slug}`}
                    className="mt-3 block font-display text-lg font-light text-pearl hover:text-gold"
                  >
                    {p.name}
                  </Link>
                  <p className="text-xs text-mist">{p.city}</p>
                </th>
              ))}
              {selected.length < 4 && (
                <th className="min-w-[200px] p-4 align-bottom">
                  <button
                    onClick={() => setPicking((v) => !v)}
                    className="grid aspect-[4/3] w-full place-items-center rounded-2xl border border-dashed border-champagne/25 text-mist transition-colors hover:border-champagne/50 hover:text-pearl"
                  >
                    <Plus className="h-6 w-6" />
                    <span className="mt-1 text-xs">Add residence</span>
                  </button>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, ri) => {
              const winning = bestFor(row);
              return (
                <tr key={row.label} className={ri % 2 ? "bg-obsidian/20" : ""}>
                  <td className="sticky left-0 z-10 bg-graphite/60 p-4 text-sm text-mist">
                    {row.label}
                  </td>
                  {selected.map((p) => {
                    const isBest = selected.length > 1 && row.get(p) === winning;
                    return (
                      <td key={p.id} className="p-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 font-display text-lg",
                            isBest ? "text-gold-gradient" : "text-pearl"
                          )}
                        >
                          {isBest && <Crown className="h-3.5 w-3.5 text-gold" />}
                          {row.format(p)}
                        </span>
                      </td>
                    );
                  })}
                  {selected.length < 4 && <td />}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Picker */}
      <AnimatePresence>
        {picking && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="mt-6 rounded-3xl glass-strong p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-lg text-pearl">Add a residence to compare</p>
              <button onClick={() => setPicking(false)} aria-label="Close">
                <X className="h-5 w-5 text-mist" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {available.map((p) => (
                <button
                  key={p.id}
                  onClick={() => add(p)}
                  className="flex items-center gap-3 rounded-2xl border border-champagne/12 bg-graphite/40 p-3 text-left transition-colors hover:border-champagne/40"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <Image src={img(p.cover, 200)} alt={p.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-display text-base text-pearl">{p.name}</p>
                    <p className="flex items-center gap-1 text-xs text-mist">
                      <Star className="h-3 w-3 fill-gold text-gold" /> {p.developerRating} · {p.city}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
