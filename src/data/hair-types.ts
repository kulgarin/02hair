import type { HairType } from "@/data/types";

/**
 * Hair types shown on step 1.
 * Karina: write each expert note in `expertDescription`. The screen shows it only when the text is filled in.
 */
export const hairTypes: HairType[] = [
  {
    id: "straight",
    name: "Прямые",
    description:
      "Ровное полотно без завитка. Часто блестят, но быстрее теряют объём у корней.",
    image: "/images/hair/straight.jpg",
    imageAlt: "Длинные прямые волосы ровным гладким полотном",
    expertDescription: "",
  },
  {
    id: "curly",
    name: "Кудрявые",
    description:
      "Завиток от мягкой волны до плотного кольца. Форма держится, когда хватает влаги и локон не рвут расчёской.",
    image: "/images/hair/curly.jpg",
    imageAlt: "Упругие определённые кудри крупным планом",
    expertDescription: "",
  },
  {
    id: "porous",
    name: "Пористые",
    description:
      "Кутикула приподнята: влага входит быстро и так же быстро уходит. На ощупь волосы суше, поверхность менее гладкая.",
    image: "/images/hair/porous.jpg",
    imageAlt: "Пористые волосы с пушистой матовой текстурой и летящими прядями",
    expertDescription: "",
  },
  {
    id: "glassy",
    name: "Стекловидные",
    description:
      "Плотная гладкая кутикула и зеркальный блеск. Средствам сложнее пройти внутрь, поэтому они часто остаются на поверхности.",
    image: "/images/hair/glassy.jpg",
    imageAlt: "Гладкие волосы со стеклянным зеркальным блеском",
    expertDescription: "",
  },
  {
    id: "baby-hair",
    name: "Baby Hair",
    description:
      "Тонкие, лёгкие волосы и деликатные волоски у линии роста. Их легко перегрузить уходом — объём пропадает от лишнего веса.",
    image: "/images/hair/baby.jpg",
    imageAlt: "Тонкие волосы и мягкие пушковые волоски вдоль линии роста",
    expertDescription: "",
  },
];
