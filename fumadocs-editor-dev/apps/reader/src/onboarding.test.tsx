// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Onboarding } from "./onboarding";
import type { AppSettings, DesktopApi } from "./desktop";

const settings: AppSettings = {
  version: 1, onboardingCompleted: false, displayName: "Reader",
  provider: "anthropic-compatible", providerBaseUrl: "", model: "", targetLanguage: "vi",
  profileImagePath: null, libraryRoot: "/existing-library",
};
const api = {
  selectLibraryRoot: vi.fn(), saveAppSettings: vi.fn(), getCredentialStatus: vi.fn(),
  saveTranslationApiKey: vi.fn(),
  listProviderModels: vi.fn(),
};
const completed = vi.fn();
let root: Root;
let container: HTMLDivElement;
beforeEach(() => {
  vi.resetAllMocks();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("__BOOKGRAPH_DESKTOP__", api as unknown as DesktopApi);
  api.selectLibraryRoot.mockResolvedValue("/new-library");
  api.saveAppSettings.mockImplementation(async (value: AppSettings) => value);
  api.getCredentialStatus.mockResolvedValue({ configured: true, maskedSuffix: null });
  api.saveTranslationApiKey.mockResolvedValue({ configured: true, maskedSuffix: null });
  api.listProviderModels.mockResolvedValue([{ id: "available-model", name: "Available model" }]);
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});
async function render(libraryRoot: string | null = settings.libraryRoot) {
  await act(async () => root.render(<Onboarding initialSettings={{ ...settings, libraryRoot }}
    initialCredential={{ configured: true, maskedSuffix: null }} onComplete={completed} />));
}
function button(label: string) {
  return [...container.querySelectorAll("button")].find((node) => node.textContent === label)!;
}

describe("library setup Continue", () => {
  it.each(["openai", "gemini"] as const)("lets %s users choose a discovered model without entering a Base URL", async (provider) => {
    const official = { ...settings, provider };
    await act(async () => root.render(<Onboarding initialSettings={official}
      initialCredential={{ configured: false, maskedSuffix: null }} onComplete={completed} />));
    expect([...container.querySelectorAll("label")].some((node) => node.firstChild?.textContent === "Base URL")).toBe(false);
    const key = container.querySelector<HTMLInputElement>('input[type="password"]')!;
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(key, "test-official-key");
      key.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await act(async () => button("Load models").click());
    expect(api.listProviderModels).toHaveBeenCalledWith(provider, "", "test-official-key");
    const model = [...container.querySelectorAll("label")].find((node) => node.firstChild?.textContent === "Model")!.querySelector("select")!;
    await act(async () => { model.value = "available-model"; model.dispatchEvent(new Event("change", { bubbles: true })); });
    await act(async () => button("Sign in").click());
    expect(api.saveAppSettings).toHaveBeenCalledWith({ ...official, model: "available-model" });
    expect(JSON.stringify(api.saveAppSettings.mock.calls)).not.toContain("test-official-key");
    expect(container.textContent).toContain("Add a profile picture.");
  });

  it("continues with the remembered folder and verifies the stored credential", async () => {
    await render();
    expect(container.textContent).toContain("/existing-library");
    expect(button("Continue").disabled).toBe(false);
    await act(async () => button("Continue").click());
    expect(api.getCredentialStatus).toHaveBeenCalledOnce();
    expect(api.saveAppSettings).toHaveBeenCalledWith({ ...settings, onboardingCompleted: true });
    expect(api.selectLibraryRoot).not.toHaveBeenCalled();
    expect(completed).toHaveBeenCalledOnce();
  });
  it("selects a folder then waits for explicit Continue", async () => {
    await render(null);
    expect(button("Continue").disabled).toBe(true);
    await act(async () => button("Choose library folder").click());
    expect(container.textContent).toContain("/new-library");
    expect(api.saveAppSettings).toHaveBeenCalledWith({ ...settings, libraryRoot: "/new-library" });
    expect(completed).not.toHaveBeenCalled();
    await act(async () => button("Continue").click());
    expect(completed).toHaveBeenCalledOnce();
  });
  it("keeps the remembered folder when the picker is cancelled", async () => {
    api.selectLibraryRoot.mockResolvedValue(null);
    await render();
    await act(async () => button("Change library folder").click());
    expect(container.textContent).toContain("/existing-library");
    expect(api.saveAppSettings).not.toHaveBeenCalled();
    expect(completed).not.toHaveBeenCalled();
  });
  it("returns to Sign in if the credential is no longer present", async () => {
    api.getCredentialStatus.mockResolvedValue({ configured: false, maskedSuffix: null });
    await render();
    await act(async () => button("Continue").click());
    expect(container.textContent).toContain("Welcome to BookGraph.");
    expect(container.querySelector('[role="alert"]')?.textContent).toContain("API key");
    expect(completed).not.toHaveBeenCalled();
  });
  it("shows a save failure without completing setup", async () => {
    api.saveAppSettings.mockRejectedValue(new Error("Folder unavailable"));
    await render();
    await act(async () => button("Continue").click());
    expect(container.querySelector('[role="alert"]')?.textContent).toBe("Folder unavailable");
    expect(completed).not.toHaveBeenCalled();
    expect(button("Continue").disabled).toBe(false);
  });
});
