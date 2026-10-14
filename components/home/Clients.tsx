import Image from "next/image";
import { clients } from "@/lib/site";

// "Selected clients" strip. Renders nothing until lib/site.ts has clients.
export default function Clients() {
  if (clients.length === 0) return null;

  return (
    <section className="border-y border-line px-gutter py-16 md:py-18">
      <p className="eyebrow mb-9 text-center text-subtle">Selected clients</p>
      <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
        {clients.map((client) => (
          <li key={client.name}>
            {client.logo ? (
              <Image src={client.logo} alt={client.name} width={140} height={44} className="h-11 w-auto object-contain" />
            ) : (
              <span className="font-serif text-2xl text-muted">{client.name}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
