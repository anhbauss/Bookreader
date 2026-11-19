import { Fragment, useEffect, useRef, useState } from "react";
import katex from "katex";

function Math({ expression, display = false, equationTag }: { expression: string; display?: boolean; equationTag?: string }) {
  const normalized = normalizeMathSource(expression);
  const shouldDisplay = display || Boolean(equationTag);
  let markup: string;
  try {
    markup = katex.renderToString(normalized, {
      displayMode: shouldDisplay,
      throwOnError: false,
      strict: "ignore",
    });
  } catch {
    return <code className="math-error">{expression}</code>;
  }

  if (!shouldDisplay) {
    return <span className="math-inline" dangerouslySetInnerHTML={{ __html: markup }} />;
  }
  return <DisplayMath markup={markup} equationTag={equationTag} />;
}

function DisplayMath({ markup, equationTag }: { markup: string; equationTag?: string }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({ overflow: false, atStart: true, atEnd: true });

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const updateScrollState = () => {
      const maxScroll = element.scrollWidth - element.clientWidth;
      setScrollState({
        overflow: maxScroll > 1,
        atStart: element.scrollLeft <= 1,
        atEnd: element.scrollLeft >= maxScroll - 1,
      });
    };
    updateScrollState();
    element.addEventListener("scroll", updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, [markup]);

  const scrollFormula = (direction: -1 | 1) => {
    viewport.current?.scrollBy({ left: direction * 120, behavior: "smooth" });
  };

  return (
    <div className="math-display">
      {scrollState.overflow && <button type="button" className="math-scroll-button math-scroll-previous" aria-label="Show earlier part of formula" disabled={scrollState.atStart} onClick={() => scrollFormula(-1)}>‹</button>}
      <div ref={viewport} className="math-scroll-viewport" dangerouslySetInnerHTML={{ __html: markup }} />
      {equationTag && <span className="math-equation-tag" aria-label={`Equation ${equationTag}`}>({equationTag})</span>}
      {scrollState.overflow && <button type="button" className="math-scroll-button math-scroll-next" aria-label="Show later part of formula" disabled={scrollState.atEnd} onClick={() => scrollFormula(1)}>›</button>}
    </div>
  );
}

function extractEquationTag(text: string): { expression: string; equationTag?: string } {
  // The generated reader content escapes ordinary TeX braces (`\\tag\\{2.32\\}`),
  // while translation artifacts often do not (`\\tag{2.32}`). Normalize braces
  // before extracting so both representations produce the same visible label.
  const normalized = text.replace(/\\\{([^{}\n]*)\\\}/g, "{$1}");
  const match = /\\tag\s*(?:\{([^{}\n]*)\}|\(([^()\n]*)\))/.exec(normalized);
  if (!match) return { expression: normalized };
  const equationTag = (match[1] ?? match[2] ?? "").trim();
  return {
    expression: normalized.slice(0, match.index) + normalized.slice(match.index + match[0].length),
    equationTag: equationTag || undefined,
  };
}

function normalizeMathSource(text: string): string {
  return text
    // Some staged Markdown preserves an escaped TeX command (for example `\\\\frac`).
    // Collapse that extra escape only for known commands, never for general `\\\\` line breaks.
    .replace(/\\\\(?=(?:frac|dfrac|tfrac|sqrt|sum|prod|int|iint|iiint|oint|lim|exp|ln|log|sin|cos|tan|cot|sec|csc|left|right|begin|end|text|mathrm|mathbf|mathbb|Omega|theta|pi|alpha|beta|gamma|delta|ldots|dots|cdot|times|pm|leq|geq|neq|to|rightarrow|leftarrow)\b)/g, "\\")
    .replace(/\\\{([^{}\n]*)\\\}/g, "{$1}")
    .replace(/\\left\s*\{/g, "\\left\\{")
    .replace(/\\right\s*\}/g, "\\right\\}")
    .replace(/\\+tag\s*(?:\\+\{[^{}\n]*\\+\}|\{[^{}\n]*\}|\([^()\n]*\))/g, "")
    .replace(/\\\s+/g, " ");
}

/**
 * Translation artifacts are Markdown too, but older translators can leave a complete
 * TeX array inside a prose block rather than isolating it with `$$` delimiters. Promote
 * only closed LaTeX environments so the normal Markdown renderer sends them to KaTeX.
 * Fenced code is intentionally left unchanged.
 */
