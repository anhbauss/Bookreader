import { BookOpen, ExternalLink, LibraryBig, LoaderCircle, Plus, RefreshCw, TriangleAlert, X } from "lucide-react";
import { useEffect, useState } from "react";
import { desktopApi, type AppSettings, type LibraryBook, type LibraryInventory, type MinerUPreparation } from "../desktop";
import "./library.css";

function messageFrom(reason: unknown, fallback: string): string {
  if (reason instanceof Error) return reason.message;
  if (typeof reason === "string" && reason.trim()) return reason;
  return fallback;
}

function BookCover({ book }: { book: LibraryBook }) {
  return <div className="book-cover workspace" aria-hidden="true">
    <span className="book-cover-rule" />
    <span className="book-cover-kicker">{book.status === "ready" ? "READY TO READ" : "BOOKGRAPH"}</span>
    <span className="book-cover-title">{book.title.split(" ").slice(0, 4).join(" ")}</span>
    <span className="book-cover-author">{book.folderName}</span>
  </div>;
}

function BookCard({ book, opening, onOpen, onParse }: { book: LibraryBook; opening: boolean; onOpen: (book: LibraryBook) => void; onParse: (book: LibraryBook) => void }) {
  const ready = book.status === "ready";
  return <article className={`book-card workspace-card status-${book.status}`}>
    <BookCover book={book} />
    <div className="book-card-body">
      <h3>{ready ? <button className="book-title-link" type="button" disabled={opening} onClick={() => onOpen(book)}>{opening ? "Opening reader…" : book.title}</button> : book.title}</h3>
      <p className="book-author">{book.status === "ready" ? `${book.sectionCount ?? 0} sections` : "Needs preparation"}</p>
      {ready ? <><div className="book-progress-label"><span>{book.progressPercent === null ? "Not started" : "Reading progress"}</span><span>{book.progressPercent ?? 0}%</span></div><div className="book-progress" aria-label={`${book.progressPercent ?? 0}% read`}><span style={{ width: `${book.progressPercent ?? 0}%` }} /></div></> : <p className="book-status-reason"><TriangleAlert size={14} />{book.reason ?? "This folder is not a reader-ready BookGraph workspace."}</p>}
    </div>
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
  const [action, setAction] = useState<"idle" | "choosing" | "opening" | "preparing">("idle");
  const [error, setError] = useState<string | null>(null);

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
      await desktopApi().openMinerUWeb();
    } catch (reason) { setError(messageFrom(reason, "Unable to open MinerU Web.")); }
  };

  const organizeDownloads = async () => {
    if (!mineruInfo) return;
    setAction("preparing"); setError(null);
    try {
      const batches = await desktopApi().organizeMinerUResults(mineruInfo.workspacePath);
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

  const books = inventory?.books ?? [];
  return <div className="library-page" id="library">
    <header className="library-topbar"><div className="library-topbar-inner"><a className="library-brand" href="?" aria-label="BookGraph Library"><BookOpen size={21} strokeWidth={1.8} /><span>BookGraph</span></a><nav className="library-nav" aria-label="Primary navigation"><a className="is-active" href="#library">Library</a></nav><div className="library-actions"><button className="library-rescan" type="button" disabled={loading} onClick={scan}><RefreshCw className={loading ? "spin" : ""} size={16} />Rescan</button><button className="library-avatar" type="button" aria-label="Profile">{settings.displayName.slice(0, 1).toUpperCase() || "B"}</button></div></div></header>
    <main className="library-content">
      <section className="library-hero library-hero-compact"><div className="hero-copy"><p className="hero-eyebrow">YOUR LIBRARY</p><h1>Hello, {settings.displayName || "Reader"}.</h1><p className="hero-description">{settings.libraryRoot ? `Books from ${inventory?.libraryName ?? "your selected folder"}.` : "Choose a local folder to begin building your library."}</p></div><section className="reading-goal library-location"><div className="goal-header"><span>Library folder</span><button type="button" onClick={() => void chooseLibrary()} disabled={action !== "idle"}>{action === "choosing" ? "Opening…" : "Change"}</button></div><p>{settings.libraryRoot ? inventory?.libraryName ?? "Scanning…" : "Not selected"}</p></section></section>
      {error && <p className="library-error" role="alert">{error}</p>}
      <section className="currently-reading" aria-labelledby="library-books-title"><div className="section-heading"><h2 id="library-books-title">Your books</h2><div className="books-heading-actions"><span>{books.length ? `${books.length} folder${books.length === 1 ? "" : "s"}` : ""}</span><button className="add-book" type="button" onClick={() => { setAddBookOpen(true); setError(null); }}><Plus size={16} />Add a book</button></div></div>{loading ? <p className="library-rail-empty"><LoaderCircle className="spin" size={17} />Scanning library…</p> : books.length ? <div className="book-rail">{books.map((book) => <BookCard book={book} opening={action === "opening"} onOpen={(selected) => void openBook(selected)} onParse={(selected) => void parseBook(selected)} key={book.id} />)}</div> : <EmptyLibrary />}</section>
      {mineruInfo && <div className="add-book-backdrop" role="presentation" onMouseDown={() => setMineruInfo(null)}><section className="add-book-modal mineru-paths" role="dialog" aria-modal="true" aria-labelledby="mineru-paths-title" onMouseDown={(event) => event.stopPropagation()}><header><div><p>MINERU WEB</p><h2 id="mineru-paths-title">{mineruInfo.title}</h2></div><button type="button" aria-label="Close MinerU paths" onClick={() => setMineruInfo(null)}><X size={19} /></button></header><p>MinerU Extractor is open in your browser. Upload the PDF files from the upload location below. Put every downloaded MinerU result into the download location when processing is complete.</p><label>Upload folder<input value={mineruInfo.uploadDirectory} readOnly /></label><button className="modal-secondary" type="button" onClick={() => void desktopApi().openLocalFolder(mineruInfo.uploadDirectory)}>Open upload folder</button><div className="mineru-batches">{mineruInfo.batches.map((batch) => <span key={batch.batchId}>{batch.filename} · pages {batch.startPage}–{batch.endPage}</span>)}</div><label>Download folder<input value={mineruInfo.downloadsDirectory} readOnly /></label><button className="modal-secondary" type="button" onClick={() => void desktopApi().openLocalFolder(mineruInfo.downloadsDirectory)}>Open download folder</button><button className="modal-primary" type="button" disabled={action !== "idle"} onClick={() => void organizeDownloads()}>{action === "preparing" ? <><LoaderCircle className="spin" size={16} />Creating workspace…</> : "I added all MinerU results"}</button></section></div>}
      {addBookOpen && <div className="add-book-backdrop" role="presentation" onMouseDown={() => action === "idle" && setAddBookOpen(false)}><section className="add-book-modal" role="dialog" aria-modal="true" aria-labelledby="add-book-title" onMouseDown={(event) => event.stopPropagation()}><header><div><p>ADD A BOOK</p><h2 id="add-book-title">Prepare a PDF with MinerU.</h2></div><button type="button" aria-label="Close add book" disabled={action !== "idle"} onClick={() => setAddBookOpen(false)}><X size={19} /></button></header><p>BookGraph will create a private book workspace, split PDFs into uploads of up to 200 pages, and open its folder. Process each upload with MinerU Web, then place every downloaded result into the workspace downloads folder.</p><label>PDF file<input value={selectedPdf ?? ""} readOnly placeholder="Choose a PDF to begin" /></label><button className="modal-secondary" type="button" disabled={action !== "idle"} onClick={() => void selectPdf()}>{action === "preparing" && !selectedPdf ? <LoaderCircle className="spin" size={16} /> : <Plus size={16} />}Choose PDF</button><label>Book title<input value={bookTitle} onChange={(event) => setBookTitle(event.target.value)} placeholder="Book title" /></label><button className="modal-primary" type="button" disabled={action !== "idle" || !selectedPdf || !bookTitle.trim()} onClick={() => void prepareBook()}>{action === "preparing" && selectedPdf ? <LoaderCircle className="spin" size={16} /> : <BookOpen size={16} />}{action === "preparing" && selectedPdf ? "Preparing workspace…" : "Prepare MinerU workspace"}</button></section></div>}

    </main>
  </div>;
}
