import { useMemo, type ReactNode } from "react";
import { common, createLowlight } from "lowlight";
import type { RootContent } from "hast";

const highlighter = createLowlight(common);

function renderTokens(nodes: RootContent[]): ReactNode {
  return nodes.map((node, index) => {
    if (node.type === "text") return node.value;
    if (node.type !== "element") return null;
    const classes = node.properties.className;
    return <span key={index} className={Array.isArray(classes) ? classes.join(" ") : undefined}>{renderTokens(node.children)}</span>;
  });
}

/** Render tokens as React text/spans so source code always stays inert. */
export function HighlightedCode({ source, language }: { source: string; language?: string }) {
  const normalizedLanguage = language?.toLowerCase();
  const tokens = useMemo(() => {
    if (!normalizedLanguage || !highlighter.registered(normalizedLanguage)) return null;
    try { return highlighter.highlight(normalizedLanguage, source).children; }
    catch { return null; }
  }, [source, normalizedLanguage]);
  const classes = [tokens ? "hljs" : "", language ? `language-${language}` : ""].filter(Boolean).join(" ");
  return <code className={classes || undefined}>{tokens ? renderTokens(tokens) : source}</code>;
}
