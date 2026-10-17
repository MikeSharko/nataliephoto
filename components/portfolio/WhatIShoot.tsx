import type { Accent } from "@/lib/accents";

type Props = {
  items: { title: string; text: string }[];
  accent: Accent; // kept for the page API; the dark design uses the red signal color for numbers
};

// "What I shoot": numbered list of services on each category page
export default function WhatIShoot({ items }: Props) {
  return (
    <section className="border-t border-line px-gutter py-20 md:py-24">
      <div className="flex flex-wrap gap-x-16 gap-y-8">
        <h2 className="eyebrow flex-[1_1_220px] font-display text-subtle">What I shoot</h2>
        <ol className="grid flex-[999_1_600px] gap-x-14 sm:grid-cols-2">
          {items.map((item, index) => (
            <li key={item.title} className="reveal flex gap-5 border-b border-line py-6">
              <span className="font-display text-sm text-signal">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="mb-2 font-display text-[22px] font-medium tracking-[0.02em] md:text-[24px]">
                  {item.title}
                </h3>
                <p className="text-sm leading-[1.7] text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
