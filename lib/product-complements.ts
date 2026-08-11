import type { ProductComplement } from "@/lib/unified-catalog";

export const COMPLEMENT_GROUPS: Record<string, ProductComplement[]> = {
  "monte-seu-sanduiche": [
    { id: "bacon", name: "Bacon", price: 3 },
    { id: "queijo", name: "Queijo", price: 5 },
    { id: "catupiry", name: "Catupiry", price: 4 },
    { id: "alface", name: "Alface", price: 0 },
    { id: "tomate", name: "Tomate", price: 0 },
    { id: "molho-especial", name: "Molho especial", price: 2 },
  ],
  "cobertura-cheesecake-ny": [
    {
      id: "geleia-morango",
      name: "Geleia artesanal de morango",
      price: 0,
    },
    { id: "caramelo-salgado", name: "Caramelo salgado", price: 0 },
    { id: "ganache-chocolate", name: "Ganache de chocolate", price: 0 },
    { id: "churros", name: "Churros", price: 0 },
  ],
};

const PRODUCT_COMPLEMENT_GROUPS: Record<string, string[]> = {
  "cheesecake-pistache-cerejas-new-york": ["cobertura-cheesecake-ny"],
};

export function getProductComplements(productId: string) {
  const groupIds = PRODUCT_COMPLEMENT_GROUPS[productId] ?? [];
  return groupIds.flatMap((groupId) => COMPLEMENT_GROUPS[groupId] ?? []);
}
