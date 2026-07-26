import type { Metadata } from "next";
import Image from "next/image";
import {
  DollarSign,
  Users,
  Home,
  CalendarCheck,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import { AreaChart } from "@/components/charts/area-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { PROPERTIES } from "@/lib/data/properties";
import { img } from "@/lib/data/images";
import { formatPrice } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Agent & admin command center — pipeline, bookings and portfolio analytics.",
};

const KPIS = [
  { icon: DollarSign, label: "Pipeline value", value: "$248.6M", delta: "+12.4%" },
  { icon: Users, label: "Active leads", value: "1,842", delta: "+8.1%" },
  { icon: Home, label: "Listings live", value: "126", delta: "+4" },
  { icon: CalendarCheck, label: "Viewings (wk)", value: "58", delta: "+15%" },
];

const REVENUE = [180, 210, 195, 240, 268, 255, 290, 320, 305, 348, 372, 410];
const SOURCES = [
  { label: "AI Match", value: 42 },
  { label: "Referral", value: 28 },
  { label: "Direct", value: 19 },
  { label: "Portal", value: 11 },
];

const LEADS = [
  { name: "Alexandra Voss", property: "The Obsidian Penthouse", stage: "Offer", value: 28_500_000, city: "New York" },
  { name: "Rashid Al-Farsi", property: "Villa Mirage", stage: "Viewing", value: 22_900_000, city: "Dubai" },
  { name: "Sophie Laurent", property: "The Riviera Pavilion", stage: "Negotiation", value: 47_500_000, city: "Monaco" },
  { name: "James Whitmore", property: "The Cliff House", stage: "Qualified", value: 41_000_000, city: "Malibu" },
  { name: "Mara Chen", property: "Azure Sky Residence", stage: "Contacted", value: 6_400_000, city: "Dubai" },
];

const STAGE_COLOR: Record<string, string> = {
  Offer: "bg-emerald-500/15 text-emerald-300",
  Viewing: "bg-champagne/15 text-champagne",
  Negotiation: "bg-blue-500/15 text-blue-300",
  Qualified: "bg-purple-500/15 text-purple-300",
  Contacted: "bg-pearl/10 text-mist",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-28 pb-28 md:px-8 md:pt-36">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Command Center</p>
          <h1 className="mt-3 font-display text-4xl font-light text-pearl md:text-5xl">
            Welcome back, <span className="italic text-gold-gradient">Elena</span>
          </h1>
          <p className="mt-2 text-sm text-mist">
            Here&apos;s how your desk is performing this week.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full glass px-4 py-2 text-sm text-mist">Last 12 months</span>
          <button className="rounded-full bg-gradient-to-r from-gold to-gold-bright px-5 py-2.5 text-sm font-medium text-ink">
            + New listing
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {KPIS.map((k, i) => {
          const Icon = k.icon;
          return (
            <Reveal key={k.label} delay={i * 0.06}>
              <div className="rounded-3xl border border-champagne/12 bg-graphite/40 p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-champagne/15 text-champagne">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                    {k.delta}
                  </span>
                </div>
                <p className="mt-5 font-display text-3xl text-pearl">{k.value}</p>
                <p className="text-xs text-fog">{k.label}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 rounded-3xl border border-champagne/12 bg-graphite/40 p-5 md:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <div>
              <h3 className="font-display text-2xl font-light text-pearl">Revenue</h3>
              <p className="text-sm text-mist">Commission, $M · trailing year</p>
            </div>
            <span className="font-display text-2xl text-gold-gradient">$41.0M</span>
          </div>
          <div className="mt-6">
            <AreaChart
              data={REVENUE}
              labels={["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]}
            />
          </div>
        </div>

        <div className="min-w-0 rounded-3xl border border-champagne/12 bg-graphite/40 p-7">
          <h3 className="font-display text-2xl font-light text-pearl">Lead sources</h3>
          <p className="text-sm text-mist">Share of qualified pipeline</p>
          <div className="mt-8">
            <BarChart data={SOURCES} />
          </div>
        </div>
      </div>

      {/* Leads + Portfolio */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Leads table */}
        <div className="min-w-0 rounded-3xl border border-champagne/12 bg-graphite/40 p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl font-light text-pearl">Pipeline</h3>
            <button className="text-sm text-mist transition-colors hover:text-pearl">
              View CRM
            </button>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr className="text-left text-xs uppercase tracking-widest text-fog">
                  <th className="pb-3 font-normal">Client</th>
                  <th className="pb-3 font-normal">Stage</th>
                  <th className="pb-3 text-right font-normal">Value</th>
                </tr>
              </thead>
              <tbody>
                {LEADS.map((l) => (
                  <tr key={l.name} className="border-t border-champagne/8">
                    <td className="py-4">
                      <p className="text-sm text-pearl">{l.name}</p>
                      <p className="text-xs text-fog">{l.property}</p>
                    </td>
                    <td className="py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs ${STAGE_COLOR[l.stage]}`}>
                        {l.stage}
                      </span>
                    </td>
                    <td className="py-4 text-right font-display text-base text-pearl">
                      {formatPrice(l.value, "$")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top listings */}
        <div className="min-w-0 rounded-3xl border border-champagne/12 bg-graphite/40 p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl font-light text-pearl">Top listings</h3>
            <MoreHorizontal className="h-5 w-5 text-fog" />
          </div>
          <div className="mt-5 space-y-3">
            {PROPERTIES.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                  <Image src={img(p.cover, 150)} alt={p.name} fill sizes="48px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-pearl">{p.name}</p>
                  <p className="text-xs text-fog">{p.city}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-sm text-gold-gradient">
                    {formatPrice(p.price, p.currency)}
                  </p>
                  <p className="flex items-center justify-end gap-0.5 text-xs text-emerald-300">
                    <ArrowUpRight className="h-3 w-3" /> {p.roi}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-fog">
        Demonstration dashboard · sample data for portfolio purposes
      </p>
    </div>
  );
}
