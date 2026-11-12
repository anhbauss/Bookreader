import { Languages, LoaderCircle, TriangleAlert } from "lucide-react";
import { MarkdownArticle } from "./markdown";
import type { ReadingMode, TranslationState } from "./translation";
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

export function TranslationContent({
  state,
  language,
}: {
  state: TranslationState;
  language: string;
}) {
  const notice = translationNotice(state);
  if (notice) return <p className="translation-notice">{state.status === "loading" && <LoaderCircle className="spin" size={15} />}{notice}</p>;
  if (!canShowTranslation(state)) return null;
  const warning = translationWarning(state);
  return <section className="translation-content" aria-label={`${language} translation`}>
    {warning && <p className="translation-warning"><TriangleAlert size={15} />{warning}</p>}
    <MarkdownArticle source={state.translation!.content!} />
  </section>;
}
