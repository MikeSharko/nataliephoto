import type { Metadata } from "next";
import Clients from "@/components/home/Clients";
import Pricing from "@/components/home/Pricing";
import CtaSection from "@/components/sections/CtaSection";
import PageIntro from "@/components/sections/PageIntro";

export const metadata: Metadata = {
  title: "Photography Prices & Packages",
  description: "Photography packages and prices for restaurants, cafes and product brands in San Diego.",
  alternates: { canonical: "/prices/" },
};

// /prices/ → packages (texts live in lib/pricing.ts)
export default function PricesPage() {
  return (
    <>
      <PageIntro
        eyebrow={<p className="eyebrow text-subtle">Prices</p>}
        title="Prices"
        titleSuffix="for food, product and people photography in San Diego"
        subtitle="Packages for food, product and people shoots."
        description="Every shoot is a little different. Pick the closest package and I will tailor it to your project."
      />
      <Pricing />
      <Clients />
      <CtaSection tone="sand" title="Not sure which one fits?" text="Tell me what you need and I will suggest the right package." />
    </>
  );
}
