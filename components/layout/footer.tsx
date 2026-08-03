import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { InstagramTextLink } from "@/components/brand/instagram-link";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-surface-4 paper-texture">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">
            Bem-vindos à
          </p>
          <div className="flex items-center gap-3">
            <BrandLogo size="md" className="h-12 w-12" />
            <p className="font-display text-2xl text-primary">{SITE_NAME}!</p>
          </div>
          <div className="mt-5 max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
            <p>
              Temos muito orgulho em ser a única cafeteria do Vale do Aço com um
              cardápio misto e inclusivo. Aqui, unimos tradição e inovação para
              oferecer opções para todos os gostos e necessidades.
            </p>
            <p>
              Além das clássicas delícias feitas com trigo, leite e açúcar, também
              contamos com um cardápio especial, repleto de opções sem glúten, sem
              açúcar e sem leite ou derivados. Tudo preparado com o máximo de cuidado
              para garantir sabor, qualidade e segurança, em uma cozinha adaptada para
              evitar contaminação cruzada.
            </p>
            <p>
              Nosso compromisso é proporcionar experiências incríveis para todos.
              Esperamos surpreender você.
            </p>
          </div>
          <div className="mt-5">
            <InstagramTextLink />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-primary">Navegação</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/#home" className="text-sm text-muted transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/cardapio#salgados" className="text-sm text-muted transition-colors hover:text-primary">
                Cardápio Cafeteria
              </Link>
            </li>
            <li>
              <Link href="/cardapio#bolos" className="text-sm text-muted transition-colors hover:text-primary">
                Catálogo de Bolos
              </Link>
            </li>
            <li>
              <Link href="/#historia" className="text-sm text-muted transition-colors hover:text-primary">
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/#lojas" className="text-sm text-muted transition-colors hover:text-primary">
                Lojas
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-primary">Contato</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              WhatsApp disponível em todas as lojas
            </li>
            <li>
              <InstagramTextLink />
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              3 unidades em Ipatinga-MG
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary/10 px-4 py-6 text-center text-xs text-muted sm:px-6 lg:px-8">
        <div className="mb-3 flex justify-center">
          <BrandLogo size="xs" tone="soft" className="h-6 w-6 opacity-50" />
        </div>
        <p>
          © {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.
        </p>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/politica-privacidade" className="transition-colors hover:text-primary">
            Política de Privacidade
          </Link>
          <Link href="/termos" className="transition-colors hover:text-primary">
            Termos de Uso
          </Link>
        </div>
      </div>
    </footer>
  );
}
