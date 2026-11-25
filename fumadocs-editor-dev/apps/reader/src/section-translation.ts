import { useEffect, useMemo, useRef, useState } from "react";
import {
  getSectionTranslation, getTranslationCoverage, retrySectionTranslation, startTranslationCoverage,
  type SectionTranslation, type TranslationCoverage,
} from "./api";
import type { TranslationCoverageState, TranslationState } from "./translation";

type Scope = { docId: string; sectionId: string; lang: string };
type Action = { scope: Scope; phase: "starting" | "requesting" | "waiting" | "idle" };
const message = (error: unknown) => error instanceof Error ? error.message : "Unknown error";

/** Observe the page being read; submitted translation jobs continue on the server. */
export function useSectionTranslation(docId: string, sectionId: string, lang: string, enabled = true) {
  // Object identity distinguishes A -> B -> A from the first visit to A.
  const scope = useMemo(() => ({ docId, sectionId, lang }), [docId, sectionId, lang]);
  const current = useRef(scope);
  current.current = scope;
  const mounted = useRef(false);
  const [translation, setTranslation] = useState<{ scope: Scope; value: TranslationState } | null>(null);
  const [coverage, setCoverage] = useState<{ scope: Scope; value: TranslationCoverageState } | null>(null);
  const [action, setAction] = useState<Action | null>(null);
  const [revision, setRevision] = useState(0);
  const latestRevision = useRef(0);
  const latestRequest = useRef(0);
  const isCurrent = () => mounted.current && current.current === scope;

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let timer: number | undefined;
    let previousCoverage: string | null = null;
    let needsTranslation = true;
    const active = () => !cancelled && current.current === scope && latestRevision.current === revision;
    const readTranslation = async () => {
      const result = await getSectionTranslation(docId, sectionId, lang);
      if (result.doc_id !== docId || result.section_id !== sectionId || result.lang !== lang) {
        throw new Error("Translation response does not match the requested section.");
      }
      return result;
    };
    const finishWaiting = () => setAction((previous) =>
      previous?.scope === scope && previous.phase === "waiting" ? { scope, phase: "idle" } : previous);
    const poll = async () => {
      const prefetched = needsTranslation;
      const [coverageResult, translationResult] = await Promise.allSettled([
        getTranslationCoverage(docId, lang),
        prefetched ? readTranslation() : Promise.resolve(null),
      ]);
      if (!active()) return;
      let latestCoverage: TranslationCoverage | null = null;
      if (coverageResult.status === "fulfilled") {
        latestCoverage = coverageResult.value;
        setCoverage({ scope, value: { status: "ready", coverage: latestCoverage, error: null } });
      } else {
        setCoverage({ scope, value: { status: "error", coverage: null, error: message(coverageResult.reason) } });
      }
      const signature = latestCoverage ? JSON.stringify([
        latestCoverage.status, latestCoverage.ready_sections, latestCoverage.current_section_id,
        latestCoverage.failures[sectionId],
      ]) : previousCoverage;
      try {
        let result: SectionTranslation | null = null;
        if (translationResult.status === "rejected") throw translationResult.reason;
        result = translationResult.value;
        // Coverage is small; only reload the body when a job changes or a request is accepted.
        if (!prefetched && signature !== previousCoverage) result = await readTranslation();
        if (!active()) return;
        if (result) {
          const failure = latestCoverage?.failures[sectionId];
          if (failure && !(result.status === "fresh" && result.content)) {
            setTranslation({ scope, value: { status: "error", translation: null, error: failure } });
            finishWaiting();
          } else {
            setTranslation({ scope, value: { status: "ready", translation: result, error: null } });
            if (result.status === "fresh" && result.content) finishWaiting();
          }
          needsTranslation = false;
        }
      } catch (error: unknown) {
        if (!active()) return;
        needsTranslation = true;
        setTranslation({ scope, value: { status: "error", translation: null, error: message(error) } });
        finishWaiting();
      }
      previousCoverage = signature;
      if (active()) timer = window.setTimeout(() => void poll(), 1500);
    };
    void poll();
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [scope, enabled, revision]);

  // Mask previous-page state during the render before the new page's effect runs.
  const translationState: TranslationState = translation?.scope === scope ? translation.value
    : { status: enabled ? "loading" : "idle", translation: null, error: null };
  const coverageState: TranslationCoverageState = coverage?.scope === scope ? coverage.value
    : { status: enabled ? "loading" : "idle", coverage: null, error: null };
  const runRequest = async (kind: "starting" | "requesting", submit: () => Promise<TranslationCoverage>) => {
    if (!enabled || !isCurrent()) return;
    const request = ++latestRequest.current;
    setAction({ scope, phase: kind });
    try {
      const result = await submit();
      if (!isCurrent() || request !== latestRequest.current) return;
      setCoverage({ scope, value: { status: "ready", coverage: result, error: null } });
      setAction({ scope, phase: kind === "starting" ? "idle" : "waiting" });
      // Invalidate in-flight pre-request reads immediately, before effect cleanup.
      setRevision(++latestRevision.current);
    } catch (error: unknown) {
      if (!isCurrent() || request !== latestRequest.current) return;
      setCoverage({ scope, value: { status: "error", coverage: null, error: message(error) } });
      setAction({ scope, phase: "idle" });
    }
  };
  const translationAction: "idle" | "starting" | "next" = action?.scope !== scope || action.phase === "idle" ? "idle"
    : action.phase === "starting" ? "starting" : "next";
  return {
    translationState, coverageState, translationAction,
    startCoverage: (percent: 5 | 10 | 25 | 100) => runRequest("starting", () => startTranslationCoverage(docId, lang, percent)),
    requestCurrentTranslation: () => runRequest("requesting", () => retrySectionTranslation(
      docId, lang, sectionId, Boolean(translationState.translation?.content),
    )),
  };
}
