import { assertSectionMatchesRoute, isSafeRouteSegment, validateOutline } from "./reader";
import type { ReaderOutline, ReaderSection } from "./types";

const FRONTMATTER = /^---\n(?<frontmatter>[\s\S]*?)\n---\n?(?<body>[\s\S]*)$/;

/**
 * Fetch generated MDX as data, not as a JavaScript module. T4 has already removed
 * executable MDX syntax; this reader deliberately never evaluates book content.
 */
export async function loadSection(docId: string, sectionId: string): Promise<ReaderSection> {
  if (!isSafeRouteSegment(docId) || !isSafeRouteSegment(sectionId)) {
    throw new Error("The reader URL contains an invalid document or section id.");
  }
  const response = await fetch(`/content/${encodeURIComponent(docId)}/${encodeURIComponent(sectionId)}.mdx`);
  if (!response.ok) throw new Error(response.status === 404 ? "Section not found" : "Unable to load section");
  return assertSectionMatchesRoute(parseSection(await response.text()), docId, sectionId);
}

export async function loadOutline(docId: string): Promise<ReaderOutline> {
  if (!isSafeRouteSegment(docId)) throw new Error("The reader URL contains an invalid document id.");
  const response = await fetch(`/content/${encodeURIComponent(docId)}/outline.json`);
  if (!response.ok) throw new Error("Unable to load table of contents");
  return validateOutline((await response.json()) as ReaderOutline, docId);
}

export function parseSection(source: string): ReaderSection {
  const match = FRONTMATTER.exec(source);
  if (!match?.groups) throw new Error("Generated section has invalid frontmatter");
  const metadata = parseFrontmatter(match.groups.frontmatter);
  const bookgraph = metadata.bookgraph;
  if (!isBookgraphMetadata(bookgraph) || typeof metadata.title !== "string") {
    throw new Error("Generated section has incomplete BookGraph metadata");
  }
  return {
    title: metadata.title,
    ...(typeof metadata.description === "string" ? { description: metadata.description } : {}),
    bookgraph,
    body: match.groups.body,
  };
}

function parseFrontmatter(source: string): Record<string, unknown> {
  const lines = source.split("\n");
  const result: Record<string, unknown> = {};
  let activeObject: Record<string, unknown> | null = null;

  for (const line of lines) {
    if (!line.trim()) continue;
    const nested = /^  ([\w_]+): (.+)$/.exec(line);
    if (nested && activeObject) {
      activeObject[nested[1]] = JSON.parse(nested[2]);
      continue;
    }
    const topLevel = /^([\w_]+):(?: (.+))?$/.exec(line);
    if (!topLevel) throw new Error("Generated section frontmatter is not supported");
    if (topLevel[2] === undefined) {
      activeObject = {};
      result[topLevel[1]] = activeObject;
    } else {
      result[topLevel[1]] = JSON.parse(topLevel[2]);
      activeObject = null;
    }
  }
  return result;
}

function isBookgraphMetadata(value: unknown): value is ReaderSection["bookgraph"] {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ReaderSection["bookgraph"]>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.doc_id === "string" &&
    typeof candidate.level === "number" &&
    Array.isArray(candidate.heading_path) &&
    Array.isArray(candidate.block_ids) &&
    (candidate.prev_id === null || typeof candidate.prev_id === "string") &&
    (candidate.next_id === null || typeof candidate.next_id === "string")
  );
}
