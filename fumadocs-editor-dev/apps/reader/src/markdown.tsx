import { createContext, Fragment, useContext, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import katex from "katex";

type RepairKind = "formula" | "markdown" | "region";

interface ContentRepairHandler {
  repair: (content: string, context: string, kind: RepairKind) => Promise<string>;
  contextFor: (content: string) => string;
  regionFor: (blockIndex: number) => { start: number; end: number; text: string };
  showRepairControls: boolean;
}

const ContentRepairContext = createContext<ContentRepairHandler | null>(null);

function Math({
  expression,
  display = false,
  equationTag,
  repairUnit,
  repairKind = "formula",
  onRepairResult,
}: {
  expression: string;
  display?: boolean;
  equationTag?: string;
  repairUnit?: string;
  repairKind?: RepairKind;
  onRepairResult?: (repaired: string) => void;
}) {
  const repairHandler = useContext(ContentRepairContext);
  const normalized = normalizeMathSource(expression);
  const shouldDisplay = display || Boolean(equationTag);
  const [activeExpression, setActiveExpression] = useState(normalized);
  const [repairState, setRepairState] = useState<"idle" | "repairing" | "failed">("idle");
  const [repairError, setRepairError] = useState<string | null>(null);
  const [repairMenuOpen, setRepairMenuOpen] = useState(false);
  const repairTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setActiveExpression(normalized);
    setRepairState("idle");
    setRepairError(null);
    setRepairMenuOpen(false);
  }, [normalized]);

  useEffect(() => {
    if (!repairMenuOpen) return;
    const closeWhenClickingOutside = (event: MouseEvent) => {
      if (!repairTarget.current?.contains(event.target as Node)) {
        setRepairMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeWhenClickingOutside);
    return () => document.removeEventListener("pointerdown", closeWhenClickingOutside);
  }, [repairMenuOpen]);

  let markup: string;
  let error: Error | null = null;
  try {
    markup = katex.renderToString(activeExpression, {
      displayMode: shouldDisplay,
      throwOnError: true,
      strict: "ignore",
    });
  } catch (reason) {
    error = reason instanceof Error ? reason : new Error("Formula could not be rendered");
    markup = "";
  }

  const unit = repairUnit ?? expression;
  const requestRepair = repairHandler ? () => {
    if (repairState === "repairing") return;
    setRepairState("repairing");
    setRepairError(null);
    const hardDeadline = window.setTimeout(() => {
      setRepairState((current) => current === "repairing" ? "failed" : current);
      setRepairError((current) => current ?? "Không gửi được yêu cầu sửa công thức tới backend.");
    }, 62_000);
    void repairHandler.repair(unit, repairHandler.contextFor(unit), repairKind)
      .then((repaired) => {
        window.clearTimeout(hardDeadline);
        if (onRepairResult) {
          onRepairResult(repaired);
        } else {
          setActiveExpression(normalizeMathSource(repaired));
        }
        setRepairState("idle");
        setRepairMenuOpen(false);
      })
      .catch((reason: unknown) => {
        window.clearTimeout(hardDeadline);
        setRepairState("failed");
        setRepairError(reason instanceof Error ? reason.message : "Không thể sửa công thức này.");
      });
  } : undefined;
  const openRepairMenu = repairHandler ? (event: ReactMouseEvent<HTMLElement>) => {
    event.preventDefault();
    setRepairMenuOpen(true);
  } : undefined;

  if (error) {
    const repairVisible = repairHandler?.showRepairControls || repairMenuOpen;
    return <span ref={repairTarget} className="math-repair math-repair-target" role="group" aria-label="Formula could not be rendered" onContextMenu={openRepairMenu}>
      <code className="math-error">{expression}</code>
      {repairVisible && requestRepair && <div className="math-repair-menu math-repair-menu-visible" role="menu">
        <button type="button" role="menuitem" disabled={repairState === "repairing"} onClick={requestRepair}>
          {repairState === "repairing" ? "Đang sửa công thức…" : repairState === "failed" ? "Thử sửa lại bằng AI" : "Sửa công thức bằng AI"}
        </button>
        {repairError && <small className="math-repair-error">{repairError}</small>}
      </div>}
    </span>;
  }

  if (!shouldDisplay) {
    return <span ref={repairTarget} className="math-inline math-repair-target" onContextMenu={openRepairMenu} dangerouslySetInnerHTML={{ __html: markup }} />;
  }
  return <DisplayMath containerRef={(element) => { repairTarget.current = element; }} markup={markup} equationTag={equationTag} repairState={repairState} repairMenuOpen={repairMenuOpen} onRepair={requestRepair} onContextMenu={openRepairMenu} />;
}

