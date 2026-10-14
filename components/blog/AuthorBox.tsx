import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { portraitPhoto } from "@/lib/portfolio";
import { site } from "@/lib/site";

export default function AuthorBox() {
  return (
    <section aria-label="About the author" className="mt-10 flex flex-wrap items-center gap-7 border-t border-line pt-10">
      <Photo photo={portraitPhoto} aspect="1 / 1" sizes="96px" className="w-24 shrink-0 rounded-full" hideLabel />
      <div className="min-w-0 flex-[1_1_320px]">
        <p className="mb-1.5 text-xs uppercase tracking-[0.14em] text-subtle">Written by</p>
        <h2 className="mb-2 font-serif text-[28px]">{site.name}</h2>
        {/* TODO: two-line bio from Natalie */}
        <p className="mb-3.5 text-[15px] leading-[1.7] text-muted">
          Food, product and portrait photographer in San Diego, working with restaurants and brands across
          California.
        </p>
        <Link href="/#contact" className="eyebrow border-b border-ink pb-1 transition-colors hover:text-clay">
          Work with me
        </Link>
      </div>
    </section>
  );
}
