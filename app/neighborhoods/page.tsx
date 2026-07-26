import type { Metadata } from "next";
import Image from "next/image";
import { TrendingUp, ShieldCheck, Sparkles, Building } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { NEIGHBORHOODS } from "@/lib/data/site";
import { img } from "@/lib/data/images";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Neighborhood Intelligence",
  description:
    "Live luxury index, growth, safety and connectivity data for the world's most coveted enclaves.",
};

const METRICS = [
  { icon: Sparkles, label: "Luxury Index", key: "luxuryIndex" as const, suffix: "" },
  { icon: TrendingUp, label: "Growth YoY", key: "growth" as const, suffix: "%" },
];

export default function NeighborhoodsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Neighborhood Intelligence"
        title="Not just an address —"
        accent="an ecosystem"
        description="Every residence lives within a world. We map that world in data — luxury density, capital growth, safety and connectivity — so you invest in more than four walls."
      />

      <section className="mx-auto max-w-[1400px] space-y-8 px-5 pb-28 md:px-8">
        {NEIGHBORHOODS.map((n, i) => (
          <Reveal key={n.name} delay={i * 0.05}>
            <div className="group grid gap-0 overflow-hidden rounded-[2rem] border border-champagne/12 bg-graphite/30 lg:grid-cols-2">
              <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto">
                <Image
                  src={img(n.image, 1200)}
                  alt={n.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="eyebrow">{n.city}</p>
                <h2 className="mt-3 font-display text-4xl font-light text-pearl">{n.name}</h2>
                <p className="mt-4 max-w-md text-mist">{n.blurb}</p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {METRICS.map((m) => {
                    const Icon = m.icon;
                    return (
                      <div
                        key={m.label}
                        className="rounded-2xl border border-champagne/12 bg-obsidian/40 p-5"
                      >
                        <Icon className="h-5 w-5 text-champagne" />
                        <p className="mt-4 font-display text-3xl text-gold-gradient">
                          {n[m.key]}
                          {m.suffix}
                        </p>
                        <p className="text-xs text-fog">{m.label}</p>
                      </div>
                    );
                  })}
                  <div className="rounded-2xl border border-champagne/12 bg-obsidian/40 p-5">
                    <ShieldCheck className="h-5 w-5 text-champagne" />
                    <p className="mt-4 font-display text-3xl text-pearl">A+</p>
                    <p className="text-xs text-fog">Safety Grade</p>
                  </div>
                  <div className="rounded-2xl border border-champagne/12 bg-obsidian/40 p-5">
                    <Building className="h-5 w-5 text-champagne" />
                    <p className="mt-4 font-display text-3xl text-pearl">12</p>
                    <p className="text-xs text-fog">Future Developments</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}
