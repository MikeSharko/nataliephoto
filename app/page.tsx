import Link from "next/link";

// Home page → served at /
export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-sm uppercase tracking-[0.14em] text-muted">
        Food &amp; Product Photography
      </p>
      <h1 className="mt-4 font-serif text-6xl font-light leading-tight">
        Hello from nataliephoto.com
      </h1>
      {/* Client-side navigation: no full page reload */}
      <Link
        href="/food/"
        className="mt-10 inline-block border-b border-ink pb-1 text-sm uppercase tracking-[0.14em]"
      >
        View food work
      </Link>
    </main>
  );
}