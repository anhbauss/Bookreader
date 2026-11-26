// @vitest-environment jsdom
import { act, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { AiProviderFields, validateAiSettings } from "./ai-provider-fields";
import type { AppSettings, DesktopApi, ProviderModel } from "./desktop";

const initial: AppSettings = { version: 1, onboardingCompleted: false, displayName: "Reader",
  provider: "openai", providerBaseUrl: "", model: "", targetLanguage: "vi", profileImagePath: null, libraryRoot: null };
const listModels = vi.fn();
let root: Root;
let container: HTMLDivElement;
let current: AppSettings;
function Harness() {
  const [settings, setSettings] = useState(initial);
  current = settings;
  return <AiProviderFields settings={settings} onChange={setSettings} apiKey="test-only-key" />;
}
beforeEach(async () => {
  vi.resetAllMocks();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("__BOOKGRAPH_DESKTOP__", { listProviderModels: listModels } as unknown as DesktopApi);
  listModels.mockResolvedValue([{ id: "model-a", name: "Readable model" }]);
  container = document.createElement("div"); document.body.append(container);
  root = createRoot(container);
  await act(async () => root.render(<Harness />));
});
afterEach(async () => { await act(async () => root.unmount()); container.remove(); vi.unstubAllGlobals(); });
function field(label: string) {
  return [...container.querySelectorAll("label")].find((node) => node.firstChild?.textContent === label)?.querySelector<HTMLInputElement | HTMLSelectElement>("input, select");
}
async function change(label: string, value: string) {
  const element = field(label)!;
  const prototype = element instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  await act(async () => {
    Object.getOwnPropertyDescriptor(prototype, "value")!.set!.call(element, value);
    element.dispatchEvent(new Event(element instanceof HTMLSelectElement ? "change" : "input", { bubbles: true }));
  });
}
async function click(label: string) {
  await act(async () => [...container.querySelectorAll("button")].find((button) => button.textContent === label)!.click());
}

it("uses official endpoints and only shows gateway fields for custom providers", async () => {
  expect(field("Base URL")).toBeUndefined();
  expect(container.textContent).toContain("api.openai.com");
  await change("Translation provider", "anthropic");
  expect(field("Base URL")).toBeUndefined();
  expect(container.textContent).toContain("api.anthropic.com");
  await change("Translation provider", "custom");
  expect(field("Base URL")).toBeDefined();
  expect(field("API protocol")).toBeDefined();
  await change("API protocol", "anthropic-compatible");
  expect(current.provider).toBe("anthropic-compatible");
  await change("Translation provider", "gemini");
  expect(field("API protocol")).toBeUndefined();
  expect(field("Base URL")).toBeUndefined();
  expect(container.textContent).toContain("Google AI Studio");
  expect(container.textContent).toContain("generativelanguage.googleapis.com");
  expect(container.textContent).not.toContain("Antigravity");
});

it("loads readable model names and saves the exact API identifier", async () => {
  await click("Load models");
  expect(listModels).toHaveBeenCalledWith("openai", "", "test-only-key");
  expect(field("Model")?.textContent).toContain("Readable model (model-a)");
  await change("Model", "model-a");
  expect(current.model).toBe("model-a");
  expect(validateAiSettings(current)).toBeNull();
});

it("provides dashboard instructions and manual entry when discovery is unsupported", async () => {
  listModels.mockRejectedValue("Model listing is unavailable. Copy a Model ID from your provider dashboard.");
  await click("Load models");
  expect(container.querySelector('[role="alert"]')?.textContent).toContain("provider dashboard");
  await click("Enter model ID manually");
  await change("Model ID", "provider-exact-id");
  expect(current.model).toBe("provider-exact-id");
});

it("ignores a model response received after changing providers", async () => {
  let complete!: (models: ProviderModel[]) => void;
  listModels.mockImplementationOnce(() => new Promise<ProviderModel[]>((resolve) => { complete = resolve; }));
  await click("Load models");
  await change("Translation provider", "anthropic");
  await act(async () => complete([{ id: "stale-model", name: "Stale model" }]));
  expect(container.textContent).not.toContain("Stale model");
  expect(current.model).toBe("");
});
