import type { Need } from "@/data/types";

/** Needs on step 2. Nutrition, moisture, and repair stay distinct on purpose. */
export const needs: Need[] = [
  {
    id: "nutrition",
    name: "Питание",
    explanation:
      "Восполняет липиды и делает стержень плотнее. Это сытость волоса, а не вода.",
  },
  {
    id: "moisture",
    name: "Увлажнение",
    explanation:
      "Удерживает воду внутри. От него мягкость и эластичность, а не масляная плёнка.",
  },
  {
    id: "repair",
    name: "Восстановление",
    explanation:
      "Для повреждённых участков: окрашивание, раскрытая кутикула, ломкие зоны.",
  },
  {
    id: "protection",
    name: "Защита",
    explanation: "Барьер перед термоукладкой, солнцем, солью и трением.",
  },
  {
    id: "smoothness",
    name: "Гладкость",
    explanation: "Приглаживает кутикулу, чтобы пряди меньше цеплялись друг за друга.",
  },
  {
    id: "shine",
    name: "Блеск",
    explanation: "Выравнивает поверхность: свет отражается ровнее.",
  },
  {
    id: "less-breakage",
    name: "Уменьшение ломкости",
    explanation: "Снижает обламывание по длине и на концах.",
  },
  {
    id: "frizz-control",
    name: "Контроль пушистости",
    explanation: "Усмиряет торчащие чешуйки, не склеивая волосы.",
  },
  {
    id: "root-volume",
    name: "Объём у корней",
    explanation: "Лёгкость и прикорневой подъём без жёсткого стайлинга.",
  },
  {
    id: "scalp-comfort",
    name: "Комфорт кожи головы",
    explanation: "Если есть стянутость, зуд или корни быстро становятся тяжёлыми.",
  },
];
