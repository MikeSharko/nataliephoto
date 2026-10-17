"use client"; // needs the current URL: the home page is full-width, every other page is centered

import { usePathname } from "next/navigation";

// Inner pages sit in a 1200px column in the middle of the screen,
// framed by two thin lines. The home page photo stays edge to edge.
export default function MainFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") return <main>{children}</main>;

  return <main className="mx-auto max-w-[1200px] border-x border-line">{children}</main>;
}
