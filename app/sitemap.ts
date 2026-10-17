import type { MetadataRoute } from "next";
import { categories } from "@/lib/portfolio";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

// Generated once at build time → out/sitemap.xml
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const paths = [
    "/",
    "/portfolio/",
    ...categories.map((category) => `/portfolio/${category.slug}/`),
    "/prices/",
    "/contact/",
    "/blog/",
    ...posts.map((post) => `/blog/${post.slug}/`),
  ];

  return paths.map((path) => ({ url: new URL(path, site.url).toString() }));
}
