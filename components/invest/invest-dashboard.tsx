"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, LineChart, Building2, Percent } from "lucide-react";
import { AreaChart } from "@/components/charts/area-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { formatFull, cn } from "@/lib/utils";

const INDEX_SERIES: Record<string, { data: number[]; labels: string[] }> = {
  "1Y": {
    data: [100, 103, 106, 104, 109, 113, 118, 121, 119, 126, 131, 138],
    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  },
  "5Y": {
    data: [62, 71, 78, 74, 88, 97, 112, 121, 130, 138],
    labels: ["'21", "", "'22", "", "'23", "", "'24", "", "'25", "'26"],
  },
  ALL: {
    data: [28, 34, 41, 39, 52, 61, 70, 82, 91, 104, 121, 138],
    labels: ["'17", "", "'19", "", "'21", "", "'23", "", "'25", "", "", "'26"],
  },
};

const YIELDS = [
  { label: "Dubai", value: 6.8 },
  { label: "Miami", value: 5.1 },
  { label: "New York", value: 4.1 },
  { label: "London", value: 3.9 },
  { label: "Monaco", value: 3.2 },
];

const KPIS = [
  { icon: LineChart, label: "Luxury Market Index", value: "138.4", delta: "+8.2%", up: true },
  { icon: TrendingUp, label: "Avg. Investor ROI", value: "9.4%", delta: "+1.1pt", up: true },
  { icon: Building2, label: "Prime Inventory", value: "1,284", delta: "-3.4%", up: false },
  { icon: Percent, label: "Avg. Rental Yield", value: "4.8%", delta: "+0.3pt", up: true },
];

export function InvestDashboard() {
  const [period, setPeriod] = useState<keyof typeof INDEX_SERIES>("5Y");
  const [value, setValue] = useState(20_000_000);
  const [monthlyRent, setMonthlyRent] = useState(95_000);

  const grossYield = useMemo(
    () => ((monthlyRent * 12) / value) * 100,
    [value, monthlyRent]
  );
  const netYield = grossYield * 0.78;

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-28 md:px-8">
      {/* KPIs */}
      <div id="index" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {KPIS.map((k, i) => {
          const Icon = k.icon;
          return (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-3xl border border-champagne/12 bg-graphite/40 p-6"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-champagne" />
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs",
                    k.up ? "bg-emerald-500/10 text-emerald-300" : "bg-red-500/10 text-red-300"
                  )}
                >
                  {k.delta}
                </span>
              </div>
              <p className="mt-5 font-display text-3xl text-pearl">{k.value}</p>
              <p className="text-xs text-fog">{k.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-champagne/12 bg-graphite/40 p-7">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-2xl font-light text-pearl">
                Luxury Market Index
              </h3>
              <p className="text-sm text-mist">Global prime residential · base 100</p>
            </div>
            <div className="flex gap-1 rounded-full border border-champagne/15 p-1">
              {(Object.keys(INDEX_SERIES) as (keyof typeof INDEX_SERIES)[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs transition-colors",
                    period === p ? "bg-gold text-ink" : "text-mist hover:text-pearl"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <AreaChart
              data={INDEX_SERIES[period].data}
              labels={INDEX_SERIES[period].labels}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-champagne/12 bg-graphite/40 p-7">
          <h3 className="font-display text-2xl font-light text-pearl">Rental yield by city</h3>
          <p className="text-sm text-mist">Gross, trailing 12 months</p>
          <div className="mt-8">
            <BarChart data={YIELDS} />
          </div>
        </div>
      </div>

      {/* Yield calculator */}
      <div id="calculator" className="mt-6 grid gap-6 rounded-3xl border border-champagne/12 bg-graphite/40 p-7 lg:grid-cols-2 lg:p-10">
        <div>
          <h3 className="font-display text-3xl font-light text-pearl">Yield Calculator</h3>
          <p className="mt-2 text-sm text-mist">
            Model rental returns on any residence before you commit.
          </p>

          <div className="mt-8 space-y-6">
            <Range
              label="Property value"
              display={formatFull(value, "$")}
              min={2_000_000}
              max={60_000_000}
              step={500_000}
              value={value}
              onChange={setValue}
            />
            <Range
              label="Monthly rent"
              display={formatFull(monthlyRent, "$")}
              min={10_000}
              max={300_000}
              step={5_000}
              value={monthlyRent}
              onChange={setMonthlyRent}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 rounded-2xl border border-champagne/15 bg-obsidian/50 p-8">
          <div className="flex items-end justify-between">
            <span className="text-sm text-mist">Gross yield</span>
            <span className="font-display text-4xl text-gold-gradient">
              {grossYield.toFixed(1)}%
            </span>
          </div>
          <div className="rule-gold" />
          <div className="flex items-end justify-between">
            <span className="text-sm text-mist">Net yield (est.)</span>
            <span className="font-display text-3xl text-pearl">{netYield.toFixed(1)}%</span>
          </div>
          <div className="rule-gold" />
          <div className="flex items-end justify-between">
            <span className="text-sm text-mist">Annual income</span>
            <span className="font-display text-2xl text-pearl">
              {formatFull(monthlyRent * 12, "$")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Range({
  label,
  display,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  display: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-mist">{label}</span>
        <span className="font-display text-lg text-pearl">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="luxe-range mt-3 w-full"
        style={{
          background: `linear-gradient(to right, var(--color-champagne) ${pct}%, rgba(255,255,255,0.12) ${pct}%)`,
        }}
      />
    </div>
  );
}
