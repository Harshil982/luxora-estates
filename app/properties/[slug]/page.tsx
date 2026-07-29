import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Maximize,
  CalendarDays,
  LandPlot,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { PROPERTIES, getProperty, relatedProperties } from "@/lib/data/properties";
import { img } from "@/lib/data/images";
import { Gallery } from "@/components/property/gallery";
import { ScoresPanel } from "@/components/property/scores-panel";
import { DetailMap } from "@/components/property/detail-map";
import { MortgageCalculator } from "@/components/property/mortgage-calculator";
import { BookingCard } from "@/components/property/booking-card";
import { PropertyCard } from "@/components/property/property-card";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, propertySchema } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/properties/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) return { title: "Residence not found" };
  const title = `${p.name} — ${p.type} in ${p.city}`;
  const description = `${p.tagline}. ${p.beds} bed, ${p.baths} bath ${p.type.toLowerCase()} in ${p.neighborhood}, ${p.city} from ${formatPrice(p.price, p.currency)}. ${p.roi}% projected ROI.`;
  return {
    title,
    description,
    alternates: { canonical: `/properties/${p.slug}` },
    openGraph: {
      title: `${p.name} · Luxora Estates`,
      description,
      type: "website",
      url: `/properties/${p.slug}`,
      images: [{ url: img(p.cover, 1200), width: 1200, height: 800, alt: p.name }],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: PageProps<"/properties/[slug]">) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const related = relatedProperties(property, 3);
  const facts = [
    { icon: BedDouble, label: "Bedrooms", value: property.beds },
    { icon: Bath, label: "Bathrooms", value: property.baths },
    { icon: Maximize, label: "Interior", value: `${property.area.toLocaleString()} ft²` },
    ...(property.plot
      ? [{ icon: LandPlot, label: "Plot", value: `${property.plot.toLocaleString()} ft²` }]
      : []),
    { icon: CalendarDays, label: "Built", value: property.yearBuilt },
  ];

  return (
    <article className="pt-28 md:pt-32">
      <JsonLd
        data={[
          propertySchema(property),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "The Collection", path: "/properties" },
            { name: property.name, path: `/properties/${property.slug}` },
          ]),
        ]}
      />
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        {/* Breadcrumb */}
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-pearl"
        >
          <ArrowLeft className="h-4 w-4" /> The Collection
        </Link>

        {/* Title */}
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-champagne/20 px-3 py-1 text-xs text-champagne">
                {property.type}
              </span>
              {property.exclusive && (
                <span className="rounded-full bg-gradient-to-r from-gold to-gold-bright px-3 py-1 text-xs font-semibold text-ink">
                  Exclusive
                </span>
              )}
              {property.listing.map((l) => (
                <span key={l} className="rounded-full border border-champagne/10 px-3 py-1 text-xs text-mist">
                  {l}
                </span>
              ))}
            </div>
            <h1 className="mt-4 font-display text-4xl font-light leading-tight text-pearl md:text-6xl">
              {property.name}
            </h1>
            <p className="mt-2 text-mist">
              {property.address} · {property.city}, {property.country}
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-8">
          <Gallery photos={property.gallery} name={property.name} />
        </div>

        {/* Body */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          {/* Left */}
          <div>
            {/* Facts */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {facts.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.label}
                    className="rounded-2xl border border-champagne/12 bg-graphite/40 p-4"
                  >
                    <Icon className="h-5 w-5 text-champagne" />
                    <p className="mt-3 font-display text-xl text-pearl">{f.value}</p>
                    <p className="text-xs text-fog">{f.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Overview */}
            <section className="mt-16">
              <h2 className="font-display text-3xl font-light text-pearl">The residence</h2>
              <p className="mt-5 text-lg leading-relaxed text-mist">{property.description}</p>
            </section>

            {/* Amenities */}
            <section className="mt-16">
              <h2 className="font-display text-3xl font-light text-pearl">Amenities</h2>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {property.amenities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-3 rounded-xl border border-champagne/10 bg-graphite/30 px-4 py-3"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-champagne/15 text-champagne">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-pearl">{a}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Scores */}
            <section className="mt-16">
              <h2 className="font-display text-3xl font-light text-pearl">Intelligence scores</h2>
              <p className="mt-2 text-sm text-mist">
                Proprietary indices from 0–100 across the dimensions that matter.
              </p>
              <div className="mt-6">
                <ScoresPanel scores={property.scores} />
              </div>
            </section>

            {/* Map */}
            <section className="mt-16">
              <h2 className="font-display text-3xl font-light text-pearl">Location</h2>
              <p className="mt-2 text-sm text-mist">
                {property.neighborhood}, {property.city} — and everything within reach.
              </p>
              <div className="mt-6">
                <DetailMap
                  lat={property.coords.lat}
                  lng={property.coords.lng}
                  neighborhood={property.neighborhood}
                  city={property.city}
                />
              </div>
            </section>

            {/* Mortgage */}
            <section className="mt-16">
              <MortgageCalculator price={property.price} currency={property.currency} />
            </section>
          </div>

          {/* Right — sticky booking */}
          <aside>
            <BookingCard property={property} />
          </aside>
        </div>

        {/* Related */}
        <section className="mt-28 border-t border-champagne/10 pt-16">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl font-light text-pearl">
              You may also <span className="italic text-gold-gradient">covet</span>
            </h2>
            <Link
              href="/properties"
              className="group inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-pearl"
            >
              View all
              <ArrowUpRight className="h-4 w-4 text-champagne transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
