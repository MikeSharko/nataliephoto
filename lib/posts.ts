// Blog posts, written by Natalie in the Studio (Blog posts).
// Read at build time, so a new post appears on the site after the next build + deploy.
// Server only: pages call these functions, components get plain data.

import type { PortableTextBlock } from "@portabletext/react";
import { cache } from "react";
import type { PostCategorySlug, PostSummary } from "@/lib/blog";
import type { CategorySlug } from "@/lib/portfolio";
import { client, imageFields, toPhoto, type SanityImage } from "@/lib/sanity";

// A full article: summary + rich text body (Portable Text)
export type Post = PostSummary & { body: PortableTextBlock[] };

// Placeholder color for posts without a cover photo
const placeholderTone: Record<PostCategorySlug, CategorySlug> = {
  food: "food",
  product: "product",
  guides: "food",
  "behind-the-scenes": "people",
};

type PostResult = {
  slug: string;
  title: string;
  excerpt: string | null;
  category: PostCategorySlug | null;
  date: string | null;
  featured: boolean | null;
  cover: SanityImage | null;
  words: number | null;
  body?: PortableTextBlock[] | null;
};

// GROQ fields shared by the list and the single post queries
const summaryFields = `
  "slug": slug.current,
  title,
  excerpt,
  category,
  "date": publishedAt,
  featured,
  "cover": coverImage{ ${imageFields} },
  "words": length(string::split(pt::text(body), " "))
`;

function toSummary(post: PostResult): PostSummary {
  const category = post.category ?? "guides";
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    category,
    date: post.date ?? undefined,
    featured: post.featured ?? false,
    cover: toPhoto(post.cover, placeholderTone[category]) ?? {
      alt: post.title,
      width: 1600,
      height: 1100,
      category: placeholderTone[category],
    },
    readingTime: Math.max(1, Math.ceil((post.words ?? 0) / 200)), // ~200 words per minute
  };
}

// All published posts, newest first
export const getPosts = cache(async (): Promise<PostSummary[]> => {
  const posts = await client.fetch<PostResult[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){ ${summaryFields} }`,
  );
  return posts.map(toSummary);
});

// One post with its full text. Images inside the article get their URL and size.
export const getPost = cache(async (slug: string): Promise<Post | undefined> => {
  const post = await client.fetch<PostResult | null>(
    `*[_type == "post" && slug.current == $slug][0]{
      ${summaryFields},
      "body": body[]{ ..., _type == "image" => { ${imageFields} } }
    }`,
    { slug },
  );
  if (!post) return undefined;
  return { ...toSummary(post), body: post.body ?? [] };
});

// Up to `limit` other posts, same category first
export async function getRelatedPosts(post: PostSummary, limit = 3) {
  const others = (await getPosts()).filter((other) => other.slug !== post.slug);
  const sameCategory = others.filter((other) => other.category === post.category);
  const rest = others.filter((other) => other.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
