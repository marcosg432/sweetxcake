import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REVIEWS } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export function ReviewsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl text-foreground sm:text-4xl">O que dizem nossos clientes</h2>
        <p className="mt-3 text-muted">Confiança construída em cada experiência.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <article
            key={review.id}
            className="overflow-hidden rounded-2xl border border-primary/10 bg-background shadow-brand"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={review.image}
                alt={`Depoimento de ${review.author}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">&ldquo;{review.comment}&rdquo;</p>
              <p className="mt-4 text-sm font-medium text-primary">{review.author}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PromoSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl">
        <div className="relative aspect-[21/9] min-h-[280px] sm:min-h-[320px]">
          <Image
            src={IMAGES.promotions.banner}
            alt="Combos especiais da semana"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/20" />
        </div>
        <div className="absolute inset-0 flex items-center px-8 sm:px-12">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">Promoções</p>
            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
              Combos especiais da semana
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Café + doce com condições exclusivas. Monte seu pedido e finalize no WhatsApp.
            </p>
            <Button href="/cardapio" variant="action" className="mt-8">
              Ver promoções
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
