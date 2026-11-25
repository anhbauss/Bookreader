import { Languages, LoaderCircle, TriangleAlert } from "lucide-react";
import { MarkdownArticle, resolveBookGraphImageLinks } from "./markdown";
import type { ReadingMode, TranslationCoverageState, TranslationState } from "./translation";
import { canShowTranslation, translationNotice, translationWarning } from "./translation";

const MODES: Array<{ value: ReadingMode; label: string }> = [
  { value: "original", label: "Original" },
  { value: "translation", label: "Translation" },
  { value: "bilingual", label: "Bilingual" },
];

export function ReadingModePicker({
  mode,
  onChange,
}: {
  mode: ReadingMode;
  onChange: (mode: ReadingMode) => void;
}) {
  return (
    <div className="reading-mode-picker" aria-label="Reading mode">
      <Languages size={16} />
      {MODES.map((item) => <button key={item.value} className={mode === item.value ? "active" : ""} onClick={() => onChange(item.value)}>{item.label}</button>)}
    </div>
  );
}

export function CoveragePanel({
  state,
  action,
  onStart,
}: {
  state: TranslationCoverageState;
  action: "idle" | "starting" | "next";
  onStart: (percent: 5 | 10 | 25 | 100) => void;
}) {
  const coverage = state.coverage;
  if (state.status === "loading" && !coverage) {
    return <p className="translation-notice"><LoaderCircle className="spin" size={15} />Loading translation coverage…</p>;
  }
  if (state.status === "error") {
    return <p className="translation-notice">Translation coverage unavailable: {state.error}</p>;
  }
  if (coverage && coverage.status !== "missing") {
    const progress = `${coverage.ready_sections} / ${coverage.target_sections}`;
    const failed = coverage.failed_sections > 0 ? ` ${coverage.failed_sections} section(s) need retrying.` : "";
    return <section className="translation-status" aria-label="Vietnamese bilingual translation status">
      <div><strong>Vietnamese translation</strong><span>{progress} sections ready.{failed}</span></div>
      <small>{coverage.status === "running" ? (coverage.current_chunk && coverage.total_chunks ? `Translating part ${coverage.current_chunk} of ${coverage.total_chunks}…` : "Translating in the background…") : "You can move between sections while translations run in the background."}</small>
    </section>;
  }
  return <section className="coverage-panel" aria-label="Prepare bilingual translation">
    <div className="coverage-heading"><strong>Prepare Vietnamese bilingual reading</strong><span>Choose a starting range</span></div>
    <p>The translation runs in the background. You can extend it one section at a time with the next-page control.</p>
    <div className="coverage-options">
      {([5, 10, 25, 100] as const).map((percent) => <button key={percent} disabled={action !== "idle"} onClick={() => onStart(percent)}>{action === "starting" ? "Preparing…" : percent === 100 ? "Full book" : `${percent}%`}</button>)}
    </div>
  </section>;
}

export function TranslationContent({
  state,
  language,
  docId,
  className,
  onRepairContent,
  showContentRepairControls,
  contentOverride,
  articleClassName,
}: {
  state: TranslationState;
  language: string;
  docId: string;
  className?: string;
  articleClassName?: string;
  onRepairContent?: (content: string, context: string, kind: "formula" | "markdown" | "region") => Promise<string>;
  showContentRepairControls?: boolean;
  contentOverride?: string | null;
}) {
  const notice = translationNotice(state);
  if (notice) return <p className="translation-notice">{state.status === "loading" && <LoaderCircle className="spin" size={15} />}{notice}</p>;
  if (!canShowTranslation(state)) return null;
  const warning = translationWarning(state);
  return <section className={`translation-content ${articleClassName ?? ""}`.trim()} aria-label={`${language} translation`}>
    {warning && <p className="translation-warning"><TriangleAlert size={15} />{warning}</p>}
    <MarkdownArticle source={resolveBookGraphImageLinks(contentOverride ?? state.translation!.content!, docId)} className={className} onRepairContent={onRepairContent} showContentRepairControls={showContentRepairControls} />
  </section>;
}
