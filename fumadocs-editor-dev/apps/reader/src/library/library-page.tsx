import { BookOpen, Check, LibraryBig, Menu, MoreHorizontal, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { currentlyReading, type ReadingBook } from "./mock-books";
import "./library.css";

export function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="library-topbar">
    <div className="library-topbar-inner">
      <a className="library-brand" href="?" aria-label="Book Reader Library"><BookOpen size={21} strokeWidth={1.8} /><span>Book Reader</span></a>
      <nav className={`library-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        <a className="is-active" href="#library">Library</a>
        <a href="#currently-reading">Reading</a>
      </nav>
      <div className="library-actions">
        <button className="library-more" type="button" aria-label="More actions"><MoreHorizontal size={20} /></button>
        <button className="library-avatar" type="button" aria-label="Open profile">B</button>
        <button className="library-menu" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><Menu size={21} /></button>
      </div>
    </div>
  </header>;
}

function ReadingGoal() {
  return <section className="reading-goal" aria-labelledby="reading-goal-title">
    <div className="goal-header"><span id="reading-goal-title">Reading Goal</span><span>This month</span></div>
    <div className="goal-numbers"><strong>4</strong><span>of 6 books</span></div>
    <div className="goal-track" aria-label="Reading goal: 4 of 6 books"><span /></div>
    <p>2 books to reach your goal.</p>
  </section>;
}

export function Hero() {
  return <section className="library-hero" aria-label="Library overview">
    <div className="hero-copy"><p className="hero-eyebrow">YOUR LIBRARY</p><h1>Good morning,<br />Bảo.</h1><p className="hero-description">Pick up where you left off and make a little progress today.</p></div>
    <ReadingGoal />
  </section>;
}

function BookCover({ book }: { book: ReadingBook }) {
  const titleWords = book.title.split(" ");
  return <div className={`book-cover ${book.coverClass}`} aria-hidden="true">
    <span className="book-cover-rule" />
    <span className="book-cover-kicker">READING NOW</span>
    <span className="book-cover-title">{titleWords.slice(0, 3).join(" ")}</span>
    <span className="book-cover-author">{book.author}</span>
  </div>;
}

type BookCardProps = {
  book: ReadingBook;
  completed: boolean;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

export function BookCard({ book, completed, onComplete, onDelete }: BookCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const progress = Math.round((book.currentPage / book.totalPages) * 100);

  useEffect(() => {
    if (!menuOpen) return;
    const closeMenu = (event: MouseEvent) => {
      if (!menu.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const closeWithEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("mousedown", closeMenu);
    window.addEventListener("keydown", closeWithEscape);
    return () => { window.removeEventListener("mousedown", closeMenu); window.removeEventListener("keydown", closeWithEscape); };
  }, [menuOpen]);

  return <article className={`book-card ${completed ? "is-completed" : ""}`}>
    <a className="book-card-link" href={book.readerHref} aria-label={`Continue reading ${book.title}`}><BookCover book={book} /><div className="book-card-body"><h3>{book.title}</h3><p className="book-author">{book.author}</p><div className="book-progress-label"><span>Page {book.currentPage} of {book.totalPages}</span><span>{progress}%</span></div><div className="book-progress" aria-label={`${progress}% read`}><span style={{ width: `${progress}%` }} /></div></div></a>
    <div className="book-card-menu" ref={menu}>
      <button className="book-card-menu-trigger" type="button" aria-label={`Options for ${book.title}`} aria-haspopup="menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><MoreHorizontal size={19} /></button>
      {menuOpen && <div className="book-card-menu-popover" role="menu">
        <button type="button" role="menuitem" onClick={() => { onComplete(book.id); setMenuOpen(false); }}><Check size={16} />{completed ? "Mark as reading" : "Complete"}</button>
        <button type="button" role="menuitem" className="is-danger" onClick={() => { onDelete(book.id); setMenuOpen(false); }}><Trash2 size={16} />Delete</button>
      </div>}
    </div>
  </article>;
}

export function CurrentlyReadingRow() {
  const [books, setBooks] = useState(currentlyReading);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const completeBook = (id: string) => setCompletedIds((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]);
  const deleteBook = (id: string) => setBooks((items) => items.filter((book) => book.id !== id));
  return <section className="currently-reading" id="currently-reading" aria-labelledby="currently-reading-title">
    <div className="section-heading"><h2 id="currently-reading-title">Currently Reading</h2><a href="#currently-reading">View all <span aria-hidden="true">→</span></a></div>
    {books.length ? <div className="book-rail">{books.map((book) => <BookCard book={book} completed={completedIds.includes(book.id)} onComplete={completeBook} onDelete={deleteBook} key={book.id} />)}</div> : <p className="library-rail-empty">Your shelf is clear for now.</p>}
  </section>;
}

export function LibraryPage() {
  return <div className="library-page" id="library"><TopBar /><main className="library-content"><Hero /><CurrentlyReadingRow /><section className="library-empty-state" aria-label="Library note"><LibraryBig size={18} /><p>Your reading space, thoughtfully kept.</p></section></main></div>;
}
