"use client";

import { useEffect } from "react";
import { GUIDE_STEP_COUNT } from "@/data";
import type { TierId } from "@/data";
import { buildGuideResult } from "@/lib/build-guide-result";
import { setGuideSession, useGuideStore } from "@/lib/guide-store";
import { CareSystemStep } from "@/components/guide/care-system-step";
import { GuideProgress } from "@/components/guide/guide-progress";
import { HairTypeStep } from "@/components/guide/hair-type-step";
import { NeedsStep } from "@/components/guide/needs-step";
import { PlanScreen } from "@/components/guide/plan-screen";
import { ProductsStep } from "@/components/guide/products-step";
import { ToolsStep } from "@/components/guide/tools-step";

export function GuideFlow() {
  const { session, ready, corrupted } = useGuideStore();

  useEffect(() => {
    if (!ready) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [ready, session.step]);

  function goTo(step: number) {
    setGuideSession((current) => ({
      ...current,
      step,
      completedAt:
        step === GUIDE_STEP_COUNT
          ? current.completedAt ?? new Date().toISOString()
          : current.completedAt,
    }));
  }

  if (!ready) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6" aria-busy="true" aria-live="polite">
        <p className="text-sm text-muted-foreground">Открываем гид…</p>
        <div className="mt-6 h-1 rounded-full bg-muted" />
        <div className="mt-8 h-12 w-2/3 max-w-md rounded-2xl bg-muted" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="h-72 rounded-3xl bg-muted" />
          <div className="h-72 rounded-3xl bg-muted" />
        </div>
      </div>
    );
  }

  const result = session.step === GUIDE_STEP_COUNT ? buildGuideResult(session) : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 pb-36 sm:px-6 sm:py-8">
      <p className="sr-only" aria-live="polite">
        {session.step < GUIDE_STEP_COUNT
          ? `Шаг ${session.step + 1} из ${GUIDE_STEP_COUNT}`
          : "Ваш персональный план ухода"}
      </p>
      {corrupted ? (
        <div
          role="alert"
          className="mb-5 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm leading-relaxed"
        >
          Не удалось прочитать сохранённые ответы. Гид начат заново.
        </div>
      ) : null}
      <GuideProgress step={session.step} onJump={goTo} />
      <div className="mt-8">
        {session.step === 0 ? (
          <HairTypeStep
            hairTypeId={session.hairTypeId}
            onSelect={(hairTypeId) =>
              setGuideSession((current) => ({ ...current, hairTypeId }))
            }
            onNext={() => goTo(1)}
          />
        ) : null}
        {session.step === 1 ? (
          <NeedsStep
            needIds={session.needIds}
            onToggle={(id) =>
              setGuideSession((current) => ({
                ...current,
                needIds: current.needIds.includes(id)
                  ? current.needIds.filter((item) => item !== id)
                  : [...current.needIds, id],
              }))
            }
            onBack={() => goTo(0)}
            onNext={() => goTo(2)}
          />
        ) : null}
        {session.step === 2 ? (
          <CareSystemStep onBack={() => goTo(1)} onNext={() => goTo(3)} />
        ) : null}
        {session.step === 3 ? (
          <ProductsStep onBack={() => goTo(2)} onNext={() => goTo(4)} />
        ) : null}
        {session.step === 4 ? (
          <ToolsStep onBack={() => goTo(3)} onNext={() => goTo(5)} />
        ) : null}
        {session.step === 5 && result ? (
          <PlanScreen
            result={result}
            onBack={() => goTo(4)}
            onSelectTier={(tierId) =>
              setGuideSession((current) => ({ ...current, tierId }))
            }
            onRequestPersonal={() =>
              setGuideSession((current) => ({
                ...current,
                tierId: "personal" satisfies TierId,
                personalRequested: true,
              }))
            }
          />
        ) : null}
        {session.step === 5 && !result ? (
          <div role="status" className="rounded-3xl border border-border bg-card p-6">
            <h1 className="font-heading text-3xl">План ещё не собран</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Вернитесь к типу волос и потребностям — без них гайд не собирается.
            </p>
            <button
              type="button"
              className="mt-4 text-sm underline underline-offset-4"
              onClick={() => goTo(0)}
            >
              К типу волос
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
