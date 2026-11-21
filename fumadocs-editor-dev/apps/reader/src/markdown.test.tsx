// @vitest-environment jsdom
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MarkdownArticle, resolveBookGraphImageLinks } from "./markdown";
import bishopFixture from "./fixtures/mineru-bishop.md?raw";

describe("MarkdownArticle math rendering", () => {
  it("rewrites workspace image links through the BookGraph assets API", () => {
    expect(
      resolveBookGraphImageLinks(
        "![Figure](images/figure one.jpg)",
        "signals",
      ),
    ).toBe("![Figure](/api/assets/signals/figure%20one.jpg)");
  });

  it("typesets inline LaTeX with KaTeX", () => {
    const html = renderToStaticMarkup(<MarkdownArticle source="The value is $\\frac{1}{2}$." />);

    expect(html).toContain("math-inline");
    expect(html).toContain('class="katex"');
    expect(html).toContain("frac");
    expect(html).not.toContain("math-error");
  });

  it("waits for MathJax before offering AI repair", () => {
    const html = renderToStaticMarkup(
      <MarkdownArticle source="$$\\frac{1{2}$$" onRepairContent={async () => "\\frac{1}{2}"} />,
    );

    expect(html).toContain("math-pending");
    expect(html).not.toContain("Repair formula with AI");
    expect(html).not.toContain('class="katex-display"');
  });

  it("typesets display LaTeX without rendering its source as a paragraph", () => {
    const html = renderToStaticMarkup(
      <MarkdownArticle source={"$$\nE _ {x} = \\sum _ {n} |x[n]| ^ {2}\n$$"} />,
    );

    expect(html).toContain('class="math-display math-repair-target"');
    expect(html).toContain('class="katex-display"');
    expect(html).not.toContain("<p>");
  });

  it("renders fenced source code as a code block", () => {
    const html = renderToStaticMarkup(
      <MarkdownArticle source={"```python\nx = np.arange(3)\n```"} />,
    );

    expect(html).toContain("<pre>");
    expect(new DOMParser().parseFromString(html, "text/html").querySelector("pre code")?.textContent).toBe("x = np.arange(3)\n");
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

  it("renders emphasis without interpreting TeX or inline code as Markdown", () => {
    const html = renderToStaticMarkup(
      <MarkdownArticle source="A **noninformative prior** (*prior*) has $p(\\lambda)=\\mathrm{const}$ and `**literal**`." />,
    );

    expect(html).toContain("<strong>noninformative prior</strong>");
    expect(html).toContain("<em>prior</em>");
    expect(html).toContain('class="katex"');
    expect(html).toContain("**literal**");
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

    expect(html).toContain('class="math-display math-repair-target"');
    expect(html).toContain('class="katex-display"');
  });

  it("renders tagged display math instead of exposing its TeX source", () => {
    const html = renderToStaticMarkup(
      <MarkdownArticle source={"$$\n\\begin{array}{r c l} x & = & \\frac{1}{2} \\end{array} \\tag{2.71}\n$$"} />,
    );

    expect(html).toContain('class="katex-display"');
    expect(html).toContain('class="mfrac"');
    expect(html).toContain('class="math-equation-tag"');
    expect(html).toContain(">(2.71)<");
    expect(html).not.toContain("math-error");
  });

  it("renders a tag for an undelimited equation block", () => {
    const html = renderToStaticMarkup(
      <MarkdownArticle source="p (X) = \\sum_ {Y} p (X | Y) p (Y).\\tag{1.13}" />,
    );

    expect(html).toContain('class="math-equation-tag"');
    expect(html).toContain(">(1.13)<");
    expect(html).toContain('class="katex-display"');
  });

  it("renders a tag from generated MDX with escaped TeX braces", () => {
    const html = renderToStaticMarkup(
      <MarkdownArticle source="\\mu_ \\{k\\} = - m _ \\{k\\} / \\lambda .\\tag\\{2.32\\}" />,
    );

    expect(html).toContain('class="math-equation-tag"');
    expect(html).toContain(">(2.32)<");
    expect(html).toContain('class="katex-display"');
  });


  it("typesets an undelimited fraction block", () => {
    const html = renderToStaticMarkup(
      <MarkdownArticle source="\\\\frac {e ^ {- t}}{1 + \\Omega_ {0} ^ {2}} + \\frac {\\cos (\\Omega_ {0} t) + \\Omega_ {0} \\sin (\\Omega_ {0} t)}{1 + \\Omega_ {0} ^ {2}}" />,
    );

    expect(html).toContain('class="math-display math-repair-target"');
    expect(html).toContain('class="mfrac"');
    expect(html).not.toContain("math-error");
  });
});

describe("MinerU Markdown compatibility", () => {
  const render = (source: string) => renderToStaticMarkup(<MarkdownArticle source={source} />);

  it("preserves merged HTML cells, emphasis, scripts, and eq formulas", () => {
    const html = render('<table><tr><th colspan="2">Weights</th></tr><tr><td rowspan="2"><strong>A</strong><sub>1</sub></td><td><eq>\\frac{1}{2}</eq></td></tr><tr><td>x<sup>2</sup></td></tr></table>');
    expect(html).toContain('colSpan="2"');
    expect(html).toContain('rowSpan="2"');
    expect(html).toContain("<strong>A</strong><sub>1</sub>");
    expect(html).toContain("x<sup>2</sup>");
    expect(html).toContain('class="mfrac"');
    expect(html).not.toContain("<eq>");
  });

  it("typesets dollar math inside an HTML table", () => {
    expect(render('<table><tr><td>$\\frac{1}{2}$</td></tr></table>')).toContain('class="mfrac"');
  });

  it("supports alternate TeX delimiters and embedded environments", () => {
    const html = render(String.raw`Inline \(\frac{1}{2}\).

\[x^2\]

An array: \begin{array}{cc}a & b \\ c & d\end{array} follows.`);
    expect([...html.matchAll(/application\/x-tex">([\s\S]*?)<\/annotation>/g)].map((m) => m[1])).toEqual([String.raw`\frac{1}{2}`, "x^2", String.raw`\begin{array}{cc}a &amp; b \\ c &amp; d\end{array}`]);
    expect(html).toContain("An array:");
    expect(html).toContain("follows.");
  });

  it("keeps blank lines inside fenced code and display math", () => {
    const html = render("```python\nx = 1\n\nprint(x)\n```\n\n$$\n\\begin{aligned}\na &= b \\\\\n\nc &= d\n\\end{aligned}\n$$");
    expect(new DOMParser().parseFromString(html, "text/html").querySelector("pre code")?.textContent).toBe("x = 1\n\nprint(x)\n");
    expect(html.match(/<pre>/g)).toHaveLength(1);
    expect(html).toContain('class="katex-display"');
    expect(html).not.toContain("math-pending");
  });

  it("does not change TeX, HTML or delimiters inside code", () => {
    const html = render("`<eq>x</eq>` and `\\(x\\)`\n\n~~~tex\n\\begin{matrix}a & b\\end{matrix}\n\n<eq>x</eq>\n~~~");
    expect(html).toContain("&lt;eq&gt;x&lt;/eq&gt;");
    expect(html).toContain("\\(x\\)");
    expect(html).not.toContain('class="katex"');
  });

  it("leaves valid escaped TeX set braces intact", () => {
    const html = render(String.raw`$\{x\}$`);
    expect(html).toContain('application/x-tex">\\{x\\}</annotation>');
  });

  it("renders links, blockquotes, and nested lists", () => {
    const html = render("> See [reference](https://example.com).\n\n- Parent\n  - Child");
    expect(html).toContain("<blockquote>");
    expect(html).toContain('<a href="https://example.com">reference</a>');
    expect(html.match(/<ul>/g)).toHaveLength(2);
  });

  it("does not turn escaped currency into math", () => {
    const html = render(String.raw`Costs \$5 and \$10.`);
    expect(html).toContain("Costs $5 and $10.");
    expect(html).not.toContain('class="katex"');
  });

  it("removes executable HTML and unsafe URLs while preserving book tables", () => {
    const html = render('<script>alert(1)</script>\n\n<table onclick="alert(1)"><tr><td>Safe</td></tr></table>\n\n<img src="x" onerror="alert(2)"><iframe src="https://example.com"></iframe>\n\n[bad](javascript:alert%281%29)');
    expect(html).toContain("<table>");
    for (const unsafe of ["<script", "<iframe", "onclick", "onerror", "javascript:"]) expect(html).not.toContain(unsafe);
  });

  it("renders the Bishop table and equation downloaded from MinerU", () => {
    const html = render(bishopFixture);
    expect(html.match(/<tr>/g)).toHaveLength(11);
    expect(html.match(/class="katex"/g)).toHaveLength(11);
    expect(html).toContain("(1.1)");
    expect(html).not.toContain("math-pending");
    expect(html).not.toContain("math-error");
  });
});


describe("code syntax highlighting", () => {
  it("colors Python keywords, numbers, strings and comments without changing the source", () => {
    const code = '# Keep indentation\ndef check_grad(x):\n    print("difference", 1e-6)\n    return x < 2\n';
    const html = renderToStaticMarkup(<MarkdownArticle source={`\`\`\`python\n${code}\`\`\``} />);
    const element = new DOMParser().parseFromString(html, "text/html").querySelector("pre code")!;
    expect(element.textContent).toBe(code);
    expect(element.querySelector(".hljs-keyword")?.textContent).toBe("def");
    expect(element.querySelector(".hljs-comment")?.textContent).toBe("# Keep indentation");
    expect(element.querySelector(".hljs-string")?.textContent).toBe('"difference"');
    expect(element.querySelector(".hljs-number")?.textContent).toBe("1e-6");
  });

  it.each(["py", "javascript", "js", "typescript", "json", "bash", "cpp"])("supports the %s language or alias", (language) => {
    const source = language === "json" ? '{"value": 12}' : 'if (value < 12) return "text";';
    const html = renderToStaticMarkup(<MarkdownArticle source={`\`\`\`${language}\n${source}\n\`\`\``} />);
    const element = new DOMParser().parseFromString(html, "text/html").querySelector("pre code")!;
    expect(element.classList.contains("hljs")).toBe(true);
    expect(element.textContent).toBe(`${source}\n`);
  });

  it.each(["", "unknown-language"])("keeps code readable when the language is %s", (language) => {
    const source = '<script>alert("x")</script> & <tag>\n    indented';
    const html = renderToStaticMarkup(<MarkdownArticle source={`\`\`\`${language}\n${source}\n\`\`\``} />);
    const element = new DOMParser().parseFromString(html, "text/html").querySelector("pre code")!;
    expect(element.textContent).toBe(`${source}\n`);
    expect(element.querySelector("script, tag")).toBeNull();
  });

  it("keeps HTML-looking text inert inside highlighted code", () => {
    const source = 'print("<script>alert(1)</script>")';
    const html = renderToStaticMarkup(<MarkdownArticle source={`\`\`\`python\n${source}\n\`\`\``} />);
    const element = new DOMParser().parseFromString(html, "text/html").querySelector("pre code")!;
    expect(element.textContent).toBe(`${source}\n`);
    expect(element.querySelector("script")).toBeNull();
    expect(element.querySelector(".hljs-string")).not.toBeNull();
  });

  it("leaves inline code literal", () => {
    const html = renderToStaticMarkup(<MarkdownArticle source="Use `return 42` here." />);
    const element = new DOMParser().parseFromString(html, "text/html").querySelector("p code")!;
    expect(element.textContent).toBe("return 42");
    expect(element.children).toHaveLength(0);
  });
});
