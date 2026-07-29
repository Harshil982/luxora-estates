import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { MatchWizard } from "@/components/ai-match/match-wizard";

export const metadata: Metadata = {
  title: "AI Property Matching",
  description:
    "Describe the life you want to live. Luxora's intelligence reads thousands of data points to find the residences that are unmistakably yours.",
  alternates: { canonical: "/ai-match" },
};

export default function AiMatchPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Property Matching"
        title="Describe the life"
        accent="you want to live"
        description="Four questions. Thousands of data points. One collection, ranked precisely for you."
      />
      <section className="mx-auto max-w-[1400px] px-5 pb-28 md:px-8">
        <MatchWizard />
      </section>
    </>
  );
}
