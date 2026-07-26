"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X, ArrowUpDown, Search } from "lucide-react";
import { PROPERTIES, type Property } from "@/lib/data/properties";
import { PropertyCard } from "@/components/property/property-card";
import { LuxSelect } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const TYPES = ["All", "Villa", "Penthouse", "Mansion", "Apartment", "Estate"] as const;
const LISTINGS = ["All", "Buy", "Rent", "Invest"] as const;
const CITIES = ["All", ...Array.from(new Set(PROPERTIES.map((p) => p.city)))];
const SORTS = [
  { id: "featured", label: "Curated" },
  { id: "price-desc", label: "Price · High to Low" },
  { id: "price-asc", label: "Price · Low to High" },
  { id: "roi", label: "Highest ROI" },
  { id: "score", label: "Investment Score" },
] as const;

export function PropertiesExplorer({
  initialListing = "All",
  initialCity = "All",
  initialType = "All",
}: {
  initialListing?: string;
  initialCity?: string;
  initialType?: string;
}) {
  const [type, setType] = useState(initialType);
  const [listing, setListing] = useState(initialListing);
  const [city, setCity] = useState(initialCity);
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("featured");
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    let list: Property[] = PROPERTIES.filter((p) => {
      if (type !== "All" && p.type !== type) return false;
      if (listing !== "All" && !p.listing.includes(listing as Property["listing"][number]))
        return false;
      if (city !== "All" && p.city !== city) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.city.toLowerCase().includes(q) &&
          !p.neighborhood.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-desc":
          return b.price - a.price;
        case "price-asc":
          return a.price - b.price;
        case "roi":
          return b.roi - a.roi;
        case "score":
          return b.scores.investment - a.scores.investment;
        default:
          return Number(!!b.featured) - Number(!!a.featured);
      }
    });
    return list;
  }, [type, listing, city, sort, query]);

  const reset = () => {
    setType("All");
    setListing("All");
    setCity("All");
    setQuery("");
    setSort("featured");
  };

  const active = [type, listing, city].filter((v) => v !== "All").length + (query ? 1 : 0);

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-28 md:px-8">
      {/* Controls */}
      <div className="sticky top-20 z-40 -mx-5 mb-10 border-y border-champagne/10 bg-obsidian/80 px-5 py-4 backdrop-blur-xl md:mx-0 md:rounded-2xl md:border md:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {/* Search */}
          <div className="flex w-full min-w-0 items-center gap-2 rounded-full border border-champagne/15 bg-graphite/40 px-4 py-2.5 sm:w-auto sm:flex-1">
            <Search className="h-4 w-4 shrink-0 text-fog" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, city or neighborhood…"
              className="w-full min-w-0 bg-transparent text-sm text-pearl placeholder:text-fog focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <LuxSelect
              variant="pill"
              align="right"
              value={sort}
              onChange={(v) => setSort(v as typeof sort)}
              options={SORTS.map((s) => ({ label: s.label, value: s.id }))}
              icon={<ArrowUpDown className="h-4 w-4" />}
            />

            <button
              onClick={() => setShowFilters((s) => !s)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors",
                showFilters || active
                  ? "border-champagne/50 bg-champagne/10 text-pearl"
                  : "border-champagne/15 bg-graphite/40 text-mist"
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {active > 0 && (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-gold text-[0.7rem] font-semibold text-ink">
                  {active}
                </span>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-4 pt-5">
                <FilterRow label="Type" options={[...TYPES]} value={type} onChange={setType} />
                <FilterRow
                  label="Listing"
                  options={[...LISTINGS]}
                  value={listing}
                  onChange={setListing}
                />
                <FilterRow label="City" options={CITIES} value={city} onChange={setCity} />
                {active > 0 && (
                  <button
                    onClick={reset}
                    className="flex w-fit items-center gap-1.5 text-xs text-mist transition-colors hover:text-pearl"
                  >
                    <X className="h-3.5 w-3.5" /> Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Result count */}
      <div className="mb-8 flex items-baseline justify-between">
        <p className="text-sm text-mist">
          <span className="font-display text-2xl text-pearl">{results.length}</span>{" "}
          {results.length === 1 ? "residence" : "residences"}
        </p>
      </div>

      {/* Grid */}
      {results.length > 0 ? (
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
              >
                <PropertyCard property={p} index={i} priority={i < 3} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="grid place-items-center rounded-3xl border border-champagne/10 py-24 text-center">
          <p className="font-display text-2xl text-pearl">No residences match.</p>
          <p className="mt-2 text-sm text-mist">Try widening your criteria.</p>
          <button
            onClick={reset}
            className="mt-6 rounded-full border border-champagne/30 px-5 py-2.5 text-sm text-pearl transition-colors hover:bg-champagne/10"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-16 text-xs uppercase tracking-widest text-fog">{label}</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm transition-all duration-300",
            value === o
              ? "border-champagne bg-gradient-to-r from-gold to-gold-bright text-ink"
              : "border-champagne/15 text-mist hover:border-champagne/40 hover:text-pearl"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
