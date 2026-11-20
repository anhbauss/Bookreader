import { convertFileSrc, invoke, isTauri } from "@tauri-apps/api/core";

export type TranslationProvider = "openai-compatible" | "anthropic-compatible";

export type AppSettings = {
  version: 1;
  onboardingCompleted: boolean;
  displayName: string;
  provider: TranslationProvider;
  providerBaseUrl: string;
  model: string;
  targetLanguage: "vi";
  profileImagePath: string | null;
  libraryRoot: string | null;
};

export type CredentialStatus = {
  configured: boolean;
  maskedSuffix: string | null;
};

export type LibraryBook = {
  id: string;
  title: string;
  folderName: string;
  status: "ready" | "not_prepared" | "invalid" | "unavailable";
  documentId: string | null;
  sectionCount: number | null;
  progressPercent: number | null;
  reason: string | null;
};

export type LibraryInventory = {
  libraryName: string | null;
  books: LibraryBook[];
};

export type MinerUBatch = {
  batchId: string;
  startPage: number;
  endPage: number;
  filename: string;
};

export type MinerUPreparation = {
  bookId: string;
  title: string;
  workspacePath: string;
  uploadDirectory: string;
  downloadsDirectory: string;
  normalizedDirectory: string;
  batches: MinerUBatch[];
};

export type DesktopApi = {
  getAppSettings(): Promise<AppSettings>;
  saveAppSettings(settings: AppSettings): Promise<AppSettings>;
  getCredentialStatus(): Promise<CredentialStatus>;
  saveTranslationApiKey(apiKey: string): Promise<CredentialStatus>;
  deleteTranslationApiKey(): Promise<CredentialStatus>;
  selectProfileImage(): Promise<string | null>;
  selectLibraryRoot(): Promise<string | null>;
  createLibraryFolder(parentPath: string, folderName: string): Promise<string>;
  selectBookPdf(): Promise<string | null>;
  prepareMinerUBook(pdfPath: string, title: string): Promise<MinerUPreparation>;
  openLocalFolder(path: string): Promise<void>;
  organizeMinerUResults(workspacePath: string): Promise<string[]>;
  openMinerUWeb(): Promise<void>;
  getMinerUWorkspaceInfo(bookId: string): Promise<MinerUPreparation>;
  scanLibrary(): Promise<LibraryInventory>;
  openBook(bookId: string): Promise<{ docId: string; sectionId: string }>;
  backToLibrary(): Promise<void>;
};

type TauriInvoke = <T>(command: string, args?: Record<string, unknown>) => Promise<T>;

type TauriWindow = Window & {
  __BOOKGRAPH_DESKTOP__?: DesktopApi;
  __TAURI__?: { core?: { invoke: TauriInvoke } };
};

const DEFAULT_SETTINGS: AppSettings = {
  version: 1,
  onboardingCompleted: false,
  displayName: "",
  provider: "openai-compatible",
  providerBaseUrl: "",
  model: "",
  targetLanguage: "vi",
  profileImagePath: null,
  libraryRoot: null,
};

const browserSettingsKey = "bookgraph-desktop-settings";
const browserKeyStatusKey = "bookgraph-desktop-key-configured";

function browserStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readBrowserSettings(): AppSettings {
  try {
    const raw = browserStorage()?.getItem(browserSettingsKey);
    if (!raw) return DEFAULT_SETTINGS;
    const candidate = JSON.parse(raw) as Partial<AppSettings>;
    return {
      ...DEFAULT_SETTINGS,
      ...candidate,
      libraryRoot: typeof candidate.libraryRoot === "string" ? candidate.libraryRoot : null,
      onboardingCompleted: candidate.onboardingCompleted === true,
      displayName: typeof candidate.displayName === "string" ? candidate.displayName : "",
      provider: candidate.provider === "anthropic-compatible" ? "anthropic-compatible" : "openai-compatible",
      providerBaseUrl: typeof candidate.providerBaseUrl === "string" ? candidate.providerBaseUrl : "",
      model: typeof candidate.model === "string" ? candidate.model : "",
      profileImagePath: typeof candidate.profileImagePath === "string" ? candidate.profileImagePath : null,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function writeBrowserSettings(settings: AppSettings): AppSettings {
  try {
    browserStorage()?.setItem(browserSettingsKey, JSON.stringify(settings));
  } catch {
    // Browser preview is intentionally best-effort. Desktop builds use native storage.
  }
  return settings;
}

function browserApi(): DesktopApi {
  return {
    async getAppSettings() { return readBrowserSettings(); },
    async saveAppSettings(settings) { return writeBrowserSettings(settings); },
    async getCredentialStatus() {
      return { configured: browserStorage()?.getItem(browserKeyStatusKey) === "true", maskedSuffix: null };
    },
    async saveTranslationApiKey(apiKey) {
      if (!apiKey.trim()) throw new Error("API key is required.");
      // The browser preview deliberately never persists the API key.
      browserStorage()?.setItem(browserKeyStatusKey, "true");
      return { configured: true, maskedSuffix: apiKey.trim().slice(-4) || null };
    },
    async deleteTranslationApiKey() {
      browserStorage()?.removeItem(browserKeyStatusKey);
      return { configured: false, maskedSuffix: null };
    },
    async selectProfileImage() {
      throw new Error("Profile image selection is available in the desktop application.");
    },
    async selectLibraryRoot() {
      throw new Error("Folder selection is available in the desktop application.");
    },
    async createLibraryFolder() {
      throw new Error("Creating a library folder is available in the desktop application.");
    },
    async selectBookPdf() { throw new Error("PDF selection is available in the desktop application."); },
    async prepareMinerUBook() { throw new Error("Book preparation is available in the desktop application."); },
    async openLocalFolder() { throw new Error("Opening a local folder is available in the desktop application."); },
    async organizeMinerUResults() { throw new Error("MinerU result organization is available in the desktop application."); },
    async openMinerUWeb() { throw new Error("MinerU Web is available in the desktop application."); },
    async getMinerUWorkspaceInfo() { throw new Error("MinerU workspace information is available in the desktop application."); },
    async scanLibrary() { return { libraryName: null, books: [] }; },
    async openBook() { throw new Error("Opening a local BookGraph workspace requires the desktop application."); },
    async backToLibrary() {},
  };
}

function tauriApi(invoke: TauriInvoke): DesktopApi {
  return {
    getAppSettings: () => invoke<AppSettings>("get_app_settings"),
    saveAppSettings: (settings) => invoke<AppSettings>("save_app_settings", { settings }),
    getCredentialStatus: () => invoke<CredentialStatus>("get_credential_status"),
    saveTranslationApiKey: (apiKey) => invoke<CredentialStatus>("save_translation_api_key", { apiKey }),
    deleteTranslationApiKey: () => invoke<CredentialStatus>("delete_translation_api_key"),
    selectProfileImage: () => invoke<string | null>("select_profile_image"),
    selectLibraryRoot: () => invoke<string | null>("select_library_root"),
    createLibraryFolder: (parentPath, folderName) => invoke<string>("create_library_folder", { parentPath, folderName }),
    selectBookPdf: () => invoke<string | null>("select_book_pdf"),
    prepareMinerUBook: (pdfPath, title) => invoke<MinerUPreparation>("prepare_mineru_book", { pdfPath, title }),
    openLocalFolder: (path) => invoke<void>("open_local_folder", { path }),
    organizeMinerUResults: (workspacePath) => invoke<string[]>("organize_mineru_results", { workspacePath }),
    openMinerUWeb: () => invoke<void>("open_mineru_web"),
    getMinerUWorkspaceInfo: (bookId) => invoke<MinerUPreparation>("get_mineru_workspace_info", { bookId }),
    scanLibrary: () => invoke<LibraryInventory>("scan_library"),
    openBook: (bookId) => invoke<{ docId: string; sectionId: string }>("open_book", { bookId }),
    backToLibrary: () => invoke<void>("back_to_library"),
  };
}

export function desktopApi(): DesktopApi {
  const current = window as TauriWindow;
  if (current.__BOOKGRAPH_DESKTOP__) return current.__BOOKGRAPH_DESKTOP__;
  if (isTauri()) return tauriApi(invoke);
  const globalInvoke = current.__TAURI__?.core?.invoke;
  return globalInvoke ? tauriApi(globalInvoke) : browserApi();
}

export function isDesktopApp(): boolean {
  return isTauri() || Boolean((window as TauriWindow).__BOOKGRAPH_DESKTOP__);
}

export function localFileUrl(path: string): string {
  return isTauri() ? convertFileSrc(path) : path;
}
