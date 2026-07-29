"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, Send, ArrowUpRight } from "lucide-react";
import { PROPERTIES } from "@/lib/data/properties";
import { formatPrice } from "@/lib/utils";

interface Msg {
  role: "user" | "assistant";
  text: string;
  cards?: { name: string; slug: string; meta: string }[];
}

const QUICK = [
  "Suggest a home under $20M",
  "Best rental yield?",
  "Explain investment score",
  "Where should I invest?",
];

// Turn any Luxora path the assistant mentions into a clickable navigation link.
const PATH_RE =
  /(\/properties\/[a-z0-9-]+|\/(?:properties|ai-match|neighborhoods|concierge|dashboard|compare|invest|contact|about))(?![a-z0-9-])/g;

function linkLabel(path: string): string {
  if (path.startsWith("/properties/")) {
    const slug = path.slice("/properties/".length);
    return PROPERTIES.find((p) => p.slug === slug)?.name ?? path;
  }
  return path;
}

/** Render assistant text with in-line, clickable navigation links. */
function RichText({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const parts = text.split(PATH_RE);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Link
            key={i}
            href={part}
            onClick={onNavigate}
            className="mx-0.5 inline-flex items-baseline gap-0.5 font-medium text-gold underline decoration-champagne/40 underline-offset-2 transition-colors hover:decoration-champagne"
          >
            {linkLabel(part)}
            <ArrowUpRight className="h-3 w-3 shrink-0 translate-y-px text-champagne" />
          </Link>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/** Deterministic, on-device concierge — keyword-routed responses. */
function respond(input: string): Msg {
  const q = input.toLowerCase();

  const under = q.match(/under\s*\$?(\d+)\s*m/);
  if (under || q.includes("suggest") || q.includes("recommend")) {
    const cap = under ? Number(under[1]) * 1_000_000 : 25_000_000;
    const picks = PROPERTIES.filter((p) => p.price <= cap)
      .sort((a, b) => b.scores.investment - a.scores.investment)
      .slice(0, 2);
    return {
      role: "assistant",
      text: picks.length
        ? `Based on value and our investment index, here are two I'd show you first:`
        : `I don't have a residence under that figure, but here are our most attainable homes:`,
      cards: (picks.length ? picks : PROPERTIES.slice(0, 2)).map((p) => ({
        name: p.name,
        slug: p.slug,
        meta: `${p.city} · ${formatPrice(p.price, p.currency)} · Score ${p.scores.investment}`,
      })),
    };
  }

  if (q.includes("yield") || q.includes("rental")) {
    const best = [...PROPERTIES].sort((a, b) => b.rentalYield - a.rentalYield)[0];
    return {
      role: "assistant",
      text: `The strongest gross rental yield in the collection is ${best.rentalYield}% at ${best.name} in ${best.city}. Dubai residences generally lead on yield (5–7%).`,
      cards: [
        {
          name: best.name,
          slug: best.slug,
          meta: `${best.rentalYield}% yield · ${best.roi}% ROI`,
        },
      ],
    };
  }

  if (q.includes("score")) {
    return {
      role: "assistant",
      text: "Our Investment Score (0–100) blends location liquidity, appreciation history, developer strength, yield and demand. Above 90 signals a trophy asset with resilient upside. Every residence shows five scores: luxury, investment, walkability, safety and connectivity.",
    };
  }

  if (q.includes("mortgage") || q.includes("finance") || q.includes("loan")) {
    return {
      role: "assistant",
      text: "On a $20M residence at 30% down over 25 years (5.5% rate), you're looking at roughly $86K/month. Open any residence to model it precisely with the Mortgage Simulator — and our concierge desk arranges private-bank financing across jurisdictions.",
    };
  }

  if (q.includes("invest") || q.includes("roi") || q.includes("where")) {
    const best = [...PROPERTIES].sort((a, b) => b.roi - a.roi)[0];
    return {
      role: "assistant",
      text: `For pure return, Dubai and Miami are compounding fastest right now. ${best.name} leads on projected ROI at ${best.roi}%. Visit the Investment desk for the live market index and yield calculator.`,
      cards: [{ name: best.name, slug: best.slug, meta: `${best.roi}% projected ROI` }],
    };
  }

  if (q.includes("neighborhood") || q.includes("area") || q.includes("safe")) {
    return {
      role: "assistant",
      text: "Every listing carries live neighborhood intelligence — luxury index, growth, safety and connectivity. Monte-Carlo and Palm Jumeirah top our luxury index; Tribeca and Mayfair lead on walkability. Explore the Neighborhoods page for the full picture.",
    };
  }

  return {
    role: "assistant",
    text: "I can suggest residences, explain investment scores, estimate mortgages, or point you to the right neighborhood. Try one of the prompts below, or tell me your budget and the life you're after.",
  };
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Good day — I'm Aria, your Luxora concierge. How can I help you find the extraordinary today?",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Smooth-scroll to the newest message as the conversation grows.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  // Jump straight to the latest message whenever the panel is (re)opened.
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  const send = async (text: string) => {
    if (!text.trim() || typing) return;
    const next: Msg[] = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setTyping(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, text: m.text })),
        }),
      });
      if (!res.ok) throw new Error("api");
      const data = (await res.json()) as { text?: string; cards?: Msg["cards"] };
      if (!data.text) throw new Error("empty");
      setMessages((m) => [...m, { role: "assistant", text: data.text!, cards: data.cards }]);
    } catch {
      // Gemini unavailable or not configured — fall back to on-device answers
      // so the concierge always works.
      setMessages((m) => [...m, respond(text)]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setOpen(true)}
        aria-label="Open AI concierge"
        className="fixed bottom-6 right-6 z-[80] flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-bright px-5 py-3.5 font-medium text-ink shadow-[0_10px_40px_-8px_rgba(201,169,106,0.6)] transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 animate-[pulse-ring_3s_ease-out_infinite] rounded-full bg-champagne/40" />
        <Sparkles className="relative h-5 w-5" />
        <span className="relative hidden text-sm sm:block">Ask Aria</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[85] bg-obsidian/40 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none"
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-0 right-0 z-[86] flex h-[85vh] w-full flex-col overflow-hidden rounded-t-[1.75rem] glass-strong sm:bottom-6 sm:right-6 sm:h-[600px] sm:w-[400px] sm:rounded-[1.75rem]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-champagne/12 p-5">
                <div className="flex items-center gap-3">
                  <span className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold to-brass text-ink">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-lg text-pearl">Aria</p>
                    <p className="flex items-center gap-1.5 text-xs text-mist">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Luxora concierge
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid h-9 w-9 place-items-center rounded-full text-mist transition-colors hover:bg-pearl/5 hover:text-pearl"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Messages — data-lenis-prevent stops Lenis from hijacking the
                  wheel so this list scrolls natively instead of the page. */}
              <div
                ref={scrollRef}
                data-lenis-prevent
                className="flex-1 space-y-4 overflow-y-auto overscroll-contain p-5"
              >
                {messages.map((m, i) => (
                  <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-gradient-to-r from-gold to-gold-bright text-ink"
                          : "border border-champagne/12 bg-obsidian/40 text-pearl"
                      }`}
                    >
                      {m.role === "assistant" ? (
                        <RichText text={m.text} onNavigate={() => setOpen(false)} />
                      ) : (
                        m.text
                      )}
                      {m.cards?.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/properties/${c.slug}`}
                          onClick={() => setOpen(false)}
                          className="mt-2.5 flex items-center justify-between gap-2 rounded-xl border border-champagne/20 bg-graphite/60 px-3 py-2.5 transition-colors hover:border-champagne/50"
                        >
                          <span>
                            <span className="block font-display text-sm text-pearl">{c.name}</span>
                            <span className="block text-xs text-mist">{c.meta}</span>
                          </span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-champagne" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex gap-1 rounded-2xl border border-champagne/12 bg-obsidian/40 px-4 py-3.5 w-fit">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-champagne"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Quick prompts */}
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 px-5 pb-2">
                  {QUICK.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-champagne/15 px-3 py-1.5 text-xs text-mist transition-colors hover:border-champagne/40 hover:text-pearl"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2 border-t border-champagne/12 p-4"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about any residence…"
                  className="flex-1 rounded-full border border-champagne/15 bg-obsidian/40 px-4 py-3 text-sm text-pearl placeholder:text-fog focus:border-champagne/40 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-r from-gold to-gold-bright text-ink transition-transform hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