function promoteEmbeddedMathEnvironments(source: string): string {
  const pieces = source.split(/(```[\s\S]*?```)/g);
  return pieces
    .map((piece, index) => {
      if (index % 2 === 1) return piece;
      return piece.replace(
        /\\begin\s*\{(array|aligned|alignedat|cases|matrix|pmatrix|bmatrix|vmatrix|Vmatrix)\}[\s\S]*?\\end\s*\{\1\}(?:\s*\\tag\s*(?:\\\{[^{}\n]*\\\}|\{[^{}\n]*\}|\([^()\n]*\)))?/g,
        (environment) => `\n\n$$\n${environment.trim()}\n$$\n\n`,
      );
    })
    .join("");
}

function convertEquationTags(source: string): string {
  return source.replace(/<eq>([\s\S]*?)<\/eq>/gi, (_match, expression: string) => `$${expression.trim()}$`);
}

/** Convert the legacy HTML tables still present in some translated artifacts to the
 * deliberately small Markdown table subset understood by this reader. The DOM is
 * used only to extract text: no translated HTML is inserted into the page. */
function convertHtmlTables(source: string): string {
  if (!/<table\b/i.test(source)) return source;
  const document = new DOMParser().parseFromString(source, "text/html");
  for (const table of document.querySelectorAll("table")) {
    const rows = Array.from(table.querySelectorAll("tr"))
      .map((row) => Array.from(row.querySelectorAll("th, td"))
        .map((cell) => (cell.textContent ?? "").trim().replace(/\|/g, "\\\\|")))
      .filter((row) => row.length > 0);
    if (!rows.length) {
      table.replaceWith(document.createTextNode(""));
      continue;
    }
    const width = Math.max(...rows.map((row) => row.length));
    const normalized = rows.map((row) => [...row, ...Array(width - row.length).fill("")]);
    const [header, ...body] = normalized;
    const markdown = [
      `| ${header.join(" | ")} |`,
      `| ${Array(width).fill("---").join(" | ")} |`,
      ...body.map((row) => `| ${row.join(" | ")} |`),
    ].join("\n");
    table.replaceWith(document.createTextNode(markdown));
  }
  return document.body.innerHTML
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function prepareMarkdownForRendering(source: string): string {
  return promoteEmbeddedMathEnvironments(convertHtmlTables(convertEquationTags(source)));
}

/** Translate BookGraph workspace-relative asset links into browser-safe API URLs. */
export function resolveBookGraphImageLinks(source: string, docId: string): string {
  const safeDocId = encodeURIComponent(docId);
  return source.replace(
    /(!\[[^\]]*\]\()\.?(?:\/)?images\/([^)]*?)(?=\))/g,
    (_match, prefix: string, basename: string) =>
      `${prefix}/api/assets/${safeDocId}/${encodeURIComponent(basename.trim())}`,
  );
}

