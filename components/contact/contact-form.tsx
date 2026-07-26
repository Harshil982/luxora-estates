"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send } from "lucide-react";

const INTERESTS = ["Buying", "Selling", "Renting", "Investing", "Concierge"];
const BUDGETS = ["Under $5M", "$5M – $15M", "$15M – $35M", "$35M+"];

export function ContactForm() {
  const [interest, setInterest] = useState("Buying");
  const [budget, setBudget] = useState("$15M – $35M");
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-[2rem] glass-strong p-7 md:p-10">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-14 text-center"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-gold to-brass text-ink">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="mt-6 font-display text-3xl font-light text-pearl">
              Your request is received
            </h3>
            <p className="mt-2 max-w-sm text-sm text-mist">
              A private advisor will be in touch within a few hours to arrange your
              consultation.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-8 text-sm text-champagne underline-offset-4 hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-6"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Full name" placeholder="Alexandra Voss" required />
              <Input label="Email" type="email" placeholder="you@domain.com" required />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
              <Input label="City of interest" placeholder="Dubai, Monaco…" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-fog">I&apos;m interested in</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {INTERESTS.map((o) => (
                  <Chip key={o} active={interest === o} onClick={() => setInterest(o)}>
                    {o}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-fog">Budget</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {BUDGETS.map((o) => (
                  <Chip key={o} active={budget === o} onClick={() => setBudget(o)}>
                    {o}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-fog">Message</span>
              <textarea
                rows={4}
                placeholder="Tell us about the life you're looking for…"
                className="mt-2 w-full resize-none rounded-2xl border border-champagne/15 bg-obsidian/40 px-4 py-3 text-sm text-pearl placeholder:text-fog focus:border-champagne/40 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-bright py-4 font-medium text-ink transition-all hover:shadow-[0_0_50px_-8px_rgba(201,169,106,0.6)]"
            >
              <Send className="h-4 w-4" />
              Request private consultation
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Input({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-fog">{label}</span>
      <input
        {...props}
        className="mt-2 w-full rounded-xl border border-champagne/15 bg-obsidian/40 px-4 py-3 text-sm text-pearl placeholder:text-fog focus:border-champagne/40 focus:outline-none"
      />
    </label>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
        active
          ? "border-champagne bg-gradient-to-r from-gold to-gold-bright font-medium text-ink"
          : "border-champagne/15 text-mist hover:border-champagne/40 hover:text-pearl"
      }`}
    >
      {children}
    </button>
  );
}
