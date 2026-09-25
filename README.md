# 02hair

Персональный гид по уходу за волосами. Пять шагов — тип волос, потребности, система ухода, средства и инструменты — и план с тремя форматами: базовый, расширенный и персональный подбор от Карины.

Готовый текст гида также собран в [docs/02hair-guide.pdf](docs/02hair-guide.pdf). Пересобрать файл: `node --experimental-strip-types scripts/build-guide-pdf.mjs`.

## Запуск

```bash
npm install
npm run dev
```

Приложение откроется на [http://127.0.0.1:43217](http://127.0.0.1:43217).

```bash
npm run lint
npm run build
```

## Где править содержание

Интерфейс читает каталог из `src/data`. Тексты в компонентах не зашиты.

| Что менять | Файл |
| --- | --- |
| Типы волос и заметки Карины (`expertDescription`) | `src/data/hair-types.ts` |
| Потребности | `src/data/needs.ts` |
| Шаги ухода и рекомендации в аккордеонах (`recommendations`, `expertNote`) | `src/data/care-steps.ts` |
| Категории средств | `src/data/product-categories.ts` |
| Марки | `src/data/brands.ts` |
| Средства, привязка к типу волос и потребностям, цены, ссылки | `src/data/products.ts` |
| Инструменты и модели (`recommendedModels`) | `src/data/tools.ts` |
| Состав пакетов Standard / Pro / Personal | `src/data/tiers.ts` |
| Дополнительные советы расширенного гайда | `src/data/expert-tips.ts` |
| Слоты персонального подбора | `src/data/personal-slots.ts` |

Заметка эксперта по типу волос появляется на первом шаге, когда `expertDescription` не пустой. Модели инструментов появляются в карточке, когда заполнен `recommendedModels`.

## Результат гида

Тип снимка — `GuideResult` в `src/data/types.ts`. Его собирает `buildGuideResult` в `src/lib/build-guide-result.ts`.

В объект входят тип волос, потребности, показанная система ухода, категории средств, подобранные примеры, инструменты и выбранный формат. Снимок пишется в `localStorage` (`02hair.guide.result.v1`), ответы между шагами — в `02hair.guide.session.v1`.

Персональный подбор не генерирует список средств: запрос сохраняется локально, чтобы Карина заполнила слоты отдельно.