function isRawMath(text: string): boolean {
  const value = normalizeMathSource(text).trim();
  const hasMathSyntax = /(?:\\[A-Za-z]+|[_^]\s*\{|[=≤≥∑∫∞→⇔])/u.test(value);
  const hasEquationMarker = /(?:=|\\(?:stackrel|x?leftrightarrow|longleftrightarrow|frac|sum|int|begin|left|right|exp|ln|log|sin|cos|min|max|lim|propto|geq|geqslant|leq|leqslant|equiv)\b|[_^]\s*\{)/.test(value);
  const hasProseSentence = /[.!?]\s+\p{L}{3,}/u.test(value);
  return !value.includes("$") && hasMathSyntax && hasEquationMarker && !hasProseSentence;
}

function mathOrInline(text: string, key: string) {
  const { expression, equationTag } = extractEquationTag(text);
  return isRawMath(expression) ? <Math expression={normalizeMathSource(expression)} equationTag={equationTag} /> : inline(text, key);
}

/** Split a Markdown table row without treating an escaped pipe (for example `\|` in
 * a LaTeX norm) as a table-cell separator. */
function splitTableRow(line: string): string[] {
  const cells: string[] = [];
  let cell = "";
  let precedingBackslashes = 0;

  for (const character of line) {
    if (character === "|" && precedingBackslashes % 2 === 0) {
      cells.push(cell);
      cell = "";
      precedingBackslashes = 0;
      continue;
    }
    cell += character;
    precedingBackslashes = character === "\\" ? precedingBackslashes + 1 : 0;
  }
  cells.push(cell);
  return cells;
}

function formatEmphasis(text: string, key: string) {
  return text.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${key}-strong-${index}`}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={`${key}-em-${index}`}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={`${key}-text-${index}`}>{part}</Fragment>;
  });
}

function inline(text: string, key: string) {
  const normalized = text
    .replace(/\\\{([^{}\n]*)\\\}/g, "{$1}")
    .replace(/\\\s+/g, " ");
  const parts = normalized.split(/(\$[^$\n]+\$|`[^`]+`|<sup>[\s\S]*?<\/sup>|<sub>[\s\S]*?<\/sub>)/g);
  return parts.map((part, index) => {
    if (part.startsWith("$") && part.endsWith("$")) {
      const { expression, equationTag } = extractEquationTag(part.slice(1, -1));
      return <Math expression={expression} equationTag={equationTag} key={`${key}-math-${index}`} />;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={`${key}-code-${index}`}>{part.slice(1, -1)}</code>;
    }
    const htmlScript = /^<(sup|sub)>([\s\S]*?)<\/\1>$/.exec(part);
    if (htmlScript) {
      return htmlScript[1] === "sup"
        ? <sup key={`${key}-sup-${index}`}>{htmlScript[2]}</sup>
        : <sub key={`${key}-sub-${index}`}>{htmlScript[2]}</sub>;
    }
    return <Fragment key={`${key}-text-${index}`}>{formatEmphasis(part, `${key}-${index}`)}</Fragment>;
  });
}

/** A deliberately small, non-executing Markdown renderer for reader content. */
export function MarkdownArticle({ source, className = "" }: { source: string; className?: string }) {
  const blocks = prepareMarkdownForRendering(source).trim().split(/\n{2,}/);
  return (
    <div className={`markdown ${className}`.trim()}>
      {blocks.map((block, index) => {
        const lines = block.split("\n");
        const heading = /^(#{1,6})\s+(.+)$/.exec(lines[0]);
        if (heading) {
          const Tag = `h${heading[1].length}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
          return <Tag key={index}>{inline(heading[2], `heading-${index}`)}</Tag>;
        }
        const image = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+[^)]*)?\)$/.exec(block);
        if (image) {
          return (
            <figure key={index}>
              <img src={image[2]} alt={image[1]} />
              {image[1] && <figcaption>{image[1]}</figcaption>}
            </figure>
          );
        }
        const displayMath = /^\$\$\n?([\s\S]*?)\n?\$\$$/.exec(block);
        if (displayMath) {
          const { expression, equationTag } = extractEquationTag(displayMath[1].trim());
          return <Math display expression={expression} equationTag={equationTag} key={index} />;
        }
        const { expression: untaggedBlock, equationTag } = extractEquationTag(block.trim());
        if (equationTag) {
          return <Math display expression={normalizeMathSource(untaggedBlock)} equationTag={equationTag} key={index} />;
        }
        const fence = /^```[^\n]*\n([\s\S]*?)\n```$/.exec(block);
        if (fence) {
          const language = /^```([^\n]*)/.exec(block)?.[1].trim();
          return (
            <section className="code-block" key={index}>
              {language && <div className="code-language">{language}</div>}
              <pre><code>{fence[1]}</code></pre>
            </section>
          );
        }
        if (lines.length >= 2 && /^\|/.test(lines[0]) && /^\|\s*:?-+/.test(lines[1])) {
          const rows = lines.filter((line, row) => row !== 1).map((line) =>
            splitTableRow(line).slice(1, -1).map((cell) => cell.trim()),
          );
          return (
            <div className="table-scroll" key={index}>
              <table>
                <thead><tr>{rows[0].map((cell, cellIndex) => <th key={cellIndex}>{mathOrInline(cell, `head-${index}-${cellIndex}`)}</th>)}</tr></thead>
                <tbody>{rows.slice(1).map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{mathOrInline(cell, `cell-${index}-${rowIndex}-${cellIndex}`)}</td>)}</tr>)}</tbody>
              </table>
            </div>
          );
        }
        if (lines.every((line) => /^[-*]\s+/.test(line))) {
          return <ul key={index}>{lines.map((line, item) => <li key={item}>{inline(line.replace(/^[-*]\s+/, ""), `li-${index}-${item}`)}</li>)}</ul>;
        }
        if (lines.every((line) => /^\d+\.\s+/.test(line))) {
          return <ol key={index}>{lines.map((line, item) => <li key={item}>{inline(line.replace(/^\d+\.\s+/, ""), `ol-${index}-${item}`)}</li>)}</ol>;
        }
        const paragraph = block.replace(/\n/g, " ");
        if (isRawMath(paragraph)) {
          return <Math display expression={normalizeMathSource(paragraph)} key={index} />;
        }
        return <p key={index}>{mathOrInline(paragraph, `paragraph-${index}`)}</p>;
      })}
    </div>
  );
}
