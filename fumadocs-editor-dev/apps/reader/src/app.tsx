import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getAcceptedSectionRepair,
  getDocumentReadingProgress,
  getSectionContext,
  acceptSectionRepair,
  repairSectionContent,
  type ContentRepair,
  markSectionRead,
  type SectionContext,
} from "./api";
import { loadDocumentMetadata, loadOutline, loadSection } from "./content";
import { MarkdownArticle, resolveBookGraphImageLinks } from "./markdown";
import { MemoryPanel, ProgressPanel } from "./reader-panels";
import { planIdForDocument, progressFromMarkRead, type MarkReadState, type ReaderProgressState } from "./reading";
import { canonicalSectionId, sectionUrl, validateReaderRoute } from "./reader";
import { useReadingPosition } from "./reading-position";
import { CoveragePanel, ReadingModePicker, TranslationContent } from "./translation-panel";
import { canShowTranslation, resolveReadingMode, type ReadingMode } from "./translation";
import { useSectionTranslation } from "./section-translation";
import { LibraryPage } from "./library/library-page";
import { desktopApi, isDesktopApp } from "./desktop";
import { Onboarding, useDesktopBootstrap } from "./onboarding";
import { ReaderDrawer, ReaderHeader, ReaderInsights, SearchModal, useReaderPreferences, VisualSettingsPopover } from "./reader-experience";
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

/**
 * Divide the original reader's two-page view by reading length, not just by Markdown
 * blocks. Long prose paragraphs are deliberately split at a word boundary so one page
 * does not become much taller simply because it contains one more paragraph.
 */
function splitSequentialPages(source: string): [string, string] {
  const blocks = source.trim().split(/\n{2,}/).filter(Boolean);
  if (blocks.length < 2) {
    const onlyBlock = source.trim();
    return canSplitWithinParagraph(onlyBlock)
      ? splitParagraphAtReadingMidpoint(onlyBlock)
      : [onlyBlock, ""];
  }

  const weights = blocks.map(readingWeight);
  const target = weights.reduce((total, weight) => total + weight, 0) / 2;
  let consumed = 0;
  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    const weight = weights[index];
    const nextConsumed = consumed + weight;
    if (nextConsumed < target) {
      consumed = nextConsumed;
      continue;
    }

    const before = blocks.slice(0, index);
    const after = blocks.slice(index + 1);
    if (canSplitWithinParagraph(block)) {
      const [firstHalf, secondHalf] = splitParagraphAtReadingMidpoint(
        block,
        (target - consumed) / weight * block.length,
      );
      return [[...before, firstHalf].filter(Boolean).join("\n\n"), [secondHalf, ...after].filter(Boolean).join("\n\n")];
    }
    // Never split a figure, table, formula, or code block. Pick the side whose total
    // estimated rendered height will be closer to the other one instead.
    const keepOnFirstPage = Math.abs(nextConsumed - target) <= Math.abs(consumed - target);
    return keepOnFirstPage
      ? [blocks.slice(0, index + 1).join("\n\n"), after.join("\n\n")]
      : [before.join("\n\n"), [block, ...after].join("\n\n")];
  }
  return [blocks.join("\n\n"), ""];
}

function readingWeight(block: string): number {
  const trimmed = block.trim();
  // Text length is a useful baseline, while these indivisible blocks consume visual
  // height out of proportion to their Markdown source length.
  if (/^!\[[^\]]*\]\([^)]*\)$/.test(trimmed)) return 1_200;
  if (/^\|[\s\S]*\n\|\s*:?-+/.test(trimmed) || /<table\b/i.test(trimmed)) {
    const rows = Math.max(1, trimmed.split("\n").length - 1);
    return 400 + rows * 180;
  }
  if (/^\$\$[\s\S]*?\$\$$/.test(trimmed) || /\\(?:begin|left|right)\b/.test(trimmed)) return 550;
  return trimmed.length;
}

