import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AuthorBox from "@/components/blog/AuthorBox";
import PostBody from "@/components/blog/PostBody";
import PostCard from "@/components/blog/PostCard";
import PostMeta from "@/components/blog/PostMeta";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Photo from "@/components/ui/Photo";
import { getPostCategory } from "@/lib/blog";
import { getPost, getPosts, getRelatedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// One HTML file per article is generated at build time from this list
export async function generateStaticParams() {
  const posts = await getPosts();
  // Static export needs at least one page here. With no posts yet, build a single
  // hidden 404 page instead of failing the whole build.
  if (posts.length === 0) return [{ slug: "no-posts-yet" }];
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

// Every article gets its own <title> and description for Google
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}/`,
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const category = getPostCategory(post.category);
  const related = await getRelatedPosts(post);

  // Structured data: tells Google this page is an article and who wrote it
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    ...(post.date && { datePublished: post.date }),
    author: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <article>
        <header className="mx-auto max-w-[920px] px-5 pt-14 pb-12 md:pt-18 md:pb-14">
          <div className="mb-8">
            <Breadcrumbs items={[{ label: "Blog", href: "/blog/" }, { label: category.label }]} />
          </div>
          <h1 className="mb-6 font-serif text-[40px] leading-[1.08] font-light md:text-[60px]">{post.title}</h1>
          <p className="mb-9 max-w-[680px] text-lg leading-[1.7] text-muted md:text-xl">{post.excerpt}</p>
          <PostMeta author={site.name} date={post.date} readingTime={post.readingTime} />
        </header>

        <div className="px-gutter">
          <Photo photo={post.cover} aspect={false} className="aspect-[4/3] md:aspect-[16/7]" sizes="100vw" />
        </div>

        <div className="mx-auto max-w-[720px] px-5 pt-16 pb-24 md:pt-18">
          <PostBody blocks={post.body} />
          <AuthorBox />
        </div>
      </article>

      {/* Hidden while this is the only post */}
      {related.length > 0 && (
        <section className="border-t border-line px-gutter py-20 md:py-24">
          <h2 className="mb-11 font-serif text-[36px] font-light md:text-[44px]">More from the journal</h2>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <PostCard key={item.slug} post={item} compact />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
