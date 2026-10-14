import ContactForm from "@/components/home/ContactForm";
import { site } from "@/lib/site";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-sand px-gutter py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-18">
        <div>
          <h2 className="mb-5 font-serif text-[38px] leading-[1.15] font-light md:text-[48px]">
            Tell me about your&nbsp;project.
          </h2>
          <p className="mb-8 max-w-[420px] leading-[1.8] text-muted">
            Shoot dates, the kind of images you need, and roughly what you have in mind. I reply within two
            business days.
          </p>
          <p className="mb-2 text-[15px]">
            <a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-ink">
              {site.email}
            </a>
          </p>
          {site.instagram && (
            <p className="text-[15px]">
              <a
                href={`https://instagram.com/${site.instagram}`}
                className="text-muted transition-colors hover:text-ink"
              >
                @{site.instagram}
              </a>
            </p>
          )}
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
