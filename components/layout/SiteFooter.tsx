import { site } from "@/lib/site";

export default function SiteFooter() {
  // Calculated at build time; the next deploy updates it
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="flex flex-wrap justify-between gap-6 px-gutter py-10 text-[13px] text-muted">
        <p>
          © {year} {site.name}
        </p>
        <p>{site.location}</p>
      </div>
    </footer>
  );
}
