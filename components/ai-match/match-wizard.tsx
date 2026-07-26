"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  RotateCcw,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { MOODS } from "@/lib/data/site";
import { PROPERTIES } from "@/lib/data/properties";
import { img } from "@/lib/data/images";
import { formatPrice, cn } from "@/lib/utils";
import { computeMatches, type MatchInput, type MatchResult } from "@/lib/match";
import type { Mood } from "@/lib/data/properties";

const CITIES = ["Anywhere", ...Array.from(new Set(PROPERTIES.map((p) => p.city)))];
const BUDGETS = [
  { label: "Up to $10M", value: 10_000_000 },
  { label: "$10M – $20M", value: 20_000_000 },
  { label: "$20M – $35M", value: 35_000_000 },
  { label: "$35M+", value: 60_000_000 },
];
const PRIORITIES = ["Views", "Privacy", "Yield", "Smart Living", "Beachfront", "Walkable"];
const INTENTS = ["Buy", "Rent", "Invest"] as const;

type Phase = "form" | "computing" | "results";

export function MatchWizard() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("form");
  const [results, setResults] = useState<MatchResult[]>([]);

  const [input, setInput] = useState<MatchInput>({
    intent: "Buy",
    budget: 35_000_000,
    moods: ["Luxury"],
    city: "Anywhere",
    priorities: ["Views"],
  });

  const steps = ["Intent & Budget", "Lifestyle", "Location", "Priorities"];

  const toggleMood = (m: Mood) =>
    setInput((s) => ({
      ...s,
      moods: s.moods.includes(m) ? s.moods.filter((x) => x !== m) : [...s.moods, m],
    }));

  const togglePriority = (p: string) =>
    setInput((s) => ({
      ...s,
      priorities: s.priorities.includes(p)
        ? s.priorities.filter((x) => x !== p)
        : [...s.priorities, p],
    }));

  const run = () => {
    setPhase("computing");
    setResults(computeMatches(input));
    setTimeout(() => setPhase("results"), 2200);
  };

  const restart = () => {
    setPhase("form");
    setStep(0);
  };

  if (phase === "computing") return <Computing input={input} />;
  if (phase === "results") return <Results results={results} onRestart={restart} />;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <div className="mb-10 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 flex-col gap-2">
            <div className="h-1 overflow-hidden rounded-full bg-pearl/10">
              <motion.div
                className="h-full bg-gradient-to-r from-gold to-gold-bright"
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span
              className={cn(
                "text-[0.68rem] tracking-wide transition-colors",
                i === step ? "text-champagne" : "text-fog"
              )}
            >
              {s}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-3xl glass-strong p-7 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && (
              <Question title="What brings you here, and at what level?">
                <div className="flex flex-wrap gap-2">
                  {INTENTS.map((i) => (
                    <Pill
                      key={i}
                      active={input.intent === i}
                      onClick={() => setInput((s) => ({ ...s, intent: i }))}
                    >
                      {i}
                    </Pill>
                  ))}
                </div>
                <p className="mt-8 mb-3 text-sm text-mist">Budget</p>
                <div className="grid grid-cols-2 gap-2">
                  {BUDGETS.map((b) => (
                    <Pill
                      key={b.value}
                      active={input.budget === b.value}
                      onClick={() => setInput((s) => ({ ...s, budget: b.value }))}
                      block
                    >
                      {b.label}
                    </Pill>
                  ))}
                </div>
              </Question>
            )}

            {step === 1 && (
              <Question title="How do you want to live?" subtitle="Choose all that resonate.">
                <div className="flex flex-wrap gap-2">
                  {MOODS.map((m) => (
                    <Pill key={m} active={input.moods.includes(m)} onClick={() => toggleMood(m)}>
                      {m}
                    </Pill>
                  ))}
                </div>
              </Question>
            )}

            {step === 2 && (
              <Question title="Where in the world?">
                <div className="flex flex-wrap gap-2">
                  {CITIES.map((c) => (
                    <Pill
                      key={c}
                      active={input.city === c}
                      onClick={() => setInput((s) => ({ ...s, city: c }))}
                    >
                      {c}
                    </Pill>
                  ))}
                </div>
              </Question>
            )}

            {step === 3 && (
              <Question title="What matters most?" subtitle="Your priorities tune the ranking.">
                <div className="flex flex-wrap gap-2">
                  {PRIORITIES.map((p) => (
                    <Pill
                      key={p}
                      active={input.priorities.includes(p)}
                      onClick={() => togglePriority(p)}
                    >
                      {p}
                    </Pill>
                  ))}
                </div>
              </Question>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-pearl disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-bright px-6 py-3 text-sm font-medium text-ink transition-all hover:shadow-[0_0_40px_-8px_rgba(201,169,106,0.6)]"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={run}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-bright px-6 py-3 text-sm font-medium text-ink transition-all hover:shadow-[0_0_40px_-8px_rgba(201,169,106,0.6)]"
            >
              <Sparkles className="h-4 w-4" /> Reveal my matches
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Question({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-light text-pearl md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-mist">{subtitle}</p>}
      <div className="mt-7">{children}</div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
  block,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  block?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2.5 text-sm transition-all duration-300",
        block && "w-full",
        active
          ? "border-champagne bg-gradient-to-r from-gold to-gold-bright font-medium text-ink"
          : "border-champagne/15 text-mist hover:border-champagne/40 hover:text-pearl"
      )}
    >
      {children}
    </button>
  );
}

