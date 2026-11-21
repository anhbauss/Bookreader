import type { Element, Root as HtmlRoot, Text as HtmlText } from "hast";
import type { Root, RootContent, Text, PhrasingContent } from "mdast";
import type { Position } from "unist";
import { visit, SKIP } from "unist-util-visit";
import { extractEquationTag, normalizeMathSource } from "./math-source";
import { defaultSchema } from "rehype-sanitize";

export interface SourceRange { start: number; end: number }

function legacyMath(value: string): string {
  const { expression, equationTag } = extractEquationTag(value.replace(/\\\\(?=[A-Za-z{}])/g, "\\"));
  return normalizeMathSource(expression.replace(/\\([{}])/g, "$1")) + (equationTag ? `\\tag{${equationTag}}` : "");
}

function rawMath(value: string): boolean {
  // Compatibility for older canonical sections that lost their math delimiters.
  // Require TeX commands, not merely an equals sign in a prose sentence.
  if (value.includes("\\begin") && !value.trimStart().startsWith("\\begin")) return false;
  if (/^\p{L}{3,}(?:\s|:)/u.test(value.trimStart()) || value.includes("\\(")) return false;
  return /\\[a-zA-Z]+/.test(value) && !value.includes("$") &&
    /(?:\\(?:frac|sum|int|begin|tag|stackrel|exp|lim)\b|[_^]\s*\\?\{)/.test(value) &&
    !/[.!?]\s+\p{L}{3,}/u.test(value);
}

function mathNode(value: string, display: boolean, position?: Position): RootContent & PhrasingContent {
  return {
    type: "inlineMath", value, position,
    data: {
      hName: "code",
      hProperties: { className: ["language-math", display ? "math-display" : "math-inline"] },
      hChildren: [{ type: "text", value }],
    },
  };
}

/** Add MinerU compatibility on parsed nodes, leaving code and existing math alone.
 * No whole-document regex rewriting: source positions always refer to the input. */
export function remarkMineru({ onRanges }: { onRanges: (ranges: SourceRange[]) => void }) {
  return (tree: Root, file: { value: unknown }) => {
    const source = String(file.value);
    onRanges(tree.children.flatMap((node) => {
      const start = node.position?.start.offset, end = node.position?.end.offset;
      return start === undefined || end === undefined ? [] : [{ start, end }];
    }));
    visit(tree, (node, index, parent) => {
      if (node.type === "code" || node.type === "inlineCode" || node.type === "math" || node.type === "inlineMath") return SKIP;
      if (node.type === "paragraph" && parent && index !== undefined) {
        const raw = source.slice(node.position?.start.offset, node.position?.end.offset).trim();
        const bracket = /^\\\[([\s\S]*)\\\]$/.exec(raw);
        if (bracket || (node.children.every((child) => child.type === "text" || child.type === "emphasis" || child.type === "strong") && rawMath(raw))) {
          parent.children[index] = mathNode(bracket?.[1] ?? legacyMath(raw), true, node.position);
          return SKIP;
        }
      }
      if (node.type !== "text" || !parent || index === undefined) return;
      const start = node.position?.start.offset, end = node.position?.end.offset;
      if (start === undefined || end === undefined) return;
      const raw = source.slice(start, end);
      // Alternate TeX delimiters and complete environments outside $...$.
      const pattern = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]|\\begin\{(array|aligned|alignedat|cases|matrix|pmatrix|bmatrix|vmatrix|Vmatrix)\}[\s\S]*?\\end\{\3\}(?:\s*\\tag\{[^{}\n]*\})?/g;
      const matches = [...raw.matchAll(pattern)];
      if (!matches.length) {
        if (parent.type === "tableCell" && rawMath(raw)) parent.children[index] = mathNode(legacyMath(raw), false, node.position);
        return;
      }
      const pieces: PhrasingContent[] = [];
      let cursor = 0;
      for (const match of matches) {
        if (match.index! > cursor) pieces.push({ type: "text", value: raw.slice(cursor, match.index) });
        const offset = start + match.index!;
        const point = (value: number) => {
          const lines = source.slice(0, value).split("\n");
          return { line: lines.length, column: lines.at(-1)!.length + 1, offset: value };
        };
        pieces.push(mathNode(match[1] ?? match[2] ?? match[0], match[1] === undefined, {
          start: point(offset), end: point(offset + match[0].length),
        }));
        cursor = match.index! + match[0].length;
      }
      if (cursor < raw.length) pieces.push({ type: "text", value: raw.slice(cursor) });
      parent.children.splice(index, 1, ...pieces as Text[]);
      return index + pieces.length;
    });
  };
}

function htmlMath(value: string, display: boolean, position?: Position): Element {
  return { type: "element", tagName: "code", properties: {
    className: ["language-math", display ? "math-display" : "math-inline"],
  }, children: [{ type: "text", value }], position };
}

/** HTML table cells are opaque to remark. Parse math in their text after rehype-raw,
 * preserving the table itself (rowspan, colspan, headers, sub/sup and emphasis). */
export function rehypeMineru({ source }: { source: string }) {
  return (tree: HtmlRoot) => {
    const htmlTables: SourceRange[] = [];
    visit(tree, "element", (node) => {
      const start = node.position?.start.offset, end = node.position?.end.offset;
      if (node.tagName === "table" && start !== undefined && end !== undefined && source.slice(start, start + 6).toLowerCase() === "<table") {
        htmlTables.push({ start, end });
      }
    });
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "pre") {
        for (const child of node.children) {
          if (child.type === "element" && child.properties.className?.toString().includes("math-display")) child.position ??= node.position;
        }
        return SKIP;
      }
      if (["code", "script", "style", "textarea"].includes(node.tagName)) return SKIP;
      if (node.tagName === "eq" && parent && index !== undefined) {
        parent.children[index] = htmlMath(node.children.filter((child): child is HtmlText => child.type === "text").map((child) => child.value).join(""), false, node.position);
        return SKIP;
      }
      // Only text belonging to raw HTML needs this pass; ordinary Markdown math
      // has already become code nodes and is excluded above.
      const children: Element["children"] = [];
      for (const child of node.children) {
        if (child.type !== "text" || !htmlTables.some((range) => (child.position?.start.offset ?? -1) >= range.start && (child.position?.end.offset ?? Infinity) <= range.end)) {
          children.push(child); continue;
        }
        const pattern = /(?<!\\)\$\$([\s\S]*?)\$\$|(?<!\\)\$([^$\n]+)\$|\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
        let cursor = 0;
        for (const match of child.value.matchAll(pattern)) {
          if (match.index! > cursor) children.push({ type: "text", value: child.value.slice(cursor, match.index) });
          children.push(htmlMath(match[1] ?? match[2] ?? match[3] ?? match[4], match[1] !== undefined || match[4] !== undefined, child.position));
          cursor = match.index! + match[0].length;
        }
        if (cursor) {
          if (cursor < child.value.length) children.push({ type: "text", value: child.value.slice(cursor) });
        } else children.push(child);
      }
      node.children = children;
    });
  };
}

// Sanitize book HTML before our trusted React math components generate markup.
export const readerHtmlSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [["className", /^language-./, "math-inline", "math-display"]],
    td: [...(defaultSchema.attributes?.td ?? []), "rowSpan", "colSpan"],
    th: [...(defaultSchema.attributes?.th ?? []), "rowSpan", "colSpan", "scope"],
  },
};
