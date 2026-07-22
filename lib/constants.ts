import { IMAGES } from "@/lib/images";

export const SITE_NAME = "Sweet Cheesecake";

export const INSTAGRAM_URL = "https://www.instagram.com/sweetcheesecakeoficial/";
export const INSTAGRAM_HANDLE = "@sweetcheesecakeoficial";

export const NAV_ITEMS = [
  { label: "Home", href: "/#home" },
] as const;

export const MENU_CATEGORIES = [
  { slug: "cafeteria", label: "☕ Cafeteria", href: "/categorias/cafeteria" },
  { slug: "bolos", label: "🎂 Bolos", href: "/categorias/bolos" },
  { slug: "cheesecakes", label: "🍰 Cheesecakes", href: "/categorias/cheesecakes" },
  { slug: "tortas", label: "🥧 Tortas", href: "/categorias/tortas" },
  { slug: "lanches", label: "🥪 Lanches", href: "/categorias/lanches" },
  { slug: "bombons", label: "🍫 Bombons", href: "/categorias/bombons" },
  { slug: "bebidas", label: "🥤 Bebidas", href: "/categorias/bebidas" },
  { slug: "restritivos", label: "🌱 Produtos Restritivos", href: "/categorias/restritivos" },
] as const;

export const CATEGORIES = [
  {
    slug: "cafeteria",
    name: "Cafeteria",
    emoji: "☕",
    description: "Cafés, capuccinos e combos",
    image: IMAGES.categories.cafeteria,
  },
  {
    slug: "bolos",
    name: "Bolos",
    emoji: "🎂",
    description: "Bolos artesanais para cada ocasião",
    image: IMAGES.categories.bolos,
  },
  {
    slug: "cheesecakes",
    name: "Cheesecakes",
    emoji: "🍰",
    description: "Cremosos e irresistíveis",
    image: IMAGES.categories.cheesecakes,
  },
  {
    slug: "tortas",
    name: "Tortas",
    emoji: "🥧",
    description: "Clássicas e especiais",
    image: IMAGES.categories.tortas,
  },
  {
    slug: "lanches",
    name: "Lanches",
    emoji: "🥪",
    description: "Salgados e petiscos",
    image: IMAGES.categories.lanches,
  },
  {
    slug: "bombons",
    name: "Bombons",
    emoji: "🍫",
    description: "Chocolates finos",
    image: IMAGES.categories.bombons,
  },
  {
    slug: "bebidas",
    name: "Bebidas",
    emoji: "🥤",
    description: "Refrescantes e especiais",
    image: IMAGES.categories.bebidas,
  },
  {
    slug: "restritivos",
    name: "Produtos Restritivos",
    emoji: "🌱",
    description: "Sem açúcar, glúten, lactose e mais",
    image: IMAGES.categories.restritivos,
  },
] as const;

export const FEATURED_PRODUCTS = [
  {
    id: "1",
    slug: "brownie-tradicional",
    name: "Brownie Tradicional",
    price: 12,
    category: "Bombons",
    image: IMAGES.products.brownie,
  },
  {
    id: "2",
    slug: "cheesecake-frutas-vermelhas",
    name: "Cheesecake Frutas Vermelhas",
    price: 18,
    category: "Cheesecakes",
    image: IMAGES.products.cheesecake,
  },
  {
    id: "3",
    slug: "capuccino-especial",
    name: "Capuccino Especial",
    price: 14,
    category: "Cafeteria",
    image: IMAGES.products.capuccino,
  },
  {
    id: "4",
    slug: "bolo-chocolate-belga",
    name: "Bolo Chocolate Belga",
    price: 89,
    category: "Bolos",
    image: IMAGES.products.bolo,
  },
] as const;

export const STORES = [
  {
    slug: "horto",
    name: "Loja Horto",
    address: "Av. Principal, 123 — Horto",
    hours: "Seg a Sáb, 8h às 20h",
    whatsapp: "5531984687076",
    image: IMAGES.stores.orto,
  },
  {
    slug: "cidade-nobre",
    name: "Loja Cidade Nobre",
    address: "Rua das Flores, 456 — Cidade Nobre",
    hours: "Seg a Sáb, 8h às 20h",
    whatsapp: "5531987950074",
    image: IMAGES.stores["cidade-nobre"],
  },
  {
    slug: "canaa",
    name: "Loja Canaã",
    address: "Praça Central, 789 — Canaã",
    hours: "Seg a Dom, 9h às 21h",
    whatsapp: "5531988112503",
    image: IMAGES.stores.canaa,
  },
] as const;

export const REVIEWS = [
  {
    id: "1",
    author: "Mariana S.",
    rating: 5,
    comment: "O melhor cheesecake da cidade. Atendimento impecável e entrega rápida!",
    image: IMAGES.reviews["1"],
  },
  {
    id: "2",
    author: "Carlos R.",
    rating: 5,
    comment: "Finalmente um catálogo organizado. Fiz o pedido em minutos pelo WhatsApp.",
    image: IMAGES.reviews["2"],
  },
  {
    id: "3",
    author: "Ana Paula L.",
    rating: 5,
    comment: "Produtos restritivos bem separados. Facilitou muito para minha família.",
    image: IMAGES.reviews["3"],
  },
] as const;
