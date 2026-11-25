import { Bookmark, List, PanelRight, Search, Settings2, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import type { ReadingMode } from "./translation";
import "./reader-experience.css";

type ReaderTheme = "light" | "dark" | "paper";
type ReaderFont = "serif" | "sans";
type ReaderSize = "s" | "m" | "l" | "xl";

type HeaderProps = { title: string; author: string; onSearch: () => void; onSettings: () => void; onPanel: () => void; onBookmark: () => void; bookmarked: boolean; bookmarkDisabled?: boolean; onLibrary: () => void; insightsOpen: boolean; onInsights: () => void };
export function ReaderHeader({ title, author, onSearch, onSettings, onPanel, onBookmark, bookmarked, bookmarkDisabled, onLibrary, insightsOpen, onInsights }: HeaderProps) {
  return <header className="book-reader-header">
    <button type="button" className="reader-library-link" onClick={onLibrary}><img src="/bookgraph-icon.svg" width={24} height={24} alt="" aria-hidden="true" /> Library</button>
    <div className="reader-book-context"><span>{title}</span>{author && <small>{author}</small>}</div>
    <div className="reader-header-actions">
      <button type="button" aria-label="Search in this book" onClick={onSearch}><Search size={18} /></button>
      <button type="button" aria-label={bookmarked ? "Remove saved reading position" : "Save reading position"} title={bookmarked ? "Remove saved reading position" : "Save reading position"} aria-pressed={bookmarked} disabled={bookmarkDisabled} onClick={onBookmark}><Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} /></button>
      <button type="button" aria-label="Open reading panels" onClick={onPanel}><List size={18} /></button>
      <button type="button" aria-label="Open visual settings" onClick={onSettings}><Settings2 size={18} /></button>
      <button type="button" aria-label="Toggle progress and memory" title="Progress & memory" aria-expanded={insightsOpen} aria-controls="reader-insights" onClick={onInsights}><PanelRight size={18} /></button>
    </div>
  </header>;
}

export function ReaderInsights({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();
    return () => { previousFocus?.focus(); };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Node && !panel.current?.contains(event.target)) onClose();
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [open, onClose]);
  return <aside ref={panel} id="reader-insights" className={`reader-insights reader-insights-drawer ${open ? "open" : ""}`} aria-label="Reading progress and section memory" aria-hidden={!open} inert={!open} onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); onClose(); } }}>
    <header className="reader-insights-header"><span>Progress & memory</span><button ref={closeButton} type="button" aria-label="Close progress and memory" onClick={onClose}><X size={19} /></button></header>
    {children}
  </aside>;
}

type SettingsProps = { theme: ReaderTheme; font: ReaderFont; size: ReaderSize; vertical: boolean; showVertical: boolean; onTheme: (value: ReaderTheme) => void; onFont: (value: ReaderFont) => void; onSize: (value: ReaderSize) => void; onVertical: (value: boolean) => void };
export function VisualSettingsPopover(props: SettingsProps) {
  return <section className="visual-settings" aria-label="Visual settings">
    <SettingGroup label="Theme"><div className="theme-options">{(["light", "dark", "paper"] as const).map((theme) => <button key={theme} type="button" className={`theme-option theme-${theme} ${props.theme === theme ? "selected" : ""}`} onClick={() => props.onTheme(theme)}><i /><span>{theme}</span></button>)}</div></SettingGroup>
    <SettingGroup label="Font"><div className="choice-row">{(["serif", "sans"] as const).map((font) => <button type="button" key={font} className={props.font === font ? "selected" : ""} onClick={() => props.onFont(font)}>{font === "serif" ? "Serif" : "Sans Serif"}</button>)}</div></SettingGroup>
    <SettingGroup label="Text size"><div className="choice-row size-row">{(["s", "m", "l", "xl"] as const).map((size) => <button type="button" key={size} className={props.size === size ? "selected" : ""} onClick={() => props.onSize(size)}>{size.toUpperCase()}</button>)}</div></SettingGroup>
    {props.showVertical && <div className="settings-toggle"><div><strong>Vertical Scroll</strong><span>Read continuously</span></div><button type="button" role="switch" aria-checked={props.vertical} className={props.vertical ? "on" : ""} onClick={() => props.onVertical(!props.vertical)}><i /></button></div>}
  </section>;
}
function SettingGroup({ label, children }: { label: string; children: ReactNode }) { return <div className="settings-group"><p>{label}</p>{children}</div>; }

