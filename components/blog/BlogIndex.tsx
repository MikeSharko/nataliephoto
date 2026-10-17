"use client"; // the category filter changes what's shown without reloading

import { useState } from "react";
import FeaturedPost from "@/components/blog/FeaturedPost";
import PostCard from "@/components/blog/PostCard";
import { chipClass } from "@/components/ui/chip";
import { postCategories, type PostCategorySlug, type PostSummary } from "@/lib/blog";

// All posts are in the HTML from the start (good for Google);
// the filter only hides the ones that don't match.
export default function BlogIndex({ posts }: { posts: PostSummary[] }) {
  const [active, setActive] = useState<PostCategorySlug | "all">("all");

  // Only show filters for categories that have posts
  const usedCategories = postCategories.filter((category) => posts.some((post) => post.category === category.slug));
  const featured = posts.find((post) => post.featured);

  const visible =
    active === "all"
      ? posts.filter((post) => post !== featured)
      : posts.filter((post) => post.category === active);

  return (
    <>
      <div className="px-gutter pb-14 md:pb-16">
        <ul aria-label="Blog categories" className="flex flex-wrap gap-3">
          {[{ slug: "all" as const, label: "All" }, ...usedCategories].map((category) => (
            <li key={category.slug}>
              <button
                type="button"
                aria-pressed={active === category.slug}
                onClick={() => setActive(category.slug)}
                className={`${chipClass(active === category.slug)} cursor-pointer`}
              >
                {category.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active === "all" && featured && (
        <section className="px-gutter pb-24 md:pb-26">
          <FeaturedPost post={featured} />
        </section>
      )}

      <section className="border-t border-line px-gutter py-20 md:py-24">
        <h2 className="mb-11 font-serif text-[36px] font-light md:text-[44px]">
          {active === "all" ? "Latest articles" : postCategories.find((c) => c.slug === active)?.label}
        </h2>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
