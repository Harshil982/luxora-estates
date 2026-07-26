import Image from "next/image";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { NEIGHBORHOODS } from "@/lib/data/site";
import { img } from "@/lib/data/images";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function NeighborhoodsPreview() {
  return (
    <section className="border-y border-champagne/10 bg-onyx py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHeading
          eyebrow="Neighborhood Intelligence"
          title="Not just an address —"
          accent="an ecosystem"
          description="Live data on luxury index, growth, safety and connectivity for the world's most coveted enclaves."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {NEIGHBORHOODS.map((n, i) => (
            <Reveal key={n.name} delay={i * 0.08}>
              <Link
                href="/neighborhoods"
                className="lux-elevate group relative block aspect-[3/4] overflow-hidden rounded-3xl"
              >
                <Image
                  src={img(n.image, 800)}
                  alt={n.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />

                <div className="absolute right-4 top-4 rounded-full glass px-3 py-1.5 text-center">
                  <span className="font-display text-base text-gold-gradient">
                    {n.luxuryIndex}
                  </span>
                  <span className="ml-1 text-[0.55rem] tracking-widest text-mist">LUX</span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs tracking-widest text-champagne">
                    {n.city.toUpperCase()}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-light text-pearl">
                    {n.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs text-mist opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {n.blurb}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                    <TrendingUp className="h-3 w-3" /> +{n.growth}% YoY
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
