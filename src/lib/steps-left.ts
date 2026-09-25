export function stepsRemainingLabel(remaining: number): string {
  if (remaining <= 0) return "Это последний шаг";
  if (remaining === 1) return "Остался 1 шаг";
  if (remaining >= 2 && remaining <= 4) return `Осталось ${remaining} шага`;
  return `Осталось ${remaining} шагов`;
}
