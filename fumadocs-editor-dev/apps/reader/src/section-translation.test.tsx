// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { getSectionTranslation, getTranslationCoverage, retrySectionTranslation, startTranslationCoverage, type SectionTranslation, type TranslationCoverage } from "./api";
import { useSectionTranslation } from "./section-translation";

vi.mock("./api", () => ({
  getSectionTranslation: vi.fn(), getTranslationCoverage: vi.fn(),
  retrySectionTranslation: vi.fn(), startTranslationCoverage: vi.fn(),
}));

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
function translation(id = "book.a", content: string | null = `Translation ${id}`): SectionTranslation {
  return { doc_id: id.split(".")[0], section_id: id, lang: "vi", status: content ? "fresh" : "missing", content,
    translated_title: id, includes_assets: true, section_has_assets: false, alignment_status: null,
    missing_assets: [], structure_issues: [] };
}
function coverage(overrides: Partial<TranslationCoverage> = {}): TranslationCoverage {
  return { doc_id: "book", lang: "vi", requested_percent: 0, total_sections: 3, target_sections: 1,
    ready_sections: 0, pending_sections: 1, failed_sections: 0, status: "running",
    current_section_id: "book.a", next_section_id: "book.b", failures: {}, ...overrides };
}

let root: Root;
let state: ReturnType<typeof useSectionTranslation>;
function Reader({ id = "book.a" }: { id?: string }) {
  state = useSectionTranslation(id.split(".")[0], id, "vi");
  return <div>{state.translationState.translation?.content}</div>;
}
async function open(id = "book.a") { await act(async () => root.render(<Reader id={id} />)); }
beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.resetAllMocks();
  root = createRoot(document.createElement("div"));
  vi.mocked(getSectionTranslation).mockImplementation(async (_doc, id) => translation(id));
  vi.mocked(getTranslationCoverage).mockResolvedValue(coverage());
  vi.mocked(retrySectionTranslation).mockResolvedValue(coverage());
});
afterEach(async () => { await act(async () => root.unmount()); vi.useRealTimers(); vi.unstubAllGlobals(); });

it("ignores a section's initial response after navigating elsewhere", async () => {
  const old = deferred<SectionTranslation>();
  vi.mocked(getSectionTranslation).mockImplementation(async (_doc, id) => id === "book.a" ? old.promise : translation(id));
  await open();
  await open("book.b");
  await act(async () => old.resolve(translation()));
  expect(state.translationState.translation?.section_id).toBe("book.b");
});

it("does not let a late translation request replace the next section or restart its old polling", async () => {
  const request = deferred<TranslationCoverage>();
  vi.mocked(retrySectionTranslation).mockReturnValue(request.promise);
  await open();
  await act(async () => { void state.requestCurrentTranslation(); });
  expect(state.translationAction).toBe("next");
  await open("book.b");
  expect(state.translationAction).toBe("idle");
  await act(async () => request.resolve(coverage()));
  await act(async () => vi.advanceTimersByTimeAsync(3000));
  expect(state.translationState.translation?.section_id).toBe("book.b");
  expect(retrySectionTranslation).toHaveBeenCalledExactlyOnceWith("book", "vi", "book.a", true);
  expect(getSectionTranslation).toHaveBeenLastCalledWith("book", "book.b", "vi");
});

it.each([false, true])("ignores stale poll success/error after navigation (error=%s)", async (fail) => {
  await open();
  const poll = deferred<SectionTranslation>();
  vi.mocked(getTranslationCoverage).mockResolvedValue(coverage({ ready_sections: 1, status: "ready" }));
  vi.mocked(getSectionTranslation).mockImplementation(async (_doc, id) => id === "book.a" ? poll.promise : translation(id));
  await act(async () => vi.advanceTimersByTimeAsync(1500));
  await open("book.b");
  await act(async () => { if (fail) poll.reject(new Error("old section failed")); else poll.resolve(translation()); });
  expect(state.translationState.status).toBe("ready");
  expect(state.translationState.translation?.section_id).toBe("book.b");
});