function Computing({ input }: { input: MatchInput }) {
  const lines = [
    "Reading 14,000 data points…",
    `Weighting your ${input.moods.length} lifestyle signals…`,
    "Modelling investment fit…",
    "Ranking the collection…",
  ];
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-20 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="grid h-20 w-20 place-items-center rounded-full border border-champagne/20"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <Sparkles className="h-8 w-8 text-gold" />
        </motion.div>
      </motion.div>
      <div className="mt-10 space-y-3">
        {lines.map((l, i) => (
          <motion.p
            key={l}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.5 }}
            className="flex items-center justify-center gap-2 text-sm text-mist"
          >
            <Check className="h-3.5 w-3.5 text-champagne" /> {l}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

function Results({
  results,
  onRestart,
}: {
  results: MatchResult[];
  onRestart: () => void;
}) {
  const [top, ...rest] = results;
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col items-center text-center">
        <span className="eyebrow">Your matches</span>
        <h2 className="mt-3 font-display text-3xl font-light text-pearl md:text-4xl">
          You are{" "}
          <span className="italic text-gold-gradient">{top.score}% matched</span> with{" "}
          {top.property.name}
        </h2>
      </div>

      {/* Hero match */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 overflow-hidden rounded-[2rem] glass-strong p-3"
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
            <Image
              src={img(top.property.cover, 1000)}
              alt={top.property.name}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-5">
            <div className="flex items-center gap-1.5 text-xs text-mist">
              <MapPin className="h-3.5 w-3.5 text-champagne" />
              {top.property.neighborhood}, {top.property.city}
            </div>
            <h3 className="mt-2 font-display text-3xl font-light text-pearl">
              {top.property.name}
            </h3>
            <p className="mt-1 font-display text-2xl text-gold-gradient">
              {formatPrice(top.property.price, top.property.currency)}
            </p>
            <ul className="mt-5 space-y-2">
              {top.reasons.map((r) => (
                <li key={r} className="flex items-center gap-2 text-sm text-mist">
                  <Check className="h-4 w-4 text-champagne" /> {r}
                </li>
              ))}
            </ul>
            <Link
              href={`/properties/${top.property.slug}`}
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-bright px-6 py-3 text-sm font-medium text-ink transition-all hover:shadow-[0_0_40px_-8px_rgba(201,169,106,0.6)]"
            >
              Explore this residence <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Runners up */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {rest.slice(0, 3).map((r, i) => (
          <motion.div
            key={r.property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <Link
              href={`/properties/${r.property.slug}`}
              className="group block overflow-hidden rounded-2xl border border-champagne/12 bg-graphite/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={img(r.property.cover, 700)}
                  alt={r.property.name}
                  fill
                  sizes="33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 rounded-full glass px-3 py-1 text-sm font-medium text-gold">
                  {r.score}%
                </span>
              </div>
              <div className="p-4">
                <p className="font-display text-lg text-pearl">{r.property.name}</p>
                <p className="text-xs text-mist">{r.property.city}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-full border border-champagne/25 px-6 py-3 text-sm text-pearl transition-colors hover:bg-champagne/10"
        >
          <RotateCcw className="h-4 w-4" /> Refine my preferences
        </button>
      </div>
    </div>
  );
}
