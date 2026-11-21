import { describe, expect, it } from "vitest";
import katex from "katex";
import { renderMathJax } from "./mathjax";

describe("offline MathJax fallback", () => {
  it("renders physics notation unsupported by KaTeX as self-contained SVG", () => {
    const expression = String.raw`\dv{f}{x}`;
    expect(() => katex.renderToString(expression, { throwOnError: true })).toThrow();
    const markup = renderMathJax(expression, true);
    expect(markup).toContain("<svg");
    expect(markup).toContain("<path");
    expect(markup).not.toContain("<script");
    expect(markup).not.toContain("merror");
  });

  it("rejects invalid expressions so the reader can offer repair", () => {
    expect(() => renderMathJax(String.raw`\frac{1{2}`, true)).toThrow();
    expect(() => renderMathJax(String.raw`\unknownMineruCommand{x}`, false)).toThrow();
  });

  it("does not retain user-defined macros across formulas", () => {
    renderMathJax(String.raw`\newcommand{\localonly}{x}\localonly`, false);
    expect(() => renderMathJax(String.raw`\localonly`, false)).toThrow();
  });
});
