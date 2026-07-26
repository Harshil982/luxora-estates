import { Reveal, SplitWords } from "@/components/ui/reveal";

/** Shared cinematic header for interior pages — sits below the fixed nav. */
export function PageHeader({
  eyebrow,
  title,
  accent,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden pt-28 pb-12 md:pt-44 md:pb-20">
      {/* Ambient gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(201,169,106,0.10),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-8 bg-champagne/50 md:w-10" />
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <h1 className="mt-5 max-w-4xl font-display text-[2.35rem] font-light leading-[1.04] tracking-tight text-pearl sm:text-5xl md:mt-6 md:text-7xl">
          <SplitWords text={title} />
          {accent && (
            <>
              {" "}
              <span className="italic text-gold-gradient">
                <SplitWords text={accent} delay={0.15} />
              </span>
            </>
          )}
        </h1>
        {description && (
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist md:text-lg">
              {description}
            </p>
          </Reveal>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </header>
  );
}
