import { createContext, useContext, useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import katex from "katex";
import { HighlightedCode } from "./highlighted-code";
import { apiUrl } from "./api";
import ReactMarkdown, { type Components, type ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import type { Element } from "hast";
import type { Position } from "unist";
import { extractEquationTag, normalizeMathSource } from "./math-source";
import { readerHtmlSchema, rehypeMineru, remarkMineru, type SourceRange } from "./markdown-plugins";

type RepairKind = "formula" | "markdown" | "region";
interface RepairRegion extends SourceRange { text: string; context: string }
interface ContentRepairHandler {
  repair: (content: string, context: string, kind: RepairKind) => Promise<string>;
  contextFor: (content: string) => string;
  regionFor: (position: Position | undefined, expanded: boolean) => RepairRegion | null;
  replace: (region: RepairRegion, repaired: string) => void;
  showRepairControls: boolean;
}
const ContentRepairContext = createContext<ContentRepairHandler | null>(null);

function renderKatex(expression: string, displayMode: boolean): { markup: string | null } {
  const options = { displayMode, throwOnError: true, strict: "ignore" as const, trust: false };
  try { return { markup: katex.renderToString(expression, options) }; }
  catch {
    try { return { markup: katex.renderToString(normalizeMathSource(expression), options) }; }
    catch { return { markup: null }; }
  }
}

function Math({
  expression,
  display = false,
  equationTag,
  repairUnit,
  repairKind = "formula",
  onRepairResult,
  repairContext,
}: {
  expression: string;
  display?: boolean;
  equationTag?: string;
  repairUnit?: string;
  repairKind?: RepairKind;
  onRepairResult?: (repaired: string) => void;
  repairContext?: string;
}) {
  const repairHandler = useContext(ContentRepairContext);
  const normalized = expression;
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

  const result = useMemo(() => renderKatex(activeExpression, shouldDisplay), [activeExpression, shouldDisplay]);
  const [fallback, setFallback] = useState<{ source: string; display: boolean; markup: string | null } | null>(null);
  const fallbackCurrent = fallback?.source === activeExpression && fallback.display === shouldDisplay;
  useEffect(() => {
    if (result.markup) return;
    let cancelled = false;
    void import("./mathjax").then(({ renderMathJax }) => {
      let markup: string;
      try { markup = renderMathJax(activeExpression, shouldDisplay); }
      catch { markup = renderMathJax(normalizeMathSource(activeExpression), shouldDisplay); }
      if (!cancelled) setFallback({ source: activeExpression, display: shouldDisplay, markup });
    }).catch(() => {
      if (!cancelled) setFallback({ source: activeExpression, display: shouldDisplay, markup: null });
    });
    return () => { cancelled = true; };
  }, [activeExpression, shouldDisplay, result.markup]);
  const markup = result.markup || (fallbackCurrent ? fallback.markup : null) || "";
  const pending = !result.markup && !fallbackCurrent;
  const error = !markup;

  const unit = repairUnit ?? expression;
  const requestRepair = repairHandler ? () => {
    if (repairState === "repairing") return;
    setRepairState("repairing");
    setRepairError(null);
    void repairHandler.repair(unit, repairContext ?? repairHandler.contextFor(unit), repairKind)
      .then((repaired) => {
        if (onRepairResult) {
          onRepairResult(repaired);
        } else {
          setActiveExpression(repaired);
        }
        setRepairState("idle");
        setRepairMenuOpen(false);
      })
      .catch((reason: unknown) => {
        setRepairState("failed");
        setRepairError(reason instanceof Error ? reason.message : "Unable to repair this formula.");
      });
  } : undefined;
  const openRepairMenu = repairHandler ? (event: ReactMouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setRepairMenuOpen(true);
  } : undefined;

  if (error) {
    const repairVisible = !pending && (repairHandler?.showRepairControls || repairMenuOpen);
    return <span ref={repairTarget} className="math-repair math-repair-target" role="group" aria-label={pending ? "Rendering formula" : "Formula could not be rendered"} onContextMenu={openRepairMenu}>
      <code className={pending ? "math-pending" : "math-error"} aria-busy={pending}>{expression}</code>
      {repairVisible && requestRepair && <span className="math-repair-menu math-repair-menu-visible" role="menu">
        <button type="button" role="menuitem" disabled={repairState === "repairing"} onClick={requestRepair}>
          {repairState === "repairing" ? "Repairing formula…" : repairState === "failed" ? "Try AI repair again" : "Repair formula with AI"}
        </button>
        {repairError && <small className="math-repair-error">{repairError}</small>}
      </span>}
    </span>;
  }

  return <DisplayMath inline={!shouldDisplay} containerRef={(element) => { repairTarget.current = element; }} markup={markup} equationTag={equationTag} repairState={repairState} repairError={repairError} repairMenuOpen={repairMenuOpen} onRepair={requestRepair} onContextMenu={openRepairMenu} />;
}

function DisplayMath({
  inline = false,
  containerRef,
  markup,
  equationTag,
  repairState,
  repairError,
  repairMenuOpen,
  onRepair,
  onContextMenu,
}: {
  inline?: boolean;
  containerRef?: (element: HTMLSpanElement | null) => void;
  markup: string;
  equationTag?: string;
  repairState?: "idle" | "repairing" | "failed";
  repairError?: string | null;
  repairMenuOpen?: boolean;
  onRepair?: () => void;
  onContextMenu?: (event: ReactMouseEvent<HTMLElement>) => void;
}) {
  const viewport = useRef<HTMLSpanElement>(null);
  const [scrollState, setScrollState] = useState({ overflow: false, atStart: true, atEnd: true });

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const updateScrollState = () => {
      const maxScroll = element.scrollWidth - element.clientWidth;
      // Inline controls must not make their own formula appear too wide. Compare
      // the typeset box with the whole host, before reserving space for arrows.
      // scrollWidth also includes italic glyph overhang and integer rounding.
      const content = element.firstElementChild;
      const contentWidth = content?.getBoundingClientRect().width ?? 0;
      const style = getComputedStyle(element);
      const naturalWidth = contentWidth > 0
        ? contentWidth + parseFloat(style.paddingLeft || "0") + parseFloat(style.paddingRight || "0")
        : element.scrollWidth;
      const hostWidth = element.parentElement?.clientWidth || element.clientWidth;
      const overflow = inline ? naturalWidth - hostWidth > 1 : maxScroll > 1;
      setScrollState({
        overflow,
        atStart: element.scrollLeft <= 1,
        atEnd: element.scrollLeft >= maxScroll - 1,
      });
    };
    updateScrollState();
    element.addEventListener("scroll", updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(element);
    if (element.firstElementChild) observer.observe(element.firstElementChild);
    return () => {
      element.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, [markup, inline]);

  const scrollFormula = (direction: -1 | 1) => {
    viewport.current?.scrollBy({ left: direction * 36, behavior: "smooth" });
  };

  return (
    <span ref={containerRef} className={inline ? "math-display math-inline math-inline-display math-repair-target" : "math-display math-repair-target"} onContextMenu={onContextMenu}>
      {scrollState.overflow && <button type="button" className="math-scroll-button math-scroll-previous" aria-label="Show earlier part of formula" disabled={scrollState.atStart} onClick={() => scrollFormula(-1)}>‹</button>}
      <span ref={viewport} className="math-scroll-viewport" dangerouslySetInnerHTML={{ __html: markup }} />
      {equationTag && <span className="math-equation-tag" aria-label={`Equation ${equationTag}`}>({equationTag})</span>}
      {repairMenuOpen && onRepair && <span className="math-repair-menu" role="menu">
        <button type="button" role="menuitem" disabled={repairState === "repairing"} onClick={onRepair}>
          {repairState === "repairing" ? "Repairing formula…" : repairState === "failed" ? "Try AI repair again" : "Repair formula with AI"}
        </button>
        {repairError && <small className="math-repair-error">{repairError}</small>}
      </span>}
      {scrollState.overflow && <button type="button" className="math-scroll-button math-scroll-next" aria-label="Show later part of formula" disabled={scrollState.atEnd} onClick={() => scrollFormula(1)}>›</button>}
    </span>
  );
}

/** Translate BookGraph workspace-relative asset links into browser-safe API URLs. */
export function resolveBookGraphImageLinks(source: string, docId: string): string {
  const safeDocId = encodeURIComponent(docId);
  return source.replace(
    /(!\[[^\]]*\]\()\.?(?:\/)?images\/([^)]*?)(?=\))/g,
    (_match, prefix: string, basename: string) =>
      `${prefix}${apiUrl(`/api/assets/${safeDocId}/${encodeURIComponent(basename.trim())}`)}`,
  );
}

function textContent(node?: Element): string {
  return node?.children.map((child) => child.type === "text" ? child.value : child.type === "element" ? textContent(child) : "").join("") ?? "";
}

function Formula({ node }: { node: Element }) {
  const handler = useContext(ContentRepairContext);
  const display = node.properties.className?.toString().includes("math-display") ?? false;
  const { expression, equationTag } = extractEquationTag(textContent(node));
  const region = handler?.regionFor(node.position, display);
  return <Math expression={expression} display={display} equationTag={equationTag}
    repairUnit={region?.text} repairKind={region ? "region" : "formula"} repairContext={region?.context}
    onRepairResult={region && handler ? (repaired) => handler.replace(region, repaired) : undefined} />;
}

function RepairableParagraph({ node, children, ...props }: React.ComponentProps<"p"> & ExtraProps) {
  const handler = useContext(ContentRepairContext);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const repair = (event: ReactMouseEvent<HTMLParagraphElement>) => {
    if (!handler?.showRepairControls || pending || event.defaultPrevented) return;
    const region = handler.regionFor(node?.position, false);
    if (!region) return;
    event.preventDefault();
    setPending(true);
    setError(null);
    void handler.repair(region.text, region.context, "markdown")
      .then((repaired) => handler.replace(region, repaired))
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Unable to repair this paragraph."))
      .finally(() => setPending(false));
  };
  return <p {...props} className={handler?.showRepairControls ? "markdown-repair-target" : undefined} onContextMenu={repair}>
    {children}{pending && <small role="status">Repairing paragraph…</small>}{error && <small role="alert" className="math-repair-error">{error}</small>}
  </p>;
}

const components: Components = {
  p: RepairableParagraph,
  code: ({ node, children, ...props }) => node?.properties.className?.toString().includes("math-")
    ? <Formula node={node} /> : <code {...props}>{children}</code>,
  pre: ({ node, children }) => {
    const code = node?.children.find((child): child is Element => child.type === "element" && child.tagName === "code");
    if (code?.properties.className?.toString().includes("math-display")) return <Formula node={code} />;
    const language = code?.properties.className?.toString().match(/language-([\w+-]+)/)?.[1];
    return <section className="code-block">{language && <div className="code-language">{language}</div>}<pre>{code ? <HighlightedCode source={textContent(code)} language={language} /> : children}</pre></section>;
  },
  table: ({ node: _node, children, ...props }) => <div className="table-scroll"><table {...props}>{children}</table></div>,
  img: ({ node: _node, ...props }) => <img {...props} loading="lazy" />,
};

interface MarkdownArticleProps {
  source: string;
  className?: string;
  onRepairContent?: ContentRepairHandler["repair"];
  showContentRepairControls?: boolean;
}

// A source change resets local previews and prevents an old request from replacing
// a different section. All offsets below refer to the untouched Markdown input.
export function MarkdownArticle(props: MarkdownArticleProps) {
  return <Article key={props.source} {...props} />;
}

function Article({ source, className = "", onRepairContent, showContentRepairControls = false }: MarkdownArticleProps) {
  const [workingSource, setWorkingSource] = useState(source);
  const parseState = useMemo(() => ({ ranges: [] as SourceRange[] }), [workingSource]);
  const handler: ContentRepairHandler | null = onRepairContent ? {
    repair: onRepairContent,
    contextFor: (content) => `--- TARGET ---\n${content}\n--- END TARGET ---\n\n${workingSource.slice(0, 2_000)}`,
    regionFor: (position, expanded) => {
      let start = position?.start.offset, end = position?.end.offset;
      if (start === undefined || end === undefined) return null;
      if (expanded) {
        const index = parseState.ranges.findIndex((range) => range.start <= start! && range.end >= end!);
        if (index >= 0) {
          start = parseState.ranges[globalThis.Math.max(0, index - 1)].start;
          end = parseState.ranges[globalThis.Math.min(parseState.ranges.length - 1, index + 1)].end;
        }
      }
      const text = workingSource.slice(start, end);
      return { start, end, text, context: `${workingSource.slice(globalThis.Math.max(0, start - 1_200), start)}\n\n--- TARGET ---\n${text}\n--- END TARGET ---\n\n${workingSource.slice(end, end + 1_200)}` };
    },
    replace: (region, repaired) => setWorkingSource((current) => current === workingSource
      ? current.slice(0, region.start) + repaired + current.slice(region.end) : current),
    showRepairControls: showContentRepairControls,
  } : null;
  return <ContentRepairContext.Provider value={handler}>
    <div className={`markdown ${className}`.trim()}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, [remarkMineru, { onRanges: (ranges: SourceRange[]) => { parseState.ranges = ranges; } }]]}
        rehypePlugins={[rehypeRaw, [rehypeMineru, { source: workingSource }], [rehypeSanitize, readerHtmlSchema]]}
        components={components}
      >{workingSource}</ReactMarkdown>
    </div>
  </ContentRepairContext.Provider>;
}
