import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { img } from "@/lib/data/images";
import { Button } from "@/components/ui/button";
import { Reveal, SplitWords } from "@/components/ui/reveal";

export function CtaSection() {
  return (
    <section className="relative mx-4 my-24 overflow-hidden rounded-[2.5rem] md:mx-8 md:my-32">
      <Image
        src={img("infinityPoolDusk", 2000)}
        alt="Infinity pool at dusk"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-obsidian/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40" />

      <div className="relative flex flex-col items-center px-6 py-24 text-center md:py-36">
        <Reveal className="eyebrow flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5" /> A private invitation
        </Reveal>
        <h2 className="mt-6 max-w-4xl font-display text-4xl font-light leading-[1.05] text-pearl sm:text-6xl md:text-7xl">
          <SplitWords text="Your next chapter" />
          <br />
          <span className="italic text-gold-gradient">
            <SplitWords text="deserves a setting." delay={0.2} />
          </span>
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-base text-mist md:text-lg">
            Speak with a private advisor and receive a curated selection within
            48 hours — discreet, unhurried, entirely yours.
          </p>
        </Reveal>
        <Reveal delay={0.35} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/contact" size="lg">
            Request private access
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button href="/properties" variant="outline" size="lg">
            Browse the collection
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
