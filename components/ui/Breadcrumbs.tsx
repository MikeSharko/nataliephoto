import Link from "next/link";

type Crumb = {
  label: string;
  href?: string; // the last crumb (current page) has no link
  className?: string;
};

// "Portfolio / Food" trail above page titles
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="eyebrow text-subtle">
      <ol className="flex flex-wrap items-center gap-2.5">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2.5">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={item.className}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
