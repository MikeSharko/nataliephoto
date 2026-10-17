"use client"; // needs the browser: current URL and open/closed menu state

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/layout/Logo";
import { cn } from "@/lib/cn";
import { categories } from "@/lib/portfolio";

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
  const inPrices = pathname.startsWith("/prices");

  // On the home page the menu floats over the full-screen photo: light text, no background
  const overPhoto = pathname === "/";
  // Links get [ brackets ] on hover and on the current page
  const linkClass = "brackets transition-colors";

  return (
    <header
      className={cn(
        "border-b",
        overPhoto ? "absolute inset-x-0 top-0 z-30 border-snow/15 text-snow" : "border-line",
        overPhoto && mobileOpen && "bg-cream",
      )}
    >
      <nav aria-label="Main" className="flex items-center justify-between gap-6 px-gutter py-6 md:py-7 mx-auto max-w-[1200px]">
        <Link href="/" onClick={closeMenus} className="transition-opacity hover:opacity-80">
          <Logo />
        </Link>

        {/* Desktop menu */}
        <ul className="eyebrow hidden items-center gap-3 md:flex">
          <li ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-expanded={portfolioOpen}
              aria-controls="portfolio-menu"
              onClick={() => setPortfolioOpen((open) => !open)}
              data-current={inPortfolio || undefined}
              className={cn("flex cursor-pointer items-center gap-1.5 uppercase", linkClass)}
            >
              Portfolio <Chevron open={portfolioOpen} />
            </button>

            {portfolioOpen && (
              <ul
                id="portfolio-menu"
                className="absolute top-[calc(100%+16px)] -left-5.5 z-20 grid min-w-56 border border-line bg-paper py-2.5 text-ink shadow-[0_16px_40px_rgba(46,42,38,0.08)]"
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
            <Link
              href="/prices/"
              aria-current={inPrices ? "page" : undefined}
              className={linkClass}
            >
              Prices
            </Link>
          </li>
          <li>
            <Link
              href="/blog/"
              aria-current={inBlog ? "page" : undefined}
              className={linkClass}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/contact/"
              aria-current={pathname.startsWith("/contact") ? "page" : undefined}
              className={cn(
                "rounded-full border px-5.5 py-3 transition-colors",
                overPhoto ? "border-snow/70 hover:bg-snow hover:text-cream" : "border-ink hover:bg-ink hover:text-cream",
              )}
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
          className={cn(
            "eyebrow cursor-pointer rounded-full border px-5 py-2.5 uppercase md:hidden",
            overPhoto ? "border-snow/70" : "border-ink",
          )}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Phone menu panel */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className={cn("border-t px-gutter pt-2 pb-8 md:hidden", overPhoto ? "border-snow/15" : "border-line")}
        >
          <p className={cn("eyebrow pt-4 pb-2", overPhoto ? "text-snow/60" : "text-subtle")}>Portfolio</p>
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
          <ul className={cn("eyebrow mt-6 grid gap-4 border-t pt-6", overPhoto ? "border-snow/15" : "border-line")}>
            <li>
              <Link href="/prices/" onClick={closeMenus}>
                Prices
              </Link>
            </li>
            <li>
              <Link href="/blog/" onClick={closeMenus}>
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact/" onClick={closeMenus}>
                Get in touch
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
