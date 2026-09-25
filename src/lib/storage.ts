import { hairTypes, needs, tiers } from "@/data";
import type { GuideResult, TierId } from "@/data";

const SESSION_KEY = "02hair.guide.session.v1";
const RESULT_KEY = "02hair.guide.result.v1";

export interface GuideSession {
  step: number;
  hairTypeId: string | null;
  needIds: string[];
  tierId: TierId | null;
  personalRequested: boolean;
  completedAt: string | null;
}

export const EMPTY_SESSION: GuideSession = {
  step: 0,
  hairTypeId: null,
  needIds: [],
  tierId: null,
  personalRequested: false,
  completedAt: null,
};

const tierIds = new Set(tiers.map((tier) => tier.id));

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function sanitizeSession(value: unknown): GuideSession | null {
  if (!isRecord(value)) return null;

  const hairTypeId =
    typeof value.hairTypeId === "string" &&
    hairTypes.some((item) => item.id === value.hairTypeId)
      ? value.hairTypeId
      : null;

  const needIds = Array.isArray(value.needIds)
    ? value.needIds.filter(
        (id): id is string =>
          typeof id === "string" && needs.some((item) => item.id === id),
      )
    : [];

  const tierId =
    typeof value.tierId === "string" && tierIds.has(value.tierId as TierId)
      ? (value.tierId as TierId)
      : null;

  let step = typeof value.step === "number" && Number.isInteger(value.step) ? value.step : 0;
  if (step < 0 || step > 5) step = 0;
  if (!hairTypeId && step > 0) step = 0;
  if (needIds.length === 0 && step > 1) step = hairTypeId ? 1 : 0;

  const completedAt =
    typeof value.completedAt === "string" && value.completedAt.length > 0
      ? value.completedAt
      : null;

  return {
    step,
    hairTypeId,
    needIds,
    tierId,
    personalRequested: value.personalRequested === true,
    completedAt,
  };
}

export function loadSession(): { session: GuideSession | null; corrupted: boolean } {
  if (typeof window === "undefined") return { session: null, corrupted: false };

  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return { session: null, corrupted: false };
    const session = sanitizeSession(JSON.parse(raw) as unknown);
    if (!session) return { session: null, corrupted: true };
    return { session, corrupted: false };
  } catch {
    return { session: null, corrupted: true };
  }
}

export function saveSession(session: GuideSession): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function saveResult(result: GuideResult): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(RESULT_KEY, JSON.stringify(result));
}