function canSplitWithinParagraph(block: string): boolean {
  const trimmed = block.trim();
  const isDisplayMath = /^\$\$[\s\S]*?\$\$$/.test(trimmed);
  const isRawMath = /(?:\\[A-Za-z]+|[_^]\s*\{|\b(?:sin|cos|log|exp)\s*\(|[=≤≥∑∫∞→])/u.test(trimmed)
    && !/[.!?]\s+\p{L}{3,}/u.test(trimmed);
  return !/^(?:```|#|[-*]\s|\d+\.\s|\||!\[)/.test(trimmed)
    && !isDisplayMath
    && !isRawMath
    && !/\\(?:begin|left|right)\b/.test(trimmed);
}

function splitParagraphAtReadingMidpoint(source: string, midpoint = source.length / 2): [string, string] {
  const text = source.trim();
  if (!text) return ["", ""];
  const target = Math.max(1, Math.min(text.length - 1, Math.round(midpoint)));
  const after = text.slice(target).search(/\s+/);
  const before = text.slice(0, target).search(/\s+[^\s]*$/);
  const right = after < 0 ? -1 : target + after;
  const left = before < 0 ? -1 : before;
  const splitAt = left < 0 ? right : right < 0 ? left : target - left <= right - target ? left : right;
  if (splitAt < 1) return [text, ""];
  return [text.slice(0, splitAt).trimEnd(), text.slice(splitAt).trimStart()];
}

export function App() {
  const bootstrap = useDesktopBootstrap();
  const [routeKey, setRouteKey] = useState(() => window.location.search);
  useEffect(() => {
    const onPopState = () => setRouteKey(window.location.search);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  if (bootstrap.error) return <State title="Unable to open BookGraph" message={bootstrap.error} />;
  if (!bootstrap.state) return <State title="Opening BookGraph" message="Loading your local reading space…" />;
  if (isDesktopApp() && (!bootstrap.state.credential.configured || !bootstrap.state.settings.onboardingCompleted || !bootstrap.state.settings.libraryRoot)) {
    return <Onboarding
      initialSettings={bootstrap.state.settings}
      initialCredential={bootstrap.state.credential}
      onComplete={() => window.location.reload()}
    />;
  }
  if (!routeKey) {
    if (!isDesktopApp()) return <LegacyLibraryPage />;
    return <LibraryPage
      settings={bootstrap.state.settings}
      onSettingsChanged={() => window.location.reload()}
      onOpenBook={({ docId, sectionId }) => navigate(docId, sectionId)}
    />;
  }
  return <ReaderApp onBackToLibrary={() => {
    void desktopApi().backToLibrary().finally(() => {
      window.history.pushState({}, "", window.location.pathname);
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  }} />;
}

function LegacyLibraryPage() {
  return <LibraryPage
    settings={{
      version: 1,
      onboardingCompleted: true,
      displayName: "Reader",
      provider: "openai-compatible",
      providerBaseUrl: "",
      model: "",
      targetLanguage: "vi",
      profileImagePath: null,
      libraryRoot: ".",
    }}
    onSettingsChanged={() => {}}
    onOpenBook={({ docId, sectionId }) => navigate(docId, sectionId)}
  />;
}

function ReaderApp({ onBackToLibrary }: { onBackToLibrary: () => void }) {
  const [location, setLocation] = useState(route);
  const [section, setSection] = useState<ReaderSection | null>(null);
  const [bookTitle, setBookTitle] = useState<string | null>(null);
  const [bookAuthor, setBookAuthor] = useState("");
  const [outline, setOutline] = useState<ReaderOutline | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [context, setContext] = useState<SectionContext | null>(null);
  const [contextStatus, setContextStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [contextError, setContextError] = useState<string | null>(null);
  const [progressState, setProgressState] = useState<ReaderProgressState>({ status: "idle", progress: null, error: null });
  const [markState, setMarkState] = useState<MarkReadState>({ status: "idle", message: null });
  const [mode, setMode] = useState<ReadingMode>(() => resolveReadingMode(new URLSearchParams(window.location.search).get("mode")));
  const { translationState, coverageState, translationAction, startCoverage, requestCurrentTranslation } = useSectionTranslation(
    location.docId, canonicalSectionId(location.docId, location.sectionId), TRANSLATION_LANGUAGE,
    validateReaderRoute(location.docId, location.sectionId) === null,
  );
  const [sectionRepairAction, setSectionRepairAction] = useState<"idle" | "repairing" | "failed">("idle");
  const [sectionRepairError, setSectionRepairError] = useState<string | null>(null);
  const [sectionRepairProgress, setSectionRepairProgress] = useState<{ current: number; total: number } | null>(null);
  const repairRequestId = useRef(0);
  const [sectionRepairCandidate, setSectionRepairCandidate] = useState<ContentRepair | null>(null);
  const [sectionRepairSaveState, setSectionRepairSaveState] = useState<"idle" | "saving" | "saved" | "failed">("idle");
  const [repairedOriginal, setRepairedOriginal] = useState<string | null>(null);
  const [repairedTitle, setRepairedTitle] = useState<string | null>(null);
  const [repairedTranslation, setRepairedTranslation] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const bookmark = useReadingPosition(location.docId, canonicalSectionId(location.docId, location.sectionId), (id) => {
    const target = new URLSearchParams(window.location.search);
    target.set("section", new URLSearchParams(sectionUrl(location.docId, id)).get("section")!);
    window.history.replaceState({}, "", `?${target.toString()}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
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
    setRepairedOriginal(null);
    setRepairedTitle(null);
    setRepairedTranslation(null);
    setSectionRepairCandidate(null);
    setSectionRepairError(null);
    repairRequestId.current += 1;
    setSectionRepairAction("idle");
    setSectionRepairProgress(null);
    setSectionRepairSaveState("idle");
    setSection(null);
    setBookTitle(null);
    setBookAuthor("");
    void Promise.all([
      loadSection(location.docId, location.sectionId),
      loadOutline(location.docId),
      loadDocumentMetadata(location.docId),
    ])
      .then(([nextSection, nextOutline, nextBookTitle]) => {
        if (cancelled) return;
        setSection(nextSection);
        setOutline(nextOutline);
        setBookTitle(nextBookTitle.title);
        setBookAuthor(nextBookTitle.author);
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
    let cancelled = false;
    const update = () => void loadDocumentMetadata(location.docId).then((metadata) => {
      if (!cancelled) { setBookTitle(metadata.title); setBookAuthor(metadata.author); }
    }).catch(() => {});
    window.addEventListener("bookgraph-metadata-updated", update);
    return () => { cancelled = true; window.removeEventListener("bookgraph-metadata-updated", update); };
  }, [location.docId]);

  useEffect(() => {
    if (!location.docId || validateReaderRoute(location.docId, location.sectionId) !== null) return;
    let cancelled = false;
    setProgressState({ status: "loading", progress: null, error: null });
    void getDocumentReadingProgress(location.docId)
      .then((progress) => { if (!cancelled) setProgressState({ status: "ready", progress, error: null }); })
      .catch((reason: unknown) => { if (!cancelled) setProgressState({ status: "error", progress: null, error: reason instanceof Error ? reason.message : "Unknown error" }); });
    return () => { cancelled = true; };
  }, [location.docId, location.sectionId]);

  const currentId = section?.bookgraph.id ?? location.sectionId;
  const tree = useMemo(() => outline?.nodes ?? [], [outline]);
  const currentTranslationVisible = mode === "bilingual" && canShowTranslation(translationState);
  const showTranslationAction = mode === "bilingual" && !currentTranslationVisible
    && (translationState.status === "ready" || translationState.status === "error");
  const go = (sectionId: string | null) => { if (sectionId) navigate(location.docId, sectionId, mode); };
  const changeMode = (nextMode: ReadingMode) => { setMode(nextMode); navigate(location.docId, location.sectionId, nextMode); };
  const repairCurrentContent = (content: string, context: string, kind: "formula" | "markdown" | "region"): Promise<string> => {
    if (!section) return Promise.reject(new Error("Section is not available"));
    return repairSectionContent(location.docId, section.bookgraph.id, content, context, kind)
      .then((repair) => repair.repaired_content);
  };
  const repairEntireSection = () => {
    if (!section || sectionRepairAction === "repairing") return;
    // Save commits to the manifest-backed Original Markdown section, so repair that
    // source consistently even while the reader is in Vietnamese or bilingual mode.
    const repairSource = section.body;
    setSectionRepairAction("repairing");
    setSectionRepairError(null);
    setSectionRepairProgress(null);
    const requestId = ++repairRequestId.current;
    void repairSectionContent(location.docId, section.bookgraph.id, repairSource, repairSource, "markdown", (job) => {
      if (requestId === repairRequestId.current) setSectionRepairProgress({ current: job.current_part, total: job.total_parts });
    })
      .then((repair) => {
        if (requestId !== repairRequestId.current) return;
        setRepairedOriginal(repair.repaired_content);
        setRepairedTitle(repair.title);
        setSectionRepairCandidate(repair);
        setSectionRepairSaveState("idle");
        setSectionRepairAction("idle");
      })
      .catch((reason: unknown) => {
        if (requestId !== repairRequestId.current) return;
        setSectionRepairAction("failed");
        setSectionRepairError(reason instanceof Error ? reason.message : "Unable to repair this section.");
      });
  };
  const undoSectionRepair = () => {
    setRepairedOriginal(null);
    setRepairedTitle(null);
    setRepairedTranslation(null);
    setSectionRepairCandidate(null);
    setSectionRepairError(null);
    setSectionRepairSaveState("idle");
  };
  const saveSectionRepair = () => {
    if (!sectionRepairCandidate || !section || sectionRepairSaveState === "saving") return;
    setSectionRepairSaveState("saving");
    void acceptSectionRepair(location.docId, section.bookgraph.id, sectionRepairCandidate.source_hash)
      .then((accepted) => {
        setRepairedOriginal(accepted.repaired_content);
        setRepairedTitle(accepted.title);
        if (accepted.title) {
          setOutline((current) => current ? {
            ...current,
            nodes: current.nodes.map((node) => node.id === section.bookgraph.id ? { ...node, title: accepted.title! } : node),
          } : current);
          setSection((current) => current ? {
            ...current,
            title: accepted.title!,
            bookgraph: {
              ...current.bookgraph,
              heading_path: current.bookgraph.heading_path.length
                ? [...current.bookgraph.heading_path.slice(0, -1), accepted.title!]
                : current.bookgraph.heading_path,
            },
          } : current);
        }
        setSectionRepairSaveState("saved");
      })
      .catch((reason: unknown) => {
        setSectionRepairSaveState("failed");
        setSectionRepairError(reason instanceof Error ? reason.message : "Unable to save the repair.");
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
      if (event.key === "Escape") { setSearchOpen(false); setSettingsOpen(false); setDrawerOpen(false); setInsightsOpen(false); }
      if (preferences.vertical || searchOpen || settingsOpen || drawerOpen || insightsOpen || (event.target instanceof HTMLInputElement)) return;
      if (event.key === "ArrowLeft") go(section?.bookgraph.prev_id ?? null);
      if (event.key === "ArrowRight") go(section?.bookgraph.next_id ?? null);
    };
    window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown);
  }, [preferences.vertical, searchOpen, settingsOpen, drawerOpen, insightsOpen, section]);

  const readerSource = section ? resolveBookGraphImageLinks(repairedOriginal ?? section.body, location.docId) : "";
  const [firstPage, secondPage] = useMemo(() => splitSequentialPages(readerSource), [readerSource]);
  return (
    <div className={`reader-shell reader-experience reader-font-${preferences.font} reader-size-${preferences.size} reader-mode-${mode} ${(mode !== "bilingual" && preferences.vertical) ? "reader-vertical" : ""}`} data-reader-theme={preferences.theme}>
      <ReaderHeader title={bookTitle ?? location.docId ?? "Book Reader"} author={bookAuthor} onSearch={() => setSearchOpen(true)} onSettings={() => setSettingsOpen((value) => !value)} onPanel={() => setDrawerOpen(true)} onBookmark={() => void bookmark.toggle()} bookmarked={bookmark.bookmarked} bookmarkDisabled={!section || bookmark.status !== "ready"} onLibrary={onBackToLibrary} insightsOpen={insightsOpen} onInsights={() => { setInsightsOpen((value) => !value); setSettingsOpen(false); }} />
      {bookmark.message && <p key={bookmark.message} role="status" className="reader-bookmark-status" onAnimationEnd={bookmark.dismissMessage}>{bookmark.message}</p>}
      {settingsOpen && <div className="visual-settings-anchor"><VisualSettingsPopover theme={preferences.theme} font={preferences.font} size={preferences.size} vertical={preferences.vertical} showVertical={mode !== "bilingual"} onTheme={preferences.setTheme} onFont={preferences.setFont} onSize={preferences.setSize} onVertical={preferences.setVertical} /></div>}
      {searchOpen && <SearchModal source={readerSource} onClose={() => setSearchOpen(false)} onResult={(id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" })} />}
      <ReaderDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} mode={mode} onMode={changeMode}><aside className="toc" aria-label="Table of contents"><div className="toc-heading"><span>Contents</span></div>{tree.map((node) => <button key={node.id} className={`toc-item level-${Math.min(node.level, 4)} ${node.id === currentId ? "active" : ""}`} onClick={() => go(node.id)}>{node.title}</button>)}</aside></ReaderDrawer>
      <main className={`reader-main reader-reading-area reader-main-${mode} ${(mode !== "bilingual" && preferences.vertical) ? `reader-main-${mode}-vertical` : ""}`}>
        {error ? <State title="Unable to open reader" message={error} /> : !section ? <State title="Loading section" message="Reading immutable BookGraph content…" /> : <article>
          <p className="reader-chapter-label">{section.bookgraph.heading_path.join(" / ")}</p>
          <h1>{repairedTitle ?? section.title}</h1>
          {section.description && <p className="description">{section.description}</p>}
          {mode === "translation" ? <TranslationContent state={translationState} language={TRANSLATION_LANGUAGE} docId={location.docId} className={preferences.vertical ? "reader-prose reader-paged-prose translation-vertical-columns" : "reader-prose reader-paged-prose"} articleClassName={preferences.vertical ? "translation-vertical-content" : undefined} onRepairContent={repairCurrentContent} contentOverride={repairedTranslation} /> : mode === "bilingual" ? <>
            <div className="bilingual-status-row">
              <CoveragePanel state={coverageState} action={translationAction} onStart={startCoverage} />
              {showTranslationAction && <section className="translation-retry" aria-label="Translate this section"><div><strong>Translation unavailable</strong><span>This section has no usable Vietnamese yet.</span></div><button type="button" disabled={translationAction !== "idle"} onClick={requestCurrentTranslation}>{translationAction === "next" ? "Translating…" : "Translate this section"}</button></section>}
            </div>
            <div className="bilingual"><section><div className="language-label">Original</div><h2 className="original-section-title">{repairedTitle ?? section.title}</h2><MarkdownArticle source={resolveBookGraphImageLinks(repairedOriginal ?? section.body, location.docId)} onRepairContent={repairCurrentContent} /></section><section><div className="language-label">Vietnamese</div><h2 className="translation-section-title">{translationState.translation?.translated_title ?? section.title}</h2><TranslationContent state={translationState} language={TRANSLATION_LANGUAGE} docId={location.docId} onRepairContent={repairCurrentContent} contentOverride={repairedTranslation} /></section></div>
          </> : preferences.vertical ? <MarkdownArticle source={readerSource} className="reader-prose reader-paged-prose original-vertical-columns" onRepairContent={repairCurrentContent} /> : <MarkdownArticle source={readerSource} className="reader-prose reader-paged-prose" onRepairContent={repairCurrentContent} />}
          <nav className="section-navigation reader-pagination" aria-label="Section navigation">
            <button disabled={!section.bookgraph.prev_id} onClick={() => go(section.bookgraph.prev_id)}><ChevronLeft size={18} /> Previous Page</button>
            <button disabled={!section.bookgraph.next_id} onClick={() => go(section.bookgraph.next_id)}>Next Page <ChevronRight size={18} /></button>
          </nav>
          {mode !== "translation" && <section className="formula-repair-section" aria-label="Content rendering repair tools">
            <div><strong>Is the content rendering incorrectly?</strong><span>AI will review and repair the current section, including text, Markdown, and formulas.</span>{sectionRepairError && <small className="content-repair-error">{sectionRepairError}</small>}</div>
            <div className="content-repair-actions">
              <button type="button" disabled={sectionRepairAction === "repairing" || sectionRepairSaveState === "saved"} onClick={repairEntireSection}>
                {sectionRepairAction === "repairing" ? (sectionRepairProgress?.total ? `Repairing part ${sectionRepairProgress.current} of ${sectionRepairProgress.total}…` : "Starting repair…") : sectionRepairAction === "failed" ? "Try section repair again" : "Repair section with AI"}
              </button>
              {sectionRepairCandidate && sectionRepairSaveState !== "saved" && <button type="button" className="secondary" onClick={undoSectionRepair}>Undo</button>}
              {sectionRepairCandidate && <button type="button" className="save" disabled={sectionRepairSaveState === "saving" || sectionRepairSaveState === "saved"} onClick={saveSectionRepair}>
                {sectionRepairSaveState === "saving" ? "Saving…" : sectionRepairSaveState === "saved" ? "Saved" : sectionRepairSaveState === "failed" ? "Save again" : "Save"}
              </button>}
            </div>
          </section>}
          {(mode === "translation" || mode === "bilingual") && <section className="translation-retranslate" aria-label="Retranslate this section">
            <div><strong>Is the translation incorrect?</strong><span>Retranslate this section to replace the current Vietnamese translation.</span></div>
            <button type="button" disabled={translationAction !== "idle"} onClick={requestCurrentTranslation}>{translationAction === "next" ? "Retranslating…" : "Retranslate section"}</button>
          </section>}
        </article>}
      </main>
      <ReaderInsights open={insightsOpen} onClose={() => setInsightsOpen(false)}>
        <ProgressPanel state={progressState} markState={markState} onMarkRead={onMarkRead} disabled={!section} />
        <MemoryPanel context={context} status={contextStatus} error={contextError} />
      </ReaderInsights>
    </div>
  );
}

function State({ title, message }: { title: string; message: string }) {
  return <div className="state"><h1>{title}</h1><p>{message}</p></div>;
}
