import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { CompareTool } from "@/components/compare/compare-tool";

export const metadata: Metadata = {
  title: "Compare Residences",
  description:
    "Weigh price, ROI, scores and amenities side by side across Luxora's collection with our premium comparison tool.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return (
    <>
      <PageHeader
        eyebrow="Comparison"
        title="Weigh the"
        accent="incomparable"
        description="Set trophy residences against one another across price, returns, scale and our proprietary intelligence scores. The strongest value in each row wears the crown."
      />
      <CompareTool />
    </>
  );
}
