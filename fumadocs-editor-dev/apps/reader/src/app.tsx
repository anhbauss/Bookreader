import { BookOpen, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  getReadingProgress,
  getSectionContext,
  getSectionTranslation,
  getTranslationCoverage,
  markSectionRead,
  startTranslationCoverage,
  translateNextSection,
  type SectionContext,
} from "./api";
import { loadOutline, loadSection } from "./content";
import { MarkdownArticle } from "./markdown";
import { MemoryPanel, ProgressPanel } from "./reader-panels";
import { planIdForDocument, progressFromMarkRead, type MarkReadState, type ReaderProgressState } from "./reading";
import { canonicalSectionId, sectionUrl, validateReaderRoute } from "./reader";
import { CoveragePanel, ReadingModePicker, TranslationContent } from "./translation-panel";
import { isSectionInsideCoverage, resolveReadingMode, type ReadingMode, type TranslationCoverageState, type TranslationState } from "./translation";
import type { ReaderOutline, ReaderSection } from "./types";

const TRANSLATION_LANGUAGE = import.meta.env.VITE_BOOKGRAPH_TRANSLATION_LANGUAGE?.trim() || "vi";

function route() {
  const params = new URLSearchParams(window.location.search);
  return { docId: params.get("doc") ?? "", sectionId: params.get("section") ?? "" };
}

