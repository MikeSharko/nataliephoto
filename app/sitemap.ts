import type { MetadataRoute } from "next";
import { categories, getAllPhotos, getCategoryPhotos, getHeroPhoto } from "@/lib/portfolio";
import { getPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/seo";

// Generated once at build time → out/sitemap.xml
export const dynamic = "force-static";

// Only real photos (placeholders have no src)
const photoUrls = (photos: { src?: string }[]) => photos.flatMap((photo) => (photo.src ? [photo.src] : []));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, hero, allPhotos] = await Promise.all([getPosts(), getHeroPhoto(), getAllPhotos()]);
  const categoryPages = await Promise.all(
    categories.map(async (category) => ({
      url: absoluteUrl(`/portfolio/${category.slug}/`),
      images: photoUrls(await getCategoryPhotos(category.slug)), // → Google Images
    })),
  );

  return [
    { url: absoluteUrl("/"), images: photoUrls([hero]) },
    { url: absoluteUrl("/portfolio/"), images: photoUrls(allPhotos) },
    ...categoryPages,
    { url: absoluteUrl("/prices/") },
    { url: absoluteUrl("/contact/") },
    { url: absoluteUrl("/blog/") },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}/`),
      ...(post.date && { lastModified: post.date }),
      images: photoUrls([post.cover]),
    })),
  ];
}
