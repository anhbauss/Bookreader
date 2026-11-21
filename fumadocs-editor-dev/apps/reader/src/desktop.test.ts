// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { desktopApi } from "./desktop";
import { apiUrl, getDocumentReadingProgress, request, setRuntimeApiBaseUrl } from "./api";
import { resolveBookGraphImageLinks } from "./markdown";

afterEach(() => {
  setRuntimeApiBaseUrl(null);
  vi.unstubAllGlobals();
});

describe("desktop sidecar endpoint", () => {
  it("routes content and images to the endpoint returned by the native host", async () => {
    const invoke = vi.fn().mockResolvedValue({ docId: "book", sectionId: "book.chapter", apiBaseUrl: "http://127.0.0.1:54321" });
    vi.stubGlobal("__TAURI__", { core: { invoke } });
    const fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ documents: [] }) });
    vi.stubGlobal("fetch", fetch);
    await desktopApi().openBook("book");
    await request("/api/documents");
    expect(fetch.mock.calls[0][0]).toBe("http://127.0.0.1:54321/api/documents");
    expect(resolveBookGraphImageLinks("![Figure](images/test.jpg)", "book")).toBe("![Figure](http://127.0.0.1:54321/api/assets/book/test.jpg)");
    await desktopApi().backToLibrary();
    expect(apiUrl("/api/documents")).toBe("/api/documents");
  });

  it("restores the native endpoint when bootstrapping after a refresh", async () => {
    const invoke = vi.fn().mockImplementation(async (command) => command === "get_reader_api_base_url"
      ? "http://127.0.0.1:54322" : { displayName: "Reader" });
    vi.stubGlobal("__TAURI__", { core: { invoke } });
    await desktopApi().getAppSettings();
    expect(apiUrl("/api/documents")).toBe("http://127.0.0.1:54322/api/documents");
  });

  it("does not switch endpoints when opening a book fails", async () => {
    const invoke = vi.fn().mockRejectedValue(new Error("Credential missing"));
    vi.stubGlobal("__TAURI__", { core: { invoke } });
    await expect(desktopApi().openBook("book")).rejects.toThrow("Credential missing");
    expect(apiUrl("/api/documents")).toBe("/api/documents");
  });
});


describe("reading progress across sidecar versions", () => {
  const progress = { plan_id: "book", doc_id: "book", completed: 1, total: 149 };

  it("uses the document endpoint that initializes missing reading plans", async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => progress });
    vi.stubGlobal("fetch", fetch);
    await expect(getDocumentReadingProgress("book")).resolves.toEqual(progress);
    expect(fetch.mock.calls[0][0]).toBe("/api/documents/book/progress");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("resumes progress when the running sidecar lacks the new route", async () => {
    setRuntimeApiBaseUrl("http://127.0.0.1:33791");
    const fetch = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 404, json: async () => { throw new SyntaxError("Not Found"); } })
      .mockResolvedValueOnce({ ok: true, json: async () => progress });
    vi.stubGlobal("fetch", fetch);
    await expect(getDocumentReadingProgress("book")).resolves.toEqual(progress);
    expect(fetch.mock.calls.map(([url]) => url)).toEqual([
      "http://127.0.0.1:33791/api/documents/book/progress",
      "http://127.0.0.1:33791/api/plans/book/progress",
    ]);
  });

  it.each([
    [404, { error: "not_found", message: "Document not found" }],
    [401, { message: "Authentication is required" }],
    [500, null],
  ])("preserves real backend errors (%s)", async (status, payload) => {
    const fetch = vi.fn().mockResolvedValue({ ok: false, status, json: async () => payload });
    vi.stubGlobal("fetch", fetch);
    await expect(getDocumentReadingProgress("book")).rejects.toThrow();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
