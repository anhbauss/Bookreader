import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  getReadingProgress,
  getSectionContext,
  getSectionTranslation,
  getTranslationCoverage,
  markSectionRead,
  retrySectionTranslation,
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
import { canShowTranslation, isSectionInsideCoverage, resolveReadingMode, type ReadingMode, type TranslationCoverageState, type TranslationState } from "./translation";
import { LibraryPage } from "./library/library-page";
import { ReaderDrawer, ReaderHeader, SearchModal, useReaderPreferences, VisualSettingsPopover } from "./reader-experience";
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

/** Split content only at Markdown block boundaries so the two reading panes flow in order. */
function splitSequentialPages(source: string): [string, string] {
  const blocks = source.trim().split(/\n{2,}/).filter(Boolean);
  const midpoint = Math.ceil(blocks.length / 2);
  return [blocks.slice(0, midpoint).join("\n\n"), blocks.slice(midpoint).join("\n\n")];
}

export function App() {
  if (!window.location.search) return <LibraryPage />;
  const [location, setLocation] = useState(route);
  const [section, setSection] = useState<ReaderSection | null>(null);
  const [outline, setOutline] = useState<ReaderOutline | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [context, setContext] = useState<SectionContext | null>(null);
  const [contextStatus, setContextStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [contextError, setContextError] = useState<string | null>(null);
  const [progressState, setProgressState] = useState<ReaderProgressState>({ status: "idle", progress: null, error: null });
  const [markState, setMarkState] = useState<MarkReadState>({ status: "idle", message: null });
  const [mode, setMode] = useState<ReadingMode>(() => resolveReadingMode(new URLSearchParams(window.location.search).get("mode")));
  const [translationState, setTranslationState] = useState<TranslationState>({ status: "idle", translation: null, error: null });
  const [coverageState, setCoverageState] = useState<TranslationCoverageState>({ status: "idle", coverage: null, error: null });
  const [translationAction, setTranslationAction] = useState<"idle" | "starting" | "next">("idle");
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const preferences = useReaderPreferences();

  useEffect(() => {
    if (!settingsOpen) return;
    const closeSettingsWhenOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest(".visual-settings") || event.target.closest('button[aria-label="Open visual settings"]')) return;
      setSettingsOpen(false);
    };
    window.addEventListener("mousedown", closeSettingsWhenOutside);
    return () => window.removeEventListener("mousedown", closeSettingsWhenOutside);
  }, [settingsOpen]);

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
  const nextSectionId = section?.bookgraph.next_id ?? null;
  const currentTranslationVisible = mode === "bilingual" && canShowTranslation(translationState);
  const showTranslationAction = mode === "bilingual" && !currentTranslationVisible
    && (translationState.status === "ready" || translationState.status === "error");
  const go = (sectionId: string | null) => { if (sectionId) navigate(location.docId, sectionId, mode); };
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
  const requestCurrentTranslation = () => {
    if (!section) return;
    setTranslationAction("next");
    void retrySectionTranslation(location.docId, TRANSLATION_LANGUAGE, section.bookgraph.id)
      .then((coverage) => {
        setCoverageState({ status: "ready", coverage, error: null });
        const waitForTranslation = () => void getSectionTranslation(
          location.docId, section.bookgraph.id, TRANSLATION_LANGUAGE,
        ).then((translation) => {
          if (translation.status === "fresh" && Boolean(translation.content)) {
            setTranslationState({ status: "ready", translation, error: null });
            setTranslationAction("idle");
          } else {
            window.setTimeout(waitForTranslation, 1200);
          }
        }).catch((reason: unknown) => {
          setTranslationAction("idle");
          setTranslationState({ status: "error", translation: null, error: reason instanceof Error ? reason.message : "Unknown error" });
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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setSearchOpen(false); setSettingsOpen(false); setDrawerOpen(false); }
      if (preferences.vertical || searchOpen || settingsOpen || drawerOpen || (event.target instanceof HTMLInputElement)) return;
      if (event.key === "ArrowLeft") go(section?.bookgraph.prev_id ?? null);
      if (event.key === "ArrowRight") go(section?.bookgraph.next_id ?? null);
    };
    window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown);
  }, [preferences.vertical, searchOpen, settingsOpen, drawerOpen, section]);

  const readerSource = section?.body ?? "";
  const [firstPage, secondPage] = useMemo(() => splitSequentialPages(readerSource), [readerSource]);
  return (
    <div className={`reader-shell reader-experience reader-font-${preferences.font} reader-size-${preferences.size} ${mode === "bilingual" || preferences.vertical ? "reader-bilingual" : ""}`} data-reader-theme={preferences.theme}>
      <ReaderHeader title={section?.title ?? location.docId ?? "Book Reader"} author="Alan V. Oppenheim" onSearch={() => setSearchOpen(true)} onSettings={() => setSettingsOpen((value) => !value)} onPanel={() => setDrawerOpen(true)} onBookmark={() => setBookmarked((value) => !value)} bookmarked={bookmarked} />
      {settingsOpen && <div className="visual-settings-anchor"><VisualSettingsPopover theme={preferences.theme} font={preferences.font} size={preferences.size} vertical={preferences.vertical} onTheme={preferences.setTheme} onFont={preferences.setFont} onSize={preferences.setSize} onVertical={preferences.setVertical} /></div>}
      {searchOpen && <SearchModal source={readerSource} onClose={() => setSearchOpen(false)} onResult={(id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" })} />}
      <ReaderDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} mode={mode} onMode={changeMode}><aside className="toc" aria-label="Table of contents"><div className="toc-heading"><span>Contents</span></div>{tree.map((node) => <button key={node.id} className={`toc-item level-${Math.min(node.level, 4)} ${node.id === currentId ? "active" : ""}`} onClick={() => go(node.id)}>{node.title}</button>)}</aside></ReaderDrawer>
      <main className={`reader-main reader-reading-area ${mode === "bilingual" || preferences.vertical ? "reader-main-bilingual" : ""}`}>
        {error ? <State title="Unable to open reader" message={error} /> : !section ? <State title="Loading section" message="Reading immutable BookGraph content…" /> : <article>
          <p className="reader-chapter-label">{section.bookgraph.heading_path.join(" / ")}</p>
          <h1>{section.title}</h1>
          {section.description && <p className="description">{section.description}</p>}
          {mode === "translation" ? preferences.vertical ? <div className="bilingual vertical-split"><section><div className="language-label">Original</div><MarkdownArticle source={section.body} /></section><section><div className="language-label">{TRANSLATION_LANGUAGE}</div><TranslationContent state={translationState} language={TRANSLATION_LANGUAGE} docId={location.docId} /></section></div> : <TranslationContent state={translationState} language={TRANSLATION_LANGUAGE} docId={location.docId} className="reader-prose reader-paged-prose" /> : mode === "bilingual" ? <>
            <CoveragePanel state={coverageState} action={translationAction} onStart={startCoverage} />
            {showTranslationAction && <section className="translation-retry" aria-label="Translate this section"><div><strong>Translation unavailable</strong><span>This section has no usable Vietnamese translation yet.</span></div><button type="button" disabled={translationAction !== "idle"} onClick={requestCurrentTranslation}>{translationAction === "next" ? "Translating…" : "Translate this section"}</button></section>}
            <div className="bilingual"><section><div className="language-label">Original</div><MarkdownArticle source={section.body} /></section><section><div className="language-label">{TRANSLATION_LANGUAGE}</div><TranslationContent state={translationState} language={TRANSLATION_LANGUAGE} docId={location.docId} /></section></div>
          </> : preferences.vertical ? <div className="bilingual vertical-split"><section><MarkdownArticle source={firstPage} /></section><section><MarkdownArticle source={secondPage} /></section></div> : <MarkdownArticle source={section.body} className="reader-prose reader-paged-prose" />}
          <nav className="section-navigation reader-pagination" aria-label="Section navigation">
            <button disabled={!section.bookgraph.prev_id || translationAction !== "idle"} onClick={() => go(section.bookgraph.prev_id)}><ChevronLeft size={18} /> Previous Page</button>
            <button disabled={!section.bookgraph.next_id || translationAction !== "idle"} onClick={() => go(section.bookgraph.next_id)}>Next Page <ChevronRight size={18} /></button>
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
