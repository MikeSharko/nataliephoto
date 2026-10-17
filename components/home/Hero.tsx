import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { cn } from "@/lib/cn";
import { getHeroDarkness, getHeroPhoto } from "@/lib/portfolio";
import { site } from "@/lib/site";

// Big rotated link that reads bottom to top: small label on the left, title on the right
function VerticalLink({ href, label, title, className }: { href: string; label: string; title: string; className: string }) {
  return (
    <Link href={href} className={cn("group absolute rotate-180 [writing-mode:vertical-rl]", className)}>
      <span className="block text-[10px] tracking-[0.22em] whitespace-nowrap text-cream/65 uppercase md:text-[11px]">{label}</span>
      <span className="block font-display text-[clamp(26px,5.5svh,34px)] leading-[1.05] font-semibold tracking-[0.01em] whitespace-nowrap text-cream/85 uppercase transition-colors group-hover:text-cream md:text-[clamp(30px,6.5svh,56px)]">
        {title}
      </span>
    </Link>
  );
}

// The whole home page: one full-screen photo, no scrolling. The menu (SiteNav) floats on top.
export default async function Hero() {
  const [heroPhoto, darkness] = await Promise.all([getHeroPhoto(), getHeroDarkness()]);

  return (
    <section className="relative isolate h-svh overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0 -z-10">
        <Photo photo={heroPhoto} aspect={false} className="h-full" sizes="100vw" hideLabel preload />
      </div>

      {/* Dark layer over the photo. How dark is set in the Studio: Home page → Hero darkness */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black" style={{ opacity: darkness / 100 }} />
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
        <p className="flex gap-6">
          {site.instagram && (
            <a href={`https://instagram.com/${site.instagram}`} className="transition-colors hover:text-cream">
              Instagram
            </a>
          )}
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
        </p>
      </div>
    </section>
  );
}
