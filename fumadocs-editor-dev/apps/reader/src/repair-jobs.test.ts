// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { repairSectionContent, setRuntimeApiBaseUrl, type ContentRepairJob } from "./api";

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); setRuntimeApiBaseUrl(null); });
const job: ContentRepairJob = {
  job_id: "a".repeat(64), status: "running", current_part: 1, total_parts: 19,
  error: null, result: null, updated_at: new Date().toISOString(),
};
const result = {
  doc_id: "book", section_id: "book.section", kind: "markdown", source_hash: "abc",
  title: "Title", content: "broken", repaired_content: "fixed", created_at: "now", accepted_at: null,
};

it("waits for a background repair beyond the former deadline and reports part progress", async () => {
  vi.useFakeTimers();
  let done = false;
  const fetch = vi.fn().mockImplementation(async () => ({ ok: true, json: async () => done
    ? { ...job, status: "ready", result } : job }));
  vi.stubGlobal("fetch", fetch);
  const progress = vi.fn();
  let settled = false;
  const pending = repairSectionContent("book", "book.section", "broken", "", "markdown", progress)
    .then(value => { settled = true; return value; });
  await vi.advanceTimersByTimeAsync(150_000);
  expect(settled).toBe(false);
  expect(progress).toHaveBeenCalledWith(expect.objectContaining({ current_part: 1, total_parts: 19 }));
  expect(fetch.mock.calls[0][1].method).toBe("POST");
  expect(fetch.mock.calls.slice(1).every(([path]) => path.endsWith(job.job_id))).toBe(true);
  done = true;
  await vi.advanceTimersByTimeAsync(800);
  await expect(pending).resolves.toMatchObject({ repaired_content: "fixed" });
});

it("preserves the section's endpoint when another book is opened during repair", async () => {
  vi.useFakeTimers();
  setRuntimeApiBaseUrl("http://127.0.0.1:40001");
  const fetch = vi.fn()
    .mockResolvedValueOnce({ ok: true, json: async () => job })
    .mockResolvedValueOnce({ ok: true, json: async () => ({ ...job, status: "ready", result }) });
  vi.stubGlobal("fetch", fetch);
  const pending = repairSectionContent("book", "book.section", "broken", "", "markdown");
  await vi.advanceTimersByTimeAsync(0);
  setRuntimeApiBaseUrl("http://127.0.0.1:40002");
  await vi.advanceTimersByTimeAsync(800);
  await pending;
  expect(fetch.mock.calls.every(([path]) => path.startsWith("http://127.0.0.1:40001/"))).toBe(true);
});

it("shows the actual failed part error and permits reconnecting on retry", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({
    ...job, status: "failed", error: "Repair part 3/19 timed out. Retry to resume.",
  }) }));
  await expect(repairSectionContent("book", "book.section", "broken", "", "markdown"))
    .rejects.toThrow("Repair part 3/19");
});

it("does not leave the UI loading forever if a short polling request hangs", async () => {
  vi.useFakeTimers();
  vi.stubGlobal("fetch", vi.fn(() => new Promise(() => {})));
  const pending = expect(repairSectionContent("book", "book.section", "broken", "", "markdown"))
    .rejects.toThrow("retry to reconnect");
  await vi.advanceTimersByTimeAsync(15_000);
  await pending;
});
