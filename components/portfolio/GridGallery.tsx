import Photo from "@/components/ui/Photo";
import type { Photo as PhotoData } from "@/lib/portfolio";

// Even grid: every photo is cropped to the same shape
export default function GridGallery({ photos }: { photos: PhotoData[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      {photos.map((photo, index) => (
        <Photo
          key={`${photo.category}-${index}`}
          photo={photo}
          aspect="6 / 7"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      ))}
    </div>
  );
}
