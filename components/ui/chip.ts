import { cn } from "@/lib/cn";

// Shared look for the round filter "pills" (Portfolio categories, Blog categories)
export function chipClass(active: boolean) {
  return cn(
    "rounded-full px-5 py-3 text-[13px] uppercase tracking-[0.1em] transition-colors",
    active ? "bg-ink text-cream" : "border border-field hover:border-ink",
  );
}
