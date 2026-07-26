import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, de-duplicating Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as luxury currency (e.g. $12.4M, $850K). */
export function formatPrice(value: number, currency = "$"): string {
  if (value >= 1_000_000) {
    return `${currency}${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  if (value >= 1_000) {
    return `${currency}${Math.round(value / 1_000)}K`;
  }
  return `${currency}${value.toLocaleString()}`;
}

/** Full currency with separators (e.g. $12,400,000). */
export function formatFull(value: number, currency = "$"): string {
  return `${currency}${value.toLocaleString("en-US")}`;
}
