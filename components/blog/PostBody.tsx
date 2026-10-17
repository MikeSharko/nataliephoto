import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import Photo from "@/components/ui/Photo";
import { toPhoto, type SanityImage } from "@/lib/sanity";

// How each kind of content from the Studio editor looks on the site
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-14 mb-4 font-serif text-[30px] leading-[1.2] text-ink md:text-[34px]">{children}</h2>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-14 border-y border-line py-8 text-center font-display text-[28px] leading-[1.25] font-medium text-ink md:text-[34px]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 list-disc space-y-2 pl-6">{children}</ul>,
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-clay underline underline-offset-4 transition-colors hover:text-ink"
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    // Photo inside the article
    image: ({ value }: { value: SanityImage & { caption?: string } }) => {
      const photo = toPhoto(value, "food");
      if (!photo) return null;
      return (
        <figure className="my-12">
          <Photo photo={photo} sizes="(min-width: 768px) 720px, 100vw" />
          {value.caption && <figcaption className="mt-3 text-sm text-subtle">{value.caption}</figcaption>}
        </figure>
      );
    },
    // Beige checklist box
    checklist: ({ value }: { value: { title?: string; items?: string[] } }) => (
      <aside aria-label={value.title} className="mb-10 bg-sand px-7 py-8 md:px-10 md:py-9">
        <h3 className="mb-4.5 text-sm uppercase tracking-[0.12em] text-clay">{value.title}</h3>
        <ul className="list-disc space-y-1 pl-5.5 text-base leading-[1.9]">
          {value.items?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </aside>
    ),
  },
};

// Renders the article text written in Sanity Studio
export default function PostBody({ blocks }: { blocks: PortableTextBlock[] }) {
  return (
    <div className="text-[17px] leading-[1.85] text-body md:text-lg">
      <PortableText value={blocks} components={components} />
    </div>
  );
}
