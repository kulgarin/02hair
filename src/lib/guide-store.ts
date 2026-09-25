"use client";

import { useSyncExternalStore } from "react";
import { GUIDE_STEP_COUNT } from "@/data";
import { buildGuideResult } from "@/lib/build-guide-result";
import {
  EMPTY_SESSION,
  loadSession,
  saveResult,
  saveSession,
  type GuideSession,
} from "@/lib/storage";

type GuideStore = {
  session: GuideSession;
  corrupted: boolean;
  ready: boolean;
};

const SERVER_SNAPSHOT: GuideStore = {
  session: EMPTY_SESSION,
  corrupted: false,
  ready: false,
};

let state: GuideStore = {
  session: EMPTY_SESSION,
  corrupted: false,
  ready: true,
};
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  const loaded = loadSession();
  if (loaded.corrupted) window.localStorage.removeItem("02hair.guide.session.v1");
  state = {
    session: loaded.session ?? EMPTY_SESSION,
    corrupted: loaded.corrupted,
    ready: true,
  };
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getClientSnapshot() {
  ensureHydrated();
  return state;
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

export function useGuideStore() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}

export function setGuideSession(updater: (current: GuideSession) => GuideSession) {
  ensureHydrated();
  const next = updater(state.session);
  state = { ...state, session: next };
  saveSession(next);
  if (next.step >= GUIDE_STEP_COUNT) {
    const result = buildGuideResult(next);
    if (result) saveResult(result);
  }
  emit();
}
