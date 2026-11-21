import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { CoveragePanel } from "./translation-panel";
import type { TranslationCoverage } from "./api";

const coverage: TranslationCoverage = {
  doc_id: "book", lang: "vi", requested_percent: 10, total_sections: 100,
  target_sections: 10, ready_sections: 2, pending_sections: 8, failed_sections: 0,
  status: "running", current_section_id: "book.long", current_chunk: 3, total_chunks: 19,
  next_section_id: null, failures: {},
};
it("shows progress within a long section", () => {
  const html = renderToStaticMarkup(<CoveragePanel state={{ status: "ready", coverage, error: null }} action="idle" onStart={() => {}} />);
  expect(html).toContain("Translating part 3 of 19");
  expect(html).toContain("2 / 10");
});
it("supports older sidecars without part counters", () => {
  const html = renderToStaticMarkup(<CoveragePanel state={{ status: "ready", coverage: { ...coverage, current_chunk: undefined, total_chunks: undefined }, error: null }} action="idle" onStart={() => {}} />);
  expect(html).toContain("Translating in the background");
});
