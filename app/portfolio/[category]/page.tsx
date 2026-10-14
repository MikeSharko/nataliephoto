import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryChips from "@/components/portfolio/CategoryChips";
import GridGallery from "@/components/portfolio/GridGallery";
import MasonryGallery from "@/components/portfolio/MasonryGallery";
import WhatIShoot from "@/components/portfolio/WhatIShoot";
import CtaSection from "@/components/sections/CtaSection";
import PageIntro from "@/components/sections/PageIntro";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { accents } from "@/lib/accents";
import { categories, getCategory } from "@/lib/portfolio";

type Props = { params: Promise<{ category: string }> };

// One template for /portfolio/food/, /portfolio/product/ and /portfolio/people/.
// At build time Next.js creates one HTML file per category from this list.
export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

// Any other URL → 404 (required for static export)
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return {
    title: `${category.title} Photography`,
    description: category.metaDescription,
    alternates: { canonical: `/portfolio/${category.slug}/` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <PageIntro
        eyebrow={
          <Breadcrumbs
            items={[
              { label: "Portfolio", href: "/portfolio/" },
              { label: category.title, className: accents[category.accent].text },
            ]}
          />
        }
        title={category.headline}
        description={category.intro}
      >
        <CategoryChips current={category.slug} />
      </PageIntro>

      <section className="px-gutter pb-24 md:pb-28">
        {category.layout === "masonry" ? (
          <MasonryGallery photos={category.photos} />
        ) : (
          <GridGallery photos={category.photos} />
        )}
      </section>

      <WhatIShoot items={category.services} accent={category.accent} />
      <CtaSection title={category.cta.title} text={category.cta.text} />
    </>
  );
}
