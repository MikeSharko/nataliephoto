import { cn } from "@/lib/cn";
import { packages } from "@/lib/pricing";

export default function Pricing() {
  return (
    <section id="prices" className="px-gutter py-20 md:py-28">
      <h2 className="mb-12 font-serif text-[36px] font-light md:text-[44px]">Prices &amp; packages</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={cn("bg-paper p-8 md:p-9", pkg.featured ? "border border-ink" : "border border-line")}
          >
            <h3 className="mb-2 font-serif text-[28px]">{pkg.name}</h3>
            <p className="mb-6 text-[26px] font-light">{pkg.price}</p>
            <ul className="grid gap-2 text-[15px] leading-[1.8] text-muted">
              {pkg.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
