import { request } from "./api";
import { assertSectionMatchesRoute, isSafeRouteSegment, sectionFilename, validateOutline } from "./reader";
import type { ReaderOutline, ReaderSection } from "./types";

interface ApiDocument {
  doc_id: string;
  title: string;
  section_count: number;
  authors?: string[];
  editors?: string[];
}

interface ApiDocumentList {
  documents: ApiDocument[];
}

interface ApiSection {
  redirected_from?: string;
  id: string;
  doc_id: string;
  title: string;
  level: number;
  heading_path: string[];
  page_start: number | null;
  page_end: number | null;
  text: string;
  prev_id: string | null;
  next_id: string | null;
  block_ids: string[];
}

const FRONTMATTER = /^---\n(?<frontmatter>[\s\S]*?)\n---\n?(?<body>[\s\S]*)$/;

/**
 * Fetch generated MDX as data, not as a JavaScript module. T4 has already removed
 * executable MDX syntax; this reader deliberately never evaluates book content.
 */
export async function loadSection(docId: string, sectionId: string): Promise<ReaderSection> {
  if (!isSafeRouteSegment(docId) || !isSafeRouteSegment(sectionId)) {
    throw new Error("The reader URL contains an invalid document or section id.");
  }
  // The backend reads canonical section Markdown at request time. This means a user
  // accepted AI repair remains visible after the server or browser restarts, unlike
  // generated public MDX which is only refreshed by a separate build step.
  const canonicalId = sectionId.startsWith(`${docId}.`) ? sectionId : `${docId}.${sectionId}`;
  const section = await request<ApiSection>(
    `/api/documents/${encodeURIComponent(docId)}/sections/${encodeURIComponent(canonicalId)}`,
  );
  let resolvedSectionId = sectionId;
  if (section.redirected_from === canonicalId && section.doc_id === docId &&
      section.id.startsWith(`${docId}.`) && isSafeRouteSegment(section.id)) {
    resolvedSectionId = sectionFilename(section.id, docId);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("doc", docId);
      params.set("section", resolvedSectionId);
      window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }
  return assertSectionMatchesRoute({
    title: section.title,
    bookgraph: {
      id: section.id,
      doc_id: section.doc_id,
      level: section.level,
      heading_path: section.heading_path,
      page_start: section.page_start,
      page_end: section.page_end,
      prev_id: section.prev_id,
      next_id: section.next_id,
      block_ids: section.block_ids,
    },
    body: section.text,
  }, docId, resolvedSectionId);
}

export async function loadDocumentMetadata(docId: string): Promise<{ title: string; author: string }> {
  if (!isSafeRouteSegment(docId)) throw new Error("The reader URL contains an invalid document id.");
  const documents = (await request<ApiDocumentList>("/api/documents")).documents;
  const document = documents.find((candidate) => candidate.doc_id === docId);
  if (!document) throw new Error("Document not found");
  const authors = document.authors ?? [];
  const editors = document.editors ?? [];
  return { title: document.title, author: authors.length ? authors.join(", ") : editors.length ? `Edited by ${editors.join(", ")}` : "" };
}

export async function loadDocumentTitle(docId: string): Promise<string> {
  return (await loadDocumentMetadata(docId)).title;
}

export async function loadOutline(docId: string): Promise<ReaderOutline> {
  if (!isSafeRouteSegment(docId)) throw new Error("The reader URL contains an invalid document id.");
  return validateOutline(await request<ReaderOutline>(`/api/documents/${encodeURIComponent(docId)}/outline`), docId);
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
