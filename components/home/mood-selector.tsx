"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { MOODS } from "@/lib/data/site";
import { PROPERTIES } from "@/lib/data/properties";
import { img } from "@/lib/data/images";
import { formatPrice } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Mood } from "@/lib/data/properties";

export function MoodSelector() {
  const [mood, setMood] = useState<Mood>("Luxury");
  const match =
    PROPERTIES.find((p) => p.moods.includes(mood)) ?? PROPERTIES[0];

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
      <SectionHeading
        eyebrow="Property Mood"
        title="How do you want"
        accent="to feel at home?"
        description="Choose a mood and let the collection rearrange itself around the life you're imagining."
        align="center"
        className="mx-auto items-center"
      />

      {/* Mood pills */}
      <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
        {MOODS.map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`relative rounded-full px-5 py-2.5 text-sm transition-colors duration-300 ${
              mood === m ? "text-ink" : "text-mist hover:text-pearl"
            }`}
          >
            {mood === m && (
              <motion.span
                layoutId="mood-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-gold-bright"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10 font-medium">{m}</span>
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={match.id + mood}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[16/10] md:aspect-[16/8]"
          >
            <Image
              src={img(match.cover, 1600)}
              alt={match.name}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-end md:p-10">
              <div>
                <p className="eyebrow">{mood} living</p>
                <h3 className="mt-2 font-display text-3xl font-light text-pearl md:text-4xl">
                  {match.name}
                </h3>
                <p className="text-sm text-mist">
                  {match.neighborhood}, {match.city} · {formatPrice(match.price, match.currency)}
                </p>
              </div>
              <Link
                href={`/properties/${match.slug}`}
                className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm text-pearl transition-colors hover:border-champagne/40"
              >
                Explore this home
                <ArrowUpRight className="h-4 w-4 text-champagne" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
