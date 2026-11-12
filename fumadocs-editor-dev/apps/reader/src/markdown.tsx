import { Fragment } from "react";
import katex from "katex";

function Math({ expression, display = false }: { expression: string; display?: boolean }) {
  try {
    return (
      <span
        className={display ? "math-display" : "math-inline"}
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(normalizeMathSource(expression), {
            displayMode: display,
            throwOnError: false,
            strict: "ignore",
          }),
        }}
      />
    );
  } catch {
    return <code className="math-error">{expression}</code>;
  }
}

function normalizeMathSource(text: string): string {
  return text
    .replace(/\\\{([^{}\n]*)\\\}/g, "{$1}")
    .replace(/\\tag\s*(?:\{[^{}\n]*\}|\([^()\n]*\))/g, "")
    .replace(/\\\s+/g, " ");
}

function isRawMath(text: string): boolean {
  const value = normalizeMathSource(text).trim();
  return (
    !value.includes("$") &&
    /(?:\\[A-Za-z]+|[_^]\s*\{|[=≤≥∑∫∞→⇔])/u.test(value) &&
    /(?:=|\\(?:stackrel|x?leftrightarrow|longleftrightarrow|frac|sum|int|begin|left|right)\b|[_^]\s*\{)/.test(value) &&
    !/[.!?]\s+\p{L}{3,}/u.test(value)
  );
}

function mathOrInline(text: string, key: string) {
  return isRawMath(text) ? <Math expression={normalizeMathSource(text)} /> : inline(text, key);
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

function inline(text: string, key: string) {
  const normalized = text
    .replace(/\\\{([^{}\n]*)\\\}/g, "{$1}")
    .replace(/\\\s+/g, " ");
  const parts = normalized.split(/(\$[^$\n]+\$|`[^`]+`|<sup>[\s\S]*?<\/sup>|<sub>[\s\S]*?<\/sub>)/g);
  return parts.map((part, index) => {
    if (part.startsWith("$") && part.endsWith("$")) {
      return <Math expression={part.slice(1, -1)} key={`${key}-math-${index}`} />;
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
    return <Fragment key={`${key}-text-${index}`}>{part}</Fragment>;
  });
}

/** A deliberately small, non-executing Markdown renderer for reader content. */
export function MarkdownArticle({ source }: { source: string }) {
  const blocks = source.trim().split(/\n{2,}/);
  return (
    <div className="markdown">
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
          return <Math display expression={displayMath[1].trim()} key={index} />;
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
