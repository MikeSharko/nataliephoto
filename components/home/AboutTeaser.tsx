import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { portraitPhoto } from "@/lib/portfolio";

export default function AboutTeaser() {
  return (
    <section id="about" className="px-gutter py-20 md:py-28">
      <div className="grid items-center gap-12 md:grid-cols-[5fr_7fr] md:gap-18">
        <Photo photo={portraitPhoto} aspect="3 / 4" sizes="(min-width: 768px) 40vw, 100vw" />
        <div>
          <p className="eyebrow mb-5 text-subtle">About</p>
          <h2 className="mb-6 font-serif text-[38px] leading-[1.15] font-light md:text-[48px]">
            Light first, then everything else.
          </h2>
          {/* TODO: replace both paragraphs with Natalie's own words */}
          <p className="mb-4.5 leading-[1.8] text-muted">
            [Two or three sentences in her own voice — how she came to photography, what she likes shooting,
            how she works with brands.]
          </p>
          <p className="mb-8 leading-[1.8] text-muted">
            [A line about the studio, the kit, and where she shoots on location.]
          </p>
          <Link href="/#contact" className="eyebrow border-b border-ink pb-1 transition-colors hover:text-clay">
            Work with me
          </Link>
        </div>
      </div>
    </section>
  );
}
