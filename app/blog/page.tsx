import type { Metadata } from "next";
import BlogIndex from "@/components/blog/BlogIndex";
import CtaSection from "@/components/sections/CtaSection";
import PageIntro from "@/components/sections/PageIntro";
import { posts, toSummary } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical guides for restaurants, cafes and product brands: how to plan a photoshoot, what to prepare and how to get the most from your images.",
  alternates: { canonical: "/blog/" },
};

// /blog/ → list of all articles
export default function BlogPage() {
  return (
    <>
      <PageIntro
        eyebrow={<p className="eyebrow text-subtle">Journal</p>}
        title="Notes on light, food and objects."
        description="Practical guides for restaurants, cafes and product brands: how to plan a shoot, what to prepare, and how to get the most from your images."
      />
      <BlogIndex posts={posts.map(toSummary)} />
      <CtaSection
        title="Planning a shoot?"
        text="Tell me what you are working on and I will suggest how to approach it."
      />
    </>
  );
}
