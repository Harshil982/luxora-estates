import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeatured, PROPERTIES } from "@/lib/data/properties";
import { PropertyCard } from "@/components/property/property-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function FeaturedCollection() {
  const featured = [...getFeatured(), ...PROPERTIES.filter((p) => !p.featured)].slice(0, 6);

  return (
    <section className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="The Collection"
          title="Residences chosen"
          accent="for the few"
          description="Each home is privately vetted for architecture, provenance and investment merit. A selection, never a catalogue."
        />
        <Link
          href="/properties"
          className="group inline-flex shrink-0 items-center gap-2 text-sm text-mist transition-colors hover:text-pearl"
        >
          View all residences
          <span className="grid h-9 w-9 place-items-center rounded-full border border-champagne/30 transition-all duration-500 group-hover:border-champagne group-hover:bg-champagne/10">
            <ArrowUpRight className="h-4 w-4 text-champagne" />
          </span>
        </Link>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <PropertyCard key={p.id} property={p} index={i} priority={i < 3} />
        ))}
      </div>
    </section>
  );
}
