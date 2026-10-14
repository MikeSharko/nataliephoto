import Photo from "@/components/ui/Photo";
import { heroPhoto } from "@/lib/portfolio";

export default function Hero() {
  return (
    <section className="px-gutter pt-8 pb-20 md:pt-14 md:pb-24">
      <Photo
        photo={heroPhoto}
        aspect={false}
        className="aspect-[4/3] md:aspect-[16/7]"
        sizes="100vw"
      />
      <div className="mt-10 flex flex-wrap items-end justify-between gap-8 md:mt-12 md:gap-10">
        <h1 className="max-w-[720px] font-serif text-[44px] leading-[1.05] font-light md:text-[60px] lg:text-[72px]">
          Food and product photography for brands that care how things look.
        </h1>
        <p className="max-w-[300px] text-[15px] leading-[1.7] text-muted">
          Commercial photographer based in San&nbsp;Diego, working with restaurants, beverage and beauty
          brands across California.
        </p>
      </div>
    </section>
  );
}
