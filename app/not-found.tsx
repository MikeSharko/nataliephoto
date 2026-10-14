import type { Metadata } from "next";
import ButtonLink from "@/components/ui/ButtonLink";

export const metadata: Metadata = { title: "Page not found" };

// Becomes out/404.html. CloudFront shows it for missing pages (Error pages: 403 → /404.html).
export default function NotFound() {
  return (
    <section className="px-gutter py-32 text-center md:py-40">
      <p className="eyebrow mb-5 text-subtle">404</p>
      <h1 className="mx-auto mb-6 max-w-[620px] font-serif text-[44px] leading-[1.08] font-light md:text-[60px]">
        This page wandered off.
      </h1>
      <p className="mx-auto mb-10 max-w-[440px] leading-[1.8] text-muted">
        The link may be old or mistyped. The portfolio is a good place to start.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <ButtonLink href="/portfolio/">See the portfolio</ButtonLink>
        <ButtonLink href="/" variant="outline">
          Home
        </ButtonLink>
      </div>
    </section>
  );
}
