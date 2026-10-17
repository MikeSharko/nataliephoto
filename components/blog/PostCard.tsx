import Link from "next/link";
import PostMeta from "@/components/blog/PostMeta";
import Photo from "@/components/ui/Photo";
import { accents } from "@/lib/accents";
import { cn } from "@/lib/cn";
import { getPostCategory, type PostSummary } from "@/lib/blog";

type Props = {
  post: PostSummary;
  compact?: boolean; // related posts: no excerpt and meta
};

export default function PostCard({ post, compact = false }: Props) {
  const category = getPostCategory(post.category);

  return (
    <Link href={`/blog/${post.slug}/`} className="reveal group block">
      <Photo
        photo={post.cover}
        aspect="3 / 2"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="transition-opacity group-hover:opacity-90"
      />
      <p className={cn("mt-5.5 mb-2.5 text-xs uppercase tracking-[0.14em]", accents[category.accent].text)}>
        {category.label}
      </p>
      <h3 className="mb-2.5 font-serif text-[26px] leading-[1.2] transition-colors group-hover:text-clay md:text-[27px]">
        {post.title}
      </h3>
      {!compact && (
        <>
          <p className="mb-3 text-[15px] leading-[1.7] text-muted">{post.excerpt}</p>
          <PostMeta date={post.date} readingTime={post.readingTime} />
        </>
      )}
    </Link>
  );
}
