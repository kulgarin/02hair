import { brands, expertTips, productCategories, products } from "@/data";
import type { ExpertTip, Product, ResolvedProduct } from "@/data";

function scoreProduct(
  product: Product,
  hairTypeId: string,
  needIds: string[],
): number | null {
  const hairOk =
    product.hairTypeIds.length === 0 || product.hairTypeIds.includes(hairTypeId);
  const needOk =
    product.needIds.length === 0 ||
    product.needIds.some((id) => needIds.includes(id));

  if (!hairOk || !needOk) return null;

  let score = 1;
  if (product.hairTypeIds.includes(hairTypeId)) score += 3;
  const overlap = product.needIds.filter((id) => needIds.includes(id)).length;
  score += Math.min(overlap, 2) * 2;
  return score;
}

/** One example product per category, preferring hair-type and need bindings. */
export function matchProducts(
  hairTypeId: string,
  needIds: string[],
): ResolvedProduct[] {
  const resolved: ResolvedProduct[] = [];

  for (const category of productCategories) {
    const inCategory = products.filter((product) => product.categoryId === category.id);
    if (inCategory.length === 0) continue;

    const ranked = inCategory
      .map((product) => ({
        product,
        score: scoreProduct(product, hairTypeId, needIds),
      }))
      .filter((item): item is { product: Product; score: number } => item.score !== null)
      .sort((a, b) => b.score - a.score);

    const chosen = ranked[0]?.product ?? inCategory[0];
    const brand = brands.find((item) => item.id === chosen.brandId);
    if (!brand) continue;

    resolved.push({ product: chosen, brand, category });
  }

  return resolved;
}

/** Pro tips whose hair type and needs all apply to this person. */
export function matchTips(hairTypeId: string, needIds: string[]): ExpertTip[] {
  return expertTips.filter((tip) => {
    const hairOk =
      tip.hairTypeIds.length === 0 || tip.hairTypeIds.includes(hairTypeId);
    const needOk =
      tip.needIds.length === 0 || tip.needIds.every((id) => needIds.includes(id));
    return hairOk && needOk;
  });
}
