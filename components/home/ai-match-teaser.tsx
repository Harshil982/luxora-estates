"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import { img } from "@/lib/data/images";
import { getFeatured } from "@/lib/data/properties";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const CRITERIA = [
  "Waterfront within 200m",
  "Home automation throughout",
  "6% rental yield or higher",
  "Quiet, private, and light-filled",
];

export function AiMatchTeaser() {
  const p = getFeatured()[1];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [pct, setPct] = useState(0);
  const [checked, setChecked] = useState<number>(-1);

  useEffect(() => {
    if (!inView) return;
    const target = 94;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1600, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const timers = CRITERIA.map((_, i) =>
      setTimeout(() => setChecked(i), 400 + i * 350)
    );
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [inView]);

  const circ = 2 * Math.PI * 52;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-obsidian via-graphite/40 to-obsidian py-24 md:py-32"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-champagne/[0.06] blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 px-5 md:px-8 lg:grid-cols-2">
        {/* Left: narrative */}
        <div>
          <SectionHeading
            eyebrow="AI Property Matching"
            title="Describe the life"
            accent="you want to live"
            description="Tell our intelligence your budget, lifestyle and ambitions. It reads thousands of data points across every residence to find the ones that are unmistakably yours."
          />

          <div className="mt-8 space-y-3">
            {CRITERIA.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, x: -20 }}
                animate={checked >= i ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full border transition-colors ${
                    checked >= i
                      ? "border-gold bg-gold/15 text-gold"
                      : "border-champagne/20 text-fog"
                  }`}
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm text-mist">{c}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-9">
            <Button href="/ai-match" size="lg">
              <Sparkles className="h-4 w-4" />
              Start your match
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right: match card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[2rem] glass-strong p-3">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[1.5rem]">
              <Image
                src={img(p.cover, 1200)}
                alt={p.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent" />

              {/* Match ring */}
              <div className="absolute right-5 top-5 grid place-items-center">
                <svg width="128" height="128" className="-rotate-90">
                  <circle cx="64" cy="64" r="52" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    fill="none"
                    stroke="url(#goldgrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={circ - (pct / 100) * circ}
                    style={{ transition: "stroke-dashoffset 0.1s linear" }}
                  />
                  <defs>
                    <linearGradient id="goldgrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#d4b675" />
                      <stop offset="100%" stopColor="#e6cf9a" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-display text-3xl text-pearl">{pct}%</span>
                  <span className="text-[0.55rem] tracking-widest text-champagne">MATCH</span>
                </div>
              </div>

              <div className="absolute inset-x-5 bottom-5">
                <p className="text-xs tracking-widest text-champagne">STRONGEST MATCH</p>
                <p className="font-display text-2xl text-pearl">{p.name}</p>
                <p className="text-sm text-mist">
                  {p.neighborhood}, {p.city}
                </p>
              </div>
            </div>
          </div>

          {/* Floating prompt bubble */}
          <motion.div
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -left-4 -top-5 max-w-[220px] rounded-2xl glass px-4 py-3 md:-left-10"
          >
            <p className="text-xs leading-relaxed text-mist">
              <Sparkles className="mb-1 inline h-3 w-3 text-gold" /> &ldquo;Somewhere on
              the water, quiet, with strong returns.&rdquo;
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
