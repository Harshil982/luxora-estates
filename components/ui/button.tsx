"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Variant = "gold" | "outline" | "ghost" | "glass";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap select-none";

const variants: Record<Variant, string> = {
  gold: "text-ink bg-gradient-to-r from-gold to-gold-bright hover:shadow-[0_0_50px_-8px_rgba(201,169,106,0.6)] hover:brightness-110",
  outline:
    "text-pearl border border-champagne/40 hover:border-champagne hover:bg-champagne/5",
  ghost: "text-mist hover:text-pearl",
  glass:
    "text-pearl glass hover:border-champagne/40 hover:bg-onyx/70",
};

const sizes: Record<Size, string> = {
  sm: "text-xs px-4 py-2 rounded-full",
  md: "text-sm px-6 py-3 rounded-full",
  lg: "text-[0.95rem] px-8 py-4 rounded-full",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton
  extends CommonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> {
  href?: undefined;
}

interface ButtonAsLink extends CommonProps {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = "gold", size = "md", className, children, ...props }, ref) {
    const classes = cn(base, variants[variant], sizes[size], className);

    if ("href" in props && props.href) {
      return (
        <Link href={props.href} className={classes}>
          <span className="relative z-10 inline-flex items-center gap-2">
            {children}
          </span>
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...(props as ButtonAsButton)}>
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);
