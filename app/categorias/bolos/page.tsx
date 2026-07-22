import type { Metadata } from "next";
import { BolosExperience } from "@/components/bolos/bolos-experience";

export const metadata: Metadata = {
  title: "Bolos Artesanais",
  description:
    "Bolos artesanais preparados diariamente com ingredientes selecionados e finalizados sob encomenda. Escolha tamanho, personalize e peça pelo WhatsApp.",
};

export default function BolosPage() {
  return <BolosExperience />;
}
