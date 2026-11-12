import { describe, expect, it } from "vitest";
import { canShowTranslation, resolveReadingMode, translationNotice, type TranslationState } from "./translation";

const fresh: TranslationState = {
  status: "ready",
  error: null,
  translation: {
    lang: "vi",
    doc_id: "signals",
    section_id: "signals.sampling",
    status: "fresh",
    content: "Bản dịch.",
    includes_assets: true,
    section_has_assets: false,
    alignment_status: "aligned",
  },
};

describe("translation reader state", () => {
  it("supports original, translation, and bilingual modes", () => {
    expect(resolveReadingMode(null)).toBe("original");
    expect(resolveReadingMode("translation")).toBe("translation");
    expect(resolveReadingMode("bilingual")).toBe("bilingual");
    expect(resolveReadingMode("edit")).toBe("original");
  });

  it("shows only fresh content and preserves the original for stale content", () => {
    expect(canShowTranslation(fresh)).toBe(true);
    expect(translationNotice(fresh)).toBeNull();
    const stale: TranslationState = { ...fresh, translation: { ...fresh.translation!, status: "stale" } };
    expect(canShowTranslation(stale)).toBe(false);
    expect(translationNotice(stale)).toMatch(/older/i);
  });

  it("reports pending, missing, and error states without failing the original reader", () => {
    expect(translationNotice({ status: "loading", translation: null, error: null })).toMatch(/loading/i);
    expect(translationNotice({ status: "ready", translation: { ...fresh.translation!, status: "missing", content: null }, error: null })).toMatch(/no translation/i);
    expect(translationNotice({ status: "error", translation: null, error: "network" })).toMatch(/network/i);
  });
});
