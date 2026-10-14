import { accents, type Accent } from "@/lib/accents";
import { cn } from "@/lib/cn";

type Props = {
  items: { title: string; text: string }[];
  accent: Accent;
};

// "What I shoot" grid of services on each category page
export default function WhatIShoot({ items, accent }: Props) {
  const colors = accents[accent];

  return (
    <section className={cn("px-gutter py-20 md:py-24", colors.soft)}>
      <h2 className="mb-11 font-serif text-[36px] font-light md:text-[44px]">What I shoot</h2>
      <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.title}>
            <h3 className={cn("mb-2.5 text-[15px] uppercase tracking-[0.1em]", colors.text)}>{item.title}</h3>
            <p className="text-[15px] leading-[1.8] text-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
