import type { SectionTranslation, TranslationCoverage } from "./api";

export type ReadingMode = "original" | "translation" | "bilingual";

export interface TranslationState {
  status: "idle" | "loading" | "ready" | "error";
  translation: SectionTranslation | null;
  error: string | null;
}

export interface TranslationCoverageState {
  status: "idle" | "loading" | "ready" | "error";
  coverage: TranslationCoverage | null;
  error: string | null;
}

export function resolveReadingMode(value: string | null): ReadingMode {
  return value === "translation" || value === "bilingual" ? value : "original";
}

export function canShowTranslation(state: TranslationState): boolean {
  const translation = state.translation;
  return (
    state.status === "ready" &&
    translation?.status === "fresh" &&
    Boolean(translation.content) &&
    (!translation.section_has_assets || translation.includes_assets === true)
  );
}

export function translationNotice(state: TranslationState): string | null {
  if (state.status === "loading" || state.status === "idle") return "Loading translation…";
  if (state.status === "error") return `Translation unavailable: ${state.error}`;
  if (!state.translation || state.translation.status === "missing") return "No translation is available for this section yet.";
  if (state.translation.status === "stale") return "This translation is older than the current source section and is not displayed.";
  if (state.translation.status === "untracked") return "This translation cannot be verified against the current source section and is not displayed.";
  if (state.translation.status === "orphaned") return "This translation no longer belongs to a readable section.";
  if (!state.translation.content) return "Translation content is empty.";
  if (state.translation.section_has_assets && state.translation.includes_assets !== true) {
    return "This translation omits figures or tables from the source section and is not displayed.";
  }
  return null;
}

export function isSectionInsideCoverage(
  coverage: TranslationCoverage | null,
  sectionIndex: number,
): boolean {
  return Boolean(coverage && sectionIndex >= 0 && sectionIndex < coverage.target_sections);
}

export function translationWarning(state: TranslationState): string | null {
  if (!canShowTranslation(state)) return null;
  const translation = state.translation!;
  if (translation.structure_issues.length > 0) {
    return "Some links or anchors differ from the original section. Verify references while reading.";
  }
  return null;
}
