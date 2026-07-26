"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Home, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { LuxSelect } from "@/components/ui/select";

const TABS = ["Buy", "Rent", "Invest", "Commercial"] as const;
const TYPES = ["All", "Villas", "Apartments", "Mansions", "Penthouses"];
const CITIES = ["Anywhere", "New York", "Dubai", "London", "Malibu", "Monaco", "Miami"];
const BUDGETS = ["Any", "$1M – $5M", "$5M – $15M", "$15M – $30M", "$30M+"];

export function LuxurySearch() {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Buy");
  const [city, setCity] = useState("Anywhere");
  const [type, setType] = useState("All");
  const [budget, setBudget] = useState("Any");

  function submit() {
    const params = new URLSearchParams();
    params.set("listing", tab);
    if (city !== "Anywhere") params.set("city", city);
    if (type !== "All") params.set("type", type);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-1 rounded-t-2xl">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative rounded-t-xl px-5 py-2.5 text-sm transition-colors duration-300",
              tab === t ? "text-ink" : "text-mist hover:text-pearl"
            )}
          >
            {tab === t && (
              <motion.span
                layoutId="search-tab"
                className="absolute inset-0 rounded-t-xl bg-gradient-to-b from-gold to-gold-bright"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative z-10 font-medium">{t}</span>
          </button>
        ))}
      </div>

      {/* Bar */}
      <div className="flex flex-col gap-1 rounded-b-2xl rounded-tr-2xl glass-strong p-2 md:flex-row md:items-center">
        <LuxSelect
          value={city}
          onChange={setCity}
          options={CITIES}
          icon={<MapPin className="h-4 w-4" />}
          label="Location"
        />
        <Divider />
        <LuxSelect
          value={type}
          onChange={setType}
          options={TYPES}
          icon={<Home className="h-4 w-4" />}
          label="Property"
        />
        <Divider />
        <LuxSelect
          value={budget}
          onChange={setBudget}
          options={BUDGETS}
          icon={<Wallet className="h-4 w-4" />}
          label="Budget"
        />
        <button
          onClick={submit}
          className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-gold-bright px-7 py-4 font-medium text-ink transition-all duration-500 hover:shadow-[0_0_40px_-8px_rgba(201,169,106,0.6)] md:ml-1"
        >
          <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
          Search
        </button>
      </div>
    </div>
  );
}

function Divider() {
  return <span className="mx-1 hidden h-8 w-px bg-champagne/15 md:block" />;
}
