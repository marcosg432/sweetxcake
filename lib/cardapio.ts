import cardapioData from "@/data/cardapio.json";

export type CatalogCategory = {
  id: string;
  slug: string;
  label: string;
  title: string;
  description: string;
};

export type CatalogProduct = {
  id: string;
  slug: string;
  categoryId: string;
  nome: string;
  descricaoCurta: string;
  preco: number;
  imagem: string;
  tags: string[];
  grupo?: string;
};

export const CATALOG_CATEGORIES = cardapioData.categories as CatalogCategory[];
export const CATALOG_PRODUCTS = cardapioData.products as CatalogProduct[];

/** Ordem fixa da barra (inclui Bolos como destino externo). */
export const CATALOG_NAV = [
  ...CATALOG_CATEGORIES.map((category) => ({
    id: category.id,
    slug: category.slug,
    label: category.label,
    kind: "scroll" as const,
  })),
  {
    id: "bolos",
    slug: "bolos",
    label: "Bolos",
    kind: "link" as const,
    href: "/categorias/bolos",
  },
] as const;

export function getProductsByCategory(categoryId: string) {
  return CATALOG_PRODUCTS.filter((product) => product.categoryId === categoryId);
}

export function searchCatalogProducts(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return CATALOG_PRODUCTS;

  return CATALOG_PRODUCTS.filter((product) => {
    const haystack = [
      product.nome,
      product.descricaoCurta,
      product.categoryId,
      ...product.tags,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

export function getCategoryById(categoryId: string) {
  return CATALOG_CATEGORIES.find((category) => category.id === categoryId);
}
