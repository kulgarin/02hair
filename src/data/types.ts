/**
 * Guide catalog and the result object future recommendation generation should consume.
 * Edit expert copy, products, and packages in the sibling files of this folder — not in UI components.
 */

export interface HairType {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  /**
   * Karina's expert note for this type.
   * Leave empty until she writes it. The guide shows the note only when this is non-empty.
   * Edit in src/data/hair-types.ts.
   */
  expertDescription: string;
}

export interface Need {
  id: string;
  name: string;
  explanation: string;
}

export interface CareRecommendation {
  id: string;
  body: string;
}

export interface CareStep {
  id: string;
  title: string;
  summary: string;
  /**
   * Extra advice inside the accordion.
   * Karina can rewrite or extend these in src/data/care-steps.ts.
   */
  recommendations: CareRecommendation[];
  /** Optional longer note. Shown only when non-empty. */
  expertNote: string;
}

export interface ProductPrice {
  amount: number;
  currency: "RUB";
}

export interface Brand {
  id: string;
  name: string;
  /** Brand site. Used when a product has no page of its own yet. */
  siteUrl?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  /** What the product is. */
  what: string;
  /** Why it belongs in the routine. */
  why: string;
  /** How often to use it. */
  frequency: string;
  image: string;
  imageAlt: string;
}

export interface Product {
  id: string;
  brandId: string;
  categoryId: string;
  name: string;
  purpose: string;
  image: string;
  imageAlt: string;
  /** Product page. Optional until a stable link is set. */
  url?: string;
  /** Optional until a price is confirmed. */
  price?: ProductPrice;
  /**
   * Hair types this product is meant for.
   * Empty means it can be offered for every type.
   */
  hairTypeIds: string[];
  /**
   * Needs this product answers.
   * Empty means it stays relevant no matter which needs were selected.
   */
  needIds: string[];
}

export interface ToolModel {
  id: string;
  brand: string;
  name: string;
  note: string;
  url?: string;
}

export interface Tool {
  id: string;
  name: string;
  why: string;
  /** What to look for when choosing. */
  lookFor: string[];
  /** Characteristics that matter. */
  characteristics: string[];
  /** Mistakes to avoid. */
  mistakes: string[];
  /**
   * Specific models. Empty until Karina adds them in src/data/tools.ts.
   */
  recommendedModels: ToolModel[];
}

export type TierId = "standard" | "pro" | "personal";

export interface GuideTier {
  id: TierId;
  kicker: string;
  title: string;
  description: string;
  includes: string[];
  cta: string;
}

export interface ExpertTip {
  id: string;
  title: string;
  body: string;
  /** Empty means the tip applies to every hair type. */
  hairTypeIds: string[];
  /** Empty means the tip applies regardless of selected needs. */
  needIds: string[];
}

export interface PersonalSlot {
  id: string;
  label: string;
  detail: string;
}

export interface GuideStepMeta {
  id: string;
  label: string;
}

/** A catalog product with its brand and category resolved. */
export interface ResolvedProduct {
  product: Product;
  brand: Brand;
  category: ProductCategory;
}

export const GUIDE_RESULT_VERSION = 1 as const;

/**
 * One snapshot of a finished guide.
 * Persist this and pass it to later recommendation generation.
 */
export interface GuideResult {
  version: typeof GUIDE_RESULT_VERSION;
  hairTypeId: string;
  hairType: HairType;
  needIds: string[];
  needs: Need[];
  careSystem: CareStep[];
  productCategories: ProductCategory[];
  /** Products matched from hair-type and need bindings. Pro tier renders these. */
  matchedProducts: ResolvedProduct[];
  tools: Tool[];
  tierId: TierId | null;
  /** Set when the person asks Karina for a personal selection. */
  personalRequested: boolean;
  completedAt: string;
}
