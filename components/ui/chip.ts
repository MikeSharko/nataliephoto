import { cn } from "@/lib/cn";

// Shared look for category filters (Portfolio categories, Blog categories):
// big condensed text, the active one bright and in [ brackets ], the rest dimmed.
// Brackets show for aria-current (links) or aria-pressed (filter buttons), see @utility brackets.
export function chipClass(active: boolean) {
  return cn(
    "brackets font-display text-[18px] tracking-[0.06em] uppercase transition-colors md:text-[20px]",
    active ? "text-ink" : "text-ink/50 hover:text-ink",
  );
}
