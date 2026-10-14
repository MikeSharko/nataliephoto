import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

// Rectangular call-to-action link: dark "solid" or bordered "outline"
export default function ButtonLink({ href, children, variant = "solid", className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "eyebrow inline-block px-10 py-4 transition-colors",
        variant === "solid"
          ? "bg-ink text-cream hover:bg-clay"
          : "border border-ink hover:bg-ink hover:text-cream",
        className,
      )}
    >
      {children}
    </Link>
  );
}
