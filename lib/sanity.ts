// Connection to Sanity for the website. Used only at build time (`npm run build`):
// pages ask for data here, and the result is baked into static HTML for S3.

import { createClient } from "@sanity/client";
import type { CategorySlug, Photo } from "@/lib/portfolio";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local");
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-10-16", // locks the API behavior to this date
  useCdn: false, // always fresh data at build time
  perspective: "published", // drafts never reach the website
});

// GROQ fields we read for every image: URL, size, focus point and a tiny blurred preview
export const imageFields = `
  alt,
  hotspot,
  "src": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "blurDataURL": asset->metadata.lqip
`;

export type SanityImage = {
  alt?: string | null;
  hotspot?: { x: number; y: number } | null;
  src?: string | null;
  width?: number | null;
  height?: number | null;
  blurDataURL?: string | null;
};

// Turns an image from Sanity into the Photo shape our components use
export function toPhoto(image: SanityImage | null | undefined, category: CategorySlug): Photo | undefined {
  if (!image?.src || !image.width || !image.height) return undefined; // empty image field

  return {
    src: image.src,
    alt: image.alt ?? "",
    width: image.width,
    height: image.height,
    category,
    focus: image.hotspot ? { x: image.hotspot.x, y: image.hotspot.y } : undefined,
    blurDataURL: image.blurDataURL ?? undefined,
  };
}
