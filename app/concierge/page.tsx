import type { Metadata } from "next";
import Image from "next/image";
import { Sofa, Cpu, KeyRound, Scale, Plane, Sparkles, ArrowUpRight, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { SERVICES } from "@/lib/data/site";
import { img } from "@/lib/data/images";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Concierge",
  description:
    "White-glove services beyond the keys — interior design, home automation, property management, legal, relocation and VIP.",
  alternates: { canonical: "/concierge" },
};

const ICONS: Record<string, LucideIcon> = { Sofa, Cpu, KeyRound, Scale, Plane, Sparkles };

export default function ConciergePage() {
  return (
    <>
      <PageHeader
        eyebrow="Luxora Concierge"
        title="Everything beyond"
        accent="the keys"
        description="Ownership is where we begin. A private house of specialists tends to every dimension of the life inside your home — anywhere in the world, at any hour."
      >
        <Button href="/contact" size="lg">
          Speak with the concierge desk
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </PageHeader>

      <section className="mx-auto max-w-[1400px] px-5 pb-28 md:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Sparkles;
            const wide = i === 0 || i === 3;
            return (
              <Reveal
                key={s.title}
                delay={(i % 2) * 0.08}
                className={wide ? "md:col-span-2" : ""}
              >
                <div
                  id={s.title.toLowerCase().split(" ")[0]}
                  className="group relative h-full overflow-hidden rounded-[2rem] border border-champagne/12"
                >
                  <div className="relative aspect-[16/9] md:aspect-[16/7]">
                    <Image
                      src={img(s.image, 1400)}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl glass text-champagne">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-3xl font-light text-pearl">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm text-mist">{s.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
