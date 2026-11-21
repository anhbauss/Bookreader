#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use keyring::Entry;
use serde::{Deserialize, Serialize};
use std::{collections::HashMap, fs, net::{TcpListener, TcpStream}, path::{Path, PathBuf}, process::{Child, Command}, sync::Mutex, thread, time::Duration};
use tauri::{AppHandle, Manager, State};
use tauri_plugin_dialog::DialogExt;

const APP_SETTINGS_FILE: &str = "settings.json";
const KEYRING_SERVICE: &str = "com.bookgraph.reader";
const KEYRING_ACCOUNT: &str = "translation-api-key";
const DEFAULT_TRANSLATION_PROVIDER: &str = "anthropic-compatible";
const DEFAULT_TRANSLATION_BASE_URL: &str = "https://api.mwapi.dev";
const DEFAULT_TRANSLATION_MODEL: &str = "claude-haiku-5-5";

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
struct AppSettings {
    version: u8,
    onboarding_completed: bool,
    display_name: String,
    provider: String,
    provider_base_url: String,
    model: String,
    target_language: String,
    #[serde(default)]
    profile_image_path: Option<String>,
    library_root: Option<String>,
}

impl Default for AppSettings {
    fn default() -> Self {
        Self {
            version: 1,
            onboarding_completed: false,
            display_name: String::new(),
            provider: "openai-compatible".to_owned(),
            provider_base_url: String::new(),
            model: String::new(),
            target_language: "vi".to_owned(),
            profile_image_path: None,
            library_root: None,
        }
    }
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct CredentialStatus {
    configured: bool,
    masked_suffix: Option<String>,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct LibraryBook {
    id: String,
    title: String,
    folder_name: String,
    status: String,
    document_id: Option<String>,
    section_count: Option<usize>,
    progress_percent: Option<u8>,
    reason: Option<String>,
    #[serde(flatten)]
    display: BookDisplay,
}

#[derive(Clone, Debug, Default, Serialize)]
#[serde(rename_all = "camelCase")]
struct BookDisplay {
    #[serde(skip)]
    title: Option<String>,
    authors: Vec<String>,
    editors: Vec<String>,
    cover_image_path: Option<String>,
    cover_status: Option<String>,
    metadata_status: Option<String>,
    metadata_error: Option<String>,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct LibraryInventory {
    library_name: Option<String>,
    books: Vec<LibraryBook>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all(serialize = "camelCase", deserialize = "snake_case"))]
struct MinerUBatchView {
    batch_id: String,
    start_page: u32,
    end_page: u32,
    filename: String,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct MinerUPreparationView {
    book_id: String,
    title: String,
    workspace_path: String,
    upload_directory: String,
    downloads_directory: String,
    normalized_directory: String,
    batches: Vec<MinerUBatchView>,
}

#[derive(Deserialize)]
struct MinerUManifest {
    doc_id: String,
    title: String,
    batches: Vec<MinerUBatchView>,
}

#[derive(Default)]
struct DesktopState {
    open_books: Mutex<HashMap<String, BookTarget>>,
    book_workspaces: Mutex<HashMap<String, PathBuf>>,
    reader_server: Mutex<Option<Child>>,
    reader_base_url: Mutex<Option<String>>,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct BookTarget {
    doc_id: String,
    section_id: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    api_base_url: Option<String>,
}

fn app_data_dir(app: &AppHandle) -> Result<PathBuf, String> {
    app.path().app_data_dir().map_err(|error| format!("Unable to resolve app data: {error}"))
}

fn settings_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(app_data_dir(app)?.join(APP_SETTINGS_FILE))
}

fn read_settings(app: &AppHandle) -> Result<AppSettings, String> {
    let path = settings_path(app)?;
    if !path.exists() { return Ok(AppSettings::default()); }
    let raw = fs::read_to_string(&path).map_err(|error| format!("Unable to read settings: {error}"))?;
    serde_json::from_str(&raw).map_err(|_| "BookGraph settings are invalid. Remove settings.json and try again.".to_owned())
}

fn write_settings(app: &AppHandle, settings: &AppSettings) -> Result<(), String> {
    let path = settings_path(app)?;
    let parent = path.parent().ok_or_else(|| "Unable to resolve settings folder.".to_owned())?;
    fs::create_dir_all(parent).map_err(|error| format!("Unable to create app data folder: {error}"))?;
    let temporary = path.with_extension("json.tmp");
    let data = serde_json::to_vec_pretty(settings).map_err(|error| format!("Unable to serialize settings: {error}"))?;
    fs::write(&temporary, data).map_err(|error| format!("Unable to write settings: {error}"))?;
    fs::rename(temporary, path).map_err(|error| format!("Unable to finalize settings: {error}"))
}

fn credential_entry() -> Result<Entry, String> {
    Entry::new(KEYRING_SERVICE, KEYRING_ACCOUNT).map_err(|error| format!("Secure credential store is unavailable: {error}"))
}

fn credential_status() -> Result<CredentialStatus, String> {
    let entry = credential_entry()?;
    match entry.get_password() {
        Ok(value) if !value.trim().is_empty() => Ok(CredentialStatus { configured: true, masked_suffix: Some(value.chars().rev().take(4).collect::<String>().chars().rev().collect()) }),
        Ok(_) | Err(keyring::Error::NoEntry) => Ok(CredentialStatus { configured: false, masked_suffix: None }),
        Err(error) => Err(format!("Unable to read secure credential store: {error}")),
    }
}

fn canonical_directory(path: &Path) -> Result<PathBuf, String> {
    let canonical = path.canonicalize().map_err(|_| "Selected folder is no longer accessible.".to_owned())?;
    if !canonical.is_dir() { return Err("Please select a folder.".to_owned()); }
    Ok(canonical)
}

fn folder_id(path: &Path) -> String {
    // Opaque, process-local mapping. The webview never receives a filesystem path.
    format!("book-{:x}", stable_hash(&path.to_string_lossy()))
}

fn stable_hash(value: &str) -> u64 {
    let mut hash = 0xcbf29ce484222325_u64;
    for byte in value.as_bytes() { hash = (hash ^ u64::from(*byte)).wrapping_mul(0x100000001b3); }
    hash
}

fn library_display(folder: &Path) -> BookDisplay {
    let path = folder.join("book-metadata.json");
    let Some(value) = fs::read_to_string(&path).ok().and_then(|raw| serde_json::from_str::<serde_json::Value>(&raw).ok()) else { return BookDisplay::default(); };
    let names = |key: &str| value.get(key).and_then(|v| v.as_array()).map(|items| items.iter().filter_map(|v| v.as_str().map(str::to_owned)).collect()).unwrap_or_default();
    let cover_version = value.get("version").and_then(|v| v.as_u64()).unwrap_or(1);
    let cover = (cover_version >= 2).then(|| value.get("cover_path").and_then(|v| v.as_str())).flatten().and_then(|relative| {
        let candidate = folder.join(relative).canonicalize().ok()?;
        let root = folder.canonicalize().ok()?;
        if candidate.starts_with(root) && candidate.is_file() { Some(candidate.to_string_lossy().into_owned()) } else { None }
    });
    let mut metadata_status = value.get("ai_status").and_then(|v| v.as_str()).map(str::to_owned);
    // Older versions used the PDF's first page as a cover, which can be a back cover or an illustration.
    let cover_review = value.get("cover_review_version").and_then(|v| v.as_u64()).unwrap_or(1);
    if cover_version < 2 || cover_review < 3 { metadata_status = None; }
    // Parsing/OCR can add front-page evidence after the first metadata attempt.
    if let Some(metadata_time) = fs::metadata(&path).ok().and_then(|v| v.modified().ok()) {
        let newer = fs::read_dir(folder.join("sources/parsed")).ok().map(|entries| entries.filter_map(Result::ok).any(|entry| {
            fs::metadata(entry.path().join("document.json")).ok().and_then(|v| v.modified().ok()).map(|time| time > metadata_time).unwrap_or(false)
        })).unwrap_or(false);
        if newer && metadata_status.as_deref() != Some("ready") { metadata_status = None; }
    }
    BookDisplay {
        title: value.get("title").and_then(|v| v.as_str()).filter(|v| !v.trim().is_empty()).map(str::to_owned),
        authors: names("authors"), editors: names("editors"), cover_image_path: cover,
        cover_status: value.get("cover_status").and_then(|v| v.as_str()).map(str::to_owned),
        metadata_status, metadata_error: value.get("error").and_then(|v| v.as_str()).map(str::to_owned),
    }
}

fn document_metadata(folder: &Path) -> Option<(String, String)> {
    let parsed = folder.join("sources").join("parsed");
    let entries = fs::read_dir(parsed).ok()?;
    let mut documents = entries.filter_map(Result::ok).filter_map(|entry| {
        let metadata = entry.path().join("document.json");
        let raw = fs::read_to_string(metadata).ok()?;
        let value: serde_json::Value = serde_json::from_str(&raw).ok()?;
        Some((value.get("doc_id")?.as_str()?.to_owned(), value.get("title")?.as_str()?.to_owned()))
    });
    let first = documents.next()?;
    if documents.next().is_some() { return None; }
    Some(first)
}

fn first_section_id(folder: &Path, doc_id: &str) -> Option<String> {
    let index = folder.join("sources").join("sections").join(doc_id).join("sections.jsonl");
    let line = fs::read_to_string(index).ok()?.lines().next()?.to_owned();
    let value: serde_json::Value = serde_json::from_str(&line).ok()?;
    value.get("id")?.as_str().map(str::to_owned)
}

fn reading_progress_percent(folder: &Path, doc_id: &str) -> Option<u8> {
    let path = folder.join("reading_plans").join(format!("{doc_id}.json"));
    let raw = fs::read_to_string(path).ok()?;
    let plan: serde_json::Value = serde_json::from_str(&raw).ok()?;
    let section_ids = plan.get("section_ids")?.as_array()?;
    let total = section_ids.len();
    if total == 0 { return None; }
    let completed = plan.get("completed")?.as_array()?;
    let completed_ids: std::collections::HashSet<&str> = completed.iter().filter_map(serde_json::Value::as_str).collect();
    let count = section_ids.iter().filter_map(serde_json::Value::as_str).filter(|id| completed_ids.contains(id)).count();
    Some(((count * 100) / total).min(100) as u8)
}

#[tauri::command]
fn get_app_settings(app: AppHandle) -> Result<AppSettings, String> { read_settings(&app) }

#[tauri::command]
fn save_app_settings(app: AppHandle, settings: AppSettings) -> Result<AppSettings, String> {
    if settings.display_name.trim().is_empty() { return Err("Display name is required.".to_owned()); }
    if settings.target_language != "vi" { return Err("Only Vietnamese is supported in this release.".to_owned()); }
    if !matches!(settings.provider.as_str(), "openai-compatible" | "anthropic-compatible") { return Err("Unsupported translation provider.".to_owned()); }
    let mut stored = settings;
    stored.library_root = match stored.library_root {
        Some(path) => Some(canonical_directory(Path::new(&path))?.to_string_lossy().into_owned()),
        None => None,
    };
    write_settings(&app, &stored)?;
    Ok(stored)
}

#[tauri::command]
fn get_credential_status() -> Result<CredentialStatus, String> { credential_status() }

#[tauri::command]
fn get_reader_api_base_url(state: State<DesktopState>) -> Result<Option<String>, String> {
    state.reader_base_url.lock().map(|url| url.clone()).map_err(|_| "Unable to access reader endpoint.".to_owned())
}

#[tauri::command]
fn save_translation_api_key(api_key: String) -> Result<CredentialStatus, String> {
    let key = api_key.trim();
    if key.is_empty() { return Err("API key is required.".to_owned()); }
    credential_entry()?.set_password(key).map_err(|error| format!("Unable to save API key securely: {error}"))?;
    credential_status()
}

#[tauri::command]
fn delete_translation_api_key() -> Result<CredentialStatus, String> {
    let entry = credential_entry()?;
    match entry.delete_credential() {
        Ok(()) | Err(keyring::Error::NoEntry) => credential_status(),
        Err(error) => Err(format!("Unable to remove API key: {error}")),
    }
}

#[tauri::command]
async fn select_profile_image(app: AppHandle) -> Result<Option<String>, String> {
    let selected = app.dialog().file().add_filter("Image", &["png", "jpg", "jpeg", "webp"]).blocking_pick_file();
    let Some(path) = selected else { return Ok(None); };
    let selected_path = path.as_path().ok_or_else(|| "Selected image path is unavailable.".to_owned())?;
    let canonical = selected_path.canonicalize().map_err(|_| "Selected image is no longer accessible.".to_owned())?;
    if !canonical.is_file() { return Err("Please select an image file.".to_owned()); }
    Ok(Some(canonical.to_string_lossy().into_owned()))
}

#[tauri::command]
async fn select_book_pdf(app: AppHandle) -> Result<Option<String>, String> {
    let selected = app.dialog().file().add_filter("PDF", &["pdf"]).blocking_pick_file();
    let Some(path) = selected else { return Ok(None); };
    let selected_path = path.as_path().ok_or_else(|| "Selected PDF path is unavailable.".to_owned())?;
    let canonical = selected_path.canonicalize().map_err(|_| "Selected PDF is no longer accessible.".to_owned())?;
    if !canonical.is_file() || canonical.extension().and_then(|extension| extension.to_str()).map(|extension| extension.eq_ignore_ascii_case("pdf")) != Some(true) {
        return Err("Please select a PDF file.".to_owned());
    }
    Ok(Some(canonical.to_string_lossy().into_owned()))
}

#[tauri::command]
async fn select_library_root(app: AppHandle) -> Result<Option<String>, String> {
    let selected = app.dialog().file().blocking_pick_folder();
    let Some(path) = selected else { return Ok(None); };
    let selected_path = path.as_path().ok_or_else(|| "Selected folder path is unavailable.".to_owned())?;
    let canonical = canonical_directory(selected_path)?;
    Ok(Some(canonical.to_string_lossy().into_owned()))
}

/// Installed builds use the bundled service and never depend on the developer checkout.
fn bookgraph_command() -> Command {
    #[cfg(not(debug_assertions))]
    {
        let executable = std::env::current_exe().expect("Application executable is unavailable");
        let name = if cfg!(windows) { "bookgraph-service.exe" } else { "bookgraph-service" };
        #[allow(unused_mut)]
        let mut command = Command::new(executable.with_file_name(name));
        #[cfg(windows)]
        {
            use std::os::windows::process::CommandExt;
            command.creation_flags(0x08000000); // Keep the local service console hidden.
        }
        command
    }
    #[cfg(debug_assertions)]
    {
        let root = Path::new(env!("CARGO_MANIFEST_DIR")).join("../../../../bookgraph");
        let mut command = Command::new("uv");
        command.arg("--directory").arg(root)
            .args(["run", "--extra", "parsers", "--extra", "http", "bookgraph"]);
        command
    }
}

fn run_mineru_assist(arguments: &[String]) -> Result<String, String> {
    let output = bookgraph_command()
        .args(arguments)
        .output()
        .map_err(|error| format!("Unable to start BookGraph: {error}"))?;
    if output.status.success() {
        return Ok(String::from_utf8_lossy(&output.stdout).into_owned());
    }
    let details = String::from_utf8_lossy(&output.stderr);
    Err(if details.trim().is_empty() { "BookGraph could not prepare this PDF.".to_owned() } else { format!("BookGraph could not prepare this PDF: {}", details.trim()) })
}

#[tauri::command]
fn mineru_workspace_info(workspace_path: PathBuf) -> Result<MinerUPreparationView, String> {
    let workspace_path = canonical_directory(&workspace_path)?;
    let manifest_path = workspace_path.join("mineru").join("manifest.json");
    let manifest: MinerUManifest = serde_json::from_str(&fs::read_to_string(&manifest_path)
        .map_err(|error| format!("Unable to read MinerU setup: {error}"))?)
        .map_err(|_| "BookGraph created an invalid MinerU setup.".to_owned())?;
    Ok(MinerUPreparationView {
        book_id: manifest.doc_id,
        title: manifest.title,
        workspace_path: workspace_path.to_string_lossy().into_owned(),
        upload_directory: workspace_path.join("mineru/upload-batches").to_string_lossy().into_owned(),
        downloads_directory: workspace_path.join("mineru/downloads").to_string_lossy().into_owned(),
        normalized_directory: workspace_path.join("mineru/normalized").to_string_lossy().into_owned(),
        batches: manifest.batches,
    })
}

#[tauri::command]
fn prepare_mineru_book(app: AppHandle, pdf_path: String, title: String) -> Result<MinerUPreparationView, String> {
    let settings = read_settings(&app)?;
    let library_root = settings.library_root.ok_or_else(|| "Choose a library folder first.".to_owned())?;
    let output = run_mineru_assist(&[
        "mineru-assist".to_owned(), "prepare".to_owned(), library_root, pdf_path,
        "--title".to_owned(), title,
    ])?;
    let workspace_line = output.lines().find_map(|line| line.strip_prefix("workspace: "))
        .ok_or_else(|| "BookGraph did not return the new workspace location.".to_owned())?;
    // Cache local title evidence before the Library's automatic AI enrichment.
    let _ = run_mineru_assist(&["book-metadata".to_owned(), workspace_line.to_owned()]);
    mineru_workspace_info(PathBuf::from(workspace_line))
}

#[tauri::command]
fn get_mineru_workspace_info(book_id: String, state: State<DesktopState>) -> Result<MinerUPreparationView, String> {
    let path = state.book_workspaces.lock().map_err(|_| "Unable to access library state.".to_owned())?
        .get(&book_id).cloned().ok_or_else(|| "Book is unavailable. Rescan your library and try again.".to_owned())?;
    mineru_workspace_info(path)
}

#[tauri::command]
fn open_mineru_web() -> Result<(), String> {
    open::that("https://mineru.net/OpenSourceTools/Extractor")
        .map_err(|error| format!("Unable to open MinerU Web: {error}"))
}

#[tauri::command]
fn open_local_folder(path: String) -> Result<(), String> {
    let folder = canonical_directory(Path::new(&path))?;
    open::that(folder).map_err(|error| format!("Unable to open folder: {error}"))
}

#[tauri::command]
fn organize_mineru_results(workspace_path: String) -> Result<Vec<String>, String> {
    let workspace = canonical_directory(Path::new(&workspace_path))?;
    let workspace_arg = workspace.to_string_lossy().into_owned();
    let output = run_mineru_assist(&["mineru-assist".to_owned(), "organize".to_owned(), workspace_arg.clone()])?;
    let batches = output.strip_prefix("organized MinerU results: ").unwrap_or("").split(", ").filter(|item| !item.is_empty()).map(str::to_owned).collect::<Vec<_>>();
    run_mineru_assist(&["mineru-assist".to_owned(), "build".to_owned(), workspace_arg])?;
    Ok(batches)
}

#[tauri::command]
fn create_library_folder(parent_path: String, folder_name: String) -> Result<String, String> {
    let parent = canonical_directory(Path::new(&parent_path))?;
    let name = folder_name.trim();
    if name.is_empty() || name == "." || name == ".." || Path::new(name).file_name().and_then(|part| part.to_str()) != Some(name) {
        return Err("Library name must be a single folder name.".to_owned());
    }
    let library_root = parent.join(name);
    if library_root.exists() { return Err("A folder with that name already exists.".to_owned()); }
    fs::create_dir(&library_root).map_err(|error| format!("Unable to create library folder: {error}"))?;
    Ok(library_root.to_string_lossy().into_owned())
}

#[tauri::command]
fn scan_library(app: AppHandle, state: State<DesktopState>) -> Result<LibraryInventory, String> {
    let settings = read_settings(&app)?;
    let Some(root) = settings.library_root else { return Ok(LibraryInventory { library_name: None, books: Vec::new() }); };
    let root = canonical_directory(Path::new(&root))?;
    let library_name = root.file_name().and_then(|name| name.to_str()).map(str::to_owned);
    let mut targets = state.open_books.lock().map_err(|_| "Unable to access library state.".to_owned())?;
    let mut workspaces = state.book_workspaces.lock().map_err(|_| "Unable to access library state.".to_owned())?;
    targets.clear();
    workspaces.clear();
    let mut books = Vec::new();
    for entry in fs::read_dir(&root).map_err(|error| format!("Unable to read library folder: {error}"))? {
        let entry = match entry { Ok(entry) => entry, Err(_) => continue };
        let path = entry.path();
        if !path.is_dir() || entry.file_name().to_string_lossy().starts_with('.') { continue; }
        let folder_name = entry.file_name().to_string_lossy().into_owned();
        let display = library_display(&path);
        let id = folder_id(&path);
        workspaces.insert(id.clone(), path.clone());
        let manifest = path.join("bookgraph.toml");
        let Some((doc_id, title)) = document_metadata(&path) else {
            let (status, reason) = if manifest.exists() { ("not_prepared", "BookGraph workspace is missing a single reader-ready document.") } else { ("invalid", "This folder does not contain a BookGraph workspace.") };
            books.push(LibraryBook { id, title: display.title.clone().unwrap_or_else(|| folder_name.clone()), folder_name, status: status.to_owned(), document_id: None, section_count: None, progress_percent: None, reason: Some(reason.to_owned()), display });
            continue;
        };
        let title = display.title.clone().unwrap_or(title);
        let Some(section_id) = first_section_id(&path, &doc_id) else {
            books.push(LibraryBook { id, title, folder_name, status: "not_prepared".to_owned(), document_id: Some(doc_id), section_count: None, progress_percent: None, reason: Some("No readable sections were found for this document.".to_owned()), display });
            continue;
        };
        let section_count = fs::read_to_string(path.join("sources").join("sections").join(&doc_id).join("sections.jsonl")).map(|raw| raw.lines().count()).ok();
        targets.insert(id.clone(), BookTarget { doc_id: doc_id.clone(), section_id, api_base_url: None });
        let progress_percent = reading_progress_percent(&path, &doc_id);
        books.push(LibraryBook { id, title, folder_name, status: "ready".to_owned(), document_id: Some(doc_id), section_count, progress_percent, reason: None, display });
    }
    books.sort_by(|left, right| left.title.to_lowercase().cmp(&right.title.to_lowercase()));
    Ok(LibraryInventory { library_name, books })
}

#[tauri::command]
fn remove_book(book_id: String, app: AppHandle, state: State<DesktopState>) -> Result<(), String> {
    let workspace = state.book_workspaces.lock().map_err(|_| "Unable to access library state.".to_owned())?
        .get(&book_id).cloned().ok_or_else(|| "Book is unavailable. Rescan your library and try again.".to_owned())?;
    let settings = read_settings(&app)?;
    let root = canonical_directory(Path::new(settings.library_root.as_deref().ok_or_else(|| "Choose a library folder first.".to_owned())?))?;
    let workspace = workspace.canonicalize().map_err(|_| "Book workspace is no longer available.".to_owned())?;
    if workspace.parent() != Some(root.as_path()) {
        return Err("Only an immediate book workspace inside your library can be removed.".to_owned());
    }
    trash::delete(&workspace).map_err(|error| format!("Unable to move this book to Trash: {error}"))?;
    state.open_books.lock().map_err(|_| "Unable to update library state.".to_owned())?.remove(&book_id);
    state.book_workspaces.lock().map_err(|_| "Unable to update library state.".to_owned())?.remove(&book_id);
    Ok(())
}

#[tauri::command]
async fn enrich_book_metadata(book_id: String, force: Option<bool>, app: AppHandle, state: State<'_, DesktopState>) -> Result<serde_json::Value, String> {
    let workspace = state.book_workspaces.lock().map_err(|_| "Unable to access library state.".to_owned())?.get(&book_id).cloned().ok_or_else(|| "Book workspace is unavailable. Rescan the library.".to_owned())?;
    let settings = read_settings(&app)?;
    let api_key = credential_entry()?.get_password().map_err(|_| "Add your AI API key in BookGraph settings to fill book details.".to_owned())?;
    tauri::async_runtime::spawn_blocking(move || {
        let provider = if settings.provider.trim().is_empty() { DEFAULT_TRANSLATION_PROVIDER } else { settings.provider.as_str() };
        let base = if settings.provider_base_url.trim().is_empty() { DEFAULT_TRANSLATION_BASE_URL } else { settings.provider_base_url.trim() };
        let model = if settings.model.trim().is_empty() { DEFAULT_TRANSLATION_MODEL } else { settings.model.trim() };
        let mut command = bookgraph_command();
        command.arg("book-metadata").arg(workspace).arg("--ai")
            .env("BOOKGRAPH_TRANSLATION_API_KEY", api_key)
            .env("BOOKGRAPH_TRANSLATION_PROVIDER", provider)
            .env("BOOKGRAPH_TRANSLATION_BASE_URL", base)
            .env("BOOKGRAPH_TRANSLATION_MODEL", model);
        if force.unwrap_or(false) { command.arg("--force"); }
        let output = command.output().map_err(|error| format!("Unable to start book details: {error}"))?;
        if !output.status.success() { return Err("Unable to fill book details. Check the book workspace and retry.".to_owned()); }
        serde_json::from_slice(&output.stdout).map_err(|_| "Book details returned an invalid response.".to_owned())
    }).await.map_err(|error| format!("Book details could not finish: {error}"))?
}

fn reader_command(workspace: &Path, settings: &AppSettings, api_key: &str, port: u16) -> Command {
    let provider = if settings.provider.trim().is_empty() { DEFAULT_TRANSLATION_PROVIDER } else { settings.provider.as_str() };
    let base = if settings.provider_base_url.trim().is_empty() { DEFAULT_TRANSLATION_BASE_URL } else { settings.provider_base_url.trim() };
    let model = if settings.model.trim().is_empty() { DEFAULT_TRANSLATION_MODEL } else { settings.model.trim() };
    let mut command = bookgraph_command();
    command.arg("serve-http")
        .arg(workspace).arg("--host").arg("127.0.0.1").arg("--port").arg(port.to_string())
        .args(["--allowed-origin", "http://localhost:5173", "--allowed-origin", "http://127.0.0.1:5173", "--allowed-origin", "tauri://localhost", "--allowed-origin", "http://tauri.localhost", "--allowed-origin", "https://tauri.localhost"])
        // Credentials are passed only to the owned Python sidecar, never command-line args.
        .env("BOOKGRAPH_TRANSLATION_API_KEY", api_key)
        .env("BOOKGRAPH_TRANSLATION_PROVIDER", provider)
        .env("BOOKGRAPH_TRANSLATION_BASE_URL", base)
        .env("BOOKGRAPH_TRANSLATION_MODEL", model);
    command
}

fn stop_reader(child: &mut Child) {
    #[cfg(windows)]
    {
        use std::os::windows::process::CommandExt;
        let _ = Command::new("taskkill")
            .args(["/PID", &child.id().to_string(), "/T", "/F"])
            .creation_flags(0x08000000).status();
    }
    let _ = child.kill();
    let _ = child.wait();
}

fn start_reader_server(workspace: &Path, state: &DesktopState, settings: &AppSettings) -> Result<String, String> {
    let api_key = credential_entry()?.get_password()
        .map_err(|error| match error {
            keyring::Error::NoEntry => "Add a translation API key in BookGraph settings before translating.".to_owned(),
            _ => format!("Unable to read the translation API key from secure storage: {error}"),
        })?;
    if api_key.trim().is_empty() {
        return Err("Add a translation API key in BookGraph settings before translating.".to_owned());
    }

    let mut server = state.reader_server.lock().map_err(|_| "Unable to access reader server state.".to_owned())?;
    if let Some(mut existing) = server.take() {
        stop_reader(&mut existing);
    }
    // Each desktop instance owns its endpoint instead of reusing an unrelated
    // server on port 8000 that may have a different workspace or no credential.
    let listener = TcpListener::bind("127.0.0.1:0")
        .map_err(|error| format!("Unable to reserve a local reader port: {error}"))?;
    let address = listener.local_addr().map_err(|error| error.to_string())?;
    drop(listener);
    let base_url = format!("http://{address}");
    let mut child = reader_command(workspace, settings, &api_key, address.port())
        .spawn().map_err(|error| format!("Unable to start the local BookGraph reader service: {error}"))?;
    for _ in 0..300 {
        if let Some(status) = child.try_wait().map_err(|error| error.to_string())? {
            return Err(format!("The local BookGraph reader service exited before it was ready ({status})."));
        }
        if TcpStream::connect_timeout(&address, Duration::from_millis(100)).is_ok() {
            *server = Some(child);
            *state.reader_base_url.lock().map_err(|_| "Unable to access reader endpoint.".to_owned())? = Some(base_url.clone());
            return Ok(base_url);
        }
        thread::sleep(Duration::from_millis(100));
    }
    stop_reader(&mut child);
    Err("The local BookGraph reader service did not start in time.".to_owned())
}

#[tauri::command]
fn open_book(book_id: String, app: AppHandle, state: State<DesktopState>) -> Result<BookTarget, String> {
    let mut target = state.open_books.lock().map_err(|_| "Unable to access library state.".to_owned())?.get(&book_id).cloned().ok_or_else(|| "Book is unavailable. Rescan your library and try again.".to_owned())?;
    let workspace = state.book_workspaces.lock().map_err(|_| "Unable to access library state.".to_owned())?.get(&book_id).cloned().ok_or_else(|| "Book workspace is unavailable. Rescan your library and try again.".to_owned())?;
    let settings = read_settings(&app)?;
    target.api_base_url = Some(start_reader_server(&workspace, &state, &settings)?);
    Ok(target)
}

#[tauri::command]
fn back_to_library(state: State<DesktopState>) {
    if let Ok(mut url) = state.reader_base_url.lock() { *url = None; }
    if let Ok(mut server) = state.reader_server.lock() {
        if let Some(mut child) = server.take() {
            stop_reader(&mut child);
        }
    }
}

#[cfg(target_os = "linux")]
fn integrate_appimage() -> Result<(), String> {
    let Some(image) = std::env::var_os("APPIMAGE") else { return Ok(()); };
    let image = PathBuf::from(image).canonicalize().map_err(|e| e.to_string())?;
    let image = image.to_string_lossy();
    if image.contains(['\n', '\r']) { return Err("Unsupported AppImage path".to_owned()); }
    let data = std::env::var_os("XDG_DATA_HOME").map(PathBuf::from)
        .filter(|path| path.is_absolute())
        .or_else(|| std::env::var_os("HOME").map(|home| PathBuf::from(home).join(".local/share")))
        .ok_or_else(|| "User data directory is unavailable".to_owned())?;
    let icons = data.join("icons/hicolor/512x512/apps");
    let applications = data.join("applications");
    fs::create_dir_all(&icons).map_err(|e| e.to_string())?;
    fs::create_dir_all(&applications).map_err(|e| e.to_string())?;
    let icon = include_bytes!("../icons/icon.png");
    let icon_path = icons.join("bookgraph-desktop.png");
    if fs::read(&icon_path).ok().as_deref() != Some(icon.as_slice()) {
        fs::write(&icon_path, icon).map_err(|e| e.to_string())?;
    }
    let escaped = image.replace('\\', "\\\\").replace('"', "\\\"")
        .replace('`', "\\`").replace('$', "\\$").replace('%', "%%");
    let entry = format!("[Desktop Entry]\nType=Application\nName=BookGraph\nExec=\"{escaped}\"\nIcon=bookgraph-desktop\nTerminal=false\nCategories=Education;\nStartupWMClass=bookgraph-desktop\nStartupNotify=true\n");
    let desktop = applications.join("bookgraph-desktop.desktop");
    if fs::read_to_string(&desktop).ok().as_deref() != Some(entry.as_str()) {
        fs::write(desktop, entry).map_err(|e| e.to_string())?;
        let _ = Command::new("update-desktop-database").arg(&applications).status();
    }
    let _ = Command::new("gtk-update-icon-cache").args(["-f", "-t"])
        .arg(data.join("icons/hicolor")).status();
    Ok(())
}

fn main() {
    // Register before GTK creates the first window so Wayland can resolve its app ID.
    #[cfg(target_os = "linux")]
    if let Err(error) = integrate_appimage() {
        eprintln!("Unable to register BookGraph desktop icon: {error}");
    }
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .manage(DesktopState::default())
        .invoke_handler(tauri::generate_handler![get_reader_api_base_url, get_app_settings, save_app_settings, get_credential_status, save_translation_api_key, delete_translation_api_key, select_profile_image, select_book_pdf, select_library_root, prepare_mineru_book, get_mineru_workspace_info, open_mineru_web, open_local_folder, organize_mineru_results, create_library_folder, scan_library, remove_book, enrich_book_metadata, open_book, back_to_library])
        .build(tauri::generate_context!())
        .expect("error while building BookGraph desktop application")
        .run(|app, event| {
            if matches!(event, tauri::RunEvent::Exit) {
                back_to_library(app.state::<DesktopState>());
            }
        });
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn reader_passes_credentials_and_selected_provider_to_its_owned_port() {
        let mut settings = AppSettings::default();
        settings.provider = "anthropic-compatible".to_owned();
        settings.provider_base_url = "https://example.invalid/v1".to_owned();
        settings.model = "test-model".to_owned();
        let command = reader_command(Path::new("/tmp/test-book"), &settings, "test-canary-not-a-real-key", 54321);
        let env: HashMap<_, _> = command.get_envs().filter_map(|(key, value)| value.map(|value| (key.to_string_lossy().into_owned(), value.to_string_lossy().into_owned()))).collect();
        assert_eq!(env.get("BOOKGRAPH_TRANSLATION_API_KEY").map(String::as_str), Some("test-canary-not-a-real-key"));
        assert_eq!(env.get("BOOKGRAPH_TRANSLATION_PROVIDER").map(String::as_str), Some("anthropic-compatible"));
        assert_eq!(env.get("BOOKGRAPH_TRANSLATION_BASE_URL").map(String::as_str), Some("https://example.invalid/v1"));
        assert_eq!(env.get("BOOKGRAPH_TRANSLATION_MODEL").map(String::as_str), Some("test-model"));
        let args: Vec<_> = command.get_args().map(|arg| arg.to_string_lossy().into_owned()).collect();
        assert!(args.windows(2).any(|pair| pair == ["--port", "54321"]));
        assert!(!args.iter().any(|arg| arg.contains("canary")));
    }

    #[test]
    #[ignore = "requires the logged-in user's OS credential store"]
    fn credential_store_persists_across_new_entries() {
        let service = format!("com.bookgraph.reader.canary.{}", std::process::id());
        let entry = Entry::new(&service, "test-only").expect("credential entry");
        entry.set_password("test-canary-not-a-real-key").expect("save canary");
        let loaded = Entry::new(&service, "test-only").expect("new credential entry").get_password();
        entry.delete_credential().expect("delete canary");
        assert_eq!(loaded.expect("read canary from new entry"), "test-canary-not-a-real-key");
    }
}
