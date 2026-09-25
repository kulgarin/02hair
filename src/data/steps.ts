import type { GuideStepMeta } from "@/data/types";

export const guideSteps: GuideStepMeta[] = [
  { id: "hair-type", label: "Тип волос" },
  { id: "needs", label: "Потребности" },
  { id: "care", label: "Этапы ухода" },
  { id: "products", label: "Средства" },
  { id: "tools", label: "Инструменты" },
];

export const GUIDE_STEP_COUNT = guideSteps.length;
