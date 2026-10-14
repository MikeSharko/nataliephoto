import Photo from "@/components/ui/Photo";
import { accents } from "@/lib/accents";
import { cn } from "@/lib/cn";
import { getCategory, type Photo as PhotoData } from "@/lib/portfolio";

type Props = {
  photos: PhotoData[];
  showCategory?: boolean; // small colored label under each photo (Portfolio page)
};

// Pinterest-style columns: each photo keeps its own proportions
export default function MasonryGallery({ photos, showCategory = false }: Props) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {photos.map((photo, index) => {
        const category = getCategory(photo.category);
        return (
          <figure key={`${photo.category}-${index}`} className="mb-6 break-inside-avoid">
            <Photo photo={photo} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
            {showCategory && category && (
              <figcaption
                className={cn("mt-2.5 text-xs uppercase tracking-[0.14em]", accents[category.accent].text)}
              >
                {category.navLabel}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}
