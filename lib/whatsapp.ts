import type { CartItem } from "@/stores/cart-store";

export function buildWhatsAppOrderMessage(items: CartItem[], storeName: string) {
  const lines = items.map((item) => {
    const obs = item.observations ? `\n  Obs: ${item.observations}` : "";
    return `• ${item.quantity}x ${item.name} — R$ ${(item.price * item.quantity)
      .toFixed(2)
      .replace(".", ",")}${obs}`;
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return [
    "Olá!",
    "Gostaria de fazer este pedido.",
    "",
    ...lines,
    "",
    `Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}`,
    `Unidade: ${storeName}`,
  ].join("\n");
}

export function openWhatsApp(phone: string, message: string) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
