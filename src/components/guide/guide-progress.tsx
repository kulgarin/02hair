import { GUIDE_STEP_COUNT, guideSteps } from "@/data";
import { stepsRemainingLabel } from "@/lib/steps-left";
import { cn } from "@/lib/utils";

type GuideProgressProps = {
  step: number;
  onJump: (step: number) => void;
};

export function GuideProgress({ step, onJump }: GuideProgressProps) {
  const onPlan = step >= GUIDE_STEP_COUNT;
  const current = onPlan ? GUIDE_STEP_COUNT : step + 1;
  const remaining = onPlan ? 0 : GUIDE_STEP_COUNT - current;
  const progress = onPlan ? 100 : (current / GUIDE_STEP_COUNT) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm text-foreground">
          {onPlan ? (
            "Все 5 шагов пройдены"
          ) : (
            <>
              <span className="font-medium">Шаг {current} из {GUIDE_STEP_COUNT}</span>
              <span className="text-muted-foreground"> · {stepsRemainingLabel(remaining)}</span>
            </>
          )}
        </p>
        <p className="text-sm text-muted-foreground">
          {onPlan ? "План" : guideSteps[step]?.label}
        </p>
      </div>
      <div
        className="h-1 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={GUIDE_STEP_COUNT}
        aria-valuenow={current}
        aria-label={onPlan ? "Гид пройден" : `Шаг ${current} из ${GUIDE_STEP_COUNT}`}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
      <ol className="hidden grid-cols-5 gap-2 md:grid">
        {guideSteps.map((item, index) => {
          const complete = index < step;
          const active = index === step;
          const locked = index > step;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={cn(
                  "flex w-full items-center gap-2 rounded-full px-2 py-1.5 text-left text-sm transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  active && "text-foreground",
                  complete && "cursor-pointer text-foreground hover:bg-accent",
                  locked && "cursor-default text-muted-foreground",
                  !locked && !active && "cursor-pointer",
                )}
                aria-current={active ? "step" : undefined}
                disabled={locked}
                onClick={() => onJump(index)}
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs",
                    active && "border-primary bg-primary text-primary-foreground",
                    complete && "border-primary/30 bg-gold-soft text-primary",
                    locked && "border-border text-muted-foreground",
                  )}
                >
                  {index + 1}
                </span>
                <span className={cn(active && "font-medium")}>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
