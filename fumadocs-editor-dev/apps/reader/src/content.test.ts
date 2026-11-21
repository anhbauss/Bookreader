// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { loadSection } from "./content";

afterEach(() => { vi.unstubAllGlobals(); window.history.replaceState({}, "", "/"); });

const section = {
  id: "book.major", doc_id: "book", title: "1.1 Topic", level: 2,
  heading_path: ["Chapter", "1.1 Topic"], page_start: 1, page_end: 3,
  text: "Full section.", prev_id: null, next_id: null, block_ids: ["b1"],
};

describe("section regrouping redirects", () => {
  it("updates old deep links to the new parent while retaining reading mode", async () => {
    window.history.replaceState({}, "", "/?doc=book&section=detail&mode=bilingual");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ...section, redirected_from: "book.detail" }) }));
    const loaded = await loadSection("book", "detail");
    expect(loaded.bookgraph.id).toBe("book.major");
    const params = new URLSearchParams(window.location.search);
    expect(params.get("section")).toBe("major");
    expect(params.get("mode")).toBe("bilingual");
  });

  it("still rejects mismatched content without an explicit matching redirect", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ...section, redirected_from: "book.other" }) }));
    await expect(loadSection("book", "detail")).rejects.toThrow("does not match");
  });

  it("does not accept a redirect to a different document", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ...section, id: "other.major", doc_id: "other", redirected_from: "book.detail" }) }));
    await expect(loadSection("book", "detail")).rejects.toThrow("does not match");
  });
});

it("loads grounded book authors and keeps editors distinct", async () => {
  const { loadDocumentMetadata } = await import("./content");
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ documents: [
    { doc_id: "book", title: "Actual title", authors: ["Jane Doe"], editors: [] },
  ] }) }));
  await expect(loadDocumentMetadata("book")).resolves.toEqual({ title: "Actual title", author: "Jane Doe" });
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ documents: [
    { doc_id: "book", title: "Actual title", authors: [], editors: ["Jane Doe"] },
  ] }) }));
  await expect(loadDocumentMetadata("book")).resolves.toEqual({ title: "Actual title", author: "Edited by Jane Doe" });
});

it("does not invent a default author when metadata is missing", async () => {
  const { loadDocumentMetadata } = await import("./content");
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ documents: [
    { doc_id: "book", title: "Actual title" },
  ] }) }));
  await expect(loadDocumentMetadata("book")).resolves.toEqual({ title: "Actual title", author: "" });
});
