import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { accents } from "@/lib/accents";
import { cn } from "@/lib/cn";
import { categories } from "@/lib/portfolio";

// Three big cards on the home page: Food, Product, People
export default function CategoryCards() {
  return (
    <section className="px-gutter pb-24 md:pb-28">
      <div className="grid gap-12 md:grid-cols-3 md:gap-10">
        {categories.map((category) => (
          <Link key={category.slug} href={`/portfolio/${category.slug}/`} className="group block">
            <Photo
              photo={category.card.cover}
              aspect="4 / 5"
              sizes="(min-width: 768px) 33vw, 100vw"
              className="transition-opacity group-hover:opacity-90"
            />
            <h2 className="mt-7 mb-2.5 font-serif text-[32px] md:text-[36px]">{category.title}</h2>
            <p className="mb-3.5 max-w-[440px] text-[15px] leading-[1.7] text-muted">
              {category.card.description}
            </p>
            <span className={cn("eyebrow border-b pb-1", accents[category.accent].border)}>
              {category.card.linkLabel}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
