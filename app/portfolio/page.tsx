import type { Metadata } from "next";
import CategoryChips from "@/components/portfolio/CategoryChips";
import MasonryGallery from "@/components/portfolio/MasonryGallery";
import CtaSection from "@/components/sections/CtaSection";
import PageIntro from "@/components/sections/PageIntro";
import { getAllPhotos } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Food, product and people photography by a San Diego photographer: restaurants, product brands and the people behind them.",
};

// /portfolio/ → all categories mixed together
export default async function PortfolioPage() {
  const photos = await getAllPhotos();

  return (
    <>
      <PageIntro
        eyebrow={<p className="eyebrow text-subtle">Portfolio / All work</p>}
        title="Portfolio"
        subtitle="Food, objects and people, in good light."
        description="A selection of recent work for restaurants, product brands and the people behind them. Pick a category to see more."
      >
        <CategoryChips current="all" />
      </PageIntro>

      <section className="px-gutter pb-24 md:pb-28" aria-label="All photographs">
        <MasonryGallery photos={photos} showCategory />
      </section>

      <CtaSection
        tone="sand"
        title="Like what you see?"
        text="Tell me about your project, your dates and where the images will be used."
      />
    </>
  );
}
