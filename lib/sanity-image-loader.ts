// Custom loader for next/image (see next.config.ts).
// A static site has no server to resize images, so we ask Sanity's image CDN instead:
// next/image requests several widths for different screens, and Sanity resizes
// and converts each one to WebP/AVIF on the fly.

type LoaderProps = { src: string; width: number; quality?: number };

export default function sanityImageLoader({ src, width, quality }: LoaderProps) {
  // Local files from public/ are served as they are
  if (!src.startsWith("https://cdn.sanity.io/")) return src;

  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format"); // WebP/AVIF when the browser supports it
  url.searchParams.set("fit", "max"); // never upscale small originals
  return url.toString();
}
