import Link from "next/link";
import { AtSign, MapPin, MessageCircle } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-surface-4 paper-texture">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl text-primary">{SITE_NAME}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            Catálogo inteligente multilojas. Uma experiência premium para descobrir,
            escolher e pedir com praticidade — direto no WhatsApp da unidade mais
            próxima.
          </p>
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
              <Link href="/#cardapio" className="text-sm text-muted transition-colors hover:text-primary">
                Cardápio
              </Link>
            </li>
            <li>
              <Link href="/lojas" className="text-sm text-muted transition-colors hover:text-primary">
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
            <li className="flex items-center gap-2">
              <AtSign className="h-4 w-4 text-primary" />
              <a
                href="https://www.instagram.com/sweetcheesecakeoficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                @sweetcheesecakeoficial
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              3 unidades em Belo Horizonte
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary/10 px-4 py-6 text-center text-xs text-muted sm:px-6 lg:px-8">
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
