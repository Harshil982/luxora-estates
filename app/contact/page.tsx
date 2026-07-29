import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak with a Luxora private advisor. Request a consultation, a viewing, or discreet off-market access.",
  alternates: { canonical: "/contact" },
};

const OFFICES = [
  { city: "New York", detail: "1 Vestry Street, Tribeca" },
  { city: "Dubai", detail: "Gate Avenue, DIFC" },
  { city: "London", detail: "Charles Street, Mayfair" },
  { city: "Monaco", detail: "Avenue Princesse Grace" },
];

const CONTACTS = [
  { icon: Phone, label: "Private line", value: "+1 (212) 555-0100" },
  { icon: Mail, label: "Email", value: "advisors@luxora.estate" },
  { icon: Clock, label: "Availability", value: "By appointment · 24/7" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Private Consultation"
        title="Begin the"
        accent="conversation"
        description="Whether you're acquiring, selling or simply exploring, a dedicated advisor will guide you with discretion and precision."
      />

      <section className="mx-auto grid max-w-[1400px] gap-10 px-5 pb-32 md:px-8 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <div className="rounded-[2rem] border border-champagne/12 bg-graphite/40 p-8">
              <h3 className="font-display text-2xl font-light text-pearl">Direct lines</h3>
              <div className="mt-6 space-y-5">
                {CONTACTS.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.label} className="flex items-center gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-champagne/15 text-champagne">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-fog">{c.label}</p>
                        <p className="text-pearl">{c.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-[2rem] border border-champagne/12 bg-graphite/40 p-8">
              <h3 className="flex items-center gap-2 font-display text-2xl font-light text-pearl">
                <MapPin className="h-5 w-5 text-champagne" /> Global ateliers
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {OFFICES.map((o) => (
                  <div key={o.city} className="rounded-2xl border border-champagne/10 bg-obsidian/40 p-4">
                    <p className="font-display text-lg text-pearl">{o.city}</p>
                    <p className="text-xs text-mist">{o.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
