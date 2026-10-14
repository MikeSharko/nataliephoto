import Photo from "@/components/ui/Photo";
import type { Block } from "@/lib/posts";

// Turns the list of content blocks into styled HTML.
// In video 2 Sanity's rich text will replace these blocks.
export default function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[17px] leading-[1.85] text-body md:text-lg">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="mb-6">
                {block.text}
              </p>
            );
          case "heading":
            return (
              <h2 key={index} className="mt-14 mb-4 font-serif text-[30px] leading-[1.2] text-ink md:text-[34px]">
                {block.text}
              </h2>
            );
          case "list":
            return (
              <ul key={index} className="mb-6 list-disc space-y-2 pl-6">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "image":
            return (
              <figure key={index} className="my-12">
                <Photo photo={block.photo} sizes="(min-width: 768px) 720px, 100vw" />
                {block.caption && <figcaption className="mt-3 text-sm text-subtle">{block.caption}</figcaption>}
              </figure>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="my-14 border-y border-line py-8 text-center font-serif text-[28px] leading-[1.35] font-light text-ink italic md:text-[32px]"
              >
                {block.text}
              </blockquote>
            );
          case "checklist":
            return (
              <aside key={index} aria-label={block.title} className="mb-10 bg-sand px-7 py-8 md:px-10 md:py-9">
                <h3 className="mb-4.5 text-sm uppercase tracking-[0.12em] text-clay">{block.title}</h3>
                <ul className="list-disc space-y-1 pl-5.5 text-base leading-[1.9]">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </aside>
            );
        }
      })}
    </div>
  );
}
