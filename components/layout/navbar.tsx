"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "./logo";

const NAV = [
  { label: "Collection", href: "/properties" },
  { label: "AI Match", href: "/ai-match" },
  { label: "Invest", href: "/invest" },
  { label: "Neighborhoods", href: "/neighborhoods" },
  { label: "Concierge", href: "/concierge" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-all duration-700",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 transition-all duration-700 md:px-8",
            scrolled &&
              "mx-4 rounded-full glass py-2 pl-6 pr-2 md:mx-auto md:max-w-6xl"
          )}
        >
          <Link href="/" aria-label="Luxora Estates home" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Magnetic key={item.href} strength={0.25}>
                <Link
                  href={item.href}
                  className="group relative px-4 py-2 text-sm text-mist transition-colors duration-300 hover:text-pearl"
                >
                  {item.label}
                  <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-champagne/60 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                </Link>
              </Magnetic>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {/* Sign in — hidden until real authentication is wired up.
            <Link
              href="/dashboard"
              className="hidden text-sm text-mist transition-colors hover:text-pearl md:block"
            >
              Sign in
            </Link>
            */}
            <Magnetic strength={0.3}>
              <Link
                href="/contact"
                className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-gold to-gold-bright px-5 py-2.5 text-sm font-medium text-ink transition-all duration-500 hover:shadow-[0_0_40px_-8px_rgba(201,169,106,0.6)] md:inline-flex"
              >
                Book a Viewing
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-11 w-11 place-items-center rounded-full glass text-pearl lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[95] flex flex-col bg-obsidian/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full glass text-pearl"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-champagne/10 py-5 font-display text-3xl font-light text-pearl"
                  >
                    {item.label}
                    <ArrowUpRight className="h-6 w-6 text-champagne" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="px-6 pb-10">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-bright py-4 font-medium text-ink"
              >
                Book a Private Viewing
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
