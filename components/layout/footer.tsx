import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";

/** Brand marks as inline SVG (lucide no longer ships brand icons). */
const SOCIALS = [
  {
    label: "Instagram",
    path: "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 3.15A6.65 6.65 0 1 0 18.65 12 6.65 6.65 0 0 0 12 5.35Zm0 10.97A4.32 4.32 0 1 1 16.32 12 4.32 4.32 0 0 1 12 16.32Zm6.9-11.23a1.55 1.55 0 1 1-1.55-1.56 1.55 1.55 0 0 1 1.55 1.56Z",
  },
  {
    label: "LinkedIn",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z",
  },
  {
    label: "X",
    path: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.49l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.29L17.61 20.65Z",
  },
];

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "The Collection", href: "/properties" },
      { label: "AI Match", href: "/ai-match" },
      { label: "Neighborhoods", href: "/neighborhoods" },
      { label: "Compare", href: "/compare" },
    ],
  },
  {
    title: "Invest",
    links: [
      { label: "Opportunities", href: "/invest" },
      { label: "Market Index", href: "/invest#index" },
      { label: "Yield Calculator", href: "/invest#calculator" },
      { label: "Private Funds", href: "/invest" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Concierge", href: "/concierge" },
      { label: "Interior Design", href: "/concierge#design" },
      { label: "Property Management", href: "/concierge#management" },
      { label: "Legal & Mortgage", href: "/concierge#legal" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About", href: "/about" },
      { label: "Journal", href: "/about#journal" },
      { label: "Careers", href: "/about#careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const CITIES = ["New York", "Dubai", "London", "Los Angeles", "Miami", "Monaco"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-champagne/10 bg-onyx">
      {/* Oversized ghost wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] font-light leading-none text-pearl/[0.02]"
      >
        LUXORA
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-6">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-mist">
              A private house of extraordinary residences. Curating the world&apos;s
              finest addresses for those who live beyond the ordinary.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-champagne/20 text-mist transition-all duration-500 hover:border-champagne hover:text-champagne"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4 className="eyebrow">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-mist transition-colors duration-300 hover:text-pearl"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl glass p-8 md:flex-row md:items-center md:p-10">
          <div>
            <p className="font-display text-2xl font-light text-pearl">
              Join the private list.
            </p>
            <p className="mt-1 text-sm text-mist">
              Off-market residences, before the world sees them.
            </p>
          </div>
          <form className="flex w-full max-w-md items-center gap-2 rounded-full border border-champagne/20 bg-obsidian/50 p-1.5 pl-5">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="w-full bg-transparent text-sm text-pearl placeholder:text-fog focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-gold to-gold-bright px-5 py-2.5 text-sm font-medium text-ink transition-all hover:brightness-110"
            >
              Subscribe
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* City strip */}
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2">
          {CITIES.map((city) => (
            <span key={city} className="text-xs tracking-[0.2em] text-fog">
              {city.toUpperCase()}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-champagne/10 pt-8 text-xs text-fog md:flex-row">
          <p>© {new Date().getFullYear()} Luxora Estates. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-mist">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-mist">
              Terms
            </Link>
            <p>
              Crafted with intention · A portfolio concept
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
