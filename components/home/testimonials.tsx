"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];

  const go = (dir: number) =>
    setI((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="border-y border-champagne/10 bg-onyx py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <SectionHeading
          eyebrow="In their words"
          title="Trusted by the world's"
          accent="most discerning"
          align="center"
          className="items-center"
        />

        <div className="relative mt-14 min-h-[280px]">
          <Quote className="mx-auto h-10 w-10 text-champagne/30" />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6"
            >
              <p className="font-display text-2xl font-light leading-relaxed text-pearl md:text-3xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-8 flex flex-col items-center gap-1">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-3 font-medium text-pearl">{t.name}</p>
                <p className="text-sm text-mist">
                  {t.title} · {t.location}
                </p>
              </div>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="grid h-11 w-11 place-items-center rounded-full border border-champagne/25 text-mist transition-all hover:border-champagne hover:text-pearl"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, d) => (
              <button
                key={d}
                onClick={() => setI(d)}
                aria-label={`Testimonial ${d + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  d === i ? "w-8 bg-gold" : "w-1.5 bg-pearl/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="grid h-11 w-11 place-items-center rounded-full border border-champagne/25 text-mist transition-all hover:border-champagne hover:text-pearl"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
