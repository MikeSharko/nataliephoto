import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryChips from "@/components/portfolio/CategoryChips";
import GridGallery from "@/components/portfolio/GridGallery";
import MasonryGallery from "@/components/portfolio/MasonryGallery";
import WhatIShoot from "@/components/portfolio/WhatIShoot";
import CtaSection from "@/components/sections/CtaSection";
import PageIntro from "@/components/sections/PageIntro";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { accents } from "@/lib/accents";
import { categories, getCategory, getCategoryPhotos } from "@/lib/portfolio";
import { absoluteUrl, breadcrumbs, businessId, socialImage } from "@/lib/seo";
import { site } from "@/lib/site";

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

  // Link preview: the first photo of the gallery (falls back to the site-wide image)
  const [cover] = await getCategoryPhotos(category.slug);
  const image = socialImage(cover);

  return {
    title: `${category.title} Photography in San Diego`,
    description: category.metaDescription,
    alternates: { canonical: `/portfolio/${category.slug}/` },
    ...(image && { openGraph: { images: [image], url: `/portfolio/${category.slug}/` } }),
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const photos = await getCategoryPhotos(category.slug);

  // For Google: breadcrumbs + this page is a gallery of Natalie's photos (helps Google Images)
  const jsonLd = {
    "@graph": [
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio/" },
        { name: category.title, path: `/portfolio/${category.slug}/` },
      ]),
      {
        "@type": "ImageGallery",
        name: `${category.title} photography by ${site.name}`,
        description: category.metaDescription,
        url: absoluteUrl(`/portfolio/${category.slug}/`),
        author: { "@id": businessId },
        image: photos
          .filter((photo) => photo.src)
          .map((photo) => ({ "@type": "ImageObject", contentUrl: photo.src, description: photo.alt || undefined })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageIntro
        eyebrow={
          <Breadcrumbs
            items={[
              { label: "Portfolio", href: "/portfolio/" },
              { label: category.title, className: accents[category.accent].text },
            ]}
          />
        }
        title={category.navLabel}
        titleSuffix="photography in San Diego"
        subtitle={category.headline}
        description={category.intro}
      >
        <CategoryChips current={category.slug} />
      </PageIntro>

      <section className="px-gutter pb-24 md:pb-28">
        {category.layout === "masonry" ? (
          <MasonryGallery photos={photos} />
        ) : (
          <GridGallery photos={photos} />
        )}
      </section>

      <WhatIShoot items={category.services} accent={category.accent} />
      <CtaSection title={category.cta.title} text={category.cta.text} />
    </>
  );
}
