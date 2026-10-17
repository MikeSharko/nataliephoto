import Link from "next/link";

type Props = {
  title: string;
  text: string;
  tone?: "cream" | "sand"; // kept for the page API; every CTA uses the same dark look now
};

// "Have a menu to shoot?" block at the bottom of inner pages
export default function CtaSection({ title, text }: Props) {
  return (
    <section className="flex flex-wrap items-end justify-between gap-10 border-t border-line px-gutter py-24 md:py-32">
      <div className="reveal max-w-[760px]">
        <p className="eyebrow mb-6 flex items-center gap-3 text-subtle">
          {/* Same red "flash ready" light as on the home page photo */}
          <span aria-hidden="true" className="size-2 rounded-full bg-signal shadow-[0_0_10px_3px_rgb(255_59_48/0.6)]" />
          Flash is charged
        </p>
        <h2 className="font-display text-[56px] leading-[0.9] font-semibold md:text-[96px] lg:text-[112px]">{title}</h2>
        <p className="mt-6 max-w-[480px] leading-[1.8] text-muted">{text}</p>
      </div>
      <Link
        href="/contact/"
        data-current /* brackets always visible here */
        className="brackets mb-2 font-display text-[24px] tracking-[0.04em] uppercase transition-colors hover:text-clay md:text-[28px]"
      >
        Start an enquiry
      </Link>
    </section>
  );
}
