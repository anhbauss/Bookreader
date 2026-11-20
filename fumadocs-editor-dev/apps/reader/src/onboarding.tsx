import { BookOpen, Camera, FolderOpen, KeyRound, LoaderCircle, Plus, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { desktopApi, localFileUrl, type AppSettings, type CredentialStatus, type TranslationProvider } from "./desktop";
import "./onboarding.css";

type Step = "profile" | "avatar" | "library";

const PROVIDERS: Array<{ value: TranslationProvider; label: string; hint: string }> = [
  { value: "openai-compatible", label: "OpenAI compatible", hint: "OpenAI-compatible API endpoint" },
  { value: "anthropic-compatible", label: "Anthropic compatible", hint: "Anthropic Messages API" },
];

export function Onboarding({ initialSettings, initialCredential, onComplete }: {
  initialSettings: AppSettings;
  initialCredential: CredentialStatus;
  onComplete: () => void;
}) {
  const [step, setStep] = useState<Step>(initialSettings.displayName ? "library" : "profile");
  const [settings, setSettings] = useState(initialSettings);
  const [credential, setCredential] = useState(initialCredential);
  const [apiKey, setApiKey] = useState("");
  const [newFolderOpen, setNewFolderOpen] = useState(false);
  const [newFolderParent, setNewFolderParent] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(initialSettings.profileImagePath ? localFileUrl(initialSettings.profileImagePath) : null);
  const nameInput = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveProfile = async () => {
    const displayName = nameInput.current?.value.trim() ?? "";
    if (!displayName) { setError("Please enter a display name."); return; }
    if (!credential.configured && !apiKey.trim()) { setError("Please enter an API key."); return; }
    setBusy(true); setError(null);
    try {
      if (apiKey.trim()) setCredential(await desktopApi().saveTranslationApiKey(apiKey.trim()));
      const saved = await desktopApi().saveAppSettings({ ...settings, displayName });
      setSettings(saved);
      setApiKey("");
      setStep("avatar");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to save your profile.");
    } finally { setBusy(false); }
  };

  const chooseProfileImage = async () => {
    setBusy(true); setError(null);
    try {
      const profileImagePath = await desktopApi().selectProfileImage();
      if (!profileImagePath) return;
      // Update the preview before persisting settings so the user sees the selected
      // image immediately, even if the native settings write is slow.
      setProfileImageUrl(localFileUrl(profileImagePath));
      const saved = await desktopApi().saveAppSettings({ ...settings, profileImagePath });
      setSettings(saved);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to select this profile image.");
    } finally { setBusy(false); }
  };

  const chooseLibrary = async () => {
    setBusy(true); setError(null);
    try {
      const libraryRoot = await desktopApi().selectLibraryRoot();
      if (!libraryRoot) return;
      await desktopApi().saveAppSettings({ ...settings, libraryRoot, onboardingCompleted: true });
      onComplete();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to select this library folder.");
    } finally { setBusy(false); }
  };

  const createLibraryFolder = async () => {
    const parentPath = newFolderParent.trim();
    const folderName = newFolderName.trim();
    if (!parentPath || !folderName) { setError("Choose a parent folder and enter a library name."); return; }
    setBusy(true); setError(null);
    try {
      const libraryRoot = await desktopApi().createLibraryFolder(parentPath, folderName);
      await desktopApi().saveAppSettings({ ...settings, libraryRoot, onboardingCompleted: true });
      onComplete();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to create this library folder.");
    } finally { setBusy(false); }
  };

  return <main className="onboarding-page">
    <section className="onboarding-card" aria-labelledby="onboarding-title">
      <div className="onboarding-brand"><BookOpen size={24} /><span>BookGraph</span></div>
      <div className="onboarding-steps" aria-label="Setup progress"><i className={step === "profile" ? "active" : "done"} /><i className={step === "avatar" ? "active" : step === "library" ? "done" : ""} /><i className={step === "library" ? "active" : ""} /></div>
      {step === "profile" ? <>
        <p className="onboarding-kicker">SIGN IN</p>
        <h1 id="onboarding-title">Welcome to BookGraph.</h1>
        <p className="onboarding-copy">Enter your name and translation API key to get started. Your key is stored in your operating system’s secure credential store, never in your book library.</p>
        <label>Translation provider<select value={settings.provider} onChange={(event) => setSettings({ ...settings, provider: event.target.value as TranslationProvider })}>{PROVIDERS.map((provider) => <option value={provider.value} key={provider.value}>{provider.label}</option>)}</select></label>
        <p className="field-hint">{PROVIDERS.find((provider) => provider.value === settings.provider)?.hint}</p>
        <label>API key<input value={apiKey} type="password" autoComplete="off" onChange={(event) => setApiKey(event.target.value)} placeholder={credential.configured ? `Configured${credential.maskedSuffix ? ` ••••${credential.maskedSuffix}` : ""} — enter a new key to replace it` : "Paste your API key"} /></label>
        <label className="display-name-field">Display name<input ref={nameInput} defaultValue={settings.displayName} autoComplete="name" placeholder="Enter your name" /></label>
        {error && <p className="onboarding-error" role="alert">{error}</p>}
        <button className="onboarding-primary" type="button" disabled={busy} onClick={() => void saveProfile()}>{busy && <LoaderCircle className="spin" size={16} />}{busy ? "Signing in…" : "Sign in"}</button>
      </> : step === "avatar" ? <>
        <p className="onboarding-kicker">YOUR PROFILE</p>
        <h1 id="onboarding-title">Add a profile picture.</h1>
        <p className="onboarding-copy">Choose a photo to personalize your BookGraph library. You can skip this and add one later.</p>
        <div className="profile-image-preview" aria-label="Profile picture preview">{profileImageUrl ? <img src={profileImageUrl} alt="Selected profile" onError={() => { setProfileImageUrl(null); setError("BookGraph could not load this image. Please choose a PNG, JPG, JPEG, or WebP file."); }} /> : <UserRound size={48} />}</div>
        {error && <p className="onboarding-error" role="alert">{error}</p>}
        <button className="onboarding-primary" type="button" disabled={busy} onClick={() => void chooseProfileImage()}>{busy ? <><LoaderCircle className="spin" size={16} />Opening image picker…</> : <><Camera size={16} />Choose profile picture</>}</button>
        <button className="onboarding-secondary" type="button" disabled={busy} onClick={() => setStep("library")}>{settings.profileImagePath ? "Continue" : "Skip for now"}</button>
      </> : <>
        <p className="onboarding-kicker">YOUR LIBRARY</p>
        <h1 id="onboarding-title">Where do your books live?</h1>
        <p className="onboarding-copy">Choose a folder containing one BookGraph book workspace per subfolder. You can change it any time in Library.</p>
        <div className="library-folder-example"><FolderOpen size={21} /><div><strong>My Books</strong><span>├─ Signals and Systems<br />└─ Pattern Recognition</span></div></div>
        {newFolderOpen && <section className="new-library-folder" aria-label="Create a new library folder"><div><strong>Create a new library folder</strong><button type="button" aria-label="Close new library folder" onClick={() => setNewFolderOpen(false)}><X size={16} /></button></div><label>Parent folder<input value={newFolderParent} onChange={(event) => setNewFolderParent(event.target.value)} placeholder="/home/you/Documents" /></label><button type="button" className="new-library-parent" disabled={busy} onClick={async () => { setBusy(true); setError(null); try { const parent = await desktopApi().selectLibraryRoot(); if (parent) setNewFolderParent(parent); } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to select a parent folder."); } finally { setBusy(false); } }}><FolderOpen size={15} />Choose parent folder</button><label>Library name<input value={newFolderName} onChange={(event) => setNewFolderName(event.target.value)} placeholder="My Book Library" /></label><button className="new-library-confirm" type="button" disabled={busy} onClick={() => void createLibraryFolder()}>{busy ? "Creating…" : "Create library"}</button></section>}
        {error && <p className="onboarding-error" role="alert">{error}</p>}
        <button className="onboarding-primary" type="button" disabled={busy} onClick={() => void chooseLibrary()}>{busy ? <><LoaderCircle className="spin" size={16} />Opening folder picker…</> : <><FolderOpen size={16} />Choose library folder</>}</button>
        <button className="onboarding-secondary" type="button" disabled={busy} onClick={() => setNewFolderOpen((open) => !open)}><Plus size={15} />Create new library folder</button>
        <button className="onboarding-secondary" type="button" disabled={busy} onClick={() => setStep("profile")}><KeyRound size={15} />Back to profile</button>
      </>}
    </section>
  </main>;
}

export function useDesktopBootstrap() {
  const [state, setState] = useState<{ settings: AppSettings; credential: CredentialStatus } | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    void Promise.all([desktopApi().getAppSettings(), desktopApi().getCredentialStatus()])
      .then(([settings, credential]) => setState({ settings, credential }))
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Unable to open application settings."));
  }, []);
  return { state, error };
}
