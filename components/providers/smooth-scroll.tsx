"use client";

import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";

/**
 * Buttery smooth scrolling via Lenis, driven by a single rAF loop.
 * Wraps the entire app so anchor links, parallax and reveals share one scroller.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    let frame = 0;
    const raf = (time: number) => {
      lenisRef.current?.lenis?.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.09,
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        autoRaf: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
