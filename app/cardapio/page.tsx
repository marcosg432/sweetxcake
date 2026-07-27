import type { Metadata } from "next";
import { CardapioExperience } from "@/components/cardapio";

export const metadata: Metadata = {
  title: "Cardápio",
  description:
    "Cardápio completo Sweet Cheesecake: salgados, bebidas, sobremesas e presentes. Monte seu pedido e finalize no WhatsApp.",
};

export default function CardapioPage() {
  return <CardapioExperience />;
}
