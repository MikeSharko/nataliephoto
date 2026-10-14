// Tailwind only ships classes it can find as full strings in the code,
// so every accent color is spelled out here instead of built like `text-${color}`.

export type Accent = "clay" | "sage" | "plum" | "neutral";

export const accents: Record<
  Accent,
  { text: string; border: string; soft: string; tint: string }
> = {
  clay: { text: "text-clay", border: "border-clay", soft: "bg-clay-soft", tint: "bg-clay-tint" },
  sage: { text: "text-sage", border: "border-sage", soft: "bg-sage-soft", tint: "bg-sage-tint" },
  plum: { text: "text-plum", border: "border-plum", soft: "bg-plum-soft", tint: "bg-plum-tint" },
  neutral: { text: "text-subtle", border: "border-ink", soft: "bg-sand", tint: "bg-sand" },
};
