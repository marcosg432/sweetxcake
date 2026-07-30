import {
  CATALOG_CATEGORIES,
  CATALOG_PRODUCTS,
  type CatalogCategory,
} from "@/lib/cardapio";
import { BOLOS } from "@/lib/bolos";
import { getProductComplements } from "@/lib/product-complements";

export type ProductVariant = {
  id: string;
  label: string;
  price: number;
  details?: string;
};

export type ProductComplement = {
  id: string;
  name: string;
  price: number;
};

export type UnifiedCatalogProduct = {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  tags: string[];
  variants: ProductVariant[];
  complements: ProductComplement[];
  allowNotes: boolean;
  kind: "cafeteria" | "bolo";
};

export type UnifiedCatalogCategory = CatalogCategory;

type ConfigurableCatalogProduct = (typeof CATALOG_PRODUCTS)[number] & {
  descricao?: string;
  variacoes?: ProductVariant[];
  complementos?: ProductComplement[];
  permiteObservacoes?: boolean;
};

type ConfigurableBolo = (typeof BOLOS)[number] & {
  complementos?: ProductComplement[];
};

const cafeteriaProducts: UnifiedCatalogProduct[] = CATALOG_PRODUCTS.map((entry) => {
  const product = entry as ConfigurableCatalogProduct;
  return {
    id: product.id,
    slug: product.slug,
    categoryId: product.categoryId,
    name: product.nome,
    shortDescription: product.descricaoCurta,
    description: product.descricao ?? product.descricaoCurta,
    image: product.imagem,
    tags: product.tags,
    variants: product.variacoes?.length
      ? product.variacoes
      : [{ id: "unico", label: "Único", price: product.preco }],
    complements: product.complementos ?? getProductComplements(product.id),
    allowNotes: product.permiteObservacoes ?? true,
    kind: "cafeteria",
  };
});

const cakeProducts: UnifiedCatalogProduct[] = BOLOS.map((entry) => {
  const bolo = entry as ConfigurableBolo;
  return {
    id: bolo.id,
    slug: bolo.slug,
    categoryId: "bolos",
    name: bolo.nome,
    shortDescription: bolo.descricaoCurta,
    description: bolo.descricao,
    image: bolo.imagem,
    tags: bolo.ingredientes.map((ingredient) => ingredient.nome),
    variants: bolo.tamanhos.map((size) => ({
      id: size.nome.toLowerCase(),
      label: size.nome,
      price: size.preco,
      details: `${size.peso} · ${size.fatias}`,
    })),
    complements: bolo.complementos ?? [],
    allowNotes: true,
    kind: "bolo",
  };
});

const cakesCategory: UnifiedCatalogCategory = {
  id: "bolos",
  slug: "bolos",
  label: "Bolos",
  title: "Catálogo de Bolos",
  description: "Bolos artesanais com tamanhos PP, P, M e G.",
};

export const UNIFIED_CATALOG_CATEGORIES: UnifiedCatalogCategory[] = [
  ...CATALOG_CATEGORIES,
  cakesCategory,
];

export const UNIFIED_CATALOG_PRODUCTS: UnifiedCatalogProduct[] = [
  ...cafeteriaProducts,
  ...cakeProducts,
];

export const UNIFIED_CATALOG_NAV = UNIFIED_CATALOG_CATEGORIES.map(
  ({ id, slug, label }) => ({ id, slug, label })
);

export function getProductStartingPrice(product: UnifiedCatalogProduct) {
  return Math.min(...product.variants.map((variant) => variant.price));
}

export function searchUnifiedCatalog(query: string) {
  const normalized = query.trim().toLocaleLowerCase("pt-BR");
  if (!normalized) return UNIFIED_CATALOG_PRODUCTS;

  return UNIFIED_CATALOG_PRODUCTS.filter((product) =>
    [
      product.name,
      product.shortDescription,
      product.description,
      product.categoryId,
      ...product.tags,
    ]
      .join(" ")
      .toLocaleLowerCase("pt-BR")
      .includes(normalized)
  );
}
