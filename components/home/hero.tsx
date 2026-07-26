"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { img, type PhotoKey } from "@/lib/data/images";
import { LuxurySearch } from "./luxury-search";
import { FloatingCard } from "./floating-card";

const SLIDES: { key: PhotoKey; place: string }[] = [
  { key: "villaGlassPool", place: "Palm Jumeirah · Dubai" },
  { key: "nycPenthouseView", place: "Tribeca · New York" },
  { key: "whiteCliffVilla", place: "Paradise Cove · Malibu" },
  { key: "whiteMediterranean", place: "Monte-Carlo · Monaco" },
];

const TAGLINES = [
  "Invest Beyond Imagination.",
  "Discover Luxury Reimagined.",
  "The Future of Premium Real Estate.",
  "Find Your Legacy.",
];

const luxeEase = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const [active, setActive] = useState(0);
  const [tag, setTag] = useState(0);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 50, damping: 20 });
  const py = useSpring(my, { stiffness: 50, damping: 20 });
  const bgX = useTransform(px, [-0.5, 0.5], ["-2.5%", "2.5%"]);
  const bgY = useTransform(py, [-0.5, 0.5], ["-2.5%", "2.5%"]);

  useEffect(() => {
    const slideTimer = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 6000);
    const tagTimer = setInterval(() => setTag((t) => (t + 1) % TAGLINES.length), 3500);
    return () => {
      clearInterval(slideTimer);
      clearInterval(tagTimer);
    };
  }, []);

  return (
    <section
      onMouseMove={(e) => {
        const { innerWidth, innerHeight } = window;
        mx.set(e.clientX / innerWidth - 0.5);
        my.set(e.clientY / innerHeight - 0.5);
      }}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* Cinematic background crossfade */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-[-3%]">
        <AnimatePresence mode="sync">
          {SLIDES.map(
            (slide, i) =>
              i === active && (
                <motion.div
                  key={slide.key}
                  initial={{ opacity: 0, scale: 1.12 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ opacity: { duration: 1.6 }, scale: { duration: 7, ease: "linear" } }}
                  className="absolute inset-0"
                >
                  <Image
                    src={img(slide.key, 2400, 82)}
                    alt="Luxury residence"
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </motion.div>

      {/* Scrims */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-transparent to-transparent" />

      {/* Location tag (top-left, under nav) */}
      <div className="absolute left-5 top-28 z-10 md:left-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs tracking-[0.25em] text-mist"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            {SLIDES[active].place.toUpperCase()}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Floating property card (desktop) */}
      <div className="pointer-events-none absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
        <FloatingCard />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-14 md:px-8 md:pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-10 bg-champagne/50" />
          <span className="eyebrow">Luxora Estates</span>
        </motion.div>

        <h1 className="mt-6 max-w-4xl font-display text-[3.2rem] font-light leading-[0.95] tracking-tight text-pearl sm:text-7xl md:text-8xl">
          <RiseLine text="Where Extraordinary" delay={0.4} />
          <RiseLine text="Living Begins." delay={0.55} accent />
        </h1>

        <div className="mt-6 h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={tag}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.6, ease: luxeEase }}
              className="text-lg text-mist md:text-xl"
            >
              {TAGLINES[tag]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: luxeEase }}
          className="mt-10 max-w-4xl"
        >
          <LuxurySearch />
        </motion.div>

        {/* Slide dots */}
        <div className="mt-10 flex items-center gap-2.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View slide ${i + 1}`}
              className="group h-1 overflow-hidden rounded-full bg-pearl/20 transition-all duration-500"
              style={{ width: i === active ? 44 : 20 }}
            >
              {i === active && (
                <motion.span
                  key={active}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="block h-full bg-gold"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[0.6rem] tracking-[0.3em] text-fog">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-champagne" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function RiseLine({
  text,
  delay,
  accent,
}: {
  text: string;
  delay: number;
  accent?: boolean;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: luxeEase, delay }}
        className={accent ? "block italic text-gold-gradient" : "block"}
      >
        {text}
      </motion.span>
    </span>
  );
}
