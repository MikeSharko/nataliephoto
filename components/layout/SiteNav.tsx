"use client"; // needs the browser: current URL and open/closed menu state

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { categories } from "@/lib/portfolio";
import { site } from "@/lib/site";

const portfolioLinks = [
  { href: "/portfolio/", label: "All work" },
  ...categories.map((category) => ({
    href: `/portfolio/${category.slug}/`,
    label: category.navLabel,
  })),
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={cn("transition-transform", open && "rotate-180")}
    >
      <path d="M2 3.5l3 3 3-3" />
    </svg>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const [portfolioOpen, setPortfolioOpen] = useState(false); // desktop dropdown
  const [mobileOpen, setMobileOpen] = useState(false); // phone menu
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close the dropdown when clicking outside of it or pressing Escape
  useEffect(() => {
    if (!portfolioOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) setPortfolioOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setPortfolioOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [portfolioOpen]);

  // Called by every link so menus close after navigating
  const closeMenus = () => {
    setPortfolioOpen(false);
    setMobileOpen(false);
  };

  const inPortfolio = pathname.startsWith("/portfolio");
  const inBlog = pathname.startsWith("/blog");

  return (
    <header className="border-b border-line">
      <nav aria-label="Main" className="flex items-center justify-between gap-6 px-gutter py-6 md:py-7">
        <Link href="/" onClick={closeMenus} className="font-serif text-[26px] tracking-[0.04em]">
          {site.name}
        </Link>

        {/* Desktop menu */}
        <ul className="eyebrow hidden items-center gap-8 md:flex">
          <li ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-expanded={portfolioOpen}
              aria-controls="portfolio-menu"
              onClick={() => setPortfolioOpen((open) => !open)}
              className={cn(
                "flex cursor-pointer items-center gap-1.5 border-b pb-0.5 uppercase transition-colors hover:text-clay",
                inPortfolio ? "border-ink" : "border-transparent",
              )}
            >
              Portfolio <Chevron open={portfolioOpen} />
            </button>

            {portfolioOpen && (
              <ul
                id="portfolio-menu"
                className="absolute top-[calc(100%+16px)] -left-5.5 z-20 grid min-w-56 border border-line bg-paper py-2.5 shadow-[0_16px_40px_rgba(46,42,38,0.08)]"
              >
                {portfolioLinks.map((link) => {
                  const current = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMenus}
                        aria-current={current ? "page" : undefined}
                        className={cn("block px-5.5 py-3 transition-colors hover:bg-sand", current && "bg-sand")}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
          <li>
            <Link href="/#prices" className="transition-colors hover:text-clay">
              Prices
            </Link>
          </li>
          <li>
            <Link
              href="/blog/"
              aria-current={inBlog ? "page" : undefined}
              className={cn(
                "border-b pb-0.5 transition-colors hover:text-clay",
                inBlog ? "border-ink" : "border-transparent",
              )}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              className="rounded-full border border-ink px-5.5 py-3 transition-colors hover:bg-ink hover:text-cream"
            >
              Get in touch
            </Link>
          </li>
        </ul>

        {/* Phone menu button */}
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((open) => !open)}
          className="eyebrow cursor-pointer rounded-full border border-ink px-5 py-2.5 uppercase md:hidden"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Phone menu panel */}
      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-line px-gutter pt-2 pb-8 md:hidden">
          <p className="eyebrow pt-4 pb-2 text-subtle">Portfolio</p>
          <ul className="font-serif text-[28px] leading-snug">
            {portfolioLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenus}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="block py-1.5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="eyebrow mt-6 grid gap-4 border-t border-line pt-6">
            <li>
              <Link href="/#prices" onClick={closeMenus}>
                Prices
              </Link>
            </li>
            <li>
              <Link href="/blog/" onClick={closeMenus}>
                Blog
              </Link>
            </li>
            <li>
              <Link href="/#contact" onClick={closeMenus}>
                Get in touch
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
