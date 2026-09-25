import { writeFileSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");

const { hairTypes } = await import(pathToFileURL(path.join(root, "src/data/hair-types.ts")).href);
const { needs } = await import(pathToFileURL(path.join(root, "src/data/needs.ts")).href);
const { careSteps } = await import(pathToFileURL(path.join(root, "src/data/care-steps.ts")).href);
const { productCategories } = await import(
  pathToFileURL(path.join(root, "src/data/product-categories.ts")).href
);
const { products } = await import(pathToFileURL(path.join(root, "src/data/products.ts")).href);
const { brands } = await import(pathToFileURL(path.join(root, "src/data/brands.ts")).href);
const { tools } = await import(pathToFileURL(path.join(root, "src/data/tools.ts")).href);
const { tiers } = await import(pathToFileURL(path.join(root, "src/data/tiers.ts")).href);
const { expertTips } = await import(pathToFileURL(path.join(root, "src/data/expert-tips.ts")).href);
const { personalSlots } = await import(
  pathToFileURL(path.join(root, "src/data/personal-slots.ts")).href
);
const { guideSteps } = await import(pathToFileURL(path.join(root, "src/data/steps.ts")).href);

const hairName = Object.fromEntries(hairTypes.map((item) => [item.id, item.name]));
const needName = Object.fromEntries(needs.map((item) => [item.id, item.name]));
const brandName = Object.fromEntries(brands.map((item) => [item.id, item.name]));

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function img(publicPath) {
  return pathToFileURL(path.join(root, "public", publicPath.replace(/^\//, ""))).href;
}

function scope(ids, labels) {
  if (!ids.length) return "для любого типа";
  return ids.map((id) => labels[id] ?? id).join(", ");
}

const hairCards = hairTypes
  .map(
    (type, index) => `
    <article class="hair">
      <img src="${img(type.image)}" alt="${esc(type.imageAlt)}" />
      <div>
        <p class="index">${String(index + 1).padStart(2, "0")}</p>
        <h3>${esc(type.name)}</h3>
        <p>${esc(type.description)}</p>
      </div>
    </article>`,
  )
  .join("");

const needCards = needs
  .map(
    (need) => `
    <article class="need">
      <h3>${esc(need.name)}</h3>
      <p>${esc(need.explanation)}</p>
    </article>`,
  )
  .join("");

const careBlocks = careSteps
  .map(
    (step, index) => `
    <section class="care">
      <p class="index">${String(index + 1).padStart(2, "0")}</p>
      <h3>${esc(step.title)}</h3>
      <p class="lead">${esc(step.summary)}</p>
      <ul>${step.recommendations.map((item) => `<li>${esc(item.body)}</li>`).join("")}</ul>
    </section>`,
  )
  .join("");

const categoryCards = productCategories
  .map(
    (category) => `
    <article class="category">
      <img src="${img(category.image)}" alt="${esc(category.imageAlt)}" />
      <div>
        <h3>${esc(category.name)}</h3>
        <p><strong>Что это.</strong> ${esc(category.what)}</p>
        <p><strong>Зачем.</strong> ${esc(category.why)}</p>
        <p><strong>Как часто.</strong> ${esc(category.frequency)}</p>
      </div>
    </article>`,
  )
  .join("");

const toolBlocks = tools
  .map(
    (tool) => `
    <section class="tool">
      <h3>${esc(tool.name)}</h3>
      <p class="lead">${esc(tool.why)}</p>
      <div class="cols">
        <div><h4>На что смотреть</h4><ul>${tool.lookFor.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>
        <div><h4>Что важно</h4><ul>${tool.characteristics.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>
        <div><h4>Чего избегать</h4><ul>${tool.mistakes.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>
      </div>
    </section>`,
  )
  .join("");

const tierCards = tiers
  .map(
    (tier) => `
    <article class="tier ${tier.id === "personal" ? "personal" : ""}">
      <p class="kicker">${esc(tier.kicker)}</p>
      <h3>${esc(tier.title)}</h3>
      <p>${esc(tier.description)}</p>
      <ul>${tier.includes.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
    </article>`,
  )
  .join("");

const productsByCategory = productCategories
  .map((category) => {
    const rows = products.filter((product) => product.categoryId === category.id);
    if (!rows.length) return "";
    const items = rows
      .map((product) => {
        const fits = [
          scope(product.hairTypeIds, hairName).replace("для любого типа", "любой тип волос"),
          product.needIds.length
            ? product.needIds.map((id) => needName[id] ?? id).join(", ")
            : "любые потребности",
        ].join(" · ");
        return `
        <li>
          <img src="${img(product.image)}" alt="" />
          <div>
            <p class="kicker">${esc(brandName[product.brandId] ?? product.brandId)}</p>
            <h4>${esc(product.name)}</h4>
            <p>${esc(product.purpose)}</p>
            <p class="meta">${esc(fits)}</p>
          </div>
        </li>`;
      })
      .join("");
    return `<section class="product-group"><h3>${esc(category.name)}</h3><ul>${items}</ul></section>`;
  })
  .join("");

const tipCards = expertTips
  .map((tip) => {
    const who = [
      tip.hairTypeIds.length ? scope(tip.hairTypeIds, hairName) : "все типы",
      tip.needIds.length
        ? tip.needIds.map((id) => needName[id] ?? id).join(" и ")
        : "любые потребности",
    ].join(" · ");
    return `<article class="tip"><h3>${esc(tip.title)}</h3><p>${esc(tip.body)}</p><p class="meta">${esc(who)}</p></article>`;
  })
  .join("");

const slotCards = personalSlots
  .map(
    (slot) => `
    <li><strong>${esc(slot.label)}</strong><span>${esc(slot.detail)}</span></li>`,
  )
  .join("");

const steps = guideSteps.map((step, index) => `<li><span>${index + 1}</span>${esc(step.label)}</li>`).join("");

const html = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <title>02hair — персональный гид по уходу</title>
  <style>
    @page { size: A4; margin: 14mm 14mm 16mm; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      font-family: "Noto Sans", "Liberation Sans", sans-serif;
      color: #3a322c;
      font-size: 11pt;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    h1, h2, h3, h4 { font-family: "Noto Serif", "Liberation Serif", serif; font-weight: 500; margin: 0; }
    h1 { font-size: 42pt; line-height: 0.95; letter-spacing: -0.02em; }
    h2 { font-size: 26pt; line-height: 1.05; margin-bottom: 8px; }
    h3 { font-size: 16pt; line-height: 1.15; }
    h4 { font-size: 11pt; margin-bottom: 4px; }
    p { margin: 0; }
    img { display: block; width: 100%; height: 100%; object-fit: cover; }
    .cover {
      min-height: 250mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
    }
    .mark { font-family: "Noto Serif", serif; font-size: 18pt; }
    .eyebrow { letter-spacing: 0.16em; text-transform: uppercase; font-size: 9pt; color: #6b5c50; }
    .cover h1 { max-width: 150mm; margin-top: 18mm; }
    .deck { max-width: 145mm; margin-top: 8mm; font-size: 13pt; color: #5c5148; }
    .steps { display: flex; gap: 8px; list-style: none; padding: 0; margin: 16mm 0 0; }
    .steps li { flex: 1; border-top: 1px solid #d9cfc3; padding-top: 8px; font-size: 10pt; }
    .steps span { display: block; font-family: "Noto Serif", serif; font-size: 16pt; color: #8a6844; }
    .section { page-break-before: always; }
    .intro { color: #5c5148; max-width: 160mm; margin-bottom: 8mm; }
    .hair-grid, .need-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
    .hair, .need, .category, .care, .tool, .tier, .tip, .product-group {
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .hair { display: grid; grid-template-columns: 34mm 1fr; gap: 4mm; border: 1px solid #e4dbd1; background: #fbf8f4; }
    .hair img { height: 42mm; }
    .hair div, .category div { padding: 3mm 3mm 3mm 0; }
    .hair h3, .need h3 { margin-bottom: 2mm; }
    .index { font-family: "Noto Serif", serif; color: #8a6844; font-size: 12pt; }
    .need { border: 1px solid #e4dbd1; background: #fff; padding: 4mm; }
    .need p, .hair p, .lead { color: #5c5148; }
    .care { margin: 0 0 6mm; padding-bottom: 4mm; border-bottom: 1px solid #eadfd4; }
    .care h3, .tool h3 { margin: 1mm 0 2mm; }
    ul { margin: 3mm 0 0; padding-left: 4.5mm; }
    li { margin: 0 0 1.5mm; }
    .category { display: grid; grid-template-columns: 38mm 1fr; gap: 4mm; margin: 0 0 5mm; border: 1px solid #e4dbd1; background: #fff; }
    .category img { height: 38mm; }
    .category p { margin-top: 1.5mm; }
    .cols { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4mm; margin-top: 3mm; }
    .tool { margin: 0 0 7mm; }
    .tiers { display: grid; grid-template-columns: 1fr; gap: 4mm; }
    .tier { border: 1px solid #e4dbd1; padding: 5mm; background: #fff; }
    .tier.personal { background: #f6efe6; border-color: #c4a484; }
    .kicker { letter-spacing: 0.14em; text-transform: uppercase; font-size: 8pt; color: #6b5c50; margin-bottom: 1mm; }
    .tier h3 { margin-bottom: 2mm; }
    .product-group { margin: 0 0 6mm; }
    .product-group ul { list-style: none; padding: 0; margin: 3mm 0 0; }
    .product-group li { display: grid; grid-template-columns: 22mm 1fr; gap: 3mm; margin: 0 0 3mm; }
    .product-group img { height: 22mm; }
    .meta { margin-top: 1mm; font-size: 9pt; color: #6b5c50; }
    .tip { border-left: 2px solid #c4a484; padding: 0 0 3mm 4mm; margin: 0 0 3.5mm; }
    .slots { list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
    .slots li { border: 1px solid #e4dbd1; padding: 3mm; margin: 0; }
    .slots span { display: block; color: #5c5148; margin-top: 1mm; }
  </style>
</head>
<body>
  <section class="cover">
    <div>
      <p class="mark">02hair</p>
      <h1>Персональный гид по уходу за волосами</h1>
      <p class="deck">Пять коротких шагов: тип волос, потребности, система ухода, средства и инструменты. Дальше — три способа получить рекомендации, от базовой схемы до личного разбора Карины.</p>
      <ol class="steps">${steps}</ol>
    </div>
    <p class="eyebrow">Это уходовый гид, не медицинская консультация</p>
  </section>

  <section class="section">
    <p class="eyebrow">Шаг 1 из 5</p>
    <h2>Определите свой тип волос</h2>
    <p class="intro">Выберите вариант, который больше всего похож на ваши волосы. Это поможет правильно подобрать дальнейший уход.</p>
    <div class="hair-grid">${hairCards}</div>
  </section>

  <section class="section">
    <p class="eyebrow">Шаг 2 из 5</p>
    <h2>Что сейчас нужно вашим волосам?</h2>
    <p class="intro">Можно выбрать несколько. Питание, увлажнение и восстановление — разные задачи.</p>
    <div class="need-grid">${needCards}</div>
  </section>

  <section class="section">
    <p class="eyebrow">Шаг 3 из 5</p>
    <h2>Система правильного ухода</h2>
    <p class="intro">Пять шагов по порядку. Ниже — правила, которые в гиде открываются внутри каждого пункта.</p>
    ${careBlocks}
  </section>

  <section class="section">
    <p class="eyebrow">Шаг 4 из 5</p>
    <h2>Что должно быть в вашем уходе</h2>
    <p class="intro">Не длинный список банок, а роли средств. Конкретные марки — в расширенном гайде.</p>
    ${categoryCards}
  </section>

  <section class="section">
    <p class="eyebrow">Шаг 5 из 5</p>
    <h2>Инструменты для правильного ухода</h2>
    <p class="intro">Зачем каждый нужен, на что смотреть при выборе и какие ошибки лучше не повторять.</p>
    ${toolBlocks}
  </section>

  <section class="section">
    <p class="eyebrow">После плана</p>
    <h2>Три способа получить рекомендации</h2>
    <p class="intro">Базовый гайд собирает систему. Расширенный добавляет примеры средств. Персональный подбор Карина делает сама — он не генерируется из списка.</p>
    <div class="tiers">${tierCards}</div>
    <h3 style="margin-top:8mm">Что заполнит Карина</h3>
    <ul class="slots">${slotCards}</ul>
  </section>

  <section class="section">
    <p class="eyebrow">Pro</p>
    <h2>Примеры средств</h2>
    <p class="intro">Ориентир по категориям. Если у средства указан тип волос, в приложении оно встаёт вперёд для этого типа. Это не персональный подбор.</p>
    ${productsByCategory}
  </section>

  <section class="section">
    <p class="eyebrow">Pro</p>
    <h2>Расширенные рекомендации</h2>
    <p class="intro">Советы, которые в приложении показываются, когда совпадают тип волос и потребности.</p>
    ${tipCards}
  </section>
</body>
</html>`;

const htmlPath = "/tmp/02hair-guide.html";
const pdfPath = path.join(root, "docs", "02hair-guide.pdf");
mkdirSync(path.dirname(pdfPath), { recursive: true });
writeFileSync(htmlPath, html);

const chrome = spawnSync(
  "google-chrome",
  [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    `--user-data-dir=/tmp/chrome-pdf-${process.pid}`,
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPath}`,
    pathToFileURL(htmlPath).href,
  ],
  { stdio: "inherit", timeout: 60000 },
);

if (chrome.status !== 0) {
  process.exit(chrome.status ?? 1);
}

console.log(pdfPath);
