import { careSteps } from "@/data";
import { StepFrame } from "@/components/guide/step-frame";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type CareSystemStepProps = {
  onBack: () => void;
  onNext: () => void;
};

export function CareSystemStep({ onBack, onNext }: CareSystemStepProps) {
  return (
    <StepFrame
      title="Система правильного ухода"
      subtitle="Пять шагов по порядку. Откройте каждый — внутри короткие правила."
      onBack={onBack}
      onNext={onNext}
    >
      <Accordion type="single" collapsible className="relative gap-3">
        {careSteps.map((step, index) => (
          <AccordionItem
            key={step.id}
            value={step.id}
            className="rounded-3xl border border-border bg-card px-4 data-[state=open]:border-gold/40 sm:px-5"
          >
            <AccordionTrigger className="py-4 hover:no-underline">
              <span className="flex items-start gap-3 pr-2">
                <span className="mt-0.5 font-heading text-xl text-primary tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-left">
                  <span className="block font-heading text-2xl leading-tight font-medium text-foreground">
                    {step.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed font-normal text-muted-foreground">
                    {step.summary}
                  </span>
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pr-1 pl-11">
              <ul className="space-y-3 pb-2">
                {step.recommendations.map((item) => (
                  <li key={item.id} className="text-sm leading-relaxed text-foreground">
                    {item.body}
                  </li>
                ))}
              </ul>
              {step.expertNote ? (
                <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Карина: </span>
                  {step.expertNote}
                </p>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </StepFrame>
  );
}
