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
  current_chunk?: number | null;
  total_chunks?: number | null;
  next_section_id: string | null;
  failures: Record<string, string>;
}

interface ApiErrorPayload {
  error?: string;
  message?: string;
}

type RuntimeApiConfig = { baseUrl: string; bearerToken?: string };

function runtimeApiConfig(): RuntimeApiConfig | null {
  if (typeof window === "undefined") return null;
  const config = (window as Window & { __BOOKGRAPH_API__?: RuntimeApiConfig }).__BOOKGRAPH_API__;
  return config?.baseUrl ? { baseUrl: config.baseUrl.replace(/\/$/, ""), bearerToken: config.bearerToken } : null;
}

function apiBaseUrl(): string {
  const runtime = runtimeApiConfig();
  if (runtime) return runtime.baseUrl;
  const configured = import.meta.env.VITE_BOOKGRAPH_API_BASE_URL?.trim();
  return configured ? configured.replace(/\/$/, "") : "";
}

export function apiUrl(path: string): string {
  return `${apiBaseUrl()}${path}`;
}

export function setRuntimeApiBaseUrl(baseUrl: string | null): void {
  const current = window as Window & { __BOOKGRAPH_API__?: RuntimeApiConfig };
  if (baseUrl) current.__BOOKGRAPH_API__ = { baseUrl };
  else delete current.__BOOKGRAPH_API__;
}

class ApiRequestError extends Error {
  constructor(readonly status: number, readonly code: string | undefined, message: string) {
    super(message);
  }
}

export async function request<T>(path: string, init?: RequestInit, baseUrl = apiBaseUrl()): Promise<T> {
  const token = runtimeApiConfig()?.bearerToken;
  const headers = new Headers(init?.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(`${baseUrl}${path}`, { ...init, headers });
  if (!response.ok) {
    const payload = await response.json().catch(() => null) as ApiErrorPayload | null;
    throw new ApiRequestError(response.status, payload?.error, payload?.message ?? `BookGraph API request failed (${response.status})`);
  }
  return (await response.json()) as T;
}

function requireSafe(value: string, label: string): void {
  if (!isSafeRouteSegment(value)) throw new Error(`Invalid ${label}`);
}

export async function getDocumentReadingProgress(docId: string): Promise<ReadingProgress> {
  requireSafe(docId, "document id");
  try {
    return await request<ReadingProgress>(`/api/documents/${encodeURIComponent(docId)}/progress`);
  } catch (error) {
    // A running desktop sidecar may predate the document-progress route even
    // after Vite refreshes the UI. Keep existing progress usable until it restarts.
    if (error instanceof ApiRequestError && error.status === 404 && !error.code) {
      return getReadingProgress(docId);
    }
    throw error;
  }
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

export interface ContentRepairJob {
  job_id: string;
  status: "queued" | "running" | "ready" | "failed";
  current_part: number;
  total_parts: number;
  error: string | null;
  result: ContentRepair | null;
  updated_at: string;
}

async function repairJobRequest<T>(path: string, baseUrl: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  let timer: number | undefined;
  const deadline = new Promise<never>((_resolve, reject) => {
    timer = window.setTimeout(() => {
      controller.abort();
      reject(new Error("Repair service did not respond. Saved work is retained; retry to reconnect."));
    }, 15_000);
  });
  try {
    return await Promise.race([request<T>(path, { ...init, signal: controller.signal }, baseUrl), deadline]);
  } finally {
    if (timer !== undefined) window.clearTimeout(timer);
  }
}

export async function repairSectionContent(
  docId: string,
  sectionId: string,
  content: string,
  context: string,
  kind: "formula" | "markdown" | "region",
  onProgress?: (job: ContentRepairJob) => void,
): Promise<ContentRepair> {
  requireSafe(docId, "document id");
  requireSafe(sectionId, "section id");
  const baseUrl = apiBaseUrl();
  const path = `/api/documents/${encodeURIComponent(docId)}/sections/${encodeURIComponent(sectionId)}/repair-jobs`;
  let job = await repairJobRequest<ContentRepairJob>(path, baseUrl, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, context, kind }),
  });
  while (true) {
    onProgress?.(job);
    if (job.status === "ready") {
      if (!job.result) throw new Error("Repair completed without a result. Retry to reconnect.");
      return job.result;
    }
    if (job.status === "failed") throw new Error(job.error ?? "Repair failed. Retry to resume saved parts.");
    if (!/^[a-f0-9]{64}$/.test(job.job_id)) throw new Error("Repair service returned an invalid job ID.");
    await new Promise<void>((resolve) => window.setTimeout(resolve, 800));
    job = await repairJobRequest<ContentRepairJob>(`${path}/${job.job_id}`, baseUrl);
  }
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

export function startTranslationCoverage(docId: string, language: string, percent: number): Promise<TranslationCoverage> {
  if (!Number.isInteger(percent) || percent < 1 || percent > 100) throw new Error("Translation coverage must be between 1 and 100 percent");
  requireSafe(docId, "document id");
  return request<TranslationCoverage>(
    `/api/documents/${encodeURIComponent(docId)}/translations/${encodeURIComponent(language)}/coverage`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ percent }) },
  );
}

export function completeDocumentReading(docId: string): Promise<MarkReadResult> {
  requireSafe(docId, "document id");
  return request<MarkReadResult>(`/api/documents/${encodeURIComponent(docId)}/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });
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
