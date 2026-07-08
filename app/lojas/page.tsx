import Image from "next/image";
import Link from "next/link";
import { STORES } from "@/lib/constants";

export const metadata = {
  title: "Lojas",
};

export default function LojasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-foreground">Nossas Lojas</h1>
      <p className="mt-3 text-muted">Escolha a unidade mais conveniente para você.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {STORES.map((store) => (
          <Link
            key={store.slug}
            href={`/lojas/${store.slug}`}
            className="group overflow-hidden rounded-2xl border border-primary/10 bg-background transition-all hover:-translate-y-1 hover:shadow-brand-hover"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={store.image}
                alt={store.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <h2 className="font-display text-xl text-primary">{store.name}</h2>
              <p className="mt-2 text-sm text-muted">{store.address}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
