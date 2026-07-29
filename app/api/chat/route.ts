import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/data/knowledge";
import { PROPERTIES } from "@/lib/data/properties";
import { formatPrice } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

interface ClientMessage {
  role: "user" | "assistant";
  text: string;
}

/** Attach up to 3 property cards for any residence the assistant named. */
function cardsFor(text: string) {
  const lower = text.toLowerCase();
  return PROPERTIES.filter((p) => lower.includes(p.name.toLowerCase()))
    .slice(0, 3)
    .map((p) => ({
      name: p.name,
      slug: p.slug,
      meta: `${p.city} · ${formatPrice(p.price, p.currency)} · Score ${p.scores.investment}`,
    }));
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Not configured — signal the client to use its built-in fallback answers.
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: { messages?: ClientMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const history = Array.isArray(body.messages) ? body.messages : [];
  // Gemini requires the conversation to start with a user turn — drop any
  // leading assistant messages (e.g. the greeting), keep the last ~12 turns.
  const trimmed = history.slice(-12);
  const firstUser = trimmed.findIndex((m) => m.role === "user");
  const usable = firstUser === -1 ? [] : trimmed.slice(firstUser);

  if (usable.length === 0) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const contents = usable.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m.text).slice(0, 2000) }],
  }));

  const payload = {
    systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
    contents,
    generationConfig: {
      temperature: 0.6,
      topP: 0.95,
      // Generous cap: 2.5-flash "thinks" before replying and that reasoning
      // shares this budget, so a small cap truncates the visible answer. The
      // system prompt keeps the actual reply short (2–5 sentences).
      maxOutputTokens: 2048,
    },
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Gemini error", res.status, detail.slice(0, 500));
      return NextResponse.json({ error: "upstream", status: res.status }, { status: 502 });
    }

    const data = await res.json();
    const text: string =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text ?? "")
        .join("")
        .trim() ?? "";

    if (!text) {
      // Blocked (safety) or empty completion.
      return NextResponse.json({ error: "empty" }, { status: 502 });
    }

    return NextResponse.json({ text, cards: cardsFor(text) });
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    console.error("Gemini request failed", err);
    return NextResponse.json({ error: aborted ? "timeout" : "network" }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
