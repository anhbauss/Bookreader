#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use keyring::Entry;
use serde::{Deserialize, Serialize};
use std::{collections::HashMap, fs, net::TcpStream, path::{Path, PathBuf}, process::{Child, Command}, sync::Mutex, thread, time::Duration};
use tauri::{AppHandle, Manager, State};
use tauri_plugin_dialog::DialogExt;

const APP_SETTINGS_FILE: &str = "settings.json";
const KEYRING_SERVICE: &str = "com.bookgraph.reader";
const KEYRING_ACCOUNT: &str = "translation-api-key";

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
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct BookTarget {
    doc_id: String,
    section_id: String,
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

fn run_mineru_assist(arguments: &[String]) -> Result<String, String> {
    let bookgraph_root = Path::new(env!("CARGO_MANIFEST_DIR")).join("../../../../bookgraph");
    let output = Command::new("uv")
        .arg("--directory")
        .arg(bookgraph_root)
        .arg("run")
        .arg("--extra")
        .arg("parsers")
        .arg("bookgraph")
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
    let status = Command::new("xdg-open").arg("https://mineru.net/OpenSourceTools/Extractor").status()
        .map_err(|error| format!("Unable to open MinerU Web: {error}"))?;
    if status.success() { Ok(()) } else { Err("Unable to open MinerU Web.".to_owned()) }
}

#[tauri::command]
fn open_local_folder(path: String) -> Result<(), String> {
    let folder = canonical_directory(Path::new(&path))?;
    let status = Command::new("xdg-open").arg(folder).status().map_err(|error| format!("Unable to open folder: {error}"))?;
    if status.success() { Ok(()) } else { Err("Unable to open folder.".to_owned()) }
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
        let id = folder_id(&path);
        workspaces.insert(id.clone(), path.clone());
        let manifest = path.join("bookgraph.toml");
        let Some((doc_id, title)) = document_metadata(&path) else {
            let (status, reason) = if manifest.exists() { ("not_prepared", "BookGraph workspace is missing a single reader-ready document.") } else { ("invalid", "This folder does not contain a BookGraph workspace.") };
            books.push(LibraryBook { id, title: folder_name.clone(), folder_name, status: status.to_owned(), document_id: None, section_count: None, progress_percent: None, reason: Some(reason.to_owned()) });
            continue;
        };
        let Some(section_id) = first_section_id(&path, &doc_id) else {
            books.push(LibraryBook { id, title, folder_name, status: "not_prepared".to_owned(), document_id: Some(doc_id), section_count: None, progress_percent: None, reason: Some("No readable sections were found for this document.".to_owned()) });
            continue;
        };
        let section_count = fs::read_to_string(path.join("sources").join("sections").join(&doc_id).join("sections.jsonl")).map(|raw| raw.lines().count()).ok();
        targets.insert(id.clone(), BookTarget { doc_id: doc_id.clone(), section_id });
        books.push(LibraryBook { id, title, folder_name, status: "ready".to_owned(), document_id: Some(doc_id), section_count, progress_percent: None, reason: None });
    }
    books.sort_by(|left, right| left.title.to_lowercase().cmp(&right.title.to_lowercase()));
    Ok(LibraryInventory { library_name, books })
}

fn start_reader_server(workspace: &Path, state: &DesktopState) -> Result<(), String> {
    let mut server = state.reader_server.lock().map_err(|_| "Unable to access reader server state.".to_owned())?;
    if let Some(mut existing) = server.take() {
        let _ = existing.kill();
        let _ = existing.wait();
    }
    let bookgraph_root = Path::new(env!("CARGO_MANIFEST_DIR")).join("../../../../bookgraph");
    let child = Command::new("uv")
        .arg("--directory").arg(bookgraph_root)
        .arg("run").arg("--extra").arg("http")
        .arg("bookgraph").arg("serve-http")
        .arg(workspace).arg("--host").arg("127.0.0.1").arg("--port").arg("8000")
        .spawn().map_err(|error| format!("Unable to start the local BookGraph reader service: {error}"))?;
    *server = Some(child);
    drop(server);
    for _ in 0..30 {
        if TcpStream::connect("127.0.0.1:8000").is_ok() { return Ok(()); }
        thread::sleep(Duration::from_millis(150));
    }
    Err("The local BookGraph reader service did not start in time.".to_owned())
}

#[tauri::command]
fn open_book(book_id: String, app: AppHandle, state: State<DesktopState>) -> Result<BookTarget, String> {
    let target = state.open_books.lock().map_err(|_| "Unable to access library state.".to_owned())?.get(&book_id).cloned().ok_or_else(|| "Book is unavailable. Rescan your library and try again.".to_owned())?;
    let workspace = state.book_workspaces.lock().map_err(|_| "Unable to access library state.".to_owned())?.get(&book_id).cloned().ok_or_else(|| "Book workspace is unavailable. Rescan your library and try again.".to_owned())?;
    start_reader_server(&workspace, &state)?;
    let _ = app;
    Ok(target)
}

#[tauri::command]
fn back_to_library(state: State<DesktopState>) {
    if let Ok(mut server) = state.reader_server.lock() {
        if let Some(mut child) = server.take() {
            let _ = child.kill();
        }
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .manage(DesktopState::default())
        .invoke_handler(tauri::generate_handler![get_app_settings, save_app_settings, get_credential_status, save_translation_api_key, delete_translation_api_key, select_profile_image, select_book_pdf, select_library_root, prepare_mineru_book, get_mineru_workspace_info, open_mineru_web, open_local_folder, organize_mineru_results, create_library_folder, scan_library, open_book, back_to_library])
        .run(tauri::generate_context!())
        .expect("error while running BookGraph desktop application");
}
