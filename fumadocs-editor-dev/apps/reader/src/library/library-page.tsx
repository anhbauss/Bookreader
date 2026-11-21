import { BookOpen, Check, ChevronLeft, ChevronRight, Ellipsis, ExternalLink, Languages, LibraryBig, LoaderCircle, Plus, RefreshCw, Sparkles, Trash2, TriangleAlert, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { completeDocumentReading, getTranslationCoverage, startTranslationCoverage } from "../api";
import { desktopApi, localFileUrl, signOutDesktop, type AppSettings, type LibraryBook, type LibraryInventory, type MinerUPreparation } from "../desktop";
import "./library.css";
import { ProfileMenu } from "./profile-menu";

function messageFrom(reason: unknown, fallback: string): string {
  if (reason instanceof Error) return reason.message;
  if (typeof reason === "string" && reason.trim()) return reason;
  return fallback;
}

function bookAuthor(book: LibraryBook): string {
  if (book.authors?.length) return book.authors.join(", ");
  return book.editors?.length ? `Edited by ${book.editors.join(", ")}` : "";
}

function BookCover({ book }: { book: LibraryBook }) {
  const [imageFailed, setImageFailed] = useState(false);
  useEffect(() => setImageFailed(false), [book.coverImagePath]);
  if (book.coverImagePath && !imageFailed) return <div className="book-cover has-image" aria-hidden="true"><img src={localFileUrl(book.coverImagePath)} alt="" onError={() => setImageFailed(true)} /></div>;
  return <div className="book-cover workspace" aria-hidden="true">
    <span className="book-cover-rule" />
    <span className="book-cover-kicker">{book.status === "ready" ? "READY TO READ" : "BOOKGRAPH"}</span>
    <span className="book-cover-title">{book.title.split(" ").slice(0, 4).join(" ")}</span>
    <span className="book-cover-author">{bookAuthor(book)}</span>
  </div>;
}

function BookCard({ book, opening, enriching, metadataDisabled, metadataError, onMetadata, onOpen, onParse, onComplete, onRemove, onTranslateMore, actionBusy }: {
  book: LibraryBook; opening: boolean; enriching: boolean; metadataDisabled: boolean; metadataError?: string;
  actionBusy: boolean; onMetadata: (book: LibraryBook) => void; onOpen: (book: LibraryBook) => void; onParse: (book: LibraryBook) => void;
  onComplete: (book: LibraryBook) => void; onRemove: (book: LibraryBook) => void; onTranslateMore: (book: LibraryBook) => void;
}) {
  const ready = book.status === "ready";
  const metadataFailed = Boolean(metadataError) || book.metadataStatus === "failed";
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOutside = (event: MouseEvent) => { if (event.target instanceof Node && !menu.current?.contains(event.target)) setMenuOpen(false); };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("mousedown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => { document.removeEventListener("mousedown", closeOutside); document.removeEventListener("keydown", closeOnEscape); };
  }, [menuOpen]);
  return <article className={`book-card workspace-card status-${book.status}`}>
    <div ref={menu} className="book-card-menu"><button type="button" className="book-card-menu-toggle" aria-label={`Options for ${book.title}`} aria-haspopup="menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><Ellipsis size={20} /></button>{menuOpen && <div className="book-card-menu-items" role="menu">
      {ready && <><button type="button" role="menuitem" disabled={actionBusy || book.progressPercent === 100} onClick={() => { setMenuOpen(false); onComplete(book); }}><Check size={15} />Complete</button><button type="button" role="menuitem" disabled={actionBusy} onClick={() => { setMenuOpen(false); onTranslateMore(book); }}><Languages size={15} />Translate more</button></>}
      {book.status !== "invalid" && <button type="button" role="menuitem" className="remove-book-item" disabled={actionBusy} onClick={() => { setMenuOpen(false); onRemove(book); }}><Trash2 size={15} />Remove</button>}
    </div>}</div>
    <BookCover book={book} />
    <div className="book-card-body">
      <h3>{ready ? <button className="book-title-link" type="button" disabled={opening} onClick={() => onOpen(book)}>{opening ? "Opening reader…" : book.title}</button> : book.title}</h3>
      <p className="book-author">{bookAuthor(book) || "Author not identified"}</p>
      <p className="book-metadata-state" role="status">{enriching ? <><LoaderCircle className="spin" size={13} />Reading book details with AI…</> : metadataFailed ? "AI details unavailable. You can retry." : book.metadataStatus === "needs_review" ? "Some book details could not be verified." : book.metadataStatus === "ready" ? <><Sparkles size={12} />Book details filled by AI{!book.coverImagePath && book.coverStatus && book.coverStatus !== "unchecked" ? " · Using default cover" : ""}</> : ready ? `${book.sectionCount ?? 0} sections` : "Needs preparation"}</p>
      {ready ? <><div className="book-progress-label"><span>{book.progressPercent === null ? "Not started" : "Reading progress"}</span><span>{book.progressPercent ?? 0}%</span></div><div className="book-progress" aria-label={`${book.progressPercent ?? 0}% read`}><span style={{ width: `${book.progressPercent ?? 0}%` }} /></div></> : <p className="book-status-reason"><TriangleAlert size={14} />{book.reason ?? "This folder is not a reader-ready BookGraph workspace."}</p>}
    </div>
    {book.status !== "invalid" && <button className="book-details-button" type="button" disabled={metadataDisabled} onClick={() => onMetadata(book)}><Sparkles size={13} />{enriching ? "Filling details…" : metadataFailed ? "Retry AI details" : "Refresh AI details"}</button>}
    {!ready && <button className="parse-book" type="button" onClick={() => onParse(book)}><ExternalLink size={14} />Parse document</button>}
  </article>;
}

