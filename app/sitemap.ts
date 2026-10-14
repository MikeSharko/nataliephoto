import type { MetadataRoute } from "next";
import { categories } from "@/lib/portfolio";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

// Generated once at build time → out/sitemap.xml
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/portfolio/",
    ...categories.map((category) => `/portfolio/${category.slug}/`),
    "/blog/",
    ...posts.map((post) => `/blog/${post.slug}/`),
  ];

  return paths.map((path) => ({ url: new URL(path, site.url).toString() }));
}
