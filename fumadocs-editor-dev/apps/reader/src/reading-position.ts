import { useEffect, useRef, useState } from "react";
import { getReadingPosition, saveReadingPosition } from "./api";

export function useReadingPosition(docId: string, sectionId: string, onResume: (id: string) => void) {
  const [saved, setSaved] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "saving">("loading");
  const [message, setMessage] = useState<string | null>(null);
  const current = useRef({ docId, sectionId, onResume });
  current.current = { docId, sectionId, onResume };
  const saving = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const initialSection = current.current.sectionId;
    setSaved(null);
    setStatus("loading");
    setMessage(null);
    void getReadingPosition(docId).then((position) => {
      if (cancelled) return;
      setSaved(position.section_id);
      // Resume once per book opening; do not redirect after normal navigation.
      if (position.section_id && current.current.sectionId === initialSection) {
        current.current.onResume(position.section_id);
      }
    }).catch((error: unknown) => {
      if (!cancelled) setMessage(error instanceof Error ? error.message : "Unable to load reading position.");
    }).finally(() => { if (!cancelled) setStatus("ready"); });
    return () => { cancelled = true; };
  }, [docId]);

  const toggle = async () => {
    if (status !== "ready" || saving.current) return;
    saving.current = true;
    setStatus("saving");
    setMessage(null);
    try {
      const result = await saveReadingPosition(docId, saved === sectionId ? null : sectionId);
      if (current.current.docId === docId) {
        setSaved(result.section_id);
        setMessage(result.section_id ? "Reading position saved." : "Saved reading position removed.");
      }
    } catch (error: unknown) {
      if (current.current.docId === docId) setMessage(error instanceof Error ? error.message : "Unable to save reading position.");
    } finally {
      saving.current = false;
      if (current.current.docId === docId) setStatus("ready");
    }
  };

  return { bookmarked: saved === sectionId, status, message, toggle, dismissMessage: () => setMessage(null) };
}
