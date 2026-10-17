import Link from "next/link";
import PostMeta from "@/components/blog/PostMeta";
import Photo from "@/components/ui/Photo";
import { accents } from "@/lib/accents";
import { cn } from "@/lib/cn";
import { getPostCategory, type PostSummary } from "@/lib/blog";

// Large image + text card for the featured article at the top of the blog
export default function FeaturedPost({ post }: { post: PostSummary }) {
  const category = getPostCategory(post.category);

  return (
    <Link href={`/blog/${post.slug}/`} className="group grid items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14">
      <Photo
        photo={post.cover}
        aspect="16 / 11"
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="transition-opacity group-hover:opacity-90"
      />
      <div>
        <p className={cn("eyebrow mb-4.5", accents[category.accent].text)}>Featured · {category.label}</p>
        <h2 className="mb-4.5 font-serif text-[36px] leading-[1.1] font-light transition-colors group-hover:text-clay md:text-[46px]">
          {post.title}
        </h2>
        <p className="mb-6 leading-[1.8] text-muted">{post.excerpt}</p>
        <div className="mb-7">
          <PostMeta date={post.date} readingTime={post.readingTime} />
        </div>
        <span className="eyebrow border-b border-ink pb-1">Read article</span>
      </div>
    </Link>
  );
}
