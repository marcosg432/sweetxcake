import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, MessageCircle } from "lucide-react";
import { STORES } from "@/lib/constants";

export function StoresSection() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">Nossas lojas</h2>
          <p className="mt-3 text-muted">Três unidades para atender você com carinho.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {STORES.map((store) => (
            <article
              key={store.slug}
              className="overflow-hidden rounded-2xl border border-primary/10 bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-brand-hover"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={store.image}
                  alt={store.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-primary">{store.name}</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {store.address}
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {store.hours}
                  </li>
                  <li className="flex items-start gap-2">
                    <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    WhatsApp disponível
                  </li>
                </ul>
                <Link
                  href={`/lojas/${store.slug}`}
                  className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Ver detalhes →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-primary/10 bg-background">
          <iframe
            title="Mapa das lojas Sweet Cheesecake"
            src="https://maps.google.com/maps?q=Belo+Horizonte&t=&z=12&ie=UTF8&iwloc=&output=embed"
            className="h-72 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
