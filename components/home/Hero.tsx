import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { cn } from "@/lib/cn";
import { getHeroDarkness, getHeroFlashLight, getHeroPhoto, type Photo as PhotoData } from "@/lib/portfolio";
import { site } from "@/lib/site";

// Hover effect (Codrops "Creative Link Effects" #1): square brackets fade in
// next to the title and slide outwards, away from the text.
// The text is vertical, so "outwards" is up/down here (the link is rotated 180°).
const brackets = [
  // shared: hidden by default, positioned outside the text so the layout doesn't move
  "before:absolute before:inset-x-0 before:bottom-full before:opacity-0 before:content-['[']",
  "after:absolute after:inset-x-0 after:top-full after:opacity-0 after:content-[']']",
  "before:transition-[translate,opacity] after:transition-[translate,opacity] before:duration-300 after:duration-300",
  // start: tucked in, over the text
  "before:translate-y-2.5 after:-translate-y-5",
  // hover / keyboard focus: visible and slid away from the text
  // ("[" gets a little extra: the font draws it closer to the letters than "]")
  "group-hover:before:-translate-y-5 group-hover:after:translate-y-2.5 group-hover:before:opacity-100 group-hover:after:opacity-100",
  "group-focus-visible:before:-translate-y-5 group-focus-visible:after:translate-y-2.5 group-focus-visible:before:opacity-100 group-focus-visible:after:opacity-100",
].join(" ");

// Big rotated link that reads bottom to top: small label on the left, title on the right
function VerticalLink({ href, label, title, className }: { href: string; label: string; title: string; className: string }) {
  return (
    // will-change keeps the link on its own GPU layer all the time. Without it Chrome moves the
    // text to a layer only while the brackets animate, and the text visibly twitches by a pixel.
    <Link
      href={href}
      className={cn("group absolute rotate-180 outline-none will-change-transform [writing-mode:vertical-rl]", className)}
    >
      <span className="block text-[10px] tracking-[0.22em] whitespace-nowrap text-cream/65 uppercase md:text-[11px]">{label}</span>
      <span
        className={cn(
          "relative block font-display text-[clamp(26px,5.5svh,34px)] leading-[1.05] font-semibold tracking-[0.01em] whitespace-nowrap text-cream/85 uppercase transition-colors group-hover:text-cream group-focus-visible:text-cream md:text-[clamp(30px,6.5svh,56px)]",
          brackets,
        )}
      >
        {title}
      </span>
    </Link>
  );
}

// A box with exactly the size and position of the visible photo after object-fit: cover.
// The photo is cropped differently on every screen, so anything pinned to a spot in the photo
// (like the red light) goes inside this box. 100cqw/100cqh = the hero's width/height.
function photoBox(photo: PhotoData): React.CSSProperties {
  const ratio = photo.width / photo.height;
  const width = `max(100cqw, 100cqh * ${ratio})`;
  const height = `max(100cqh, 100cqw / ${ratio})`;
  const focusX = photo.focus?.x ?? 0.5; // same focus point the photo itself uses
  const focusY = photo.focus?.y ?? 0.5;
  return {
    width,
    height,
    left: `calc((100cqw - ${width}) * ${focusX})`,
    top: `calc((100cqh - ${height}) * ${focusY})`,
  };
}

// The whole home page: one full-screen photo, no scrolling. The menu (SiteNav) floats on top.
export default async function Hero() {
  const [heroPhoto, darkness, flashLight] = await Promise.all([getHeroPhoto(), getHeroDarkness(), getHeroFlashLight()]);

  return (
    <section className="relative isolate h-svh overflow-hidden bg-ink text-cream [container-type:size]">
      <div className="absolute inset-0 -z-10">
        <Photo photo={heroPhoto} aspect={false} className="h-full" sizes="100vw" hideLabel preload />
      </div>

      {/* Dark layer over the photo. How dark is set in the Studio: Home page → Hero darkness */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black" style={{ opacity: darkness / 100 }} />
      {/* Blinking red light, e.g. on the camera flash (Studio: Home page → Blinking red light).
          Desktop only: on phones the photo is cropped tight and the light just adds noise. */}
      {flashLight && heroPhoto.src && (
        <div aria-hidden="true" className="pointer-events-none absolute -z-10 hidden md:block" style={photoBox(heroPhoto)}>
          <span
            className="absolute size-2 -translate-1/2 animate-flash-blink rounded-full bg-[#ff3b30] motion-reduce:animate-none"
            style={{ left: `${flashLight.x}%`, top: `${flashLight.y}%` }}
          />
        </div>
      )}

      {/* Extra shade behind the menu so it stays readable on bright photos */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-black/45 to-transparent" />

      {/* Thin vertical guide lines */}
      <div aria-hidden="true" className="absolute inset-y-0 left-[34%] w-px bg-cream/12" />
      <div aria-hidden="true" className="absolute inset-y-0 left-[67%] w-px bg-cream/12" />

      <VerticalLink
        href="/portfolio/"
        label="My photo portfolio"
        title="Explore works"
        className="top-1/2 left-[calc(34%+14px)] -translate-y-1/2"
      />
      <VerticalLink
        href="/contact/"
        label="How to find me"
        title="My contacts"
        className="bottom-[12%] left-[calc(67%+14px)]"
      />

      {/* Bottom corners. The small line on the left is the page's h1 for Google. */}
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 px-gutter pb-7 text-[11px] tracking-[0.16em] text-cream/65 uppercase">
        <h1>Food, product &amp; people photography · {site.location}</h1>
        <p className="flex flex-wrap gap-x-6 gap-y-2">
          {site.instagram && (
            <a href={`https://instagram.com/${site.instagram}`} className="transition-colors hover:text-cream">
              Instagram
            </a>
          )}
          <span>
            © {new Date().getFullYear()}{" "}
            {/* Quiet shortcut to the admin panel for Natalie: looks like plain text.
                The Studio asks for a login, so it's safe to link publicly. */}
            <a href={site.studioUrl} rel="nofollow" className="transition-colors hover:text-cream">
              {site.name}
            </a>
          </span>
          <a href={site.developer.url} target="_blank" className="text-cream/45 transition-colors hover:text-cream">
            Developed by {site.developer.name}
          </a>
        </p>
      </div>
    </section>
  );
}
