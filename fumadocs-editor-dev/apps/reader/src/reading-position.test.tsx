// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { getReadingPosition, saveReadingPosition } from "./api";
import { useReadingPosition } from "./reading-position";

vi.mock("./api", () => ({ getReadingPosition: vi.fn(), saveReadingPosition: vi.fn() }));
let root: Root;
let container: HTMLDivElement;
let state: ReturnType<typeof useReadingPosition>;
const resume = vi.fn();
function Reader({ section = "book.first" }: { section?: string }) {
  state = useReadingPosition("book", section, resume);
  return <button onClick={() => void state.toggle()} disabled={state.status !== "ready"} aria-pressed={state.bookmarked}>{state.message}</button>;
}
beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.resetAllMocks();
  container = document.createElement("div");
  root = createRoot(container);
});
afterEach(async () => { await act(async () => root.unmount()); vi.unstubAllGlobals(); });

it("resumes the saved section on opening and leaves subsequent navigation alone", async () => {
  vi.mocked(getReadingPosition).mockResolvedValue({ doc_id: "book", section_id: "book.second" });
  await act(async () => root.render(<Reader />));
  expect(resume).toHaveBeenCalledExactlyOnceWith("book.second");
  await act(async () => root.render(<Reader section="book.second" />));
  expect(state.bookmarked).toBe(true);
  await act(async () => root.render(<Reader section="book.third" />));
  expect(state.bookmarked).toBe(false);
  expect(resume).toHaveBeenCalledTimes(1);
});

it("saves the current section, moves the position, and removes it on a second click", async () => {
  vi.mocked(getReadingPosition).mockResolvedValue({ doc_id: "book", section_id: null });
  vi.mocked(saveReadingPosition).mockImplementation(async (doc_id, section_id) => ({ doc_id, section_id }));
  await act(async () => root.render(<Reader />));
  await act(async () => container.querySelector("button")!.click());
  expect(saveReadingPosition).toHaveBeenLastCalledWith("book", "book.first");
  expect(state.bookmarked).toBe(true);
  await act(async () => root.render(<Reader section="book.second" />));
  await act(async () => container.querySelector("button")!.click());
  expect(saveReadingPosition).toHaveBeenLastCalledWith("book", "book.second");
  await act(async () => container.querySelector("button")!.click());
  expect(saveReadingPosition).toHaveBeenLastCalledWith("book", null);
  expect(state.bookmarked).toBe(false);
});

it("keeps the previous position and reports a failed save", async () => {
  vi.mocked(getReadingPosition).mockResolvedValue({ doc_id: "book", section_id: null });
  vi.mocked(saveReadingPosition).mockRejectedValue(new Error("Disk full"));
  await act(async () => root.render(<Reader />));
  await act(async () => container.querySelector("button")!.click());
  expect(state.bookmarked).toBe(false);
  expect(state.message).toBe("Disk full");
  expect(state.status).toBe("ready");
});

it("does not interrupt navigation while the saved position is loading", async () => {
  let resolve!: (value: { doc_id: string; section_id: string }) => void;
  vi.mocked(getReadingPosition).mockReturnValue(new Promise((done) => { resolve = done; }));
  await act(async () => root.render(<Reader />));
  await act(async () => root.render(<Reader section="book.third" />));
  await act(async () => resolve({ doc_id: "book", section_id: "book.second" }));
  expect(resume).not.toHaveBeenCalled();
});
