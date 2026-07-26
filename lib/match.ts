import { PROPERTIES, type Property, type Mood } from "@/lib/data/properties";

export interface MatchInput {
  intent: "Buy" | "Rent" | "Invest";
  budget: number; // upper bound
  moods: Mood[];
  city: string; // "Anywhere" or a city
  priorities: string[]; // Views, Privacy, Yield, Smart Living, Beachfront, Walkable
}

export interface MatchResult {
  property: Property;
  score: number; // 0-100
  reasons: string[];
}

const PRIORITY_TO_SCORE: Record<string, (p: Property) => number> = {
  Views: (p) => p.scores.luxury,
  Privacy: (p) => p.scores.safety,
  Yield: (p) => Math.min(100, p.rentalYield * 14),
  "Smart Living": (p) => (p.moods.includes("Smart living") ? 100 : 55),
  Beachfront: (p) => (p.moods.includes("Beachside") ? 100 : 40),
  Walkable: (p) => p.scores.walkability,
};

/** Weighted, explainable match score. Deterministic — no randomness. */
export function computeMatches(input: MatchInput): MatchResult[] {
  return PROPERTIES.map((p) => {
    const reasons: string[] = [];
    let score = 0;

    // Intent (15)
    const intentFit = p.listing.includes(input.intent) ? 15 : 4;
    score += intentFit;
    if (intentFit === 15) reasons.push(`Available to ${input.intent.toLowerCase()}`);

    // Budget (25) — reward being within budget, gently penalise overshoot
    const ratio = p.price / input.budget;
    let budgetScore: number;
    if (ratio <= 1) budgetScore = 25 - (1 - ratio) * 6; // best near budget
    else budgetScore = Math.max(0, 25 - (ratio - 1) * 30);
    score += budgetScore;
    if (ratio <= 1.05) reasons.push("Within your budget");

    // Mood overlap (25)
    const overlap = input.moods.filter((m) => p.moods.includes(m));
    const moodScore = input.moods.length
      ? (overlap.length / input.moods.length) * 25
      : 15;
    score += moodScore;
    if (overlap.length) reasons.push(`Matches your ${overlap.slice(0, 2).join(" & ")} mood`);

    // City (15)
    if (input.city === "Anywhere") {
      score += 10;
    } else if (p.city === input.city) {
      score += 15;
      reasons.push(`In ${input.city}`);
    } else {
      score += 3;
    }

    // Priorities (20)
    if (input.priorities.length) {
      const avg =
        input.priorities.reduce((sum, pr) => sum + (PRIORITY_TO_SCORE[pr]?.(p) ?? 50), 0) /
        input.priorities.length;
      score += (avg / 100) * 20;
      const top = input.priorities
        .map((pr) => ({ pr, v: PRIORITY_TO_SCORE[pr]?.(p) ?? 0 }))
        .sort((a, b) => b.v - a.v)[0];
      if (top && top.v >= 85) reasons.push(`Excellent for ${top.pr}`);
    } else {
      score += 12;
    }

    // Blend with the property's own baseline appeal for a natural spread
    const final = Math.round(Math.min(99, Math.max(52, score * 0.85 + p.matchBaseline * 0.15)));

    return { property: p, score: final, reasons: reasons.slice(0, 3) };
  }).sort((a, b) => b.score - a.score);
}
