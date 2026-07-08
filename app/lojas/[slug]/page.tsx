import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { STORES } from "@/lib/constants";

export default async function LojaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const store = STORES.find((s) => s.slug === slug);

  if (!store) notFound();

  return (
    <div className="bg-background">
      <div className="relative mx-auto aspect-[21/8] max-w-7xl overflow-hidden px-4 pt-8 sm:px-6 lg:px-8">
        <div className="relative h-full min-h-[220px] overflow-hidden rounded-3xl">
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <h1 className="font-display text-4xl text-foreground">{store.name}</h1>
            <p className="mt-3 text-muted">{store.address}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm text-muted">{store.hours}</p>
        <Button
          href={`https://wa.me/${store.whatsapp}`}
          variant="action"
          className="mt-8"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fazer pedido no WhatsApp
        </Button>
        <Link href="/lojas" className="mt-6 block text-sm text-primary hover:underline">
          ← Voltar às lojas
        </Link>
      </div>
    </div>
  );
}
