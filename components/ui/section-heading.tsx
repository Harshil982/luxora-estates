import { cn } from "@/lib/utils";
import { Reveal, SplitWords } from "./reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /** Portion of the title rendered in gold italic serif. */
  accent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/** Editorial section header: fine eyebrow · large serif title · muted lede. */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-8 bg-champagne/50" />
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <h2 className="max-w-4xl font-display text-4xl font-light leading-[1.05] tracking-tight text-pearl sm:text-5xl md:text-6xl">
        <SplitWords text={title} />
        {accent && (
          <>
            {" "}
            <span className="italic text-gold-gradient">
              <SplitWords text={accent} delay={0.2} />
            </span>
          </>
        )}
      </h2>
      {description && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-mist md:text-lg",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
