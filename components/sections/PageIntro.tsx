type Props = {
  eyebrow: React.ReactNode; // small label or breadcrumbs above the title
  title: string;
  description?: string;
  children?: React.ReactNode; // extra content under the title row (e.g. filter chips)
};

// Top of every inner page: label, big serif title, short text on the right
export default function PageIntro({ eyebrow, title, description, children }: Props) {
  return (
    <header className="px-gutter pt-16 pb-12 md:pt-22 md:pb-16">
      <div className="mb-5">{eyebrow}</div>
      <div className="flex flex-wrap items-end justify-between gap-8 md:gap-12">
        <h1 className="max-w-[700px] font-serif text-[44px] leading-[1.08] font-light md:text-[56px] lg:text-[64px]">
          {title}
        </h1>
        {description && <p className="max-w-[360px] leading-[1.8] text-muted">{description}</p>}
      </div>
      {children && <div className="mt-10 md:mt-12">{children}</div>}
    </header>
  );
}
