type Props = {
  eyebrow: React.ReactNode; // small label or breadcrumbs above the title
  title: string; // one or two big words: "Food", "Prices"
  titleSuffix?: string; // not shown, but part of the h1 for Google: "Food" + " photography in San Diego"
  subtitle?: string; // the sentence next to the title
  description?: string;
  children?: React.ReactNode; // extra content under the title row (e.g. category links)
};

// Top of every inner page: label, huge condensed title, subtitle and text on the right
export default function PageIntro({ eyebrow, title, titleSuffix, subtitle, description, children }: Props) {
  return (
    <header className="px-gutter pt-16 pb-12 md:pt-20 md:pb-14">
      <div className="mb-7">{eyebrow}</div>
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
        {/* overflow-hidden is the "curtain" the title slides out from */}
        <h1 className="overflow-hidden pt-[0.06em] font-display text-[72px] leading-[0.85] font-semibold sm:text-[120px] lg:text-[200px]">
          <span className="block animate-title-in">
            {title}
            {titleSuffix && <span className="sr-only"> {titleSuffix}</span>}
          </span>
        </h1>
        {(subtitle || description) && (
          <div className="flex max-w-[380px] animate-page-in flex-col gap-5 pb-2 [animation-delay:250ms]">
            {subtitle && <p className="font-display text-[24px] leading-[1.2] md:text-[26px]">{subtitle}</p>}
            {description && <p className="text-[15px] leading-[1.75] text-muted">{description}</p>}
          </div>
        )}
      </div>
      {children && <div className="mt-12 border-t border-line pt-6 md:mt-14">{children}</div>}
    </header>
  );
}
