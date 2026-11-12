import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MarkdownArticle } from "./markdown";

describe("MarkdownArticle math rendering", () => {
  it("typesets inline LaTeX with KaTeX", () => {
    const html = renderToStaticMarkup(<MarkdownArticle source="The value is $\\frac{1}{2}$." />);

    expect(html).toContain('class="math-inline"');
    expect(html).toContain('class="katex"');
    expect(html).toContain("frac");
    expect(html).not.toContain("math-error");
  });

  it("typesets display LaTeX without rendering its source as a paragraph", () => {
    const html = renderToStaticMarkup(
      <MarkdownArticle source={"$$\nE _ {x} = \\sum _ {n} |x[n]| ^ {2}\n$$"} />,
    );

    expect(html).toContain('class="math-display"');
    expect(html).toContain('class="katex-display"');
    expect(html).not.toContain("<p>");
  });

  it("renders fenced source code as a code block", () => {
    const html = renderToStaticMarkup(
      <MarkdownArticle source={"```python\nx = np.arange(3)\n```"} />,
    );

    expect(html).toContain("<pre>");
    expect(html).toContain("x = np.arange(3)");
  });

  it("renders HTML superscripts and subscripts instead of source tags", () => {
    const html = renderToStaticMarkup(
      <MarkdownArticle source="The sample period is T<sub>s</sub>; reference<sup>1</sup>." />,
    );

    expect(html).toContain("T<sub>s</sub>");
    expect(html).toContain("reference<sup>1</sup>");
    expect(html).not.toContain("&lt;sub&gt;");
    expect(html).not.toContain("&lt;sup&gt;");
  });

  it("typesets raw LaTeX in a table cell", () => {
    const html = renderToStaticMarkup(
      <MarkdownArticle source={"| Rule | Value |\n| --- | --- |\n| Delay | x _ \\{0\\} = \\frac \\{1\\}\\{2\\} |"} />,
    );

    expect(html).toContain('class="katex"');
    expect(html).toContain('class="mfrac"');
    expect(html).toContain('<annotation encoding="application/x-tex">x _ {0} = \\frac {1}{2}</annotation>');
  });

  it("keeps escaped pipes inside a LaTeX table cell", () => {
    const html = renderToStaticMarkup(
      <MarkdownArticle source={"| Region | Value |\n| --- | --- |\n| ROC | $\\|a\\|r_{1}<\\|z\\|<\\|a\\|r_{2}$ |"} />,
    );

    expect(html).toContain('class="katex"');
    expect(html).toContain("r_{1}");
    expect(html.match(/<td>/g)).toHaveLength(2);
  });

  it("typesets a standalone raw LaTeX formula", () => {
    const html = renderToStaticMarkup(
      <MarkdownArticle source="x (t - t _ \\{0\\}) \\stackrel \\{\\mathrm\\{FS\\}\\} \\{\\longleftrightarrow\\} c _ \\{k\\}" />,
    );

    expect(html).toContain('class="math-display"');
    expect(html).toContain('class="katex-display"');
  });

  it("renders tagged display math instead of exposing its TeX source", () => {
    const html = renderToStaticMarkup(
      <MarkdownArticle source={"$$\n\\begin{array}{r c l} x & = & \\frac{1}{2} \\end{array} \\tag{2.71}\n$$"} />,
    );

    expect(html).toContain('class="katex-display"');
    expect(html).toContain('class="mfrac"');
    expect(html).not.toContain("math-error");
  });

  it("typesets an undelimited fraction block", () => {
    const html = renderToStaticMarkup(
      <MarkdownArticle source="\\frac {e ^ {- t}}{1 + \\Omega_ {0} ^ {2}} + \\frac {\\cos (\\Omega_ {0} t) + \\Omega_ {0} \\sin (\\Omega_ {0} t)}{1 + \\Omega_ {0} ^ {2}}" />,
    );

    expect(html).toContain('class="math-display"');
    expect(html).toContain('class="mfrac"');
    expect(html).not.toContain("math-error");
  });
});
