import {
  GUIDE_RESULT_VERSION,
  careSteps,
  hairTypes,
  needs,
  productCategories,
  tools,
} from "@/data";
import type { GuideResult } from "@/data";
import type { GuideSession } from "@/lib/storage";
import { matchProducts } from "@/lib/recommendations";

/** Build the snapshot future recommendation generation should read. */
export function buildGuideResult(session: GuideSession): GuideResult | null {
  if (!session.hairTypeId || !session.completedAt) return null;

  const hairType = hairTypes.find((item) => item.id === session.hairTypeId);
  if (!hairType) return null;

  const selectedNeeds = needs.filter((item) => session.needIds.includes(item.id));

  return {
    version: GUIDE_RESULT_VERSION,
    hairTypeId: hairType.id,
    hairType,
    needIds: selectedNeeds.map((item) => item.id),
    needs: selectedNeeds,
    careSystem: careSteps,
    productCategories,
    matchedProducts: matchProducts(
      hairType.id,
      selectedNeeds.map((item) => item.id),
    ),
    tools,
    tierId: session.tierId,
    personalRequested: session.personalRequested,
    completedAt: session.completedAt,
  };
}