function DisplayMath({
  containerRef,
  markup,
  equationTag,
  repairState,
  repairMenuOpen,
  onRepair,
  onContextMenu,
}: {
  containerRef?: (element: HTMLDivElement | null) => void;
  markup: string;
  equationTag?: string;
  repairState?: "idle" | "repairing" | "failed";
  repairMenuOpen?: boolean;
  onRepair?: () => void;
  onContextMenu?: (event: ReactMouseEvent<HTMLElement>) => void;
}) {
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
    <div ref={containerRef} className="math-display math-repair-target" onContextMenu={onContextMenu}>
      {scrollState.overflow && <button type="button" className="math-scroll-button math-scroll-previous" aria-label="Show earlier part of formula" disabled={scrollState.atStart} onClick={() => scrollFormula(-1)}>‹</button>}
      <div ref={viewport} className="math-scroll-viewport" dangerouslySetInnerHTML={{ __html: markup }} />
      {equationTag && <span className="math-equation-tag" aria-label={`Equation ${equationTag}`}>({equationTag})</span>}
      {repairMenuOpen && onRepair && <div className="math-repair-menu" role="menu">
        <button type="button" role="menuitem" disabled={repairState === "repairing"} onClick={onRepair}>
          {repairState === "repairing" ? "Đang sửa công thức…" : repairState === "failed" ? "Thử sửa lại bằng AI" : "Sửa công thức bằng AI"}
        </button>
      </div>}
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
  return normalizeBrokenDelimiters(
    normalizeUnicodeMath(
      text
      // Some staged Markdown preserves an escaped TeX command (for example `\\\\frac`).
      // Collapse that extra escape only for known commands, never for general `\\\\` line breaks.
      .replace(/\\\\(?=(?:frac|dfrac|tfrac|sqrt|sum|prod|int|iint|iiint|oint|lim|exp|ln|log|sin|cos|tan|cot|sec|csc|left|right|begin|end|text|mathrm|mathbf|mathbb|Omega|theta|pi|alpha|beta|gamma|delta|ldots|dots|cdot|times|pm|leq|geq|neq|to|rightarrow|leftarrow)\b)/g, "\\")
      .replace(/\\\{([^{}\n]*)\\\}/g, "{$1}")
      .replace(/\\left\s*\{/g, "\\left\\{")
      .replace(/\\right\s*\}/g, "\\right\\}")
      .replace(/\\+tag\s*(?:\\+\{[^{}\n]*\\+\}|\{[^{}\n]*\}|\([^()\n]*\))/g, "")
      .replace(/\\\s+/g, " "),
    ),
  );
}

/** Unicode math symbols that OCR emits but KaTeX does not reliably render. */
const UNICODE_MATH: Record<string, string> = {
  "⩾": "\\geq",
  "⩽": "\\leq",
  "≥": "\\geq",
  "≤": "\\leq",
  "≠": "\\neq",
  "≈": "\\approx",
  "≡": "\\equiv",
  "×": "\\times",
  "·": "\\cdot",
  "∑": "\\sum",
  "∫": "\\int",
  "∏": "\\prod",
  "∞": "\\infty",
  "→": "\\rightarrow",
  "⇒": "\\Rightarrow",
  "∈": "\\in",
  "∉": "\\notin",
  "⊂": "\\subset",
  "⊆": "\\subseteq",
  "∪": "\\cup",
  "∩": "\\cap",
  "θ": "\\theta",
  "λ": "\\lambda",
  "μ": "\\mu",
  "Σ": "\\Sigma",
  "α": "\\alpha",
  "β": "\\beta",
  "γ": "\\gamma",
  "δ": "\\delta",
  "π": "\\pi",
  "σ": "\\sigma",
  "ω": "\\omega",
  "Ω": "\\Omega",
  "φ": "\\phi",
  "Φ": "\\Phi",
  "√": "\\sqrt",
};

