import { isSafeRouteSegment } from "./reader";

export interface ReadingProgress {
  plan_id: string;
  doc_id: string;
  completed: number;
  total: number;
  remaining: number;
  done: boolean;
  current_section_id: string | null;
}

export interface SectionConcept {
  slug: string;
  title: string;
  gloss: string;
  source: "auto" | "agent";
}

export interface SectionContext {
  section: { id: string; doc_id: string; title: string };
  concepts: SectionConcept[];
  summary: string;
}

export interface MarkReadResult {
  plan_id: string;
  marked: string;
  completed: number;
  total: number;
  done: boolean;
}

export type TranslationStatus = "fresh" | "stale" | "untracked" | "missing" | "orphaned";

export interface SectionTranslation {
  lang: string;
  doc_id: string;
  section_id: string;
  status: TranslationStatus;
  content: string | null;
  includes_assets: boolean | null;
  section_has_assets: boolean;
  alignment_status: "aligned" | "unaligned" | "invalid" | null;
}

interface ApiErrorPayload {
  error?: string;
  message?: string;
}

function apiBaseUrl(): string {
  const configured = import.meta.env.VITE_BOOKGRAPH_API_BASE_URL?.trim();
  return configured ? configured.replace(/\/$/, "") : "";
}

function endpoint(path: string): string {
  return `${apiBaseUrl()}${path}`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(endpoint(path), init);
  if (!response.ok) {
    const payload = await response.json().catch(() => null) as ApiErrorPayload | null;
    throw new Error(payload?.message ?? `BookGraph API request failed (${response.status})`);
  }
  return (await response.json()) as T;
}

function requireSafe(value: string, label: string): void {
  if (!isSafeRouteSegment(value)) throw new Error(`Invalid ${label}`);
}

export function getReadingProgress(planId: string): Promise<ReadingProgress> {
  requireSafe(planId, "reading plan id");
  return request<ReadingProgress>(`/api/plans/${encodeURIComponent(planId)}/progress`);
}

export function getSectionContext(docId: string, sectionId: string): Promise<SectionContext> {
  requireSafe(docId, "document id");
  requireSafe(sectionId, "section id");
  return request<SectionContext>(
    `/api/documents/${encodeURIComponent(docId)}/sections/${encodeURIComponent(sectionId)}/context`,
  );
}

export function getSectionTranslation(
  docId: string,
  sectionId: string,
  language: string,
): Promise<SectionTranslation> {
  requireSafe(docId, "document id");
  requireSafe(sectionId, "section id");
  if (!/^[a-z]{2,3}(?:-[a-z0-9]+)*$/i.test(language)) throw new Error("Invalid translation language");
  return request<SectionTranslation>(
    `/api/documents/${encodeURIComponent(docId)}/sections/${encodeURIComponent(sectionId)}/translations/${encodeURIComponent(language)}`,
  );
}

export function markSectionRead(planId: string, sectionId: string): Promise<MarkReadResult> {
  requireSafe(planId, "reading plan id");
  requireSafe(sectionId, "section id");
  return request<MarkReadResult>(
    `/api/plans/${encodeURIComponent(planId)}/sections/${encodeURIComponent(sectionId)}/read`,
    { method: "POST" },
  );
}
