import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Photo as PhotoData } from "@/lib/portfolio";

// Placeholder background per category, until real photos are added
const placeholderTone = {
  food: "bg-clay-tint text-clay",
  product: "bg-sage-tint text-sage",
  people: "bg-plum-tint text-plum",
};

type Props = {
  photo: PhotoData;
  // CSS aspect-ratio like "4 / 5". Default: the photo's own proportions.
  // Pass false to control the shape with Tailwind classes instead (e.g. responsive aspect).
  aspect?: string | false;
  sizes?: string;
  className?: string;
  hideLabel?: boolean; // for tiny placeholders like avatars
};

// Renders a real image when `photo.src` is set, otherwise a labelled placeholder box
export default function Photo({ photo, aspect, sizes = "100vw", className, hideLabel = false }: Props) {
  const ratio = aspect === false ? undefined : (aspect ?? `${photo.width} / ${photo.height}`);

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        !photo.src && placeholderTone[photo.category],
        className,
      )}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {photo.src ? (
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
      ) : (
        !hideLabel && (
          <span className="absolute inset-0 grid place-items-center p-4 text-center text-xs uppercase tracking-[0.14em]">
            [{photo.alt}]
          </span>
        )
      )}
    </div>
  );
}
