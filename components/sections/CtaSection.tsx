import ButtonLink from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";

type Props = {
  title: string;
  text: string;
  tone?: "cream" | "sand";
};

// Centered "Start an enquiry" block at the bottom of inner pages
export default function CtaSection({ title, text, tone = "cream" }: Props) {
  return (
    <section className={cn("px-gutter py-20 text-center md:py-28", tone === "sand" && "bg-sand")}>
      <h2 className="mx-auto mb-5 max-w-[620px] font-serif text-[36px] leading-[1.15] font-light md:text-[48px]">
        {title}
      </h2>
      <p className="mx-auto mb-9 max-w-[480px] leading-[1.8] text-muted">{text}</p>
      <ButtonLink href="/#contact">Start an enquiry</ButtonLink>
    </section>
  );
}
