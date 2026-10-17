import { site } from "@/lib/site";

// Logo: a big condensed "N" with "PHOTO" running down its right side.
// Uses the current text color, so it works on light pages and over the dark home photo.
export default function Logo() {
  return (
    <span className="flex items-stretch gap-1" aria-label={`${site.name} Photo`}>
      <span aria-hidden="true" className="font-display text-[46px] leading-[0.74] font-semibold">
        N
      </span>
      <span
        aria-hidden="true"
        className="text-[9px] leading-none font-medium tracking-[0.2em] uppercase [writing-mode:vertical-rl]"
      >
        Photo
      </span>
    </span>
  );
}
