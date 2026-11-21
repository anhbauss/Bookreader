// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MarkdownArticle } from "./markdown";

const fallback = vi.hoisted(() => vi.fn());
vi.mock("./mathjax", () => ({ renderMathJax: fallback }));

let container: HTMLDivElement;
let root: Root;
beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("ResizeObserver", class { observe() {} disconnect() {} });
  fallback.mockReset();
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

async function settle() {
  await act(async () => { await new Promise((resolve) => setTimeout(resolve, 30)); });
}

async function contextMenu(element: Element) {
  await act(async () => { element.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, cancelable: true })); });
}

describe("reader rendering interactions", () => {
  it("does not add arrows for short inline glyph overhang in text or table cells", async () => {
    vi.spyOn(Element.prototype, "clientWidth", "get").mockImplementation(function (this: Element) {
      return this.classList.contains("math-inline-display") ? 25 : 20;
    });
    vi.spyOn(Element.prototype, "scrollWidth", "get").mockReturnValue(26);
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
      width: 20, height: 20, x: 0, y: 0, top: 0, left: 0, right: 20, bottom: 20, toJSON() {},
    });
    await act(async () => root.render(<MarkdownArticle source={
      "The real part $R_{S11}$ and imaginary part $I_{S11}$.\n\n| $W_m$ | $L_{s1}$ |\n| --- | --- |\n| 1 | 2 |"
    } />));
    expect(container.querySelectorAll(".math-inline")).toHaveLength(4);
    expect(container.querySelectorAll(".math-scroll-button")).toHaveLength(0);
  });

  it.each(["Text $x_1+x_2+x_3$ after.", "$$\nx_1+x_2+x_3\n$$"])("scrolls overflowing formulas with arrows: %s", async (source) => {
    let resize!: () => void;
    let width = 200;
    vi.stubGlobal("ResizeObserver", class {
      constructor(callback: () => void) { resize = callback; }
      observe() {}
      disconnect() {}
    });
    vi.spyOn(Element.prototype, "clientWidth", "get").mockImplementation(function (this: Element) {
      return this.classList.contains("math-scroll-viewport") ? width : 0;
    });
    vi.spyOn(Element.prototype, "scrollWidth", "get").mockImplementation(function (this: Element) {
      return this.classList.contains("math-scroll-viewport") ? 272 : 0;
    });
    await act(async () => root.render(<MarkdownArticle source={source} />));
    const viewport = container.querySelector(".math-scroll-viewport") as HTMLElement;
    viewport.scrollBy = vi.fn((options?: ScrollToOptions | number, _y?: number) => {
      const left = typeof options === "number" ? options : options?.left ?? 0;
      viewport.scrollLeft = Math.max(0, Math.min(272 - width, viewport.scrollLeft + left));
      viewport.dispatchEvent(new Event("scroll"));
    });
    const previous = () => container.querySelector(".math-scroll-previous") as HTMLButtonElement;
    const next = () => container.querySelector(".math-scroll-next") as HTMLButtonElement;
    expect(previous().disabled).toBe(true);
    expect(next().disabled).toBe(false);
    await act(async () => next().click());
    expect(viewport.scrollLeft).toBe(36);
    expect(previous().disabled).toBe(false);
    await act(async () => next().click());
    expect(next().disabled).toBe(true);
    await act(async () => previous().click());
    expect(viewport.scrollLeft).toBe(36);
    await act(async () => { width = 500; resize(); });
    expect(container.querySelectorAll(".math-scroll-button")).toHaveLength(0);
  });

  it("shows MathJax output before offering AI repair", async () => {
    fallback.mockReturnValue('<mjx-container><svg aria-label="derivative"></svg></mjx-container>');
    await act(async () => root.render(<MarkdownArticle source={String.raw`$\dv{f}{x}$`} onRepairContent={vi.fn()} />));
    await settle();
    expect(fallback).toHaveBeenCalledWith(String.raw`\dv{f}{x}`, false);
    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.querySelector(".math-error")).toBeNull();
    expect(container.textContent).not.toContain("Repair formula with AI");
  });

  it("offers repair after both engines fail", async () => {
    fallback.mockImplementation(() => { throw new Error("Invalid TeX"); });
    const repair = vi.fn().mockResolvedValue("$x$");
    await act(async () => root.render(<MarkdownArticle source={String.raw`$\unknownMineruCommand{x}$`} onRepairContent={repair} />));
    await settle();
    expect(container.querySelector(".math-error")).not.toBeNull();
    await contextMenu(container.querySelector(".math-repair-target")!);
    await act(async () => { (container.querySelector('[role="menuitem"]') as HTMLButtonElement).click(); });
    expect(repair).toHaveBeenCalled();
    expect(container.querySelector(".math-error")).toBeNull();
    expect(container.querySelector(".katex")).not.toBeNull();
  });

  it("repairs the selected occurrence of repeated paragraphs", async () => {
    const repair = vi.fn().mockResolvedValue("Changed paragraph.");
    await act(async () => root.render(<MarkdownArticle source={"Same paragraph.\n\nSame paragraph."} onRepairContent={repair} showContentRepairControls />));
    await contextMenu(container.querySelectorAll("p")[1]);
    expect([...container.querySelectorAll("p")].map((p) => p.textContent)).toEqual(["Same paragraph.", "Changed paragraph."]);
    expect(repair.mock.calls[0][1]).toContain("Same paragraph.\n\n\n\n--- TARGET ---");
  });

  it("keeps formula repair attached to its source region and preserves the label", async () => {
    const repair = vi.fn().mockResolvedValue("Before.\n\n$$\nx=2\\tag{1.1}\n$$\n\nAfter.");
    const source = "Before.\n\n$$\nx=1\\tag{1.1}\n$$\n\nAfter.";
    await act(async () => root.render(<MarkdownArticle source={source} onRepairContent={repair} />));
    await contextMenu(container.querySelector(".math-display")!);
    await act(async () => { (container.querySelector('[role="menuitem"]') as HTMLButtonElement).click(); });
    expect(repair).toHaveBeenCalledWith(source, expect.any(String), "region");
    expect(container.querySelectorAll("p")).toHaveLength(2);
    expect(container.querySelector(".math-equation-tag")?.textContent).toBe("(1.1)");
    expect(container.querySelector("annotation")?.textContent).toBe("x=2");
  });

  it("ignores a late repair after navigating to a different section", async () => {
    let complete!: (value: string) => void;
    const repair = vi.fn(() => new Promise<string>((resolve) => { complete = resolve; }));
    await act(async () => root.render(<MarkdownArticle source="Old section." onRepairContent={repair} showContentRepairControls />));
    await contextMenu(container.querySelector("p")!);
    await act(async () => root.render(<MarkdownArticle source="New section." onRepairContent={repair} showContentRepairControls />));
    await act(async () => complete("Late result."));
    expect(container.textContent).toBe("New section.");
  });
});
