import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/lojas", destination: "/#lojas", permanent: false },
      { source: "/lojas/:slug", destination: "/#lojas", permanent: false },
      { source: "/promocoes", destination: "/#cardapio", permanent: false },
      { source: "/contato", destination: "/#lojas", permanent: false },
      { source: "/instagram", destination: "/#instagram", permanent: false },
      { source: "/sobre", destination: "/#historia", permanent: false },
      { source: "/categorias", destination: "/#cardapio", permanent: false },
      { source: "/carrinho", destination: "/", permanent: false },
      { source: "/finalizar", destination: "/", permanent: false },
      { source: "/busca", destination: "/#cardapio", permanent: false },
    ];
  },
};

export default nextConfig;
