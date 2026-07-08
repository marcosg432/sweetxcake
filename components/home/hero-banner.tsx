import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className="order-2 lg:order-1">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Catálogo Inteligente
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Doçura artesanal,
            <span className="block text-primary">experiência premium.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Explore todo o nosso cardápio em um único lugar. Adicione ao carrinho
            e finalize seu pedido direto no WhatsApp da loja mais conveniente.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/#cardapio" variant="primary" className="px-8 py-3.5">
              Explorar cardápio
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/#cardapio" variant="secondary" className="px-8 py-3.5">
              Ver promoções
            </Button>
          </div>
        </div>

        <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-3xl lg:order-2">
          <Image
            src={IMAGES.hero}
            alt="Mesa elegante com cheesecake e café especial Sweet Cheesecake"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
