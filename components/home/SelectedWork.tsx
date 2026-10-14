import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { getSelectedWork } from "@/lib/portfolio";

export default function SelectedWork() {
  return (
    <section className="bg-sand px-gutter py-20 md:py-28">
      <div className="mb-11 flex flex-wrap items-baseline justify-between gap-5">
        <h2 className="font-serif text-[36px] font-light md:text-[44px]">Selected work</h2>
        <Link href="/portfolio/" className="eyebrow border-b border-ink pb-1 transition-colors hover:text-clay">
          See the full portfolio
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {getSelectedWork().map((photo, index) => (
          <Photo
            key={`${photo.category}-${index}`}
            photo={photo}
            aspect="9 / 10"
            sizes="(min-width: 768px) 33vw, 50vw"
          />
        ))}
      </div>
    </section>
  );
}