it("loads a background result when returning to its section, without requesting translation again", async () => {
  vi.mocked(getSectionTranslation).mockImplementation(async (_doc, id) => translation(id, null));
  await open();
  await act(async () => { void state.requestCurrentTranslation(); });
  await open("book.b");
  await open();
  vi.mocked(getTranslationCoverage).mockResolvedValue(coverage({ status: "ready", ready_sections: 1 }));
  vi.mocked(getSectionTranslation).mockImplementation(async (_doc, id) => translation(id));
  await act(async () => vi.advanceTimersByTimeAsync(1500));
  expect(state.translationState.translation?.content).toBe("Translation book.a");
  expect(retrySectionTranslation).toHaveBeenCalledTimes(1);
});

it("does not accept an earlier visit's response after leaving and returning to the same section", async () => {
  const first = deferred<SectionTranslation>();
  vi.mocked(getSectionTranslation).mockReturnValueOnce(first.promise);
  await open();
  await open("book.b");
  await open();
  await act(async () => first.resolve(translation("book.a", "outdated result")));
  expect(state.translationState.translation?.content).toBe("Translation book.a");
});

it("refuses content whose response identifies a different section", async () => {
  vi.mocked(getSectionTranslation).mockResolvedValue(translation("book.b"));
  await open();
  expect(state.translationState.translation).toBeNull();
  expect(state.translationState.error).toMatch(/does not match/);
});

it("keeps the current section's pending request when a different section's request finishes", async () => {
  const a = deferred<TranslationCoverage>();
  const b = deferred<TranslationCoverage>();
  vi.mocked(retrySectionTranslation).mockReturnValueOnce(a.promise).mockReturnValueOnce(b.promise);
  await open();
  await act(async () => { void state.requestCurrentTranslation(); });
  await open("book.b");
  await act(async () => { void state.requestCurrentTranslation(); });
  await act(async () => a.resolve(coverage()));
  expect(state.translationAction).toBe("next");
  expect(state.translationState.translation?.section_id).toBe("book.b");
  await act(async () => b.resolve(coverage({ status: "ready", ready_sections: 2 })));
  expect(state.translationAction).toBe("idle");
});

it("ignores late coverage responses from another book", async () => {
  const request = deferred<TranslationCoverage>();
  vi.mocked(startTranslationCoverage).mockReturnValue(request.promise);
  await open();
  await act(async () => { void state.startCoverage(5); });
  vi.mocked(getTranslationCoverage).mockResolvedValue(coverage({ doc_id: "other" }));
  await open("other.a");
  await act(async () => request.resolve(coverage()));
  expect(state.coverageState.coverage?.doc_id).toBe("other");
  expect(state.translationAction).toBe("idle");
});

it("does not stop waiting because an unrelated section failed", async () => {
  vi.mocked(getSectionTranslation).mockImplementation(async (_doc, id) => translation(id, null));
  vi.mocked(getTranslationCoverage).mockResolvedValue(coverage({ status: "failed", failures: { "book.b": "Failed B" } }));
  await open();
  await act(async () => { void state.requestCurrentTranslation(); });
  expect(state.translationAction).toBe("next");
  expect(state.translationState.error).toBeNull();
  vi.mocked(getTranslationCoverage).mockResolvedValue(coverage({ status: "failed", failures: { "book.a": "Failed A" } }));
  await act(async () => vi.advanceTimersByTimeAsync(1500));
  expect(state.translationState.error).toBe("Failed A");
  expect(state.translationAction).toBe("idle");
});

it("clears polling on unmount, including after a pending request completes", async () => {
  const request = deferred<TranslationCoverage>();
  vi.mocked(retrySectionTranslation).mockReturnValue(request.promise);
  await open();
  await act(async () => { void state.requestCurrentTranslation(); });
  await act(async () => root.unmount());
  const count = vi.mocked(getTranslationCoverage).mock.calls.length;
  await act(async () => request.resolve(coverage()));
  await act(async () => vi.advanceTimersByTimeAsync(5000));
  expect(getTranslationCoverage).toHaveBeenCalledTimes(count);
  expect(vi.getTimerCount()).toBe(0);
  // afterEach owns a fresh, mounted root.
  root = createRoot(document.createElement("div"));
});
