import { hairTypes } from "@/data";
import { OptionCard } from "@/components/guide/option-card";
import { StepFrame } from "@/components/guide/step-frame";

type HairTypeStepProps = {
  hairTypeId: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
};

export function HairTypeStep({ hairTypeId, onSelect, onNext }: HairTypeStepProps) {
  const selected = hairTypes.find((item) => item.id === hairTypeId);

  return (
    <StepFrame
      title="Определите свой тип волос"
      subtitle="«Выберите вариант, который больше всего похож на ваши волосы. Это поможет правильно подобрать дальнейший уход.»"
      onNext={onNext}
      nextDisabled={!hairTypeId}
      hint={hairTypeId ? undefined : "Выберите тип волос, чтобы продолжить"}
    >
      <fieldset>
        <legend className="sr-only">Тип волос</legend>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {hairTypes.map((type) => (
            <OptionCard
              key={type.id}
              name={type.name}
              description={type.description}
              imageSrc={type.image}
              imageAlt={type.imageAlt}
              selected={hairTypeId === type.id}
              inputType="radio"
              inputName="hair-type"
              value={type.id}
              onChange={() => onSelect(type.id)}
            />
          ))}
        </div>
      </fieldset>
      {selected?.expertDescription ? (
        <aside className="mt-6 rounded-3xl border border-border bg-card p-5 sm:p-6">
          <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
            Заметка Карины
          </p>
          <p className="mt-2 max-w-2xl text-base leading-relaxed">{selected.expertDescription}</p>
        </aside>
      ) : null}
    </StepFrame>
  );
}
