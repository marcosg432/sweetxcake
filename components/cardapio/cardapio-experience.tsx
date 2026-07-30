import { ContinuousCatalog } from "@/components/catalog/continuous-catalog";

type CardapioExperienceProps = {
  initialCategory?: string;
};

export function CardapioExperience({
  initialCategory,
}: CardapioExperienceProps = {}) {
  return <ContinuousCatalog showIntro initialCategory={initialCategory} />;
}