function normalizeUnicodeMath(text: string): string {
  return text.replace(/[⩾⩽≥≤≠≈≡×·∑∫∏∞→⇒∈∉⊂⊆∪∩θλμΣαβγδπσωΩφΦ√]/g, (ch) => UNICODE_MATH[ch] ?? ch);
}

function delimiterEnvironment(open: string, close: string): string | null {
  if (open === "{" && close === ".") return "cases";
  if (open === "{" && close === "}") return "matrix";
  if (open === "(" && close === ")") return "pmatrix";
  if (open === "[" && close === "]") return "bmatrix";
  if (open === "|" && close === "|") return "vmatrix";
  return null;
}

function splitCaseRow(line: string): string {
  const ifMatch = /\s+if\s+/i.exec(line);
  if (ifMatch && ifMatch.index !== undefined) {
    const value = line.slice(0, ifMatch.index).trim();
    const condition = line.slice(ifMatch.index + ifMatch[0].length).trim();
    return `${value} & \\text{if } ${condition}`;
  }
  const otherwise = /^(.+?)\s*,?\s*otherwise\.?$/i.exec(line);
  if (otherwise) return `${otherwise[1].trim()} & \\text{otherwise}`;
  const comma = line.indexOf(",");
  if (comma >= 0) return `${line.slice(0, comma).trim()} & ${line.slice(comma + 1).trim()}`;
  return line;
}

/**
 * OCR splits a `\left<delim> ... \right<delim>` structure across lines with raw text
 * inside it. That is not valid KaTeX: the content must be a single expression, or a
 * proper ``cases``/``matrix`` environment. Convert the common multi-line forms into
 * the environment KaTeX understands, keeping single-line `\left...\right` unchanged.
 */
