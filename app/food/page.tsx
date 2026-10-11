import Link from "next/link";

// Food page → served at /food/
export default function FoodPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-sm uppercase tracking-[0.14em] text-clay">Food</p>
      <h1 className="mt-4 font-serif text-6xl font-light leading-tight">
        Dishes that look the way they taste.
      </h1>
      <Link
        href="/"
        className="mt-10 inline-block border-b border-ink pb-1 text-sm uppercase tracking-[0.14em]"
      >
        ← Back home
      </Link>
    </main>
  );
}