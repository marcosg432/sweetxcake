export const IMAGES = {
  hero: "/images/hero/hero-banner.png",
  categories: {
    cafeteria: "/images/categories/category-cafeteria.png",
    bolos: "/images/categories/category-bolos.png",
    cheesecakes: "/images/categories/category-cheesecakes.png",
    tortas: "/images/categories/category-tortas.png",
    lanches: "/images/categories/category-lanches.png",
    bombons: "/images/categories/category-bombons.png",
    bebidas: "/images/categories/category-bebidas.png",
    restritivos: "/images/categories/category-restritivos.png",
  },
  products: {
    brownie: "/images/products/product-brownie.png",
    cheesecake: "/images/products/product-cheesecake.png",
    capuccino: "/images/products/product-capuccino.png",
    bolo: "/images/products/product-bolo.png",
  },
  promotions: {
    banner: "/images/promotions/promo-banner.png",
  },
  stores: {
    orto: "/images/stores/store-orto.png",
    "cidade-nobre": "/images/stores/store-cidade-nobre.png",
    canaa: "/images/stores/store-canaa.png",
  },
  reviews: {
    "1": "/images/reviews/review-1.png",
    "2": "/images/reviews/review-2.png",
    "3": "/images/reviews/review-3.png",
  },
  pages: {
    contact: "/images/pages/contact-hero.png",
    about: "/images/pages/about-hero.png",
  },
} as const;

export function getCategoryImage(slug: string) {
  return IMAGES.categories[slug as keyof typeof IMAGES.categories] ?? IMAGES.hero;
}

export function getStoreImage(slug: string) {
  return IMAGES.stores[slug as keyof typeof IMAGES.stores] ?? IMAGES.pages.contact;
}

export function getReviewImage(id: string) {
  return IMAGES.reviews[id as keyof typeof IMAGES.reviews] ?? IMAGES.reviews["1"];
}
