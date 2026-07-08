import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) notFound();

  return (
    <div className="bg-background">
      <div className="relative mx-auto aspect-[21/8] max-w-7xl overflow-hidden px-4 pt-8 sm:px-6 lg:px-8">
        <div className="relative h-full min-h-[220px] overflow-hidden rounded-3xl">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <p className="text-3xl">{category.emoji}</p>
            <h1 className="mt-2 font-display text-4xl text-foreground">{category.name}</h1>
            <p className="mt-3 max-w-2xl text-muted">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="rounded-2xl border border-dashed border-primary/15 bg-background p-8 text-center text-muted">
          Produtos desta categoria serão exibidos aqui em breve.
        </p>
        <Link href="/#cardapio" className="mt-6 inline-block text-sm text-primary hover:underline">
          ← Voltar às categorias
        </Link>
      </div>
    </div>
  );
}
