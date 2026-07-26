import { cn } from "@/lib/utils";

/** Luxora wordmark — serif capitals with a champagne diamond glyph. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="relative grid h-8 w-8 place-items-center">
        <span className="absolute inset-0 rotate-45 rounded-[6px] border border-champagne/60" />
        <span className="absolute inset-1.5 rotate-45 rounded-[3px] bg-gradient-to-br from-gold to-brass" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-medium tracking-[0.18em] text-pearl">
          LUXORA
        </span>
        <span className="text-[0.55rem] tracking-[0.42em] text-champagne/80">
          ESTATES
        </span>
      </span>
    </span>
  );
}
