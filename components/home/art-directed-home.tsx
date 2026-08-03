import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { BrandLogo, BrandSignature, BrandWatermark } from "@/components/brand/brand-logo";
import { InstagramIcon } from "@/components/brand/instagram-link";
import { HomeHeroCarousel } from "@/components/home/home-hero-carousel";
import { TeamSection } from "@/components/home/team-section";
import { Button } from "@/components/ui/button";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, STORES } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

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
    <section
      id="home"
      className="section-surface-hero paper-texture relative min-h-[58svh] overflow-hidden lg:min-h-[64vh]"
    >
      <SoftOrbs />
      <BrandWatermark className="-right-8 top-14 sm:right-[8%] sm:top-20" />
      <div className="relative mx-auto grid min-h-[58svh] max-w-7xl items-center gap-5 px-5 py-8 sm:gap-6 sm:px-8 sm:py-10 lg:min-h-[64vh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-14">
        <div className="relative z-10 max-w-2xl">
          <h1 className="font-display text-[2.5rem] leading-[0.98] tracking-[-0.025em] text-foreground sm:text-6xl lg:text-7xl">
            Sabores que acolhem.
            <span className="block text-primary">Momentos que permanecem.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Descubra cafés especiais, doces artesanais e pratos preparados com
            carinho. Um cardápio pensado para surpreender em cada detalhe.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              href="/cardapio#salgados"
              variant="primary"
              className="px-5 py-3.5 sm:px-7"
            >
              Cardápio Cafeteria
            </Button>
            <Button
              href="/cardapio#bolos"
              variant="action"
              className="px-5 py-3.5 sm:px-7"
            >
              Catálogo de Bolos
            </Button>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[30rem] justify-self-center lg:max-w-[26rem] lg:justify-self-end">
          <HomeHeroCarousel />
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
        <div className="glass-panel relative grid gap-10 overflow-hidden rounded-[2.25rem] p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <BrandWatermark className="-bottom-10 -right-6 sm:-right-4" />
          <p className="relative z-10 font-display text-3xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
            Produzimos uma experiência com ritmo.
            <span className="block text-primary">Textura. Luz. Intenção.</span>
          </p>
          <div className="relative z-10 max-w-xl justify-self-end">
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              A Sweet Cheesecake nasceu para transformar produtos artesanais em uma experiência
              memorável. A cada detalhe, buscamos elegância, acolhimento e excelência.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <BrandLogo size="xs" tone="soft" />
              <p className="text-[11px] uppercase tracking-[0.22em] text-primary/80">
                Assinatura da casa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RestrictiveShowcase() {
  return (
    <section id="restritivos" className="section-surface-1 paper-texture relative overflow-hidden py-24">
      <div className="organic-orb left-[20%] top-10 h-64 w-64 bg-primary/16" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="glass-panel relative min-h-[52vh] overflow-hidden rounded-[2.25rem] p-2">
            <div className="relative h-full min-h-[52vh] overflow-hidden rounded-[1.85rem]">
              <Image
                src={IMAGES.categories.restritivos}
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
            <Button href="/cardapio#sobremesas" variant="secondary" className="mt-8">
              Explorar cardápio
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
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Lojas</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl">
            A única cafeteria do Vale do Aço com cardápio misto e inclusivo.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Três unidades em Ipatinga, com delícias clássicas e opções sem glúten,
            sem açúcar e sem leite ou derivados. Tudo preparado com cuidado para
            oferecer sabor, qualidade e segurança.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-3">
          {STORES.map((store) => (
            <article
              key={store.slug}
              className="glass-panel group flex h-full flex-col overflow-hidden rounded-[2rem] p-2 transition-all hover:shadow-brand-hover"
            >
              <div className="relative aspect-[16/11] shrink-0 overflow-hidden rounded-[1.6rem]">
                <Image
                  src={store.image}
                  alt={store.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>

              <div className="flex min-h-0 flex-1 flex-col px-5 pb-5 pt-5">
                <h3 className="font-display text-2xl text-foreground">{store.name}</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-muted">
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

function InstagramSection() {
  return (
    <section id="instagram" className="section-surface-4 relative overflow-hidden py-20">
      <SoftOrbs />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="glass-panel flex flex-col items-start justify-between gap-6 rounded-[2rem] p-7 sm:flex-row sm:items-center sm:p-10">
          <div className="flex items-start gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Sweet Cheesecake"
              className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-surface-0 text-primary shadow-[0_8px_24px_rgba(23,184,170,0.08)] transition-all hover:border-primary/35 hover:bg-primary/5"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Instagram</p>
              <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
                Acompanhe bastidores e novidades da vitrine.
              </h2>
              <p className="mt-2 text-sm text-muted">{INSTAGRAM_HANDLE}</p>
            </div>
          </div>
          <Button
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="inline-flex items-center gap-2"
          >
            <InstagramIcon className="h-4 w-4" />
            Seguir no Instagram
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
      <TeamSection />
      <BrandSignature className="py-2" />
      <RestrictiveShowcase />
      <BrandSignature className="py-2" />
      <StorePresence />
      <InstagramSection />
    </>
  );
}
