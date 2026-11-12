import { Check, LoaderCircle, Sparkles } from "lucide-react";
import type { SectionContext } from "./api";
import { progressPercent, type MarkReadState, type ReaderProgressState } from "./reading";

export function ProgressPanel({
  state,
  markState,
  onMarkRead,
  disabled,
}: {
  state: ReaderProgressState;
  markState: MarkReadState;
  onMarkRead: () => void;
  disabled: boolean;
}) {
  const percent = progressPercent(state.progress);
  return (
    <section className="reader-panel" aria-labelledby="reading-progress-title">
      <div className="panel-kicker">Reading plan</div>
      <h2 id="reading-progress-title">Progress</h2>
      {state.status === "loading" || state.status === "idle" ? <p className="muted"><LoaderCircle className="spin" size={15} /> Loading progress…</p> : null}
      {state.status === "error" ? <p className="panel-error">Progress unavailable: {state.error}</p> : null}
      {state.progress ? <>
        <div className="progress-label"><strong>{state.progress.completed} of {state.progress.total}</strong><span>{percent}%</span></div>
        <div className="progress-track" aria-label={`${percent}% complete`}><span style={{ width: `${percent}%` }} /></div>
        <button className="mark-read" onClick={onMarkRead} disabled={disabled || markState.status === "saving" || state.progress.done}>
          {markState.status === "saving" ? <LoaderCircle className="spin" size={16} /> : <Check size={16} />}
          {state.progress.done ? "Plan complete" : markState.status === "done" ? "Marked as read" : "Mark section read"}
        </button>
        {markState.status === "error" && <p className="panel-error">Could not update progress: {markState.message}</p>}
      </> : null}
    </section>
  );
}

export function MemoryPanel({
  context,
  status,
  error,
}: {
  context: SectionContext | null;
  status: "idle" | "loading" | "ready" | "error";
  error: string | null;
}) {
  return (
    <section className="reader-panel memory-panel" aria-labelledby="section-memory-title">
      <div className="panel-kicker"><Sparkles size={14} /> BookGraph memory</div>
      <h2 id="section-memory-title">Concepts & annotations</h2>
      {status === "loading" || status === "idle" ? <p className="muted"><LoaderCircle className="spin" size={15} /> Loading section memory…</p> : null}
      {status === "error" ? <p className="panel-error">Memory unavailable: {error}</p> : null}
      {status === "ready" && context ? <>
        {context.summary ? <div className="annotation"><span>Annotation</span><p>{context.summary}</p></div> : <p className="muted">No annotation for this section yet.</p>}
        {context.concepts.length ? <ul className="concept-list">{context.concepts.map((concept) => <li key={concept.slug}><strong>{concept.title}</strong>{concept.gloss && <span>{concept.gloss}</span>}</li>)}</ul> : <p className="muted">No concepts attached to this section yet.</p>}
      </> : null}
    </section>
  );
}
