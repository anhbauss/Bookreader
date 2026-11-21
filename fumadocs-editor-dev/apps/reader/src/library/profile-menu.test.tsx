// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { type AppSettings, type DesktopApi } from "../desktop";
import { Onboarding } from "../onboarding";
import { LibraryPage } from "./library-page";

const settings: AppSettings = {
  version: 1, onboardingCompleted: true, displayName: "Reader",
  provider: "openai-compatible", providerBaseUrl: "", model: "", targetLanguage: "vi",
  profileImagePath: null, libraryRoot: "/books",
};
let container: HTMLDivElement;
let root: Root;
const changed = vi.fn<(settings: AppSettings) => void>();
const api = {
  scanLibrary: vi.fn(), backToLibrary: vi.fn(),
  deleteTranslationApiKey: vi.fn(), saveAppSettings: vi.fn(),
};

beforeEach(async () => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("__BOOKGRAPH_DESKTOP__", api as unknown as DesktopApi);
  vi.resetAllMocks();
  api.scanLibrary.mockResolvedValue({ libraryName: "Books", books: [] });
  api.backToLibrary.mockResolvedValue(undefined);
  api.deleteTranslationApiKey.mockResolvedValue({ configured: false, maskedSuffix: null });
  api.saveAppSettings.mockImplementation(async (value: AppSettings) => value);
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  await act(async () => root.render(<LibraryPage settings={settings} onOpenBook={vi.fn()} onSettingsChanged={changed} />));
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

function profile() { return container.querySelector<HTMLButtonElement>('[aria-label="Profile"]')!; }
async function openMenu() {
  const event = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
  await act(async () => { profile().dispatchEvent(event); });
  return event;
}

describe("Library profile logout", () => {
  it("opens Logout on right-click without signing out", async () => {
    const event = await openMenu();
    expect(event.defaultPrevented).toBe(true);
    expect(container.querySelector('[role="menuitem"]')?.textContent).toBe("Logout");
    expect(profile().getAttribute("aria-expanded")).toBe("true");
    expect(document.activeElement).toBe(container.querySelector('[role="menuitem"]'));
    expect(api.deleteTranslationApiKey).not.toHaveBeenCalled();
  });

  it("dismisses with Escape and restores focus to the avatar", async () => {
    await openMenu();
    await act(async () => { document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })); });
    expect(container.querySelector('[role="menu"]')).toBeNull();
    expect(document.activeElement).toBe(profile());
  });

  it("dismisses when clicking outside", async () => {
    await openMenu();
    await act(async () => { document.body.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true })); });
    expect(container.querySelector('[role="menu"]')).toBeNull();
    expect(api.saveAppSettings).not.toHaveBeenCalled();
  });

  it("supports keyboard opening and activation", async () => {
    await act(async () => { profile().dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })); });
    expect(document.activeElement?.getAttribute("role")).toBe("menuitem");
  });

  it("clears the credential and returns to sign-in while retaining library settings", async () => {
    await openMenu();
    await act(async () => { container.querySelector<HTMLButtonElement>('[role="menuitem"]')!.click(); });
    expect(api.backToLibrary).toHaveBeenCalledOnce();
    expect(api.deleteTranslationApiKey).toHaveBeenCalledOnce();
    expect(api.saveAppSettings).toHaveBeenCalledWith({ ...settings, onboardingCompleted: false });
    expect(changed).toHaveBeenCalledWith({ ...settings, onboardingCompleted: false });
  });

  it("shows a credential-store error and allows retry", async () => {
    api.deleteTranslationApiKey.mockRejectedValueOnce(new Error("Credential store unavailable"));
    await openMenu();
    await act(async () => { container.querySelector<HTMLButtonElement>('[role="menuitem"]')!.click(); });
    expect(container.querySelector('[role="alert"]')?.textContent).toBe("Credential store unavailable");
    expect(changed).not.toHaveBeenCalled();
    expect(api.saveAppSettings).not.toHaveBeenCalled();
    await openMenu();
    await act(async () => { container.querySelector<HTMLButtonElement>('[role="menuitem"]')!.click(); });
    expect(changed).toHaveBeenCalledOnce();
  });

  it("prevents repeated logout while a request is pending", async () => {
    let complete!: () => void;
    api.backToLibrary.mockImplementationOnce(() => new Promise<void>((resolve) => { complete = resolve; }));
    await openMenu();
    await act(async () => { container.querySelector<HTMLButtonElement>('[role="menuitem"]')!.click(); });
    expect(profile().disabled).toBe(true);
    await openMenu();
    expect(container.querySelector('[role="menu"]')).toBeNull();
    await act(async () => complete());
    expect(api.deleteTranslationApiKey).toHaveBeenCalledOnce();
  });

  it("shows Sign in after logout even with a remembered display name", () => {
    const html = renderToStaticMarkup(<Onboarding
      initialSettings={{ ...settings, onboardingCompleted: false }}
      initialCredential={{ configured: false, maskedSuffix: null }} onComplete={vi.fn()} />);
    expect(html).toContain("Welcome to BookGraph.");
    expect(html).toContain("Sign in");
    expect(html).not.toContain("Where do your books live?");
  });

  it("renders the selected profile image and falls back if the file cannot load", async () => {
    await act(async () => root.render(<LibraryPage settings={{ ...settings, profileImagePath: "/pictures/profile.jpg" }} onOpenBook={vi.fn()} onSettingsChanged={changed} />));
    const image = profile().querySelector("img")!;
    expect(image.getAttribute("src")).toBe("/pictures/profile.jpg");
    await act(async () => { image.dispatchEvent(new Event("error")); });
    expect(profile().querySelector("img")).toBeNull();
    expect(profile().textContent).toBe("R");
    await act(async () => root.render(<LibraryPage settings={{ ...settings, profileImagePath: "/pictures/new.jpg" }} onOpenBook={vi.fn()} onSettingsChanged={changed} />));
    expect(profile().querySelector("img")?.getAttribute("src")).toBe("/pictures/new.jpg");
  });
});
