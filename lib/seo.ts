// Helpers for search engines and link previews (Google, Instagram, WhatsApp, iMessage...)

import type { Photo } from "@/lib/portfolio";
import { site } from "@/lib/site";

// A 1200×630 JPEG of a Sanity photo for link previews (og:image),
// cropped around the focus point Natalie set in the Studio
export function socialImage(photo: Photo | undefined) {
  if (!photo?.src?.startsWith("https://cdn.sanity.io/")) return undefined;
  const url = new URL(photo.src);
  url.searchParams.set("w", "1200");
  url.searchParams.set("h", "630");
  url.searchParams.set("fit", "crop");
  if (photo.focus) {
    url.searchParams.set("crop", "focalpoint");
    url.searchParams.set("fp-x", photo.focus.x.toFixed(3));
    url.searchParams.set("fp-y", photo.focus.y.toFixed(3));
  }
  url.searchParams.set("fm", "jpg"); // previews don't support WebP/AVIF everywhere
  url.searchParams.set("q", "80");
  return { url: url.toString(), width: 1200, height: 630, alt: photo.alt };
}

// Full address of a page: "/portfolio/food/" → "https://nataliephoto.com/portfolio/food/"
export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

// The business, described once and referenced from other pages by its @id
export const businessId = absoluteUrl("/#business");
export const personId = absoluteUrl("/#natalie");

// "Home / Portfolio / Food" trail for Google results
export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