type Result = { id: string; chapter: string; text: string };
type SearchModalProps = { source: string; onClose: () => void; onResult: (id: string) => void };
export function SearchModal({ source, onClose, onResult }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useEffect(() => { input.current?.focus(); }, []);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialog.current) return;
      const items = [...dialog.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled])')];
      if (!items.length) return;
      const first = items[0]; const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);
  const results = useMemo<Result[]>(() => {
    const terms = query.trim().toLowerCase(); if (!terms) return [];
    return source.split(/\n\n+/).map((text, index) => ({ id: `search-${index}`, chapter: toRoman(index + 1), text: text.replace(/[#*_`]/g, " ").replace(/\s+/g, " ").trim() })).filter((row) => row.text.toLowerCase().includes(terms)).slice(0, 12);
  }, [query, source]);
  return <div className="search-backdrop" role="presentation" onMouseDown={onClose}><div className="search-modal" ref={dialog} role="dialog" aria-modal="true" aria-labelledby={titleId} onMouseDown={(event) => event.stopPropagation()}>
    <header><h2 id={titleId}>Search in book</h2><button type="button" aria-label="Close search" onClick={onClose}><X size={19} /></button></header>
    <div className="search-input"><Search size={18} /><input ref={input} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search in this book…" aria-label="Search in this book" />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={17} /></button>}</div>
    <div className="search-results">{!query ? <p className="search-empty">Search for a word or phrase in this book.</p> : results.length ? results.map((result) => <button type="button" className="search-result" key={result.id} onClick={() => { onResult(result.id); onClose(); }}><span>CHAPTER {result.chapter}</span><p><Highlight text={result.text} query={query} /></p></button>) : <p className="search-empty">No results for “{query}”.</p>}</div>
  </div></div>;
}
function Highlight({ text, query }: { text: string; query: string }) { const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "ig")); return <>{parts.map((part, index) => part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : part)}</>; }
function escapeRegExp(value: string) { return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function toRoman(value: number) { const map: [number, string][] = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]]; return map.reduce((result, [number, symbol]) => { while (value >= number) { result += symbol; value -= number; } return result; }, ""); }

type DrawerProps = { open: boolean; onClose: () => void; mode: ReadingMode; onMode: (mode: ReadingMode) => void; children: ReactNode };
export function ReaderDrawer({ open, onClose, mode, onMode, children }: DrawerProps) {
  useEffect(() => { const handler = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); }; if (open) window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler); }, [open, onClose]);
  return <>{open && <button type="button" className="reader-panel-backdrop" aria-label="Close reading panels" onClick={onClose} />}<aside className={`reader-drawer ${open ? "open" : ""}`} aria-label="Reading panels" aria-hidden={!open}><header><span>Reading tools</span><button type="button" aria-label="Close reading panels" onClick={onClose}><X size={19} /></button></header><section><p className="drawer-label">Reading mode</p><div className="reader-mode-options">{(["original", "translation", "bilingual"] as const).map((value) => <button key={value} type="button" className={mode === value ? "selected" : ""} onClick={() => onMode(value)}>{value === "original" ? "Original" : value === "translation" ? "Translation" : "Bilingual"}</button>)}</div></section><section className="drawer-content">{children}</section></aside></>;
}

export function useReaderPreferences() {
  const [theme, setTheme] = useState<ReaderTheme>(() => (localStorage.getItem("book-reader-theme") as ReaderTheme) || "dark");
  const [font, setFont] = useState<ReaderFont>(() => (localStorage.getItem("book-reader-font") as ReaderFont) || "serif");
  const [size, setSize] = useState<ReaderSize>(() => (localStorage.getItem("book-reader-size") as ReaderSize) || "m");
  const [vertical, setVertical] = useState(() => localStorage.getItem("book-reader-scroll") === "vertical");
  useEffect(() => { localStorage.setItem("book-reader-theme", theme); }, [theme]); useEffect(() => { localStorage.setItem("book-reader-font", font); }, [font]); useEffect(() => { localStorage.setItem("book-reader-size", size); }, [size]); useEffect(() => { localStorage.setItem("book-reader-scroll", vertical ? "vertical" : "paged"); }, [vertical]);
  return { theme, font, size, vertical, setTheme, setFont, setSize, setVertical };
}
