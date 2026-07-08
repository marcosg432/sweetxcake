import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { OpenCartButton } from "@/components/cart/open-cart-button";
import { Button } from "@/components/ui/button";
import { CATEGORIES, FEATURED_PRODUCTS, STORES } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { formatPrice } from "@/lib/utils";

function SoftOrbs() {
  return (
    <>
      <div className="organic-orb -left-20 top-10 h-64 w-64 bg-primary/20" />
      <div className="organic-orb -right-16 bottom-8 h-72 w-72 bg-primary/15" />
    </>
  );
}

function CinematicHero() {
  return (
    <section id="home" className="section-surface-hero paper-texture relative min-h-[92vh] overflow-hidden">
      <SoftOrbs />
      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl items-end gap-8 px-5 pb-16 pt-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-24">
        <div className="relative z-10 max-w-2xl">
          <div className="glass-panel inline-flex rounded-full px-4 py-1.5">
            <p className="text-[11px] uppercase tracking-[0.35em] text-primary">
              Sweet Cheesecake Experience
            </p>
          </div>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-[-0.03em] text-foreground sm:text-7xl lg:text-8xl">
            Um novo ritual
            <span className="block text-primary">de sabor e presença.</span>
          </h1>
          <p className="mt-7 max-w-xl text-sm leading-relaxed text-foreground/75 sm:text-base">
            Uma experiência digital acolhedora e sofisticada, onde cada detalhe
            convida o cliente a descobrir, desejar e pedir com leveza.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/#cardapio" variant="primary" className="px-8 py-3.5">
              Explorar coleção
            </Button>
            <OpenCartButton className="px-8 py-3.5" />
          </div>
        </div>

        <div className="relative z-10">
          <div className="glass-panel relative aspect-[4/5] overflow-hidden rounded-[2.5rem] p-3 shadow-brand">
            <div className="relative h-full overflow-hidden rounded-[2rem]">
              <Image
                src={IMAGES.hero}
                alt="Mesa autoral Sweet Cheesecake"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialManifesto() {
  return (
    <section id="historia" className="section-surface-1 paper-texture relative overflow-hidden py-20 sm:py-28">
      <div className="organic-orb right-[10%] top-8 h-56 w-56 bg-primary/15" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="glass-panel grid gap-10 rounded-[2.25rem] p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <p className="font-display text-3xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
            Produzimos uma experiência com ritmo.
            <span className="block text-primary">Textura. Luz. Intenção.</span>
          </p>
          <p className="max-w-xl justify-self-end text-sm leading-relaxed text-muted sm:text-base">
            A Sweet Cheesecake nasceu para transformar produtos artesanais em uma experiência
            memorável. A cada detalhe, buscamos elegância, acolhimento e excelência.
          </p>
        </div>
      </div>
    </section>
  );
}

function SignatureGallery() {
  const [first, second, third, fourth] = FEATURED_PRODUCTS;

  return (
    <section className="section-surface-2 relative overflow-hidden py-20 sm:py-24">
      <SoftOrbs />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Assinaturas</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl">
            Destaques com direção fotográfica.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <div className="glass-panel col-span-12 overflow-hidden rounded-[2.25rem] p-2 lg:col-span-7">
            <Link href={`/produtos/${first.slug}`} className="group relative block min-h-[56vh] overflow-hidden rounded-[1.85rem]">
              <Image
                src={first.image}
                alt={first.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-4/90 via-surface-2/20 to-transparent" />
              <div className="absolute bottom-0 p-7 sm:p-9">
                <p className="text-xs uppercase tracking-[0.2em] text-primary">{first.category}</p>
                <h3 className="mt-2 font-display text-3xl text-foreground">{first.name}</h3>
                <p className="mt-2 text-sm text-foreground/75">{formatPrice(first.price)}</p>
                <div className="mt-4">
                  <AddToCartButton product={first} variant="action" className="px-5 py-2.5 text-xs">
                    Adicionar
                  </AddToCartButton>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-span-12 grid gap-5 lg:col-span-5">
            {[second, third].map((product) => (
              <div key={product.id} className="glass-panel overflow-hidden rounded-[2rem] p-2">
                <Link
                  href={`/produtos/${product.slug}`}
                  className="group relative block min-h-[27vh] overflow-hidden rounded-[1.6rem]"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-surface-3/85 via-surface-2/20 to-transparent" />
                  <div className="absolute left-0 top-0 p-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary">{product.category}</p>
                    <h3 className="mt-1 text-xl font-medium text-foreground">{product.name}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel mt-5 overflow-hidden rounded-[2.25rem] p-2">
          <Link
            href={`/produtos/${fourth.slug}`}
            className="group relative block min-h-[42vh] overflow-hidden rounded-[1.85rem]"
          >
            <Image
              src={fourth.image}
              alt={fourth.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/55 via-secondary/5 to-transparent" />
            <div className="absolute bottom-0 flex w-full flex-wrap items-end justify-between gap-6 p-7 sm:p-10">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/90">Assinatura da casa</p>
                <h3 className="mt-2 font-display text-3xl text-white sm:text-4xl">{fourth.name}</h3>
              </div>
              <span className="inline-flex items-center gap-2 text-sm text-white/90">
                {formatPrice(fourth.price)} <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CategoryRunway() {
  return (
    <section id="cardapio" className="section-surface-3 paper-texture relative overflow-hidden py-20">
      <div className="organic-orb -left-10 top-20 h-72 w-72 bg-primary/18" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10">
          <h2 className="max-w-lg font-display text-4xl leading-[1.03] tracking-[-0.02em] text-foreground sm:text-5xl">
            Universos de sabor com direção editorial.
          </h2>
        </div>

        <div className="space-y-5">
          {CATEGORIES.map((category, index) => (
            <Link
              key={category.slug}
              href={`/categorias/${category.slug}`}
              className="group glass-panel grid gap-4 overflow-hidden rounded-[2rem] p-4 transition-all duration-500 hover:shadow-brand-hover sm:grid-cols-[1fr_1.3fr] sm:p-5"
            >
              <div
                className={`relative overflow-hidden rounded-[1.5rem] ${
                  index % 2 === 0 ? "sm:order-1" : "sm:order-2"
                }`}
              >
                <div className="relative min-h-[26vh]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div
                className={`flex flex-col justify-between rounded-[1.5rem] bg-surface-1/55 p-4 sm:p-8 ${
                  index % 2 === 0 ? "sm:order-2" : "sm:order-1"
                }`}
              >
                <div>
                  <p className="text-3xl">{category.emoji}</p>
                  <h3 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
                    {category.name}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                    {category.description}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm text-primary">
                  Explorar universo <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConversionAtelier() {
  return (
    <section className="section-surface-4 relative overflow-hidden py-24">
      <SoftOrbs />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="glass-panel-strong rounded-[2.25rem] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Pedido inteligente</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.04] text-foreground sm:text-5xl">
              Descubra, adicione, finalize.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              Monte o pedido sem escolher unidade no início. No final, selecione a loja e
              o WhatsApp abre com a mensagem pronta.
            </p>
            <div className="mt-10 space-y-4">
              {["Cardápio inteligente", "Carrinho universal", "WhatsApp da loja correta"].map((step) => (
                <div key={step} className="rounded-2xl border border-primary/10 bg-surface-2/80 px-4 py-3">
                  <p className="text-sm text-foreground">{step}</p>
                </div>
              ))}
            </div>
            <OpenCartButton className="mt-9 px-8 py-3.5">Finalizar pedido</OpenCartButton>
          </div>

          <div className="glass-panel relative overflow-hidden rounded-[2.25rem] p-2">
            <div className="relative min-h-[420px] overflow-hidden rounded-[1.85rem]">
              <Image
                src={IMAGES.promotions.banner}
                alt="Composição de confeitaria premium"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-4/85 via-surface-2/10 to-transparent" />
              <div className="absolute bottom-0 p-8 sm:p-10">
                <p className="text-xs uppercase tracking-[0.25em] text-secondary">Conversão com elegância</p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/80">
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

function RestrictiveShowcase() {
  const restrictive = CATEGORIES.find((item) => item.slug === "restritivos");
  if (!restrictive) return null;

  return (
    <section id="restritivos" className="section-surface-1 paper-texture relative overflow-hidden py-24">
      <div className="organic-orb left-[20%] top-10 h-64 w-64 bg-primary/16" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="glass-panel relative min-h-[52vh] overflow-hidden rounded-[2.25rem] p-2">
            <div className="relative h-full min-h-[52vh] overflow-hidden rounded-[1.85rem]">
              <Image
                src={restrictive.image}
                alt="Produtos restritivos Sweet Cheesecake"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-3/70 via-transparent to-transparent" />
            </div>
          </div>
          <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Produtos Restritivos</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.03] text-foreground sm:text-5xl">
              Sabor premium para diferentes estilos de vida.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
              Opções sem açúcar, sem glúten, sem lactose e low carb com o mesmo padrão de
              qualidade artesanal da marca.
            </p>
            <Button href="/categorias/restritivos" variant="secondary" className="mt-8">
              Explorar restritivos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StorePresence() {
  return (
    <section id="lojas" className="section-surface-2 relative overflow-hidden py-24">
      <SoftOrbs />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="max-w-xl font-display text-4xl leading-[1.05] text-foreground sm:text-5xl">
          Presença física com linguagem de marca.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {STORES.map((store) => (
            <Link
              key={store.slug}
              href={`/lojas/${store.slug}`}
              className="group glass-panel relative min-h-[52vh] overflow-hidden rounded-[2rem] p-2 transition-all hover:shadow-brand-hover"
            >
              <div className="relative h-full min-h-[50vh] overflow-hidden rounded-[1.6rem]">
                <Image
                  src={store.image}
                  alt={store.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-4/90 via-surface-2/15 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <h3 className="font-display text-2xl text-foreground">{store.name}</h3>
                  <p className="mt-2 text-xs text-foreground/75">{store.address}</p>
                  <p className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
                    <MapPin className="h-3.5 w-3.5" />
                    Ver unidade
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contato" className="section-surface-3 paper-texture relative overflow-hidden py-24">
      <div className="organic-orb -right-10 bottom-0 h-72 w-72 bg-primary/18" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="glass-panel-strong grid gap-8 rounded-[2.25rem] p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Contato</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] text-foreground">
              Fale com a Sweet Cheesecake
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-foreground/80">
              <li>WhatsApp: (31) 99999-0001</li>
              <li>Telefone: (31) 3333-0000</li>
              <li>Horário: Seg a Sáb, 8h às 20h</li>
              <li>Endereço: Av. Principal, 123 - Belo Horizonte</li>
            </ul>
            <Button href="/lojas" variant="action" className="mt-8">
              Como chegar
            </Button>
          </div>
          <div className="overflow-hidden rounded-[1.5rem] border border-primary/10 bg-surface-1">
            <iframe
              title="Mapa Sweet Cheesecake"
              src="https://maps.google.com/maps?q=Belo+Horizonte&t=&z=12&ie=UTF8&iwloc=&output=embed"
              className="h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section id="instagram" className="section-surface-4 relative overflow-hidden py-20">
      <SoftOrbs />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="glass-panel flex flex-col items-start justify-between gap-6 rounded-[2rem] p-7 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Instagram</p>
            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
              Acompanhe bastidores e novidades da vitrine.
            </h2>
          </div>
          <Button
            href="https://www.instagram.com/sweetcheesecakeoficial/"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            Abrir perfil oficial
          </Button>
        </div>
      </div>
    </section>
  );
}

export function ArtDirectedHome() {
  return (
    <>
      <CinematicHero />
      <EditorialManifesto />
      <SignatureGallery />
      <CategoryRunway />
      <ConversionAtelier />
      <RestrictiveShowcase />
      <StorePresence />
      <ContactSection />
      <InstagramSection />
    </>
  );
}
