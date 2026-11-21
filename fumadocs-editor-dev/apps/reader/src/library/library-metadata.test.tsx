// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { LibraryPage } from "./library-page";
import type { AppSettings, LibraryBook } from "../desktop";

let container: HTMLDivElement;
let root: Root;
const settings: AppSettings = { version: 1, onboardingCompleted: true, displayName: "Reader", provider: "openai-compatible", providerBaseUrl: "", model: "", targetLanguage: "vi", profileImagePath: null, libraryRoot: "/books" };
const initial: LibraryBook = { id: "book-id", title: "Local title", folderName: "filename-default", status: "ready", documentId: "book", sectionCount: 12, progressPercent: 0, reason: null, coverImagePath: "/books/book/metadata/cover.jpg", metadataStatus: "not_requested", authors: [] };
const ready: LibraryBook = { ...initial, title: "Real Book Title", authors: ["Jane Doe"], metadataStatus: "ready" };
const api = { scanLibrary: vi.fn(), enrichBookMetadata: vi.fn(), saveAppSettings: vi.fn() };
beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("__BOOKGRAPH_DESKTOP__", api);
  vi.resetAllMocks();
  container = document.createElement("div"); document.body.append(container); root = createRoot(container);
});
afterEach(async () => { await act(async () => root.unmount()); container.remove(); vi.unstubAllGlobals(); });

it("fills newly discovered books once, shows AI status and displays the real cover and author", async () => {
  let complete!: (result: object) => void;
  api.scanLibrary.mockResolvedValueOnce({ libraryName: "Books", books: [initial] })
    .mockResolvedValue({ libraryName: "Books", books: [ready] });
  api.enrichBookMetadata.mockImplementation(() => new Promise(resolve => { complete = resolve; }));
  await act(async () => root.render(<LibraryPage settings={settings} onSettingsChanged={vi.fn()} onOpenBook={vi.fn()} />));
  expect(api.enrichBookMetadata).toHaveBeenCalledTimes(1);
  expect(container.textContent).toContain("Reading book details with AI");
  expect(container.querySelector(".book-cover img")?.getAttribute("src")).toBe(initial.coverImagePath);
  expect(container.querySelector(".book-author")?.textContent).toBe("Author not identified");
  await act(async () => complete({ doc_id: "book", ai_status: "ready", error: null }));
  expect(container.textContent).toContain("Real Book Title");
  expect(container.querySelector(".book-author")?.textContent).toBe("Jane Doe");
  await act(async () => (container.querySelector(".library-rescan") as HTMLButtonElement).click());
  expect(api.enrichBookMetadata).toHaveBeenCalledTimes(1);
});

it("automatically fills details regardless of legacy preference and skips details already cached", async () => {
  api.scanLibrary.mockResolvedValueOnce({ libraryName: "Books", books: [initial] }).mockResolvedValue({ libraryName: "Books", books: [ready] });
  await act(async () => root.render(<LibraryPage settings={{ ...settings, autoBookMetadata: false } as AppSettings} onSettingsChanged={vi.fn()} onOpenBook={vi.fn()} />));
  expect(api.enrichBookMetadata).toHaveBeenCalledTimes(1);
  expect(container.querySelector(".book-metadata-setting")).toBeNull();
  await act(async () => { await vi.waitFor(() => expect(container.textContent).toContain("Book details filled by AI")); });
  api.enrichBookMetadata.mockClear();
  api.scanLibrary.mockResolvedValue({ libraryName: "Books", books: [ready] });
  await act(async () => (container.querySelector(".library-rescan") as HTMLButtonElement).click());
  await act(async () => root.render(<LibraryPage settings={settings} onSettingsChanged={vi.fn()} onOpenBook={vi.fn()} />));
  expect(api.enrichBookMetadata).not.toHaveBeenCalled();
});

it("keeps cached editors distinct from authors", async () => {
  api.scanLibrary.mockResolvedValue({ libraryName: "Books", books: [{ ...ready, authors: [], editors: ["Jane Doe"] }] });
  await act(async () => root.render(<LibraryPage settings={settings} onSettingsChanged={vi.fn()} onOpenBook={vi.fn()} />));
  expect(container.querySelector(".book-author")?.textContent).toBe("Edited by Jane Doe");
  expect(api.enrichBookMetadata).not.toHaveBeenCalled();
});
