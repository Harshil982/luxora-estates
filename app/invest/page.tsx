import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { InvestDashboard } from "@/components/invest/invest-dashboard";
import { PROPERTIES } from "@/lib/data/properties";
import { formatPrice } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Investment",
  description:
    "Live luxury market intelligence, yield modelling and high-ROI opportunities across Luxora's global collection.",
};

export default function InvestPage() {
  const opportunities = [...PROPERTIES]
    .filter((p) => p.listing.includes("Invest"))
    .sort((a, b) => b.roi - a.roi)
    .slice(0, 4);

  return (
    <>
      <PageHeader
        eyebrow="Investment Intelligence"
        title="Wealth, given"
        accent="an address"
        description="A live desk for the discerning investor — market indices, yield modelling and privately-sourced, income-generating residences."
      />

      <InvestDashboard />

      {/* Opportunities */}
      <section className="mx-auto max-w-[1400px] px-5 pb-32 md:px-8">
        <SectionHeading
          eyebrow="High-Yield Opportunities"
          title="Where capital"
          accent="compounds"
          description="Curated for return. Ranked by projected annual ROI across the collection."
        />
        <div className="mt-12 overflow-hidden rounded-3xl border border-champagne/12">
          {opportunities.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <Link
                href={`/properties/${p.slug}`}
                className="group grid grid-cols-2 items-center gap-4 border-b border-champagne/10 bg-graphite/30 px-5 py-5 transition-colors last:border-0 hover:bg-graphite/60 md:grid-cols-6 md:px-8"
              >
                <div className="col-span-2 md:col-span-2">
                  <p className="font-display text-xl text-pearl">{p.name}</p>
                  <p className="text-sm text-mist">
                    {p.neighborhood}, {p.city}
                  </p>
                </div>
                <Metric label="Price" value={formatPrice(p.price, p.currency)} />
                <Metric label="ROI" value={`${p.roi}%`} gold />
                <Metric label="Yield" value={`${p.rentalYield}%`} />
                <div className="hidden items-center justify-end md:flex">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-champagne/25 text-champagne transition-all group-hover:border-champagne group-hover:bg-champagne/10">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2 text-xs text-fog">
          <TrendingUp className="h-3.5 w-3.5" />
          Figures are illustrative projections for portfolio demonstration and not financial advice.
        </div>
      </section>
    </>
  );
}

function Metric({ label, value, gold }: { label: string; value: string; gold?: boolean }) {
  return (
    <div>
      <p className="text-[0.65rem] uppercase tracking-widest text-fog">{label}</p>
      <p className={`font-display text-lg ${gold ? "text-gold-gradient" : "text-pearl"}`}>
        {value}
      </p>
    </div>
  );
}
