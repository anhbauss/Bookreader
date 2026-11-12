import { describe, expect, it } from "vitest";
import { planIdForDocument, progressFromMarkRead, progressPercent } from "./reading";

describe("reading progress", () => {
  it("uses the document ID as the default BookGraph plan ID", () => {
    expect(planIdForDocument("signals")).toBe("signals");
  });

  it("calculates displayed progress safely", () => {
    expect(progressPercent(null)).toBe(0);
    expect(progressPercent({ plan_id: "signals", doc_id: "signals", completed: 2, total: 4, remaining: 2, done: false, current_section_id: "signals.sampling" })).toBe(50);
  });

  it("only changes local progress after a successful mark-read response", () => {
    expect(progressFromMarkRead({ plan_id: "signals", marked: "signals.sampling", completed: 2, total: 4, done: false }, "signals")).toEqual({
      plan_id: "signals",
      doc_id: "signals",
      completed: 2,
      total: 4,
      remaining: 2,
      done: false,
      current_section_id: null,
    });
  });
});
