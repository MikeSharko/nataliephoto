import Lightbox from "@/components/portfolio/Lightbox";
import { accents } from "@/lib/accents";
import { getCategory, type Photo as PhotoData } from "@/lib/portfolio";

type Props = {
  photos: PhotoData[];
  showCategory?: boolean; // small colored label under each photo (Portfolio page)
};

// Pinterest-style columns: each photo keeps its own proportions.
// Prepares the labels here on the server, the grid + full-screen viewer live in <Lightbox>.
export default function MasonryGallery({ photos, showCategory = false }: Props) {
  const items = photos.map((photo) => {
    const category = getCategory(photo.category);
    return {
      photo,
      label: showCategory ? category?.navLabel : undefined,
      labelClass: category ? accents[category.accent].text : undefined,
    };
  });

  return <Lightbox items={items} />;
}
