import Image from "next/image";
import { productCategories } from "@/data";
import { StepFrame } from "@/components/guide/step-frame";

type ProductsStepProps = {
  onBack: () => void;
  onNext: () => void;
};

export function ProductsStep({ onBack, onNext }: ProductsStepProps) {
  return (
    <StepFrame
      title="Что должно быть в вашем уходе"
      subtitle="Не длинный список банок, а роли средств. Конкретные марки появятся в расширенном гайде."
      onBack={onBack}
      onNext={onNext}
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {productCategories.map((category) => (
          <li
            key={category.id}
            className="overflow-hidden rounded-3xl border border-border bg-card transition duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_18px_40px_-28px_rgba(70,48,24,0.5)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <div className="relative aspect-[16/10] bg-muted">
              <Image
                src={category.image}
                alt={category.imageAlt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-3 p-4 sm:p-5">
              <h2 className="font-heading text-2xl leading-tight">{category.name}</h2>
              <dl className="space-y-2 text-sm leading-relaxed">
                <div>
                  <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    Что это
                  </dt>
                  <dd className="mt-0.5">{category.what}</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    Зачем
                  </dt>
                  <dd className="mt-0.5">{category.why}</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    Как часто
                  </dt>
                  <dd className="mt-0.5">{category.frequency}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ul>
    </StepFrame>
  );
}
