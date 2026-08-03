import { ContinuousCatalog } from "@/components/catalog/continuous-catalog";
import { CatalogConversionAtelier } from "@/components/cardapio/conversion-atelier";

type CardapioExperienceProps = {
  initialCategory?: string;
};

export function CardapioExperience({
  initialCategory,
}: CardapioExperienceProps = {}) {
  return (
    <>
      <ContinuousCatalog showIntro initialCategory={initialCategory} />
      <CatalogConversionAtelier />
    </>
  );
}
