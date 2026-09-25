import type { PersonalSlot } from "@/data/types";

/**
 * What a personal selection from Karina covers.
 * These stay unfilled in the app: she chooses the actual products, they are not generated.
 */
export const personalSlots: PersonalSlot[] = [
  {
    id: "shampoo",
    label: "Шампунь",
    detail: "Конкретное средство под тип волос и кожу головы",
  },
  {
    id: "conditioner",
    label: "Кондиционер",
    detail: "Текстура под плотность и скорость загрязнения корней",
  },
  {
    id: "mask",
    label: "Маска",
    detail: "Какая именно, как часто и на какие зоны",
  },
  {
    id: "leave-in",
    label: "Несмываемый уход",
    detail: "Формат и доза, чтобы не утяжелить",
  },
  {
    id: "heat",
    label: "Термозащита",
    detail: "Под ваш способ укладки, а не «спрей на всякий случай»",
  },
  {
    id: "extra",
    label: "Дополнительные средства",
    detail: "Только если без них схема не собирается",
  },
  {
    id: "tools",
    label: "Инструменты",
    detail: "Что оставить, что заменить",
  },
  {
    id: "application",
    label: "Советы по нанесению",
    detail: "Порядок, количество и паузы именно для вас",
  },
];
