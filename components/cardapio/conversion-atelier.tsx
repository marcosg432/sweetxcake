import Image from "next/image";
import { OpenCartButton } from "@/components/cart/open-cart-button";
import { IMAGES } from "@/lib/images";

export function CatalogConversionAtelier() {
  return (
    <section className="section-surface-4 relative overflow-hidden py-20 sm:py-24">
      <div className="organic-orb -left-20 top-10 h-64 w-64 bg-primary/20" />
      <div className="organic-orb -right-16 bottom-8 h-72 w-72 bg-primary/15" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="glass-panel-strong rounded-[2.25rem] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">
              Pedido inteligente
            </p>
            <h2 className="mt-5 font-display text-4xl leading-[1.04] text-foreground sm:text-5xl">
              Descubra, adicione, finalize.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              Monte o pedido sem escolher unidade no início. No final, selecione a
              loja e o WhatsApp abre com a mensagem pronta.
            </p>
            <div className="mt-10 space-y-4">
              {[
                "Cardápio inteligente",
                "Carrinho universal",
                "WhatsApp da loja correta",
              ].map((step) => (
                <div
                  key={step}
                  className="rounded-2xl border border-primary/10 bg-surface-2/80 px-4 py-3"
                >
                  <p className="text-sm text-foreground">{step}</p>
                </div>
              ))}
            </div>
            <OpenCartButton className="mt-9 px-8 py-3.5">
              Revisar pedido
            </OpenCartButton>
          </div>

          <div className="glass-panel relative overflow-hidden rounded-[2.25rem] p-2">
            <div className="relative min-h-[420px] overflow-hidden rounded-[1.85rem]">
              <Image
                src={IMAGES.promotions.banner}
                alt="Composição de confeitaria premium"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-4/85 via-surface-2/10 to-transparent" />
              <div className="absolute bottom-0 p-8 sm:p-10">
                <p className="text-xs uppercase tracking-[0.25em] text-secondary">
                  Conversão com elegância
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  Menos atrito, menos mensagens repetitivas e mais pedidos concluídos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
