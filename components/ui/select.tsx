"use client";

import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = string | { label: string; value: string };
const normalize = (o: Option) =>
  typeof o === "string" ? { label: o, value: o } : o;

interface LuxSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  /** Leading icon (champagne-tinted). */
  icon?: React.ReactNode;
  /** Small uppercase label shown above the value (field variant only). */
  label?: string;
  variant?: "field" | "pill";
  /** Menu horizontal alignment relative to the trigger. */
  align?: "left" | "right";
  className?: string;
  menuClassName?: string;
}

/**
 * A fully design-matched dropdown replacing the un-stylable native <select>.
 * The menu renders in a portal with fixed positioning, so it never gets
 * clipped by ancestor `overflow-hidden` (e.g. the hero) and floats above all.
 */
export function LuxSelect({
  value,
  onChange,
  options,
  icon,
  label,
  variant = "field",
  align = "left",
  className,
  menuClassName,
}: LuxSelectProps) {
  const opts = options.map(normalize);
  const selected = opts.find((o) => o.value === value) ?? opts[0];

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<{
    left: number;
    top: number;
    width: number;
    dropUp: boolean;
  } | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [activeIdx, setActiveIdx] = useState(() =>
    Math.max(0, opts.findIndex((o) => o.value === value))
  );

  useEffect(() => setMounted(true), []);

  const place = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const estHeight = Math.min(opts.length * 44 + 12, 300);
    const spaceBelow = window.innerHeight - r.bottom;
    const dropUp = spaceBelow < estHeight + 16 && r.top > spaceBelow;
    const width = Math.max(r.width, 190);
    let left = align === "right" ? r.right - width : r.left;
    left = Math.max(8, Math.min(left, window.innerWidth - width - 8));
    setCoords({
      left,
      top: dropUp ? r.top : r.bottom,
      width,
      dropUp,
    });
  }, [align, opts.length]);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => (i + 1) % opts.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => (i - 1 + opts.length) % opts.length);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const opt = opts[activeIdx];
        if (opt) {
          onChange(opt.value);
          setOpen(false);
        }
      }
    };
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, opts, activeIdx, onChange]);

  const toggle = () => {
    setActiveIdx(Math.max(0, opts.findIndex((o) => o.value === value)));
    setOpen((o) => !o);
  };

  return (
    <>
      {variant === "field" ? (
        <button
          ref={triggerRef}
          type="button"
          onClick={toggle}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            "flex flex-1 items-center gap-3 rounded-xl px-4 py-2.5 text-left transition-colors hover:bg-pearl/[0.04]",
            className
          )}
        >
          {icon && <span className="text-champagne">{icon}</span>}
          <span className="flex min-w-0 flex-1 flex-col">
            {label && (
              <span className="text-[0.62rem] uppercase tracking-widest text-fog">
                {label}
              </span>
            )}
            <span className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-medium text-pearl">
                {selected?.label}
              </span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 shrink-0 text-fog transition-transform duration-300",
                  open && "rotate-180 text-champagne"
                )}
              />
            </span>
          </span>
        </button>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          onClick={toggle}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            "flex items-center gap-2 rounded-full border border-champagne/15 bg-graphite/40 px-4 py-2.5 text-sm text-pearl transition-colors hover:border-champagne/40",
            className
          )}
        >
          {icon && <span className="text-fog">{icon}</span>}
          <span className="truncate">{selected?.label}</span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 text-fog transition-transform duration-300",
              open && "rotate-180 text-champagne"
            )}
          />
        </button>
      )}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && coords && (
              <>
                {/* Invisible catcher for outside clicks */}
                <div
                  className="fixed inset-0 z-[119]"
                  onClick={() => setOpen(false)}
                  aria-hidden
                />
                <motion.ul
                  role="listbox"
                  initial={{ opacity: 0, y: coords.dropUp ? 8 : -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: coords.dropUp ? 8 : -8, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "fixed",
                    left: coords.left,
                    width: coords.width,
                    ...(coords.dropUp
                      ? { top: coords.top, transform: "translateY(-100%)", marginTop: -8 }
                      : { top: coords.top, marginTop: 8 }),
                    maxHeight: 300,
                  }}
                  className={cn(
                    "z-[120] overflow-auto rounded-2xl glass-strong p-1.5 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.7)]",
                    menuClassName
                  )}
                >
                  {opts.map((o, i) => {
                    const isSelected = o.value === value;
                    const isActive = i === activeIdx;
                    return (
                      <li key={o.value} role="option" aria-selected={isSelected}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveIdx(i)}
                          onClick={() => {
                            onChange(o.value);
                            setOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left text-sm transition-colors",
                            isSelected
                              ? "text-pearl"
                              : "text-mist hover:text-pearl",
                            isActive && !isSelected && "bg-champagne/10",
                            isSelected && "bg-champagne/15"
                          )}
                        >
                          <span className="truncate">{o.label}</span>
                          {isSelected && (
                            <Check className="h-4 w-4 shrink-0 text-champagne" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </motion.ul>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
