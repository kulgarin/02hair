import { needs } from "@/data";
import { OptionCard } from "@/components/guide/option-card";
import { StepFrame } from "@/components/guide/step-frame";

type NeedsStepProps = {
  needIds: string[];
  onToggle: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
};

export function NeedsStep({ needIds, onToggle, onBack, onNext }: NeedsStepProps) {
  return (
    <StepFrame
      title="Что сейчас нужно вашим волосам?"
      subtitle="Можно выбрать несколько. Так гайд отличит питание, влагу и восстановление."
      onBack={onBack}
      onNext={onNext}
      nextDisabled={needIds.length === 0}
      hint={needIds.length === 0 ? "Отметьте хотя бы одну потребность" : undefined}
    >
      <fieldset>
        <legend className="sr-only">Потребности волос</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {needs.map((need) => (
            <OptionCard
              key={need.id}
              name={need.name}
              description={need.explanation}
              selected={needIds.includes(need.id)}
              inputType="checkbox"
              inputName="needs"
              value={need.id}
              onChange={() => onToggle(need.id)}
              compact
            />
          ))}
        </div>
      </fieldset>
    </StepFrame>
  );
}
