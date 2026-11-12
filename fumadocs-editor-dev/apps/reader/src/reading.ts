import type { MarkReadResult, ReadingProgress } from "./api";

export interface ReaderProgressState {
  status: "idle" | "loading" | "ready" | "error";
  progress: ReadingProgress | null;
  error: string | null;
}

export interface MarkReadState {
  status: "idle" | "saving" | "done" | "error";
  message: string | null;
}

export function planIdForDocument(docId: string): string {
  return docId;
}

export function progressPercent(progress: ReadingProgress | null): number {
  if (!progress || progress.total === 0) return 0;
  return Math.round((progress.completed / progress.total) * 100);
}

export function progressFromMarkRead(result: MarkReadResult, docId: string): ReadingProgress {
  return {
    plan_id: result.plan_id,
    doc_id: docId,
    completed: result.completed,
    total: result.total,
    remaining: result.total - result.completed,
    done: result.done,
    current_section_id: null,
  };
}
