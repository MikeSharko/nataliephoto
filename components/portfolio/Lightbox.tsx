"use client"; // open/close state, keyboard and swipe all happen in the browser

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Photo from "@/components/ui/Photo";
import { cn } from "@/lib/cn";
import type { Photo as PhotoData } from "@/lib/portfolio";
import sanityImageLoader from "@/lib/sanity-image-loader";

export type GalleryItem = {
  photo: PhotoData;
  label?: string; // small category label under the photo (Portfolio page)
  labelClass?: string;
};

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d={direction === "left" ? "M14 4l-7 7 7 7" : "M8 4l7 7-7 7"} />
    </svg>
  );
}

// Masonry grid of photos. Clicking a photo opens it full screen in a <dialog>:
// arrows / ← → keys / swipe to move, Esc / ✕ / click outside to close.
export default function Lightbox({ items }: { items: GalleryItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef(0);
  const [current, setCurrent] = useState(0);

  // Only real photos open in the lightbox (placeholders have no src)
  const viewable = items.filter((item) => item.photo.src).map((item) => item.photo);
  const photo = viewable[current];

  function open(photoIndex: number) {
    setCurrent(photoIndex);
    dialogRef.current?.showModal(); // modal dialog: traps focus, Esc closes it
  }

  function close() {
    dialogRef.current?.close();
  }

  function step(delta: number) {
    setCurrent((index) => (index + delta + viewable.length) % viewable.length);
  }

  // Warm the browser cache with the next photo so flipping feels instant
  const nextSrc = viewable.length > 1 ? viewable[(current + 1) % viewable.length].src : undefined;
  useEffect(() => {
    if (!nextSrc || !dialogRef.current?.open) return;
    const img = new window.Image();
    img.src = sanityImageLoader({ src: nextSrc, width: 1920 });
  }, [nextSrc]);

  let photoIndex = -1; // position of each real photo in the lightbox

  return (
    <>
      <div className="columns-1 gap-2 sm:columns-2 lg:columns-3">
        {items.map((item, index) => {
          const thumb = <Photo photo={item.photo} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />;
          const position = item.photo.src ? ++photoIndex : -1;

          return (
            <figure key={`${item.photo.category}-${index}`} className="reveal mb-2 break-inside-avoid">
              {position >= 0 ? (
                <button
                  type="button"
                  onClick={() => open(position)}
                  aria-label={`Open photo${item.photo.alt ? `: ${item.photo.alt}` : ""}`}
                  className="group block w-full cursor-zoom-in overflow-hidden"
                >
                  <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">{thumb}</div>
                </button>
              ) : (
                thumb
              )}
              {item.label && (
                <figcaption className={cn("mt-2 mb-3 text-[11px] uppercase tracking-[0.18em]", item.labelClass)}>
                  {item.label}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        // Click on the dark area around the photo closes the viewer
        onClick={(event) => event.target === event.currentTarget && close()}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        onTouchStart={(event) => (touchStartX.current = event.touches[0].clientX)}
        onTouchEnd={(event) => {
          const distance = event.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(distance) > 50) step(distance < 0 ? 1 : -1); // swipe left → next
        }}
        className="lightbox m-0 h-dvh max-h-none w-dvw max-w-none bg-cream/96 p-0 text-ink backdrop:bg-black/70"
      >
        {photo && (
          <div className="pointer-events-none flex h-full flex-col">
            <div className="pointer-events-auto flex items-center justify-between px-gutter py-5 text-[11px] tracking-[0.18em] uppercase">
              <p aria-live="polite">
                {String(current + 1).padStart(2, "0")} <span className="text-subtle">/ {String(viewable.length).padStart(2, "0")}</span>
              </p>
              <button type="button" onClick={close} className="brackets cursor-pointer py-2 uppercase">
                Close
              </button>
            </div>

            <div className="relative flex-1">
              {/* key = photo: each new photo fades in */}
              <Image
                key={photo.src}
                src={photo.src!}
                alt={photo.alt}
                fill
                sizes="100vw"
                className="animate-photo-in object-contain px-4 md:px-24"
                placeholder={photo.blurDataURL ? "blur" : "empty"}
                blurDataURL={photo.blurDataURL}
              />
            </div>

            {viewable.length > 1 && (
              <div className="pointer-events-auto flex justify-center gap-3 py-5">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="grid size-12 cursor-pointer place-items-center rounded-full border border-line transition-colors hover:border-ink"
                >
                  <Arrow direction="left" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="grid size-12 cursor-pointer place-items-center rounded-full bg-ink text-cream transition-opacity hover:opacity-85"
                >
                  <Arrow direction="right" />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
