import bolosData from "@/data/bolos.json";
import bolosPpData from "@/data/bolos-pp.json";
import bolosPData from "@/data/bolos-p.json";
import bolosMData from "@/data/bolos-m.json";
import bolosGData from "@/data/bolos-g.json";
import { IMAGES } from "@/lib/images";

export type BoloIngrediente = {
  nome: string;
  emoji: string;
};

export type BoloTamanho = {
  nome: string;
  peso: string;
  fatias: string;
  preco: number;
};

export type Bolo = {
  id: string;
  slug: string;
  nome: string;
  imagem: string;
  descricaoCurta: string;
  descricao: string;
  ingredientes: BoloIngrediente[];
  tamanhos: BoloTamanho[];
};

export type CrossSellItem = {
  id: string;
  nome: string;
  imagem: string;
  preco: number;
  categoria: string;
};

const INGREDIENT_MAP: Array<{ match: RegExp; nome: string; emoji: string }> = [
  { match: /\bcoco\b/i, nome: "Coco", emoji: "🥥" },
  { match: /\babacaxi\b/i, nome: "Abacaxi", emoji: "🍍" },
  { match: /\bbrigadeiro\b/i, nome: "Brigadeiro", emoji: "🍫" },
  { match: /\bcheesecake\b/i, nome: "Cheesecake", emoji: "🧀" },
  { match: /\bchocolate\b/i, nome: "Chocolate", emoji: "🍫" },
  { match: /\bmorango\b/i, nome: "Morango", emoji: "🍓" },
  { match: /\bcereja\b/i, nome: "Cereja", emoji: "🍒" },
  { match: /\bninho\b/i, nome: "Leite Ninho", emoji: "🥛" },
  { match: /\bnutella\b|\bavel[aã]\b/i, nome: "Avelã", emoji: "🌰" },
  { match: /\bnata\b|\bchantilly\b/i, nome: "Nata", emoji: "🥛" },
  { match: /\bbaunilha\b/i, nome: "Baunilha", emoji: "🌿" },
  { match: /\bcream\s*cheese\b/i, nome: "Cream Cheese", emoji: "🧀" },
  { match: /\bcacau\b/i, nome: "Cacau", emoji: "🫘" },
  { match: /\bganache\b/i, nome: "Ganache", emoji: "✨" },
];

export const BOLOS = bolosData as Bolo[];
export const BOLOS_PP = bolosPpData as Bolo[];
export const BOLOS_P = bolosPData as Bolo[];
export const BOLOS_M = bolosMData as Bolo[];
export const BOLOS_G = bolosGData as Bolo[];

export const CROSS_SELL: CrossSellItem[] = [
  {
    id: "cs-espresso",
    nome: "Café Espresso",
    imagem: IMAGES.products.capuccino,
    preco: 8,
    categoria: "Cafeteria",
  },
  {
    id: "cs-capuccino",
    nome: "Capuccino",
    imagem: IMAGES.products.capuccino,
    preco: 14,
    categoria: "Cafeteria",
  },
  {
    id: "cs-cheesecake",
    nome: "Cheesecake",
    imagem: IMAGES.products.cheesecake,
    preco: 18,
    categoria: "Cheesecakes",
  },
  {
    id: "cs-frappuccino",
    nome: "Frappuccino",
    imagem: IMAGES.categories.bebidas,
    preco: 16,
    categoria: "Bebidas",
  },
  {
    id: "cs-croissant",
    nome: "Croissant",
    imagem: IMAGES.categories.lanches,
    preco: 12,
    categoria: "Lanches",
  },
  {
    id: "cs-cookies",
    nome: "Cookies",
    imagem: IMAGES.products.brownie,
    preco: 10,
    categoria: "Bombons",
  },
];

/** Extrai ingredientes principais a partir da descrição completa. */
export function extractIngredientesFromDescricao(descricao: string): BoloIngrediente[] {
  const found: BoloIngrediente[] = [];
  const seen = new Set<string>();

  for (const entry of INGREDIENT_MAP) {
    if (entry.match.test(descricao) && !seen.has(entry.nome)) {
      seen.add(entry.nome);
      found.push({ nome: entry.nome, emoji: entry.emoji });
    }
  }

  return found;
}

export function getBoloIngredientes(bolo: Bolo): BoloIngrediente[] {
  if (bolo.ingredientes?.length) return bolo.ingredientes;
  return extractIngredientesFromDescricao(bolo.descricao);
}

export function getPrecoApartirDe(bolo: Bolo): number {
  return Math.min(...bolo.tamanhos.map((t) => t.preco));
}

export function getRelatedBolos(currentId: string, limit = 6): Bolo[] {
  return BOLOS.filter((bolo) => bolo.id !== currentId).slice(0, limit);
}
