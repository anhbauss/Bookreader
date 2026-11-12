import { describe, expect, it } from "vitest";
import { parseSection } from "./content";
import {
  assertSectionMatchesRoute,
  canonicalSectionId,
  sectionFilename,
  sectionUrl,
  validateOutline,
  validateReaderRoute,
} from "./reader";
import type { ReaderSection } from "./types";

const section: ReaderSection = {
  title: "Sampling",
  bookgraph: {
    id: "signals.sampling",
    doc_id: "signals",
    level: 2,
    heading_path: ["Signals", "Sampling"],
    page_start: 2,
    page_end: 3,
    prev_id: "signals.introduction",
    next_id: "signals.reconstruction",
    block_ids: ["b1"],
  },
  body: "## Sampling\n\nRead-only content.",
};

describe("reader navigation contract", () => {
  it("maps BookGraph IDs to generated MDX filenames and reader URLs", () => {
    expect(sectionFilename("signals.sampling", "signals")).toBe("sampling");
    expect(canonicalSectionId("signals", "sampling")).toBe("signals.sampling");
    expect(sectionUrl("signals", "signals.sampling")).toBe("?doc=signals&section=sampling");
  });

  it("rejects traversal-shaped route values before fetching content", () => {
    expect(validateReaderRoute("signals", "sampling")).toBeNull();
    expect(validateReaderRoute("../signals", "sampling")).toMatch(/invalid/i);
    expect(validateReaderRoute("signals", "../private")).toMatch(/invalid/i);
  });

  it("does not accept MDX metadata for another document or section", () => {
    expect(assertSectionMatchesRoute(section, "signals", "sampling")).toEqual(section);
    expect(() => assertSectionMatchesRoute(section, "other", "sampling")).toThrow(/does not match/i);
    expect(() => assertSectionMatchesRoute(section, "signals", "other")).toThrow(/does not match/i);
  });

  it("does not accept an outline for another document", () => {
    expect(validateOutline({ doc_id: "signals", nodes: [] }, "signals")).toEqual({ doc_id: "signals", nodes: [] });
    expect(() => validateOutline({ doc_id: "other", nodes: [] }, "signals")).toThrow(/does not match/i);
  });
});

describe("generated MDX data boundary", () => {
  it("parses required BookGraph frontmatter without evaluating document content", () => {
    const parsed = parseSection(`---
title: "Sampling"
bookgraph:
  id: "signals.sampling"
  doc_id: "signals"
  level: 2
  heading_path: ["Signals", "Sampling"]
  page_start: 2
  page_end: 3
  prev_id: null
  next_id: "signals.reconstruction"
  block_ids: ["b1"]
---

{this remains text}`);
    expect(parsed.bookgraph.id).toBe("signals.sampling");
    expect(parsed.body).toContain("{this remains text}");
  });
});