function navigate(docId: string, sectionId: string, mode?: ReadingMode) {
  const target = new URLSearchParams(sectionUrl(docId, sectionId));
  if (mode && mode !== "original") target.set("mode", mode);
  window.history.pushState({}, "", `?${target.toString()}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function App() {
  const [location, setLocation] = useState(route);
  const [section, setSection] = useState<ReaderSection | null>(null);
  const [outline, setOutline] = useState<ReaderOutline | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [context, setContext] = useState<SectionContext | null>(null);
  const [contextStatus, setContextStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [contextError, setContextError] = useState<string | null>(null);
  const [progressState, setProgressState] = useState<ReaderProgressState>({ status: "idle", progress: null, error: null });
  const [markState, setMarkState] = useState<MarkReadState>({ status: "idle", message: null });
  const [mode, setMode] = useState<ReadingMode>(() => resolveReadingMode(new URLSearchParams(window.location.search).get("mode")));
  const [translationState, setTranslationState] = useState<TranslationState>({ status: "idle", translation: null, error: null });
  const [coverageState, setCoverageState] = useState<TranslationCoverageState>({ status: "idle", coverage: null, error: null });
  const [translationAction, setTranslationAction] = useState<"idle" | "starting" | "next">("idle");

  useEffect(() => {
    const updateLocation = () => {
      setLocation(route());
      setMode(resolveReadingMode(new URLSearchParams(window.location.search).get("mode")));
    };
    window.addEventListener("popstate", updateLocation);
    return () => window.removeEventListener("popstate", updateLocation);
  }, []);

  useEffect(() => {
    const routeError = validateReaderRoute(location.docId, location.sectionId);
    if (routeError) {
      setError(routeError);
      setSection(null);
      setOutline(null);
      return;
    }
    let cancelled = false;
    setError(null);
    setSection(null);
    void Promise.all([loadSection(location.docId, location.sectionId), loadOutline(location.docId)])
      .then(([nextSection, nextOutline]) => {
        if (cancelled) return;
        setSection(nextSection);
        setOutline(nextOutline);
      })
      .catch((reason: unknown) => {
        if (!cancelled) setError(reason instanceof Error ? reason.message : "Unable to load reader content");
      });
    return () => { cancelled = true; };
  }, [location]);

  useEffect(() => {
    const routeError = validateReaderRoute(location.docId, location.sectionId);
    if (routeError) return;
    let cancelled = false;
    setContext(null);
    setContextStatus("loading");
    setContextError(null);
    void getSectionContext(location.docId, canonicalSectionId(location.docId, location.sectionId))
      .then((nextContext) => {
        if (!cancelled) {
          setContext(nextContext);
          setContextStatus("ready");
        }
      })
      .catch((reason: unknown) => {
        if (!cancelled) {
          setContextStatus("error");
          setContextError(reason instanceof Error ? reason.message : "Unknown error");
        }
      });
    return () => { cancelled = true; };
  }, [location]);

  useEffect(() => {
    if (!location.docId || validateReaderRoute(location.docId, location.sectionId) !== null) return;
    let cancelled = false;
    setProgressState({ status: "loading", progress: null, error: null });
    void getReadingProgress(planIdForDocument(location.docId))
      .then((progress) => { if (!cancelled) setProgressState({ status: "ready", progress, error: null }); })
      .catch((reason: unknown) => { if (!cancelled) setProgressState({ status: "error", progress: null, error: reason instanceof Error ? reason.message : "Unknown error" }); });
    return () => { cancelled = true; };
  }, [location.docId, location.sectionId]);

  useEffect(() => {
    if (validateReaderRoute(location.docId, location.sectionId) !== null) return;
    let cancelled = false;
    setTranslationState({ status: "loading", translation: null, error: null });
    void getSectionTranslation(location.docId, canonicalSectionId(location.docId, location.sectionId), TRANSLATION_LANGUAGE)
      .then((translation) => { if (!cancelled) setTranslationState({ status: "ready", translation, error: null }); })
      .catch((reason: unknown) => { if (!cancelled) setTranslationState({ status: "error", translation: null, error: reason instanceof Error ? reason.message : "Unknown error" }); });
    return () => { cancelled = true; };
  }, [location]);

  useEffect(() => {
    if (!location.docId || validateReaderRoute(location.docId, location.sectionId) !== null) return;
    let cancelled = false;
    const loadCoverage = () => void getTranslationCoverage(location.docId, TRANSLATION_LANGUAGE)
      .then((coverage) => { if (!cancelled) setCoverageState({ status: "ready", coverage, error: null }); })
      .catch((reason: unknown) => { if (!cancelled) setCoverageState({ status: "error", coverage: null, error: reason instanceof Error ? reason.message : "Unknown error" }); });
    setCoverageState((previous) => ({ status: previous.coverage ? "ready" : "loading", coverage: previous.coverage, error: null }));
    loadCoverage();
    const timer = window.setInterval(loadCoverage, 1500);
    return () => { cancelled = true; window.clearInterval(timer); };
  }, [location.docId]);

  const currentId = section?.bookgraph.id ?? location.sectionId;
  const tree = useMemo(() => outline?.nodes ?? [], [outline]);
  const currentIndex = tree.findIndex((node) => node.id === currentId);
  const insideCoverage = isSectionInsideCoverage(coverageState.coverage, currentIndex);
  const atCoverageBoundary = mode === "bilingual" && insideCoverage && Boolean(section?.bookgraph.next_id)
    && !isSectionInsideCoverage(coverageState.coverage, currentIndex + 1);
  const go = (sectionId: string | null) => { if (sectionId) navigate(location.docId, sectionId, mode); setSidebarOpen(false); };
  const changeMode = (nextMode: ReadingMode) => { setMode(nextMode); navigate(location.docId, location.sectionId, nextMode); };
  const startCoverage = (percent: 5 | 10 | 25 | 100) => {
    setTranslationAction("starting");
    void startTranslationCoverage(location.docId, TRANSLATION_LANGUAGE, percent)
      .then((coverage) => setCoverageState({ status: "ready", coverage, error: null }))
      .catch((reason: unknown) => setCoverageState({ status: "error", coverage: null, error: reason instanceof Error ? reason.message : "Unknown error" }))
      .finally(() => setTranslationAction("idle"));
  };
  const translateNext = () => {
    if (!section?.bookgraph.next_id) return;
    setTranslationAction("next");
    void translateNextSection(location.docId, TRANSLATION_LANGUAGE, section.bookgraph.id)
      .then((coverage) => {
        setCoverageState({ status: "ready", coverage, error: null });
        const waitForTranslation = () => void Promise.all([
          getTranslationCoverage(location.docId, TRANSLATION_LANGUAGE),
          getSectionTranslation(location.docId, section.bookgraph.next_id!, TRANSLATION_LANGUAGE),
        ]).then(([nextCoverage, nextTranslation]) => {
          setCoverageState({ status: "ready", coverage: nextCoverage, error: null });
          if (nextTranslation.status === "fresh" && Boolean(nextTranslation.content)) {
            setTranslationAction("idle");
            go(section.bookgraph.next_id);
          } else if (nextCoverage.status === "failed") {
            setTranslationAction("idle");
          } else {
            window.setTimeout(waitForTranslation, 1200);
          }
        }).catch((reason: unknown) => {
          setTranslationAction("idle");
          setCoverageState({ status: "error", coverage: null, error: reason instanceof Error ? reason.message : "Unknown error" });
        });
        window.setTimeout(waitForTranslation, 1200);
      })
      .catch((reason: unknown) => {
        setTranslationAction("idle");
        setCoverageState({ status: "error", coverage: null, error: reason instanceof Error ? reason.message : "Unknown error" });
      });
  };
  const onMarkRead = () => {
    if (!section) return;
    setMarkState({ status: "saving", message: null });
    void markSectionRead(planIdForDocument(section.bookgraph.doc_id), section.bookgraph.id)
      .then((result) => {
        setProgressState({ status: "ready", progress: progressFromMarkRead(result, section.bookgraph.doc_id), error: null });
        setMarkState({ status: "done", message: null });
      })
      .catch((reason: unknown) => setMarkState({ status: "error", message: reason instanceof Error ? reason.message : "Unknown error" }));
  };

  return (
    <div className="reader-shell">
      <header className="reader-header">
        <button className="icon-button mobile-only" aria-label="Open table of contents" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
        <a className="brand" href="/"><BookOpen size={20} /><span>Book Reader</span></a>
        <ReadingModePicker mode={mode} onChange={changeMode} />
        <span className="read-only-pill">Read-only</span>
      </header>
      <aside className={`toc ${sidebarOpen ? "open" : ""}`} aria-label="Table of contents">
        <div className="toc-heading"><span>Contents</span><button className="icon-button mobile-only" aria-label="Close table of contents" onClick={() => setSidebarOpen(false)}><X size={20} /></button></div>
        {tree.map((node) => <button key={node.id} className={`toc-item level-${Math.min(node.level, 4)} ${node.id === currentId ? "active" : ""}`} onClick={() => go(node.id)}>{node.title}</button>)}
      </aside>
      {sidebarOpen && <button className="backdrop" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
      <main className={`reader-main ${mode === "bilingual" ? "reader-main-bilingual" : ""}`}>
        {error ? <State title="Unable to open reader" message={error} /> : !section ? <State title="Loading section" message="Reading immutable BookGraph content…" /> : <article>
          <nav className="breadcrumbs">{section.bookgraph.heading_path.join(" / ")}</nav>
          <h1>{section.title}</h1>
          {section.description && <p className="description">{section.description}</p>}
          {mode === "translation" ? <TranslationContent state={translationState} language={TRANSLATION_LANGUAGE} /> : mode === "bilingual" ? <>
            {!insideCoverage && <CoveragePanel state={coverageState} action={translationAction} onStart={startCoverage} />}
            <div className="bilingual"><section><div className="language-label">Original</div><MarkdownArticle source={section.body} /></section><section><div className="language-label">{TRANSLATION_LANGUAGE}</div><TranslationContent state={translationState} language={TRANSLATION_LANGUAGE} /></section></div>
          </> : <MarkdownArticle source={section.body} />}
          <nav className="section-navigation" aria-label="Section navigation">
            <button disabled={!section.bookgraph.prev_id || translationAction !== "idle"} onClick={() => go(section.bookgraph.prev_id)}><ChevronLeft size={18} /> Previous</button>
            {atCoverageBoundary ? <button disabled={translationAction !== "idle"} onClick={translateNext}>{translationAction === "next" ? "Translating next section…" : "Translate next section"} <ChevronRight size={18} /></button> : <button disabled={!section.bookgraph.next_id || translationAction !== "idle"} onClick={() => go(section.bookgraph.next_id)}>Next <ChevronRight size={18} /></button>}
          </nav>
        </article>}
      </main>
      <aside className="reader-insights" aria-label="Reading progress and section memory">
        <ProgressPanel state={progressState} markState={markState} onMarkRead={onMarkRead} disabled={!section} />
        <MemoryPanel context={context} status={contextStatus} error={contextError} />
      </aside>
    </div>
  );
}

function State({ title, message }: { title: string; message: string }) {
  return <div className="state"><h1>{title}</h1><p>{message}</p></div>;
}
