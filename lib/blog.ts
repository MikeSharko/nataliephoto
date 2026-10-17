// Blog types and helpers that are safe to use in the browser.
// The blog filter (BlogIndex) is a client component, so it imports from here
// instead of lib/posts.ts, which talks to Sanity and should stay on the server.

import type { Accent } from "@/lib/accents";
import type { Photo } from "@/lib/portfolio";

export type PostCategorySlug = "food" | "product" | "guides" | "behind-the-scenes";

export const postCategories: { slug: PostCategorySlug; label: string; accent: Accent }[] = [
  { slug: "food", label: "Food", accent: "clay" },
  { slug: "product", label: "Product", accent: "sage" },
  { slug: "guides", label: "Guides", accent: "neutral" },
  { slug: "behind-the-scenes", label: "Behind the scenes", accent: "neutral" },
];

// What cards and lists need
export type PostSummary = {
  slug: string; // the URL: /blog/<slug>/
  title: string;
  excerpt: string;
  category: PostCategorySlug;
  date?: string; // "2026-10-20"
  featured: boolean;
  cover: Photo;
  readingTime: number; // minutes
};

export function getPostCategory(slug: PostCategorySlug) {
  return postCategories.find((category) => category.slug === slug) ?? postCategories[2];
}

// "2026-10-20" → "October 20, 2026" (UTC, so the day doesn't shift by time zone)
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
