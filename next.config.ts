import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/lojas", destination: "/#lojas", permanent: false },
      { source: "/lojas/:slug", destination: "/#lojas", permanent: false },
      { source: "/promocoes", destination: "/cardapio", permanent: false },
      { source: "/contato", destination: "/#lojas", permanent: false },
      { source: "/instagram", destination: "/#instagram", permanent: false },
      { source: "/sobre", destination: "/#historia", permanent: false },
      { source: "/categorias", destination: "/cardapio", permanent: false },
      { source: "/carrinho", destination: "/", permanent: false },
      { source: "/finalizar", destination: "/", permanent: false },
      { source: "/busca", destination: "/cardapio", permanent: false },
      { source: "/categorias/cafeteria", destination: "/cardapio#bebidas", permanent: false },
      { source: "/categorias/lanches", destination: "/cardapio#salgados", permanent: false },
      { source: "/categorias/cheesecakes", destination: "/cardapio#sobremesas", permanent: false },
      { source: "/categorias/tortas", destination: "/cardapio#sobremesas", permanent: false },
      { source: "/categorias/bombons", destination: "/cardapio#sobremesas", permanent: false },
      { source: "/categorias/bebidas", destination: "/cardapio#bebidas", permanent: false },
      { source: "/categorias/restritivos", destination: "/cardapio#sobremesas", permanent: false },
    ];
  },
};

export default nextConfig;
