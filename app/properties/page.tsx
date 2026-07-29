import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { PropertiesExplorer } from "@/components/properties/properties-explorer";

export const metadata: Metadata = {
  title: "Luxury Properties for Sale — The Collection",
  description:
    "Explore Luxora Estates' privately vetted collection of luxury penthouses, villas and mansions across New York, Dubai, London, Malibu, Monaco and the world's most coveted addresses.",
  alternates: { canonical: "/properties" },
};

export default async function PropertiesPage({
  searchParams,
}: PageProps<"/properties">) {
  const sp = await searchParams;
  const first = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  return (
    <>
      <PageHeader
        eyebrow="The Collection"
        title="Residences chosen"
        accent="for the few"
        description="A living, filterable index of extraordinary homes. Refine by city, type and intent — from trophy penthouses to income-generating waterfront estates."
      />
      <PropertiesExplorer
        initialQuery={first(sp.q) ?? ""}
        initialListing={first(sp.listing) ?? "All"}
        initialCity={first(sp.city) ?? "All"}
        initialType={
          first(sp.type)
            ? // normalize plural filter labels from the hero search
              ({
                Villas: "Villa",
                Apartments: "Apartment",
                Mansions: "Mansion",
                Penthouses: "Penthouse",
              }[first(sp.type) as string] ?? "All")
            : "All"
        }
      />
    </>
  );
}
