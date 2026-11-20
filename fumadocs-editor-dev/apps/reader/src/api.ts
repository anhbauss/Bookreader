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

export interface ContentRepair {
  doc_id: string;
  section_id: string;
  kind: "formula" | "markdown" | "region";
  source_hash: string;
  title: string | null;
  content: string;
  repaired_content: string;
  created_at: string;
  accepted_at: string | null;
}

export interface SectionTranslation {
  lang: string;
  doc_id: string;
  section_id: string;
  status: TranslationStatus;
  content: string | null;
  translated_title: string | null;
  includes_assets: boolean | null;
  section_has_assets: boolean;
  alignment_status: "aligned" | "unaligned" | "invalid" | null;
  missing_assets: Array<{ link: string }>;
  structure_issues: Array<{ kind: string; target: string; change: "missing" | "added"; count: number }>;
}

export type TranslationCoverageStatus = "missing" | "queued" | "running" | "ready" | "failed";

export interface TranslationCoverage {
  doc_id: string;
  lang: string;
  requested_percent: number;
  total_sections: number;
  target_sections: number;
  ready_sections: number;
  pending_sections: number;
  failed_sections: number;
  status: TranslationCoverageStatus;
  current_section_id: string | null;
  next_section_id: string | null;
  failures: Record<string, string>;
}

interface ApiErrorPayload {
  error?: string;
  message?: string;
}

type RuntimeApiConfig = { baseUrl: string; bearerToken?: string };

function runtimeApiConfig(): RuntimeApiConfig | null {
  const config = (window as Window & { __BOOKGRAPH_API__?: RuntimeApiConfig }).__BOOKGRAPH_API__;
  return config?.baseUrl ? { baseUrl: config.baseUrl.replace(/\/$/, ""), bearerToken: config.bearerToken } : null;
}

function apiBaseUrl(): string {
  const runtime = runtimeApiConfig();
  if (runtime) return runtime.baseUrl;
  const configured = import.meta.env.VITE_BOOKGRAPH_API_BASE_URL?.trim();
  return configured ? configured.replace(/\/$/, "") : "";
}

function endpoint(path: string): string {
  return `${apiBaseUrl()}${path}`;
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = runtimeApiConfig()?.bearerToken;
  const headers = new Headers(init?.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(endpoint(path), { ...init, headers });
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

export function repairSectionContent(
  docId: string,
  sectionId: string,
  content: string,
  context: string,
  kind: "formula" | "markdown" | "region",
): Promise<ContentRepair> {
  requireSafe(docId, "document id");
  requireSafe(sectionId, "section id");
  const controller = new AbortController();
  // Backend caps formula repair at 40 seconds and section repair at the configured
  // provider timeout (default 120). Keep the browser deadline a little past the
  // backend cap so a slow-but-valid provider response is not discarded first.
  const timeoutMs = kind === "markdown" ? 140_000 : 60_000;
  let timer: number | undefined;
  const timedRequest = request<ContentRepair>(
    `/api/documents/${encodeURIComponent(docId)}/sections/${encodeURIComponent(sectionId)}/formula-repairs`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, context, kind }),
      signal: controller.signal,
    },
  );
  const deadline = new Promise<never>((_resolve, reject) => {
    timer = window.setTimeout(() => {
      controller.abort();
      reject(new Error(kind === "markdown"
        ? "AI did not respond in time while repairing this section."
        : "AI did not respond within 60 seconds while repairing this formula."));
    }, timeoutMs);
  });
  // Promise.race guarantees the reader leaves its loading state even if a browser,
  // proxy, or gateway fails to settle an aborted fetch promise.
  return Promise.race([timedRequest, deadline]).finally(() => {
    if (timer !== undefined) window.clearTimeout(timer);
  });
}

export function getAcceptedSectionRepair(docId: string, sectionId: string): Promise<ContentRepair | null> {
  requireSafe(docId, "document id");
  requireSafe(sectionId, "section id");
  return request<ContentRepair | null>(
    `/api/documents/${encodeURIComponent(docId)}/sections/${encodeURIComponent(sectionId)}/formula-repairs/accepted`,
  );
}

export function acceptSectionRepair(
  docId: string,
  sectionId: string,
  sourceHash: string,
): Promise<ContentRepair> {
  requireSafe(docId, "document id");
  requireSafe(sectionId, "section id");
  return request<ContentRepair>(
    `/api/documents/${encodeURIComponent(docId)}/sections/${encodeURIComponent(sectionId)}/formula-repairs/accept`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source_hash: sourceHash }),
    },
  );
}

export function getTranslationCoverage(docId: string, language: string): Promise<TranslationCoverage> {
  requireSafe(docId, "document id");
  if (!/^[a-z]{2,3}(?:-[a-z0-9]+)*$/i.test(language)) throw new Error("Invalid translation language");
  return request<TranslationCoverage>(
    `/api/documents/${encodeURIComponent(docId)}/translations/${encodeURIComponent(language)}/coverage`,
  );
}

export function startTranslationCoverage(docId: string, language: string, percent: 5 | 10 | 25 | 100): Promise<TranslationCoverage> {
  requireSafe(docId, "document id");
  return request<TranslationCoverage>(
    `/api/documents/${encodeURIComponent(docId)}/translations/${encodeURIComponent(language)}/coverage`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ percent }) },
  );
}

export function translateNextSection(docId: string, language: string, currentSectionId: string): Promise<TranslationCoverage> {
  requireSafe(docId, "document id");
  requireSafe(currentSectionId, "section id");
  return request<TranslationCoverage>(
    `/api/documents/${encodeURIComponent(docId)}/translations/${encodeURIComponent(language)}/next`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ current_section_id: currentSectionId }) },
  );
}

export function retrySectionTranslation(docId: string, language: string, sectionId: string, force = false): Promise<TranslationCoverage> {
  requireSafe(docId, "document id");
  requireSafe(sectionId, "section id");
  return request<TranslationCoverage>(
    `/api/documents/${encodeURIComponent(docId)}/translations/${encodeURIComponent(language)}/retry`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ section_id: sectionId, force }) },
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