function normalizeBrokenDelimiters(text: string): string {
  return text.replace(
    /\\left\s*(\\?[{[(\|])([\s\S]*?)\\right\s*(\\?[}\])\|]|\.)/g,
    (_full, open: string, body: string, close: string) => {
      const lines = body.split(/\r?\n/).map((line: string) => line.trim()).filter(Boolean);
      if (lines.length <= 1) return _full;
      const openChar = open.startsWith("\\") ? open.slice(1) : open;
      const closeChar = close.startsWith("\\") ? close.slice(1) : close;
      const env = delimiterEnvironment(openChar, closeChar);
      if (!env) return _full;
      if (env === "cases") {
        const rows = lines.map((line) => splitCaseRow(line));
        return `\\begin{cases}\n${rows.join(" \\\\\n")}\n\\end{cases}`;
      }
      const rows = lines.map((line) => line.split(/\s{2,}/).map((cell) => cell.trim()).join(" & "));
      return `\\begin{${env}}\n${rows.join(" \\\\\n")}\n\\end{${env}}`;
    },
  );
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
    const width = globalThis.Math.max(...rows.map((row) => row.length));
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

function isMathBlock(block: string): boolean {
  const trimmed = block.trim();
  if (/^\$\$\n?([\s\S]*?)\n?\$\$$/.test(trimmed)) return true;
  const { equationTag } = extractEquationTag(trimmed);
  if (equationTag) return true;
  return isRawMath(trimmed.replace(/\n/g, " "));
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

/** Find the contiguous run of math blocks that contains ``index``. */
function mathClusterRange(blocks: string[], index: number): [number, number] {
  let start = index;
  let end = index + 1;
  while (start > 0 && isMathBlock(blocks[start - 1])) start -= 1;
  while (end < blocks.length && isMathBlock(blocks[end])) end += 1;
  return [start, end];
}

function mathBlockElement(block: string, key: string, repairProps?: { unit: string; kind: RepairKind; onResult: (repaired: string) => void }) {
  const trimmed = block.trim();
  const displayMath = /^\$\$\n?([\s\S]*?)\n?\$\$$/.exec(trimmed);
  if (displayMath) {
    const { expression, equationTag } = extractEquationTag(displayMath[1].trim());
    return <Math key={key} display expression={expression} equationTag={equationTag} repairUnit={repairProps?.unit} repairKind={repairProps?.kind} onRepairResult={repairProps?.onResult} />;
  }
  const { expression, equationTag } = extractEquationTag(trimmed);
  if (equationTag) {
    return <Math key={key} display expression={normalizeMathSource(expression)} equationTag={equationTag} repairUnit={repairProps?.unit} repairKind={repairProps?.kind} onRepairResult={repairProps?.onResult} />;
  }
  return <Math key={key} display expression={normalizeMathSource(trimmed)} repairUnit={repairProps?.unit} repairKind={repairProps?.kind} onRepairResult={repairProps?.onResult} />;
}

export function MarkdownArticle({
  source,
  className = "",
  onRepairContent,
  showContentRepairControls = false,
}: {
  source: string;
  className?: string;
  onRepairContent?: (content: string, context: string, kind: RepairKind) => Promise<string>;
  showContentRepairControls?: boolean;
}) {
  const blocks = prepareMarkdownForRendering(source).trim().split(/\n{2,}/);
  const [repairedBlocks, setRepairedBlocks] = useState<Map<string, string>>(() => new Map());
  const [regionReplacement, setRegionReplacement] = useState<{ start: number; end: number; text: string } | null>(null);
  useEffect(() => {
    setRepairedBlocks(new Map());
    setRegionReplacement(null);
  }, [source]);

  const repairHandler: ContentRepairHandler | null = onRepairContent ? {
    repair: onRepairContent,
    contextFor: (content) => {
      const directIndex = source.indexOf(content);
      const normalizedIndex = directIndex >= 0 ? directIndex : normalizeMathSource(source).indexOf(content);
      if (normalizedIndex < 0) return `--- TARGET ---\n${content}\n--- END TARGET ---\n\n${source.slice(0, 2_000)}`;
      const before = source.slice(globalThis.Math.max(0, normalizedIndex - 1_200), normalizedIndex);
      const after = source.slice(globalThis.Math.min(source.length, normalizedIndex + content.length), normalizedIndex + content.length + 1_200);
      return `${before}\n\n--- TARGET ---\n${content}\n--- END TARGET ---\n\n${after}`;
    },
    regionFor: (blockIndex) => {
      const [clusterStart, clusterEnd] = mathClusterRange(blocks, blockIndex);
      // Include one prose block above and below the formula cluster when available.
      const start = globalThis.Math.max(0, clusterStart - 1);
      const end = globalThis.Math.min(blocks.length, clusterEnd + 1);
      return { start, end, text: blocks.slice(start, end).join("\n\n") };
    },
    showRepairControls: showContentRepairControls,
  } : null;

  const content = (
    <div className={`markdown ${className}`.trim()}>
      {blocks.map((sourceBlock, index) => {
        if (regionReplacement && index >= regionReplacement.start && index < regionReplacement.end) {
          // Render the replacement once for the first block in the replaced region.
          if (index !== regionReplacement.start) return null;
          const trimmed = regionReplacement.text.trim();
          const displayMath = /^\$\$\n?([\s\S]*?)\n?\$\$$/.test(trimmed);
          if (displayMath || isRawMath(trimmed.replace(/\n/g, " "))) {
            const { expression, equationTag } = extractEquationTag(trimmed);
            return <Math key={`region-${index}`} display expression={normalizeMathSource(expression)} equationTag={equationTag} />;
          }
          return <div key={`region-${index}`}><MarkdownArticle source={regionReplacement.text} /></div>;
        }
        const block = repairedBlocks.get(sourceBlock) ?? sourceBlock;
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
        if (isMathBlock(block)) {
          const onResult = (repaired: string) => {
            const region = repairHandler!.regionFor(index);
            setRegionReplacement({ start: region.start, end: region.end, text: repaired });
          };
          const region = repairHandler ? repairHandler.regionFor(index) : null;
          return mathBlockElement(block, String(index), region ? {
            unit: region.text,
            kind: "region",
            onResult,
          } : undefined);
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
        const repairBlock = repairHandler?.showRepairControls ? () => {
          void repairHandler.repair(sourceBlock, repairHandler.contextFor(sourceBlock), "markdown")
            .then((repaired) => setRepairedBlocks((previous) => new Map(previous).set(sourceBlock, repaired)));
        } : undefined;
        return <p key={index} className={repairBlock ? "markdown-repair-target" : undefined} onContextMenu={(event) => {
          if (!repairBlock) return;
          event.preventDefault();
          repairBlock();
        }}>{mathOrInline(paragraph, `paragraph-${index}`)}</p>;
      })}
    </div>
  );
  return repairHandler ? <ContentRepairContext.Provider value={repairHandler}>{content}</ContentRepairContext.Provider> : content;
}
