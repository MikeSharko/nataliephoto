import Link from "next/link";
import { chipClass } from "@/components/ui/chip";
import { categories } from "@/lib/portfolio";

// Filter pills on portfolio pages. Each pill is a real link,
// so every category has its own URL for Google.
export default function CategoryChips({ current }: { current: string }) {
  const items = [
    { slug: "all", label: "All", href: "/portfolio/" },
    ...categories.map((category) => ({
      slug: category.slug,
      label: category.navLabel,
      href: `/portfolio/${category.slug}/`,
    })),
  ];

  return (
    <nav aria-label="Portfolio categories">
      <ul className="flex flex-wrap gap-3">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={item.href}
              aria-current={item.slug === current ? "page" : undefined}
              className={chipClass(item.slug === current)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
