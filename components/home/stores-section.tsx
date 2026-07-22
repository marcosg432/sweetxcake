import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STORES } from "@/lib/constants";

export function StoresSection() {
  return (
    <section id="lojas" className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">Nossas lojas</h2>
          <p className="mt-3 text-muted">Três unidades para atender você com carinho.</p>
        </div>

        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {STORES.map((store) => (
            <article
              key={store.slug}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-brand-hover"
            >
              <div className="relative aspect-[16/10] shrink-0">
                <Image
                  src={store.image}
                  alt={store.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
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
                </ul>
                <div className="mt-auto pt-6">
                  <Button
                    href={`https://wa.me/${store.whatsapp}`}
                    variant="action"
                    className="w-full"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pedir no WhatsApp
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
