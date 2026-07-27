import { redirect } from "next/navigation";

const LEGACY_CATEGORY_REDIRECTS: Record<string, string> = {
  cafeteria: "/cardapio#bebidas",
  lanches: "/cardapio#salgados",
  cheesecakes: "/cardapio#sobremesas",
  tortas: "/cardapio#sobremesas",
  bombons: "/cardapio#sobremesas",
  bebidas: "/cardapio#bebidas",
  restritivos: "/cardapio#sobremesas",
  salgados: "/cardapio#salgados",
  sobremesas: "/cardapio#sobremesas",
  presentes: "/cardapio#presentes",
};

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(LEGACY_CATEGORY_REDIRECTS[slug] ?? "/cardapio");
}
