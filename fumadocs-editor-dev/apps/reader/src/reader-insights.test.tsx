// @vitest-environment jsdom
import { act, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { ReaderHeader, ReaderInsights } from "./reader-experience";

let container: HTMLDivElement;
let root: Root;
beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => { await act(async () => root.unmount()); container.remove(); vi.unstubAllGlobals(); });

function Reader() {
  const [open, setOpen] = useState(false);
  return <>
    <ReaderHeader title="Book" author="Author" onSearch={() => {}} onSettings={() => {}} onPanel={() => {}} onBookmark={() => {}} bookmarked={false} onLibrary={() => {}} insightsOpen={open} onInsights={() => setOpen(!open)} />
    <ReaderInsights open={open} onClose={() => setOpen(false)}><p>Progress</p><p>Concepts & annotations</p></ReaderInsights>
  </>;
}

it("hides the cards by default and toggles both with the header button", async () => {
  await act(async () => root.render(<Reader />));
  const toggle = container.querySelector('[aria-controls="reader-insights"]') as HTMLButtonElement;
  const panel = container.querySelector("#reader-insights")!;
  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  expect(panel.hasAttribute("inert")).toBe(true);
  await act(async () => toggle.click());
  expect(toggle.getAttribute("aria-expanded")).toBe("true");
  expect(panel.hasAttribute("inert")).toBe(false);
  expect(panel.textContent).toContain("Progress");
  expect(panel.textContent).toContain("Concepts & annotations");
  await act(async () => toggle.click());
  expect(panel.getAttribute("aria-hidden")).toBe("true");
});

it("closes with Escape or the close button and restores focus to the toggle", async () => {
  await act(async () => root.render(<Reader />));
  const toggle = container.querySelector('[aria-controls="reader-insights"]') as HTMLButtonElement;
  toggle.focus();
  await act(async () => toggle.click());
  const close = container.querySelector('[aria-label="Close progress and memory"]') as HTMLButtonElement;
  expect(document.activeElement).toBe(close);
  await act(async () => close.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })));
  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  expect(document.activeElement).toBe(toggle);
  await act(async () => toggle.click());
  await act(async () => close.click());
  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  expect(document.activeElement).toBe(toggle);
});
