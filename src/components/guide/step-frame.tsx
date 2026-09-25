import { Button } from "@/components/ui/button";

type StepFrameProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  hint?: string;
};

export function StepFrame({
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel = "Дальше",
  nextDisabled = false,
  hint,
}: StepFrameProps) {
  return (
    <section className="step-enter">
      <header className="max-w-2xl">
        <h1 className="font-heading text-[2.4rem] leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </header>
      <div className="mt-8">{children}</div>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border/80 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
          {onBack ? (
            <Button
              type="button"
              variant="outline"
              className="h-11 cursor-pointer rounded-full px-5"
              onClick={onBack}
            >
              Назад
            </Button>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-3">
            {hint ? (
              <p id="step-hint" className="hidden text-sm text-muted-foreground sm:block">
                {hint}
              </p>
            ) : null}
            <Button
              type="button"
              className="h-11 cursor-pointer rounded-full px-6"
              onClick={onNext}
              disabled={nextDisabled}
              aria-describedby={hint ? "step-hint" : undefined}
            >
              {nextLabel}
            </Button>
          </div>
        </div>
        {hint ? (
          <p className="px-4 pb-3 text-center text-sm text-muted-foreground sm:hidden">
            {hint}
          </p>
        ) : null}
      </div>
    </section>
  );
}
