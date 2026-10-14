"use client"; // handles the submit event in the browser

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const projectTypes = ["Food", "Product / still life", "People", "A mix"];
// TODO: confirm budget ranges with Natalie
const budgets = ["Under $1k", "$1k – $3k", "$3k+", "Not sure yet"];

const fieldClass =
  "w-full border border-field bg-paper px-3.5 py-3 text-[15px] text-ink focus:border-ink focus:outline-none";
const labelClass = "mb-2 block text-xs uppercase tracking-[0.12em] text-muted";

// A static site has no server to send email, so for now the form opens the visitor's
// email app with everything filled in. Later it can post to a Lambda or Formspree instead.
export default function ContactForm() {
  const [opened, setOpened] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const subject = `New enquiry: ${data.get("type")} — ${data.get("name")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Project type: ${data.get("type")}`,
      `Budget: ${data.get("budget")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="type" className={labelClass}>Project type</label>
          <select id="type" name="type" className={fieldClass}>
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClass}>Budget</label>
          <select id="budget" name="budget" className={fieldClass}>
            {budgets.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea id="message" name="message" rows={5} required className={fieldClass} />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          className="eyebrow cursor-pointer bg-ink px-9 py-4 text-cream transition-colors hover:bg-clay"
        >
          Send enquiry
        </button>
        <p role="status" className="text-sm text-muted">
          {opened && <>Your email app should open with the message ready. If it didn&rsquo;t, write to {site.email}.</>}
        </p>
      </div>
    </form>
  );
}
