import { LogOut } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { localFileUrl } from "../desktop";

export function ProfileMenu({ displayName, profileImagePath, disabled, onLogout }: {
  displayName: string;
  profileImagePath: string | null;
  disabled: boolean;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  useEffect(() => { setImageFailed(false); }, [profileImagePath]);
  const anchor = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const item = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    item.current?.focus();
    const outside = (event: PointerEvent) => {
      if (!anchor.current?.contains(event.target as Node)) setOpen(false);
    };
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        trigger.current?.focus();
      } else if (event.key === "Tab") setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", dismiss);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", dismiss);
    };
  }, [open]);

  return <div ref={anchor} className="library-profile">
    <button ref={trigger} className="library-avatar" type="button" aria-label="Profile"
      aria-haspopup="menu" aria-expanded={open} aria-controls={open ? menuId : undefined}
      disabled={disabled}
      onClick={() => setOpen((value) => !value)}
      onContextMenu={(event) => {
        event.preventDefault();
        if (!disabled) setOpen(true);
      }}
      onKeyDown={(event) => {
        if (["ArrowDown", "ArrowUp", "ContextMenu"].includes(event.key) || (event.shiftKey && event.key === "F10")) {
          event.preventDefault();
          if (!disabled) setOpen(true);
        }
      }}>
      {profileImagePath && !imageFailed
        ? <img src={localFileUrl(profileImagePath)} alt="Profile picture" onError={() => setImageFailed(true)} />
        : displayName.slice(0, 1).toUpperCase() || "B"}
    </button>
    {open && <div id={menuId} className="library-profile-menu" role="menu" aria-label="Profile options">
      <button ref={item} type="button" role="menuitem" disabled={disabled}
        onKeyDown={(event) => {
          if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
            event.preventDefault();
            item.current?.focus();
          }
        }}
        onClick={() => { setOpen(false); onLogout(); }}>
        <LogOut size={16} aria-hidden="true" />Logout
      </button>
    </div>}
  </div>;
}
