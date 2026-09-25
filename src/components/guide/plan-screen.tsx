"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { personalSlots, tiers } from "@/data";
import type { GuideResult, TierId } from "@/data";
import { matchTips } from "@/lib/recommendations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/guide/product-card";

type PlanScreenProps = {
  result: GuideResult;
  onBack: () => void;
  onSelectTier: (tierId: TierId) => void;
  onRequestPersonal: () => void;
};

export function PlanScreen({
  result,
  onBack,
  onSelectTier,
  onRequestPersonal,
}: PlanScreenProps) {
  const [panelReady, setPanelReady] = useState(false);
  const tips = matchTips(result.hairTypeId, result.needIds);
  const activeTier = tiers.find((tier) => tier.id === result.tierId);

  useEffect(() => {
    if (!result.tierId) return;
    document.getElementById("tier-panel")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [result.tierId, result.personalRequested]);

  return (
    <section className="step-enter pb-16">
      <header className="max-w-2xl">
        <p className="text-sm text-muted-foreground">Все 5 шагов пройдены</p>
        <h1 className="mt-2 font-heading text-[2.4rem] leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl">
          Ваш персональный план ухода
        </h1>
      </header>

      <div className="mt-8 grid gap-4">
        <SummaryBlock label="Ваш тип волос">
          <p className="font-heading text-3xl">{result.hairType.name}</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {result.hairType.description}
          </p>
        </SummaryBlock>

        <SummaryBlock label="Основные потребности">
          {result.needs.length === 0 ? (
            <p className="text-sm text-muted-foreground">Потребности не выбраны.</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {result.needs.map((need) => (
                <li
                  key={need.id}
                  className="rounded-full border border-border bg-gold-soft px-3 py-1.5 text-sm"
                >
                  {need.name}
                </li>
              ))}
            </ul>
          )}
        </SummaryBlock>

        <SummaryBlock label="Система ухода">
          <ol className="space-y-3">
            {result.careSystem.map((step, index) => (
              <li key={step.id} className="flex gap-3">
                <span className="font-heading text-lg text-primary tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-medium">{step.title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                    {step.summary}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </SummaryBlock>

        <SummaryBlock label="Необходимые средства">
          <ul className="grid gap-2 sm:grid-cols-2">
            {result.productCategories.map((category) => (
              <li key={category.id} className="text-sm leading-relaxed">
                <span className="font-medium">{category.name}.</span>{" "}
                <span className="text-muted-foreground">{category.why}</span>
              </li>
            ))}
          </ul>
        </SummaryBlock>

        <SummaryBlock label="Инструменты">
          <ul className="grid gap-2 sm:grid-cols-2">
            {result.tools.map((tool) => (
              <li key={tool.id} className="text-sm leading-relaxed">
                <span className="font-medium">{tool.name}.</span>{" "}
                <span className="text-muted-foreground">{tool.why}</span>
              </li>
            ))}
          </ul>
        </SummaryBlock>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          className="h-12 cursor-pointer rounded-full px-6"
          onClick={() => {
            setPanelReady(true);
            document.getElementById("guide-tiers")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          Получить полный гайд
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-12 cursor-pointer rounded-full px-6"
          onClick={onBack}
        >
          Назад
        </Button>
      </div>

      <div id="guide-tiers" className="scroll-mt-24 mt-14">
        <h2 className="font-heading text-3xl leading-tight sm:text-4xl">
          Три способа получить рекомендации
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Базовый гайд собирает систему. Расширенный добавляет примеры средств.
          Персональный подбор Карина делает сама — он не генерируется из списка.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {tiers.map((tier) => {
            const personal = tier.id === "personal";
            const selected = result.tierId === tier.id;
            return (
              <article
                key={tier.id}
                className={cn(
                  "flex flex-col rounded-3xl border p-5 transition duration-300",
                  personal
                    ? "border-gold bg-gold-soft shadow-[0_24px_50px_-32px_rgba(70,48,24,0.65)] lg:-translate-y-2"
                    : "border-border bg-card",
                  selected && "ring-2 ring-gold",
                )}
              >
                <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                  {tier.kicker}
                </p>
                <h3 className="mt-2 font-heading text-3xl leading-tight">{tier.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {tier.description}
                </p>
                <ul className="mt-4 flex-1 space-y-2">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-relaxed">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  variant={personal ? "default" : "outline"}
                  aria-pressed={selected}
                  className="mt-5 h-11 cursor-pointer rounded-full"
                  onClick={() => {
                    setPanelReady(true);
                    if (tier.id === "personal") onRequestPersonal();
                    else onSelectTier(tier.id);
                  }}
                >
                  {tier.cta}
                </Button>
              </article>
            );
          })}
        </div>
      </div>

      {panelReady && activeTier ? (
        <div id="tier-panel" className="scroll-mt-24 mt-8">
          {activeTier.id === "standard" ? <StandardPanel /> : null}
          {activeTier.id === "pro" ? (
            <ProPanel tips={tips} products={result.matchedProducts} />
          ) : null}
          {activeTier.id === "personal" ? (
            <PersonalPanel
              requested={result.personalRequested}
              hairTypeName={result.hairType.name}
              needNames={result.needs.map((need) => need.name)}
              onRequest={onRequestPersonal}
            />
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function SummaryBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-5 sm:p-6">
      <h2 className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{label}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function StandardPanel() {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6" role="status">
      <h2 className="font-heading text-3xl">Базовый гайд собран</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Выше — ваш план: тип волос, потребности, порядок ухода, категории средств и
        инструменты. В базовый гайд не входят конкретные марки и банки. Их можно открыть
        в расширенном гайде или отдать на разбор Карине.
      </p>
    </div>
  );
}

function ProPanel({
  tips,
  products,
}: {
  tips: ReturnType<typeof matchTips>;
  products: GuideResult["matchedProducts"];
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-3xl">Расширенные рекомендации</h2>
        <ul className="mt-4 grid gap-3">
          {tips.map((tip) => (
            <li key={tip.id} className="rounded-3xl border border-border bg-card p-5">
              <h3 className="font-heading text-2xl leading-tight">{tip.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-heading text-3xl">Примеры средств</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          По одному примеру в категории, с учётом типа волос и потребностей. Это ориентир,
          не персональный подбор.
        </p>
        {products.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground" role="status">
            Для этой комбинации примеры средств ещё не заполнены.
          </p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((item) => (
              <li key={item.product.id}>
                <ProductCard item={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function PersonalPanel({
  requested,
  hairTypeName,
  needNames,
  onRequest,
}: {
  requested: boolean;
  hairTypeName: string;
  needNames: string[];
  onRequest: () => void;
}) {
  if (!requested) {
    return (
      <div className="rounded-3xl border border-gold bg-gold-soft p-5 sm:p-6">
        <h2 className="font-heading text-3xl">Карина соберёт уход сама</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed">
          Персональный подбор не подставляет шаблонный список. Карина разбирает тип волос,
          потребности и систему, затем заполняет средства и способ нанесения.
        </p>
        <Button type="button" className="mt-5 h-11 cursor-pointer rounded-full" onClick={onRequest}>
          Получить персональный подбор
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-gold bg-card p-5 sm:p-6" role="status">
      <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Подбор отмечен</p>
      <h2 className="mt-2 font-heading text-3xl leading-tight">
        Карина получит ваши ответы, а не готовый список средств
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Запрос сохранён в этом браузере вместе с планом. Автоматические банки здесь не
        подставляются — их выбирает Карина.
      </p>
      <dl className="mt-5 space-y-3 text-sm">
        <div>
          <dt className="text-muted-foreground">Тип волос</dt>
          <dd className="font-medium">{hairTypeName}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Потребности</dt>
          <dd className="font-medium">{needNames.join(", ")}</dd>
        </div>
      </dl>
      <h3 className="mt-6 font-heading text-2xl">Что заполнит Карина</h3>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {personalSlots.map((slot) => (
          <li key={slot.id} className="rounded-2xl border border-border bg-gold-soft/60 p-4">
            <p className="font-medium">{slot.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{slot.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
