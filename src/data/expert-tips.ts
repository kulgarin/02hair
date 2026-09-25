import type { ExpertTip } from "@/data/types";

/**
 * Extra tips for the Pro tier.
 * Scope them with hairTypeIds and needIds. Empty arrays mean the tip fits everyone.
 * Karina can add, rewrite, or narrow these without changing the screen.
 */
export const expertTips: ExpertTip[] = [
  {
    id: "straight-roots",
    title: "Прямые: объём живёт у корней",
    body: "Масла и плотные бальзамы оставляйте на длине. Если они попадают на корни, прикорневой объём пропадает до следующего мытья.",
    hairTypeIds: ["straight"],
    needIds: [],
  },
  {
    id: "curly-hands",
    title: "Кудри: ладони вместо сухой расчёски",
    body: "Завиток распределяйте ладонями на влажных волосах. Сухие кудри расчёска разбивает в пух. Начинайте распутывать с концов.",
    hairTypeIds: ["curly"],
    needIds: [],
  },
  {
    id: "porous-damp",
    title: "Пористые: уход на влажные волосы",
    body: "Пока волос влажный, средство проходит глубже. На сухие пористые волосы тот же уход часто остаётся плёнкой и утяжеляет.",
    hairTypeIds: ["porous"],
    needIds: [],
  },
  {
    id: "glassy-warmth",
    title: "Стекловидные: тёплый компресс, не жар в упор",
    body: "Плотной кутикуле помогает 10 минут маски под шапочкой. Горячий фен, прижатый к волосу, блеск не усилит — только пересушит поверхность.",
    hairTypeIds: ["glassy"],
    needIds: [],
  },
  {
    id: "baby-dose",
    title: "Baby Hair: половина привычной дозы",
    body: "Тонким волосам хватает горошины бальзама на длину. Лишнее у корней убирает объём на весь день, даже если средство хорошее.",
    hairTypeIds: ["baby-hair"],
    needIds: [],
  },
  {
    id: "moisture-and-nutrition",
    title: "Питание и увлажнение — разные задачи",
    body: "Если выбраны оба, не смешивайте всё в одно мытьё. Чередуйте: одно мытьё — влага, следующее — питание. Масло воду не заменяет.",
    hairTypeIds: [],
    needIds: ["moisture", "nutrition"],
  },
  {
    id: "heat-every-time",
    title: "Защита даже на «щадящей» температуре",
    body: "Один проход разогретым утюжком без термозащиты сушит сильнее, чем кажется. Наносите защиту каждый раз, не только перед плотной укладкой.",
    hairTypeIds: [],
    needIds: ["protection"],
  },
  {
    id: "breakage-ends",
    title: "Ломкость начинается там, где волос трутся",
    body: "Чаще всего это концы и зона у плеча. Расчёсывание начинайте оттуда. Тугой хвост на мокрых волосах добавляет излом в ту же точку.",
    hairTypeIds: [],
    needIds: ["less-breakage"],
  },
];
