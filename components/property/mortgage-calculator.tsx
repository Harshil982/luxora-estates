"use client";

import { useMemo, useState } from "react";
import { formatFull } from "@/lib/utils";

export function MortgageCalculator({
  price,
  currency,
}: {
  price: number;
  currency: string;
}) {
  const [down, setDown] = useState(30); // %
  const [rate, setRate] = useState(5.5); // annual %
  const [years, setYears] = useState(25);

  const { monthly, loan, totalInterest } = useMemo(() => {
    const loan = price * (1 - down / 100);
    const r = rate / 100 / 12;
    const n = years * 12;
    const monthly = r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
    const totalInterest = monthly * n - loan;
    return { monthly, loan, totalInterest };
  }, [price, down, rate, years]);

  return (
    <div className="rounded-3xl border border-champagne/12 bg-graphite/40 p-7">
      <h3 className="font-display text-2xl font-light text-pearl">Mortgage Simulator</h3>
      <p className="mt-1 text-sm text-mist">
        Estimate your monthly commitment. Illustrative only.
      </p>

      <div className="mt-7 space-y-6">
        <Slider
          label="Down payment"
          value={`${down}% · ${formatFull(Math.round(price * (down / 100)), currency)}`}
          min={10}
          max={70}
          step={5}
          val={down}
          onChange={setDown}
        />
        <Slider
          label="Interest rate"
          value={`${rate.toFixed(1)}%`}
          min={2}
          max={9}
          step={0.1}
          val={rate}
          onChange={setRate}
        />
        <Slider
          label="Term"
          value={`${years} years`}
          min={10}
          max={30}
          step={5}
          val={years}
          onChange={setYears}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-champagne/15 bg-obsidian/50 p-6">
        <p className="text-xs uppercase tracking-widest text-fog">Estimated monthly</p>
        <p className="mt-1 font-display text-4xl text-gold-gradient">
          {formatFull(Math.round(monthly), currency)}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-champagne/10 pt-5 text-sm">
          <div>
            <p className="text-fog">Loan amount</p>
            <p className="text-pearl">{formatFull(Math.round(loan), currency)}</p>
          </div>
          <div>
            <p className="text-fog">Total interest</p>
            <p className="text-pearl">{formatFull(Math.round(totalInterest), currency)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  val,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  val: number;
  onChange: (v: number) => void;
}) {
  const pct = ((val - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-mist">{label}</span>
        <span className="text-sm font-medium text-pearl">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        onChange={(e) => onChange(Number(e.target.value))}
        className="luxe-range mt-3 w-full"
        style={{
          background: `linear-gradient(to right, var(--color-champagne) ${pct}%, rgba(255,255,255,0.12) ${pct}%)`,
        }}
      />
    </div>
  );
}
