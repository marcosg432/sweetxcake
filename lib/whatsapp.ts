import type { CartItem } from "@/stores/cart-store";

export function buildWhatsAppOrderMessage(
  items: CartItem[],
  storeName: string,
  fulfillmentMethod?: string
) {
  const lines = items.map((item) => {
    const details: string[] = [];
    if (item.variant) {
      details.push(
        `  Variação: ${item.variant.name}${item.variant.details ? ` · ${item.variant.details}` : ""}`
      );
    }
    for (const complement of item.complements ?? []) {
      const priceLabel =
        complement.price > 0
          ? ` (+R$ ${complement.price.toFixed(2).replace(".", ",")})`
          : "";
      details.push(`  + ${complement.name}${priceLabel}`);
    }
    const notes = item.notes ?? item.observations;
    if (notes) details.push(`  Obs: ${notes}`);

    const total = (item.price * item.quantity).toFixed(2).replace(".", ",");
    return [`• ${item.quantity}x ${item.name} — R$ ${total}`, ...details].join("\n");
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return [
    "Olá!",
    "Gostaria de fazer este pedido.",
    "",
    ...lines,
    "",
    `Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}`,
    fulfillmentMethod ? `Forma de recebimento: ${fulfillmentMethod}` : null,
    `Unidade: ${storeName}`,
    `Total: R$ ${subtotal.toFixed(2).replace(".", ",")}`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

export function openWhatsApp(phone: string, message: string) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return window.open(url, "_blank", "noopener,noreferrer");
}
