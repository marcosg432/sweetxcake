import {
  CATALOG_CATEGORIES,
  CATALOG_PRODUCTS,
  type CatalogCategory,
} from "@/lib/cardapio";
import {
  BOLOS,
  BOLOS_CASEIRINHOS,
  BOLOS_RESTRITIVOS,
  BOLOS_G,
  BOLOS_M,
  BOLOS_P,
  BOLOS_PP,
  type Bolo,
} from "@/lib/bolos";
import { getProductComplementGroups, getProductComplements } from "@/lib/product-complements";

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
  details?: string;
};

export type ProductComplementGroup = {
  id: string;
  title: string;
  hint?: string;
  min?: number;
  max?: number;
  options: ProductComplement[];
};

export type UnifiedCatalogProduct = {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  images: string[];
  tags: string[];
  group?: string;
  variants: ProductVariant[];
  complements: ProductComplement[];
  complementGroups: ProductComplementGroup[];
  allowNotes: boolean;
  kind: "cafeteria" | "bolo";
  restritivo?: boolean;
};

export type UnifiedCatalogCategory = CatalogCategory;

type ConfigurableCatalogProduct = (typeof CATALOG_PRODUCTS)[number] & {
  descricao?: string;
  imagens?: string[];
  variacoes?: ProductVariant[];
  complementos?: ProductComplement[];
  permiteObservacoes?: boolean;
};

type ConfigurableBolo = Bolo & {
  complementos?: ProductComplement[];
};

const ppCakeComplements: ProductComplement[] = [
  {
    id: "cobertura-extra-bolo-pp",
    name: "Cobertura extra bolo PP",
    price: 15,
  },
];

const pCakeComplements: ProductComplement[] = [
  {
    id: "cobertura-extra-bolo-p",
    name: "Cobertura extra bolo P",
    price: 20,
  },
];

const mCakeComplements: ProductComplement[] = [
  {
    id: "cobertura-extra-bolo-m",
    name: "Cobertura extra bolo M",
    price: 25,
  },
];

const gCakeComplements: ProductComplement[] = [
  {
    id: "cobertura-extra-bolo-g",
    name: "Cobertura extra bolo G",
    price: 40,
  },
];

const cafeteriaProducts: UnifiedCatalogProduct[] = CATALOG_PRODUCTS.map((entry) => {
  const product = entry as ConfigurableCatalogProduct;
  const images =
    product.imagens?.length ? product.imagens : [product.imagem];
  return {
    id: product.id,
    slug: product.slug,
    categoryId: product.categoryId,
    name: product.nome,
    shortDescription: product.descricaoCurta,
    description: product.descricao ?? product.descricaoCurta,
    image: images[0],
    images,
    tags: product.tags,
    group: product.grupo,
    variants: product.variacoes?.length
      ? product.variacoes
      : [{ id: "unico", label: "Único", price: product.preco }],
    complements: product.complementos ?? getProductComplements(product.id),
    complementGroups: product.complementos?.length
      ? [
          {
            id: `${product.id}-complementos`,
            title: "Complementos",
            options: product.complementos,
          },
        ]
      : getProductComplementGroups(product.id),
    allowNotes: product.permiteObservacoes ?? true,
    kind: "cafeteria",
  };
});

const standardCakesWithoutCustomizedSizes = BOLOS.map((bolo) => ({
  ...bolo,
  tamanhos: bolo.tamanhos.filter(
    (size) =>
      !["caseirinhos", "restritivos", "pp", "p", "m", "g"].includes(
        size.nome.toLowerCase()
      )
  ),
})).filter((bolo) => bolo.tamanhos.length > 0);

const cakeProducts: UnifiedCatalogProduct[] = [
  ...standardCakesWithoutCustomizedSizes,
  ...BOLOS_CASEIRINHOS,
  ...BOLOS_RESTRITIVOS,
  ...BOLOS_PP,
  ...BOLOS_P,
  ...BOLOS_M,
  ...BOLOS_G,
].map((entry) => {
  const bolo = entry as ConfigurableBolo;
  const exclusiveSize =
    bolo.tamanhos.length === 1 ? bolo.tamanhos[0].nome.toLowerCase() : null;
  const images = bolo.imagens?.length ? bolo.imagens : [bolo.imagem];
  return {
    id: bolo.id,
    slug: bolo.slug,
    categoryId: "bolos",
    name: bolo.nome,
    shortDescription: bolo.descricaoCurta,
    description: bolo.descricao,
    image: images[0],
    images,
    tags: [
      ...bolo.ingredientes.map((ingredient) => ingredient.nome),
      ...(bolo.restritivo ? ["Restritivo"] : []),
    ],
    variants: bolo.tamanhos.map((size) => ({
      id: size.nome.toLowerCase(),
      label: size.nome,
      price: size.preco,
      details:
        size.peso === size.fatias ? size.peso : `${size.peso} · ${size.fatias}`,
    })),
    complements:
      bolo.complementos ??
      (getProductComplements(bolo.id).length
        ? getProductComplements(bolo.id)
        : exclusiveSize === "pp"
          ? ppCakeComplements
          : exclusiveSize === "p"
            ? pCakeComplements
            : exclusiveSize === "m"
              ? mCakeComplements
              : exclusiveSize === "g"
                ? gCakeComplements
                : []),
    complementGroups: (() => {
      const customGroups = getProductComplementGroups(bolo.id);
      if (bolo.complementos?.length) {
        return [
          {
            id: `${bolo.id}-complementos`,
            title: "Complementos",
            options: bolo.complementos,
          },
        ];
      }
      if (customGroups.length) return customGroups;
      const options =
        exclusiveSize === "pp"
          ? ppCakeComplements
          : exclusiveSize === "p"
            ? pCakeComplements
            : exclusiveSize === "m"
              ? mCakeComplements
              : exclusiveSize === "g"
                ? gCakeComplements
                : [];
      return options.length
        ? [
            {
              id: `${bolo.id}-complementos`,
              title: "Complementos",
              options,
            },
          ]
        : [];
    })(),
    allowNotes: true,
    kind: "bolo",
    restritivo: Boolean(bolo.restritivo),
  };
});

const cakesCategory: UnifiedCatalogCategory = {
  id: "bolos",
  slug: "bolos",
  label: "Bolos",
  title: "Catálogo de Bolos",
  description: "Bolos artesanais com caseirinhos, opções restritivas e tamanhos PP, P, M e G.",
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
      product.group,
      ...product.tags,
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase("pt-BR")
      .includes(normalized)
  );
}
