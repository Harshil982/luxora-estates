import Link from "next/link";
import { Sofa, Cpu, KeyRound, Scale, Plane, Sparkles, ArrowUpRight, type LucideIcon } from "lucide-react";
import { SERVICES } from "@/lib/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const ICONS: Record<string, LucideIcon> = {
  Sofa,
  Cpu,
  KeyRound,
  Scale,
  Plane,
  Sparkles,
};

export function ServicesPreview() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Concierge"
          title="Everything beyond"
          accent="the keys"
          description="Ownership is where we begin. A private house of specialists tends to every dimension of the life inside."
        />
        <Link
          href="/concierge"
          className="group inline-flex shrink-0 items-center gap-2 text-sm text-mist transition-colors hover:text-pearl"
        >
          All services
          <span className="grid h-9 w-9 place-items-center rounded-full border border-champagne/30 transition-all duration-500 group-hover:border-champagne group-hover:bg-champagne/10">
            <ArrowUpRight className="h-4 w-4 text-champagne" />
          </span>
        </Link>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon] ?? Sparkles;
          return (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <div className="lux-elevate group relative h-full overflow-hidden rounded-3xl border border-champagne/10 bg-graphite/40 p-7 transition-all duration-700 hover:border-champagne/30 hover:bg-graphite/70">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-champagne/[0.05] blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-0" />
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-champagne/20 text-champagne transition-all duration-500 group-hover:border-champagne group-hover:bg-champagne/10">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-light text-pearl">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{s.description}</p>
                <ArrowUpRight className="mt-6 h-5 w-5 text-fog transition-all duration-500 group-hover:translate-x-1 group-hover:text-champagne" />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
