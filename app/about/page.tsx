import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { img } from "@/lib/data/images";
import { STATS } from "@/lib/data/site";
import { Reveal, SplitWords } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Luxora Estates — a private house built on discretion, taste and an obsession with the extraordinary.",
};

const TIMELINE = [
  { year: "2009", title: "A single key", body: "Founded on a belief that a home is the setting for a life — not merely an asset." },
  { year: "2014", title: "Crossing borders", body: "Opened private desks in London, Dubai and New York for a global clientele." },
  { year: "2019", title: "Intelligence, applied", body: "Built our proprietary scoring engine — luxury, investment and livability, quantified." },
  { year: "2023", title: "The AI concierge", body: "Introduced conversational matching, pairing clients to residences in seconds." },
  { year: "2026", title: "Thirty-eight cities", body: "Today, Luxora curates the extraordinary across six continents." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="A private house for"
        accent="the extraordinary"
        description="Luxora Estates was built for people who understand that where you live shapes who you become. We are discreet by nature and exacting by design."
      />

      {/* Full-bleed image */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem]">
            <Image
              src={img("brutalistFacade", 2000)}
              alt="Luxora atelier"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
          </div>
        </Reveal>
      </section>

      {/* Manifesto */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center md:px-8 md:py-32">
        <p className="font-display text-3xl font-light leading-[1.3] text-pearl md:text-5xl">
          <SplitWords text="We don't sell square footage." />
          <br />
          <span className="italic text-gold-gradient">
            <SplitWords text="We compose the setting for a life well lived." delay={0.2} />
          </span>
        </p>
      </section>

      {/* Stats */}
      <section className="border-y border-champagne/10 bg-onyx py-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-5 md:grid-cols-4 md:px-8">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <span className="font-display text-4xl font-light text-gold-gradient md:text-6xl">
                {s.value}
              </span>
              <p className="mt-1 text-sm text-pearl">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section id="journal" className="mx-auto max-w-4xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading eyebrow="The Journey" title="Seventeen years of" accent="quiet excellence" />
        <div className="mt-14 space-y-2">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.05}>
              <div className="group flex gap-6 border-l border-champagne/15 pb-10 pl-8 last:pb-0">
                <div className="relative">
                  <span className="absolute -left-[2.6rem] top-1 grid h-4 w-4 place-items-center rounded-full border border-champagne/40 bg-obsidian">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold transition-all group-hover:scale-150" />
                  </span>
                </div>
                <div>
                  <span className="font-display text-2xl text-gold-gradient">{t.year}</span>
                  <h3 className="mt-1 font-display text-xl text-pearl">{t.title}</h3>
                  <p className="mt-2 max-w-lg text-sm text-mist">{t.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section id="careers" className="mx-auto max-w-[1400px] px-5 pb-32 md:px-8">
        <div className="grid items-center gap-10 overflow-hidden rounded-[2rem] border border-champagne/12 bg-graphite/30 lg:grid-cols-[1fr_1.3fr]">
          <div className="relative aspect-square lg:aspect-auto lg:h-full">
            <Image
              src={img("libraryStudy", 1000)}
              alt="Founder study"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="p-8 md:p-14">
            <p className="eyebrow">From the Founder</p>
            <blockquote className="mt-5 font-display text-2xl font-light leading-relaxed text-pearl md:text-3xl">
              &ldquo;Luxury is not excess. It is the absence of compromise — a home where
              everything is considered and nothing is loud.&rdquo;
            </blockquote>
            <p className="mt-6 font-medium text-pearl">Elena Marchetti</p>
            <p className="text-sm text-mist">Founder & Creative Director</p>
            <div className="mt-8">
              <Button href="/contact" variant="outline">
                Join our atelier
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
