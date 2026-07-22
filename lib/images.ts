export const IMAGES = {
  brand: {
    logo: "/images/brand/logo-sweet-cheesecake.png",
  },
  team: [
    "/images/team/team-01.png",
    "/images/team/team-02.png",
    "/images/team/team-03.png",
    "/images/team/team-04.png",
    "/images/team/team-05.png",
  ],
  hero: "/images/hero/hero-banner.png",
  homeCarousel: [
    "/images/home/carousel/hero-01.png",
    "/images/home/carousel/hero-02.png",
    "/images/home/carousel/hero-03.png",
    "/images/home/carousel/hero-04.png",
    "/images/home/carousel/hero-05.png",
    "/images/home/carousel/hero-06.png",
  ],
  bolosHero: [
    "/images/bolos/hero/hero-01.png",
    "/images/bolos/hero/hero-02.png",
    "/images/bolos/hero/hero-03.png",
    "/images/bolos/hero/hero-04.png",
    "/images/bolos/hero/hero-05.png",
    "/images/bolos/hero/hero-06.png",
  ],
  categories: {
    cafeteria: "/images/categories/category-cafeteria.png",
    bolos: "/images/categories/category-bolos-v2.png",
    cheesecakes: "/images/categories/category-cheesecakes.png",
    tortas: "/images/categories/category-tortas.png",
    lanches: "/images/categories/category-lanches.png",
    bombons: "/images/categories/category-bombons.png",
    bebidas: "/images/categories/category-bebidas.png",
    restritivos: "/images/categories/category-restritivos-pistache.png",
  },
  products: {
    brownie: "/images/products/product-brownie.png",
    cheesecake: "/images/products/product-cheesecake.png",
    capuccino: "/images/products/product-capuccino.png",
    bolo: "/images/products/product-bolo.png",
    bolos: {
      pinaColada: "/images/products/bolos/bolo-pina-colada.png",
      sergiosCake: "/images/products/bolos/bolo-sergios-cake.png",
      clarissa: "/images/products/bolos/bolo-clarissa.png",
      pistache: "/images/products/bolos/bolo-pistache.png",
      chocolatudo: "/images/products/bolos/bolo-chocolatudo.png",
      redVelvet: "/images/products/bolos/bolo-red-velvet.png",
      doisAmores: "/images/products/bolos/bolo-dois-amores.png",
      ninhoNutella: "/images/products/bolos/bolo-ninho-nutella.png",
    },
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
