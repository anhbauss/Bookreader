import type { ReaderOutline, ReaderSection } from "./types";

export function sectionFilename(sectionId: string, docId: string): string {
  const prefix = `${docId}.`;
  return sectionId.startsWith(prefix) ? sectionId.slice(prefix.length) : sectionId;
}

export function canonicalSectionId(docId: string, sectionId: string): string {
  return sectionId.startsWith(`${docId}.`) ? sectionId : `${docId}.${sectionId}`;
}

export function validateReaderRoute(docId: string, sectionId: string): string | null {
  if (!docId || !sectionId) return "Choose a document and section in the reader URL.";
  if (!isSafeRouteSegment(docId) || !isSafeRouteSegment(sectionId)) {
    return "The reader URL contains an invalid document or section id.";
  }
  return null;
}

export function isSafeRouteSegment(value: string): boolean {
  return /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(value);
}

export function sectionUrl(docId: string, sectionId: string): string {
  return `?doc=${encodeURIComponent(docId)}&section=${encodeURIComponent(sectionFilename(sectionId, docId))}`;
}

export function assertSectionMatchesRoute(
  section: ReaderSection,
  docId: string,
  sectionId: string,
): ReaderSection {
  if (
    section.bookgraph.doc_id !== docId ||
    sectionFilename(section.bookgraph.id, docId) !== sectionId
  ) {
    throw new Error("Generated section metadata does not match the requested route");
  }
  return section;
}

export function validateOutline(outline: ReaderOutline, docId: string): ReaderOutline {
  if (outline.doc_id !== docId || !Array.isArray(outline.nodes)) {
    throw new Error("Generated table of contents does not match the requested document");
  }
  return outline;
}
