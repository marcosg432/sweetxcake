import { IMAGES } from "@/lib/images";

export const SITE_NAME = "Sweet Cheesecake";

export const INSTAGRAM_URL = "https://www.instagram.com/sweetcheesecakeoficial/";
export const INSTAGRAM_HANDLE = "@sweetcheesecakeoficial";

export const NAV_ITEMS = [
  { label: "Home", href: "/#home" },
] as const;

export const MENU_CATEGORIES = [
  { slug: "salgados", label: "Salgados", href: "/cardapio#salgados" },
  { slug: "bebidas", label: "Bebidas", href: "/cardapio#bebidas" },
  { slug: "sobremesas", label: "Sobremesas", href: "/cardapio#sobremesas" },
  { slug: "presentes", label: "Presentes", href: "/cardapio#presentes" },
  { slug: "bolos", label: "Bolos", href: "/categorias/bolos" },
] as const;

export const CATEGORIES = [
  {
    slug: "salgados",
    name: "Opções Salgadas",
    emoji: "🥪",
    description: "Sanduíches, tapiocas e lanches preparados na hora",
    image: IMAGES.categories.lanches,
    href: "/cardapio#salgados",
  },
  {
    slug: "bebidas",
    name: "Bebidas",
    emoji: "🥤",
    description: "Cafés especiais, quentes e geladas",
    image: IMAGES.categories.bebidas,
    href: "/cardapio#bebidas",
  },
  {
    slug: "sobremesas",
    name: "Sobremesas",
    emoji: "🍰",
    description: "Cheesecakes, potes, tortinhas e doces artesanais",
    image: IMAGES.categories.cheesecakes,
    href: "/cardapio#sobremesas",
  },
  {
    slug: "presentes",
    name: "Presentes",
    emoji: "🎁",
    description: "Kits e opções pensadas para presentear",
    image: IMAGES.categories.bombons,
    href: "/cardapio#presentes",
  },
  {
    slug: "bolos",
    name: "Bolos",
    emoji: "🎂",
    description: "Bolos artesanais com tamanhos e sabores exclusivos",
    image: IMAGES.categories.bolos,
    href: "/categorias/bolos",
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
    address: "Avenida Castelo Branco, 579 — Horto",
    hours: "Segunda a Sábado, de 11:00 às 19:00",
    whatsapp: "5531984687076",
    image: IMAGES.stores.orto,
  },
  {
    slug: "cidade-nobre",
    name: "Loja Cidade Nobre",
    address: "Avenida Simon Bolivar, 1185 — Cidade Nobre",
    hours: "Segunda a Sexta, de 11:00 às 19:00 / Sábado, de 11:00 às 14:00",
    whatsapp: "5531987950074",
    image: IMAGES.stores["cidade-nobre"],
  },
  {
    slug: "canaa",
    name: "Loja Canaã",
    address: "Avenida Selim José de Sales, 1012 — Canaã (Galeria Belmiro), Ipatinga-MG",
    hours: "Segunda a Sábado, de 11:00 às 19:00",
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
