import Link from "next/link";
import { chipClass } from "@/components/ui/chip";
import { categories } from "@/lib/portfolio";

// Category links on portfolio pages: FOOD  PRODUCT  PEOPLE  ALL WORK,
// the current one in [ brackets ]. Each is a real link, so every category has its own URL for Google.
export default function CategoryChips({ current }: { current: string }) {
  const items = [
    ...categories.map((category) => ({
      slug: category.slug,
      label: category.navLabel,
      href: `/portfolio/${category.slug}/`,
    })),
    { slug: "all", label: "All work", href: "/portfolio/" },
  ];

  return (
    <nav aria-label="Portfolio categories">
      <ul className="flex flex-wrap gap-x-9 gap-y-3">
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