function EmptyLibrary() {
  return <section className="library-empty-state is-visible" aria-label="Empty library">
    <LibraryBig size={25} /><div><h2>No books found yet</h2><p>Add BookGraph book workspaces as immediate subfolders, then select Rescan.</p></div>
  </section>;
}

export function LibraryPage({ settings, onOpenBook, onSettingsChanged }: {
  settings: AppSettings;
  onOpenBook: (route: { docId: string; sectionId: string }) => void;
  onSettingsChanged: (settings: AppSettings) => void;
}) {
  const [inventory, setInventory] = useState<LibraryInventory | null>(null);
  const [loading, setLoading] = useState(true);
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [bookTitle, setBookTitle] = useState("");
  const [mineruInfo, setMineruInfo] = useState<MinerUPreparation | null>(null);
  const [action, setAction] = useState<"idle" | "choosing" | "opening" | "preparing" | "logging-out">("idle");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [metadataBusy, setMetadataBusy] = useState<string | null>(null);
  const [metadataErrors, setMetadataErrors] = useState<Record<string, string>>({});
  const [actionBusyBook, setActionBusyBook] = useState<string | null>(null);
  const [translationTarget, setTranslationTarget] = useState<{ book: LibraryBook; requestedPercent: number; totalSections: number } | null>(null);
  const [translationIncrease, setTranslationIncrease] = useState(10);
  const [translationLoading, setTranslationLoading] = useState(false);
  const [translationSubmitting, setTranslationSubmitting] = useState(false);
  const bookRail = useRef<HTMLDivElement>(null);
  const [railCanMove, setRailCanMove] = useState({ previous: false, next: false });
  const metadataAttempts = useRef(new Set<string>());

  const fillBookDetails = async (book: LibraryBook, force = false) => {
    metadataAttempts.current.add(book.id);
    setMetadataBusy(book.id);
    setMetadataErrors((current) => { const next = { ...current }; delete next[book.id]; return next; });
    try {
      await desktopApi().enrichBookMetadata(book.id, force);
      setInventory(await desktopApi().scanLibrary());
      window.dispatchEvent(new Event("bookgraph-metadata-updated"));
    } catch (reason) {
      setMetadataErrors((current) => ({ ...current, [book.id]: messageFrom(reason, "Book details could not be filled.") }));
    } finally { setMetadataBusy(null); }
  };

  useEffect(() => {
    if (metadataBusy || action !== "idle" || !inventory || typeof desktopApi().enrichBookMetadata !== "function") return;
    const book = inventory.books.find((candidate) => candidate.status !== "invalid" && candidate.status !== "unavailable" && !metadataAttempts.current.has(candidate.id) && (!candidate.metadataStatus || ["not_requested", "running"].includes(candidate.metadataStatus)));
    if (book) void fillBookDetails(book);
  }, [inventory, metadataBusy, action]);


  const scan = () => {
    if (!settings.libraryRoot) { setInventory(null); setLoading(false); return; }
    setLoading(true); setError(null);
    void desktopApi().scanLibrary()
      .then(setInventory)
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Unable to scan your library."))
      .finally(() => setLoading(false));
  };

  useEffect(scan, [settings.libraryRoot]);

  const chooseLibrary = async () => {
    setAction("choosing"); setError(null);
    try {
      const libraryRoot = await desktopApi().selectLibraryRoot();
      if (!libraryRoot) return;
      const next = await desktopApi().saveAppSettings({ ...settings, libraryRoot, onboardingCompleted: true });
      onSettingsChanged(next);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to select this library folder.");
    } finally { setAction("idle"); }
  };

  const selectPdf = async () => {
    setAction("preparing"); setError(null);
    try {
      const path = await desktopApi().selectBookPdf();
      if (!path) return;
      setSelectedPdf(path);
      setBookTitle(path.split(/[\\/]/).pop()?.replace(/\.pdf$/i, "") ?? "");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to select this PDF."); }
    finally { setAction("idle"); }
  };

  const prepareBook = async () => {
    if (!selectedPdf || !bookTitle.trim()) { setError("Select a PDF and enter a book title."); return; }
    setAction("preparing"); setError(null);
    try {
      const prepared = await desktopApi().prepareMinerUBook(selectedPdf, bookTitle.trim());
      setAddBookOpen(false);
      setSelectedPdf(null);
      setBookTitle("");
      await desktopApi().openLocalFolder(prepared.workspacePath);
      scan();
    } catch (reason) { setError(messageFrom(reason, "Unable to prepare this book.")); }
    finally { setAction("idle"); }
  };

  const parseBook = async (book: LibraryBook) => {
    setError(null);
    try {
      const info = await desktopApi().getMinerUWorkspaceInfo(book.id);
      setMineruInfo(info);
    } catch (reason) { setError(messageFrom(reason, "Unable to open MinerU instructions.")); }
  };

  const organizeDownloads = async () => {
    if (!mineruInfo) return;
    setAction("preparing"); setError(null);
    try {
      const batches = await desktopApi().organizeMinerUResults(mineruInfo.workspacePath);
      metadataAttempts.current.clear();
      setMineruInfo(null);
      scan();
      setError(`MinerU results organized for ${batches.length} batch${batches.length === 1 ? "" : "es"}.`);
    } catch (reason) { setError(messageFrom(reason, "Unable to organize MinerU results.")); }
    finally { setAction("idle"); }
  };

  const openBook = async (book: LibraryBook) => {
    setAction("opening"); setError(null);
    try { onOpenBook(await desktopApi().openBook(book.id)); }
    catch (reason) { setError(messageFrom(reason, "Unable to open this book.")); }
    finally { setAction("idle"); }
  };

  const completeBook = async (book: LibraryBook) => {
    if (!book.documentId || actionBusyBook) return;
    setActionBusyBook(book.id); setError(null); setNotice(null);
    try {
      await desktopApi().openBook(book.id);
      await completeDocumentReading(book.documentId);
      setInventory(await desktopApi().scanLibrary());
      setNotice("Book marked as complete.");
    } catch (reason) { setError(messageFrom(reason, "Unable to mark this book complete.")); }
    finally { setActionBusyBook(null); }
  };

  const removeBook = async (book: LibraryBook) => {
    if (actionBusyBook || !window.confirm(`Move “${book.title}” to Trash? Its BookGraph workspace will be removed from this library.`)) return;
    setActionBusyBook(book.id); setError(null); setNotice(null);
    try {
      await desktopApi().removeBook(book.id);
      setInventory(await desktopApi().scanLibrary());
      setNotice("Book moved to Trash.");
    } catch (reason) { setError(messageFrom(reason, "Unable to remove this book.")); }
    finally { setActionBusyBook(null); }
  };

  const openTranslateMore = async (book: LibraryBook) => {
    if (!book.documentId || actionBusyBook) return;
    setTranslationTarget({ book, requestedPercent: 0, totalSections: book.sectionCount ?? 0 });
    setActionBusyBook(book.id); setTranslationLoading(true); setError(null); setNotice(null);
    try {
      await desktopApi().openBook(book.id);
      const coverage = await getTranslationCoverage(book.documentId, settings.targetLanguage);
      setTranslationTarget({ book, requestedPercent: coverage.requested_percent, totalSections: coverage.total_sections });
      setTranslationIncrease(Math.min(10, Math.max(1, 100 - coverage.requested_percent)));
    } catch (reason) { setTranslationTarget(null); setError(messageFrom(reason, "Unable to load translation progress.")); }
    finally { setTranslationLoading(false); setActionBusyBook(null); }
  };

  const requestMoreTranslation = async () => {
    if (!translationTarget || translationSubmitting) return;
    const percent = Math.min(100, translationTarget.requestedPercent + translationIncrease);
    setTranslationSubmitting(true); setError(null); setNotice(null);
    try {
      const coverage = await startTranslationCoverage(translationTarget.book.documentId!, settings.targetLanguage, percent);
      setNotice(`Translation queued for ${coverage.target_sections} of ${coverage.total_sections} sections (${coverage.requested_percent}% of the book).`);
      setTranslationTarget(null);
    } catch (reason) { setError(messageFrom(reason, "Unable to start translation.")); }
    finally { setTranslationSubmitting(false); }
  };

  const logout = async () => {
    if (action !== "idle") return;
    setAction("logging-out");
    setError(null);
    try {
      onSettingsChanged(await signOutDesktop(settings));
    } catch (reason) {
      setError(messageFrom(reason, "Unable to log out. Please try again."));
    } finally {
      setAction("idle");
    }
  };

  const books = inventory?.books ?? [];
  useEffect(() => {
    const rail = bookRail.current;
    if (!rail) return;
    const update = () => setRailCanMove({ previous: rail.scrollLeft > 2, next: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2 });
    update();
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { rail.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [books.length, loading]);
  const moveBookRail = (direction: -1 | 1) => bookRail.current?.scrollBy({ left: direction * bookRail.current.clientWidth * 0.82, behavior: "smooth" });
  return <div className="library-page" id="library">
    <header className="library-topbar"><div className="library-topbar-inner"><a className="library-brand" href="?" aria-label="BookGraph Library"><BookOpen size={21} strokeWidth={1.8} /><span>BookGraph</span></a><nav className="library-nav" aria-label="Primary navigation"><a className="is-active" href="#library">Library</a></nav><div className="library-actions"><button className="library-rescan" type="button" disabled={loading} onClick={scan}><RefreshCw className={loading ? "spin" : ""} size={16} />Rescan</button><ProfileMenu displayName={settings.displayName} profileImagePath={settings.profileImagePath} disabled={action !== "idle"} onLogout={() => void logout()} /></div></div></header>
    <main className="library-content">
      <section className="library-hero library-hero-compact"><div className="hero-copy"><p className="hero-eyebrow">YOUR LIBRARY</p><h1>Hello, {settings.displayName || "Reader"}.</h1><p className="hero-description">{settings.libraryRoot ? `Books from ${inventory?.libraryName ?? "your selected folder"}.` : "Choose a local folder to begin building your library."}</p></div><section className="reading-goal library-location"><div className="goal-header"><span>Library folder</span><button type="button" onClick={() => void chooseLibrary()} disabled={action !== "idle"}>{action === "choosing" ? "Opening…" : "Change"}</button></div><p>{settings.libraryRoot ? inventory?.libraryName ?? "Scanning…" : "Not selected"}</p></section></section>
      {error && <p className="library-error" role="alert">{error}</p>}{notice && <p className="library-notice" role="status">{notice}</p>}
      <section className="currently-reading" aria-labelledby="library-books-title"><div className="section-heading"><h2 id="library-books-title">Your books</h2><div className="books-heading-actions"><span>{books.length ? `${books.length} folder${books.length === 1 ? "" : "s"}` : ""}</span><button className="add-book" type="button" onClick={() => { setAddBookOpen(true); setError(null); }}><Plus size={16} />Add a book</button></div></div>{loading ? <p className="library-rail-empty"><LoaderCircle className="spin" size={17} />Scanning library…</p> : books.length ? <div className="book-rail-shell"><button className="book-rail-arrow previous" type="button" aria-label="Show previous books" disabled={!railCanMove.previous} onClick={() => moveBookRail(-1)}><ChevronLeft size={22} /></button><div className="book-rail" ref={bookRail}>{books.map((book) => <BookCard book={book} opening={action === "opening"} enriching={metadataBusy === book.id} metadataDisabled={metadataBusy !== null} metadataError={metadataErrors[book.id]} actionBusy={actionBusyBook !== null} onMetadata={(selected) => void fillBookDetails(selected, true)} onOpen={(selected) => void openBook(selected)} onParse={(selected) => void parseBook(selected)} onComplete={(selected) => void completeBook(selected)} onRemove={(selected) => void removeBook(selected)} onTranslateMore={(selected) => void openTranslateMore(selected)} key={book.id} />)}</div><button className="book-rail-arrow next" type="button" aria-label="Show more books" disabled={!railCanMove.next} onClick={() => moveBookRail(1)}><ChevronRight size={22} /></button></div> : <EmptyLibrary />}</section>
      {translationTarget && <div className="add-book-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !translationSubmitting) setTranslationTarget(null); }}><section className="add-book-modal translate-more-modal" role="dialog" aria-modal="true" aria-labelledby="translate-more-title" onMouseDown={(event) => event.stopPropagation()}><header><div><p>TRANSLATE MORE</p><h2 id="translate-more-title">{translationTarget.book.title}</h2></div><button type="button" aria-label="Close translation options" disabled={translationSubmitting} onClick={() => setTranslationTarget(null)}><X size={19} /></button></header>{translationLoading ? <p><LoaderCircle className="spin" size={16} />Loading translation progress…</p> : <><p>Already requested: {translationTarget.requestedPercent}% ({translationTarget.totalSections} sections total). Choose how much more of the book to translate.</p><label className="translation-range-label"><span>Additional coverage</span><strong>{translationIncrease}% → {Math.min(100, translationTarget.requestedPercent + translationIncrease)}% total</strong><input type="range" min="1" max={Math.max(1, 100 - translationTarget.requestedPercent)} step="1" value={translationIncrease} onChange={(event) => setTranslationIncrease(Number(event.target.value))} disabled={translationTarget.requestedPercent >= 100} /></label><button className="modal-primary" type="button" disabled={translationSubmitting || translationTarget.requestedPercent >= 100} onClick={() => void requestMoreTranslation()}>{translationSubmitting ? <><LoaderCircle className="spin" size={16} />Starting translation…</> : translationTarget.requestedPercent >= 100 ? "Entire book already requested" : "Start translation"}</button></>}</section></div>}
      {mineruInfo && <div className="add-book-backdrop" role="presentation" onMouseDown={() => setMineruInfo(null)}><section className="add-book-modal mineru-paths" role="dialog" aria-modal="true" aria-labelledby="mineru-paths-title" onMouseDown={(event) => event.stopPropagation()}><header><div><p>MINERU WEB</p><h2 id="mineru-paths-title">{mineruInfo.title}</h2></div><button type="button" aria-label="Close MinerU paths" onClick={() => setMineruInfo(null)}><X size={19} /></button></header><p>Open MinerU Extractor with the button below. Upload the PDF files from the upload location. For each upload, download JSON, Markdown, and the LaTeX ZIP containing images. Put these files into the download folder when processing is complete. HTML and Word exports are optional.</p><button className="modal-secondary" type="button" onClick={() => void desktopApi().openMinerUWeb().catch((reason: unknown) => setError(messageFrom(reason, "Unable to open MinerU Web.")))}>Open MinerU Web</button><label>Upload folder<input value={mineruInfo.uploadDirectory} readOnly /></label><button className="modal-secondary" type="button" onClick={() => void desktopApi().openLocalFolder(mineruInfo.uploadDirectory)}>Open upload folder</button><div className="mineru-batches">{mineruInfo.batches.map((batch) => <span key={batch.batchId}>{batch.filename} · pages {batch.startPage}–{batch.endPage}</span>)}</div><label>Download folder<input value={mineruInfo.downloadsDirectory} readOnly /></label><button className="modal-secondary" type="button" onClick={() => void desktopApi().openLocalFolder(mineruInfo.downloadsDirectory)}>Open download folder</button><button className="modal-primary" type="button" disabled={action !== "idle"} onClick={() => void organizeDownloads()}>{action === "preparing" ? <><LoaderCircle className="spin" size={16} />Creating workspace…</> : "I added all MinerU results"}</button></section></div>}
      {addBookOpen && <div className="add-book-backdrop" role="presentation" onMouseDown={() => action === "idle" && setAddBookOpen(false)}><section className="add-book-modal" role="dialog" aria-modal="true" aria-labelledby="add-book-title" onMouseDown={(event) => event.stopPropagation()}><header><div><p>ADD A BOOK</p><h2 id="add-book-title">Prepare a PDF with MinerU.</h2></div><button type="button" aria-label="Close add book" disabled={action !== "idle"} onClick={() => setAddBookOpen(false)}><X size={19} /></button></header><p>BookGraph will create a private book workspace, split PDFs into uploads of up to 200 pages, and open its folder. Process each upload with MinerU Web, then place every downloaded result into the workspace downloads folder.</p><label>PDF file<input value={selectedPdf ?? ""} readOnly placeholder="Choose a PDF to begin" /></label><button className="modal-secondary" type="button" disabled={action !== "idle"} onClick={() => void selectPdf()}>{action === "preparing" && !selectedPdf ? <LoaderCircle className="spin" size={16} /> : <Plus size={16} />}Choose PDF</button><label>Book title<input value={bookTitle} onChange={(event) => setBookTitle(event.target.value)} placeholder="Book title" /></label><button className="modal-primary" type="button" disabled={action !== "idle" || !selectedPdf || !bookTitle.trim()} onClick={() => void prepareBook()}>{action === "preparing" && selectedPdf ? <LoaderCircle className="spin" size={16} /> : <BookOpen size={16} />}{action === "preparing" && selectedPdf ? "Preparing workspace…" : "Prepare MinerU workspace"}</button></section></div>}

    </main>
  </div>;
}
