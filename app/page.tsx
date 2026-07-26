import { Hero } from "@/components/home/hero";
import { StatsBand } from "@/components/home/stats-band";
import { FeaturedCollection } from "@/components/home/featured-collection";
import { AiMatchTeaser } from "@/components/home/ai-match-teaser";
import { MoodSelector } from "@/components/home/mood-selector";
import { NeighborhoodsPreview } from "@/components/home/neighborhoods-preview";
import { ServicesPreview } from "@/components/home/services-preview";
import { Testimonials } from "@/components/home/testimonials";
import { CtaSection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <FeaturedCollection />
      <AiMatchTeaser />
      <MoodSelector />
      <NeighborhoodsPreview />
      <ServicesPreview />
      <Testimonials />
      <CtaSection />
    </>
  );
}
