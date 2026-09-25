import { tools } from "@/data";
import { StepFrame } from "@/components/guide/step-frame";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ToolsStepProps = {
  onBack: () => void;
  onNext: () => void;
};

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-xs tracking-[0.14em] text-muted-foreground uppercase">{title}</h3>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-sm leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ToolsStep({ onBack, onNext }: ToolsStepProps) {
  return (
    <StepFrame
      title="Инструменты для правильного ухода"
      subtitle="Зачем каждый нужен, на что смотреть при выборе и какие ошибки лучше не повторять."
      onBack={onBack}
      onNext={onNext}
      nextLabel="К плану"
    >
      <Accordion type="single" collapsible className="gap-3">
        {tools.map((tool) => (
          <AccordionItem
            key={tool.id}
            value={tool.id}
            className="rounded-3xl border border-border bg-card px-4 data-[state=open]:border-gold/40 sm:px-5"
          >
            <AccordionTrigger className="py-4 hover:no-underline">
              <span className="pr-2 text-left">
                <span className="block font-heading text-2xl leading-tight font-medium text-foreground">
                  {tool.name}
                </span>
                <span className="mt-1 block text-sm leading-relaxed font-normal text-muted-foreground">
                  {tool.why}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-5 pb-2 sm:grid-cols-3">
                <DetailList title="На что смотреть" items={tool.lookFor} />
                <DetailList title="Что важно" items={tool.characteristics} />
                <DetailList title="Чего избегать" items={tool.mistakes} />
              </div>
              {tool.recommendedModels.length > 0 ? (
                <div className="mt-2 border-t border-border pt-3">
                  <h3 className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    Модели
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {tool.recommendedModels.map((model) => (
                      <li key={model.id} className="text-sm leading-relaxed">
                        <span className="font-medium">
                          {model.brand} {model.name}.
                        </span>{" "}
                        {model.note}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </StepFrame>
  );
}
