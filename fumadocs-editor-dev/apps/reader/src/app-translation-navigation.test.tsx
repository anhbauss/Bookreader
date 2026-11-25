// @vitest-environment jsdom
import { act, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { App } from "./app";
import { getSectionTranslation, retrySectionTranslation, type SectionTranslation, type TranslationCoverage } from "./api";

vi.mock("./onboarding", () => ({
  useDesktopBootstrap: () => ({ state: { settings: {}, credential: { configured: true } }, error: null }),
  Onboarding: () => null,
}));
vi.mock("./desktop", () => ({ isDesktopApp: () => false, desktopApi: () => ({}) }));
vi.mock("./library/library-page", () => ({ LibraryPage: () => null }));
vi.mock("./reading-position", () => ({ useReadingPosition: () => ({ status: "ready", bookmarked: false }) }));
vi.mock("./reader-panels", () => ({ MemoryPanel: () => null, ProgressPanel: () => null }));
vi.mock("./markdown", () => ({
  MarkdownArticle: ({ source }: { source: string }) => <p>{source}</p>,
  resolveBookGraphImageLinks: (source: string) => source,
}));
vi.mock("./reader-experience", () => ({
  ReaderHeader: () => null,
  ReaderDrawer: ({ children }: { children: ReactNode }) => <aside>{children}</aside>,
  ReaderInsights: () => null, SearchModal: () => null, VisualSettingsPopover: () => null,
  useReaderPreferences: () => ({ font: "serif", size: "medium", theme: "paper", vertical: false }),
}));
vi.mock("./content", () => ({
  loadSection: vi.fn(async (_doc: string, id: string) => ({
    title: `Original ${id}`, body: `Body ${id}`,
    bookgraph: { id: `book.${id}`, doc_id: "book", heading_path: [], prev_id: id === "a" ? null : "book.a", next_id: id === "a" ? "book.b" : null },
  })),
  loadOutline: vi.fn(async () => ({ doc_id: "book", nodes: [
    { id: "book.a", title: "Contents A", level: 1 }, { id: "book.b", title: "Contents B", level: 1 },
  ] })),
  loadDocumentMetadata: vi.fn(async () => ({ title: "Book", author: "" })),
}));
vi.mock("./api", () => ({
  getSectionTranslation: vi.fn(), retrySectionTranslation: vi.fn(),
  getTranslationCoverage: vi.fn(async () => ({ doc_id: "book", lang: "vi", status: "running", current_section_id: "book.a", failures: {} })),
  getDocumentReadingProgress: vi.fn(async () => null), getSectionContext: vi.fn(async () => null),
}));

let root: Root;
let container: HTMLDivElement;
function button(text: string) {
  return [...container.querySelectorAll("button")].find((node) => node.textContent?.trim() === text)!;
}
function translated(id: string): SectionTranslation {
  return { doc_id: "book", section_id: id, lang: "vi", status: "fresh", content: `Vietnamese ${id}`,
    translated_title: `Title ${id}`, includes_assets: true, section_has_assets: false,
    alignment_status: null, missing_assets: [], structure_issues: [] };
}
beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.clearAllMocks();
  window.history.replaceState({}, "", "?doc=book&section=a&mode=bilingual");
  container = document.createElement("div");
  root = createRoot(container);
  vi.mocked(getSectionTranslation).mockImplementation(async (_doc, id) => translated(id));
});
afterEach(async () => { await act(async () => root.unmount()); vi.useRealTimers(); vi.unstubAllGlobals(); });

it.each(["pagination", "contents", "keyboard"])("allows %s navigation while translating and ignores late results", async (via) => {
  let complete!: (result: TranslationCoverage) => void;
  vi.mocked(retrySectionTranslation).mockReturnValue(new Promise((resolve) => { complete = resolve; }));
  await act(async () => root.render(<App />));
  await act(async () => button("Retranslate section").click());
  expect(button("Next Page").disabled).toBe(false);
  await act(async () => {
    if (via === "pagination") button("Next Page").click();
    else if (via === "contents") button("Contents B").click();
    else window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
  });
  expect(new URLSearchParams(window.location.search).get("section")).toBe("b");
  expect(button("Previous Page").disabled).toBe(false);
  expect(container.querySelector(".translation-section-title")?.textContent).toBe("Title book.b");
  await act(async () => complete({ doc_id: "book", lang: "vi", status: "ready", failures: {} } as TranslationCoverage));
  await act(async () => vi.advanceTimersByTimeAsync(3000));
  expect(new URLSearchParams(window.location.search).get("section")).toBe("b");
  expect(container.querySelector(".translation-section-title")?.textContent).toBe("Title book.b");
  expect(container.querySelector(".bilingual")?.textContent).not.toContain("Vietnamese book.a");
  await act(async () => button("Previous Page").click());
  expect(new URLSearchParams(window.location.search).get("section")).toBe("a");
});
