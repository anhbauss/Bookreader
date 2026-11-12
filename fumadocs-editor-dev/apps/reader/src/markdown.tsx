import { Fragment } from "react";

function inline(text: string, key: string) {
  const parts = text.split(/(\$[^$\n]+\$|`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("$") && part.endsWith("$")) {
      return <span className="math" key={`${key}-math-${index}`}>{part.slice(1, -1)}</span>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={`${key}-code-${index}`}>{part.slice(1, -1)}</code>;
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
        if (lines.length >= 2 && /^\|/.test(lines[0]) && /^\|\s*:?-+/.test(lines[1])) {
          const rows = lines.filter((line, row) => row !== 1).map((line) =>
            line.split("|").slice(1, -1).map((cell) => cell.trim()),
          );
          return (
            <div className="table-scroll" key={index}>
              <table>
                <thead><tr>{rows[0].map((cell, cellIndex) => <th key={cellIndex}>{inline(cell, `head-${index}-${cellIndex}`)}</th>)}</tr></thead>
                <tbody>{rows.slice(1).map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{inline(cell, `cell-${index}-${rowIndex}-${cellIndex}`)}</td>)}</tr>)}</tbody>
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
        return <p key={index}>{inline(block.replace(/\n/g, " "), `paragraph-${index}`)}</p>;
      })}
    </div>
  );
}
