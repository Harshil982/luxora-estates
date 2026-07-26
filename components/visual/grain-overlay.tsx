/**
 * Fixed, ultra-subtle film-grain + vignette overlay applied across the whole
 * site to give surfaces a tactile, cinematic quality. Pure CSS/SVG, no JS,
 * pointer-events disabled so it never intercepts interaction.
 */
export function GrainOverlay() {
  return (
    <>
      {/* Film grain — blend mode & opacity adapt to the active theme */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100]"
        style={{
          opacity: "var(--grain-opacity)",
          mixBlendMode: "var(--grain-blend)" as React.CSSProperties["mixBlendMode"],
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Corner vignette — barely-there in daylight, cinematic in the dark */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[99]"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 40%, transparent 55%, var(--vignette-edge) 100%)",
        }}
      />
      {/* Signature gold thread across the very top edge */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[101] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--top-line) 20%, var(--top-line) 80%, transparent)",
        }}
      />
    </>
  );
}
