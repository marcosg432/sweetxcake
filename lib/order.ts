export const FULFILLMENT_METHODS = [
  {
    id: "retirada",
    label: "Retirada",
    description: "Retire seu pedido na unidade escolhida.",
  },
  {
    id: "consumir-na-loja",
    label: "Consumir na loja",
    description: "Seu pedido será preparado para consumo no local.",
  },
  {
    id: "entrega",
    label: "Entrega",
    description: "A unidade confirmará endereço, prazo e taxa pelo WhatsApp.",
  },
] as const;

export type FulfillmentMethodId = (typeof FULFILLMENT_METHODS)[number]["id"];
