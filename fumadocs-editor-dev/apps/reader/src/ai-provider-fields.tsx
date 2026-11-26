import { useMemo, useRef, useState, type ReactNode } from "react";
import { desktopApi, type AppSettings, type ProviderModel, type TranslationProvider } from "./desktop";

export function isGateway(provider: TranslationProvider) {
  return provider !== "openai" && provider !== "anthropic" && provider !== "gemini";
}

export function sameAiConnection(first: AppSettings, second: AppSettings) {
  return first.provider === second.provider && (!isGateway(first.provider)
    || first.providerBaseUrl.trim().replace(/\/+$/, "") === second.providerBaseUrl.trim().replace(/\/+$/, ""));
}

function validateAddress(settings: AppSettings): string | null {
  if (!isGateway(settings.provider)) return null;
  try {
    const url = new URL(settings.providerBaseUrl.trim());
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.search || url.hash) throw new Error();
  } catch { return "Enter your gateway's HTTP(S) Base URL without credentials or query parameters."; }
  return null;
}

export function validateAiSettings(settings: AppSettings): string | null {
  return validateAddress(settings) || (!settings.model.trim() ? "Load models and choose one, or enter its API model ID." : null);
}

export function AiProviderFields({ settings, onChange, apiKey = "", canUseSavedKey = false,
  disabled = false, children }: {
  settings: AppSettings; onChange: (settings: AppSettings) => void; apiKey?: string;
  canUseSavedKey?: boolean; disabled?: boolean; children?: ReactNode;
}) {
  const custom = settings.provider === "openai-compatible" || settings.provider === "anthropic-compatible";
  const gateway = isGateway(settings.provider);
  const scope = useMemo(() => ({}), [settings.provider, settings.providerBaseUrl, apiKey]);
  const current = useRef(scope); current.current = scope;
  const sequence = useRef(0);
  const [result, setResult] = useState<{ scope: object; models: ProviderModel[]; error: string | null; loading: boolean } | null>(null);
  const [manual, setManual] = useState<{ scope: object; value: boolean } | null>(null);
  const active = result?.scope === scope ? result : null;
  const models = active?.models ?? [];
  const manualEntry = (manual?.scope === scope && manual.value) || (gateway && models.length === 0);
  const load = async () => {
    const invalid = validateAddress(settings);
    if (invalid) { setResult({ scope, models: [], error: invalid, loading: false }); return; }
    const request = ++sequence.current;
    setResult({ scope, models: [], error: null, loading: true });
    try {
      const loaded = await desktopApi().listProviderModels(settings.provider, settings.providerBaseUrl.trim(), apiKey.trim());
      if (current.current !== scope || sequence.current !== request) return;
      setResult({ scope, models: loaded, error: loaded.length ? null : "No models were returned. Copy an API model ID from your provider's dashboard.", loading: false });
      if (loaded.length) setManual({ scope, value: false });
    } catch (reason) {
      if (current.current !== scope || sequence.current !== request) return;
      setResult({ scope, models: [], error: reason instanceof Error ? reason.message : typeof reason === "string" ? reason : "Unable to load models.", loading: false });
    }
  };
  return <>
    <label>Translation provider<select disabled={disabled} value={custom ? "custom" : settings.provider} onChange={(event) => {
      const provider: TranslationProvider = event.target.value === "custom" ? "openai-compatible" : event.target.value as TranslationProvider;
      onChange({ ...settings, provider, providerBaseUrl: "", model: "" });
    }}>
      <option value="openai">OpenAI (official)</option>
      <option value="anthropic">Anthropic (official)</option>
      <option value="gemini">Google Gemini (official)</option>
      <option value="custom">Other API gateway</option>
    </select></label>
    {custom && <label>API protocol<select disabled={disabled} value={settings.provider} onChange={(event) => onChange({ ...settings, provider: event.target.value as TranslationProvider, model: "" })}>
      <option value="openai-compatible">OpenAI compatible</option><option value="anthropic-compatible">Anthropic compatible</option>
    </select></label>}
    {gateway ? <>
      <p className="field-hint">Use the Base URL and API key supplied by your gateway.</p>
      <label>Base URL<input disabled={disabled} type="url" value={settings.providerBaseUrl} onChange={(event) => onChange({ ...settings, providerBaseUrl: event.target.value, model: "" })} placeholder="https://your-gateway.example/v1" /></label>
    </> : <p className="field-hint">Connects directly to {settings.provider === "openai" ? "api.openai.com" : settings.provider === "gemini" ? "generativelanguage.googleapis.com (Google Gemini)" : "api.anthropic.com"}. The API address is set automatically.</p>}
    {settings.provider === "gemini" && <p className="field-hint">Use your Gemini API key from Google AI Studio. No local proxy is needed.</p>}
    {children}
    <button type="button" className="onboarding-secondary" disabled={disabled || active?.loading || (!apiKey.trim() && !canUseSavedKey)} onClick={() => void load()}>{active?.loading ? "Loading models…" : "Load models"}</button>
    <p className="field-hint">Enter your API key, click Load models, then choose a text/chat model for translation.</p>
    {active?.error && <p className="onboarding-error" role="alert">{active.error}</p>}
    {manualEntry ? <label>Model ID<input disabled={disabled} value={settings.model} onChange={(event) => onChange({ ...settings, model: event.target.value })} placeholder="Copy the API model ID from your provider" /></label>
      : <label>Model<select disabled={disabled || (!models.length && !settings.model)} value={settings.model} onChange={(event) => onChange({ ...settings, model: event.target.value })}>
        <option value="">Load models, then choose a model</option>
        {settings.model && !models.some((model) => model.id === settings.model) && <option value={settings.model}>{settings.model} (saved)</option>}
        {models.map((model) => <option key={model.id} value={model.id}>{model.name === model.id ? model.id : `${model.name} (${model.id})`}</option>)}
      </select></label>}
    {!manualEntry && <button type="button" className="onboarding-secondary" disabled={disabled} onClick={() => setManual({ scope, value: true })}>Enter model ID manually</button>}
    <p className="field-hint">Where to find it: open your provider's dashboard → Models or API documentation. Copy the API model ID, which may differ from the display name. For Google Gemini, use your Google AI Studio key and Load models to see Gemini model IDs. Listing models does not test translation access.</p>
  </>;
}
