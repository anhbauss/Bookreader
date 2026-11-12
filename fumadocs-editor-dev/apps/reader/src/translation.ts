import type { SectionTranslation } from "./api";

export type ReadingMode = "original" | "translation" | "bilingual";

export interface TranslationState {
  status: "idle" | "loading" | "ready" | "error";
  translation: SectionTranslation | null;
  error: string | null;
}

export function resolveReadingMode(value: string | null): ReadingMode {
  return value === "translation" || value === "bilingual" ? value : "original";
}

export function canShowTranslation(state: TranslationState): boolean {
  return state.status === "ready" && state.translation?.status === "fresh" && Boolean(state.translation.content);
}

export function translationNotice(state: TranslationState): string | null {
  if (state.status === "loading" || state.status === "idle") return "Loading translation…";
  if (state.status === "error") return `Translation unavailable: ${state.error}`;
  if (!state.translation || state.translation.status === "missing") return "No translation is available for this section yet.";
  if (state.translation.status === "stale") return "This translation is older than the current source section and is not displayed.";
  if (state.translation.status === "untracked") return "This translation cannot be verified against the current source section and is not displayed.";
  if (state.translation.status === "orphaned") return "This translation no longer belongs to a readable section.";
  if (!state.translation.content) return "Translation content is empty.";
  return null;
}
