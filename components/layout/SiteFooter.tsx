"use client"; // needs the current URL to hide itself on the home page

import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export default function SiteFooter() {
  const pathname = usePathname();

  // The home page is a single full-screen photo with its own copyright line
  if (pathname === "/") return null;

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-6 px-gutter py-8 text-[11px] tracking-[0.16em] text-subtle uppercase">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>{site.location}</p>
        <a href={site.developer.url} target="_blank" className="transition-colors hover:text-ink">
          Developed by {site.developer.name}
        </a>
      </div>
    </footer>
  );
}
