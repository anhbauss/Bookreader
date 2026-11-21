# BookGraph desktop release

The installer contains the frontend, Rust desktop host, Python runtime, local HTTP service,
PDF renderer, image cropper and their dependencies. It does not include books, settings,
API credentials or any files from a user's library. AI operations use the reader's saved API key.
PDF parsing uses MinerU Web and still requires importing its downloaded results.

## Build on Linux or Windows

Build on the OS you intend to distribute. Install Node 24, pnpm 11, Rust stable, uv and
Tauri's platform build prerequisites on the **build machine only**.

1. At repository root: `python scripts/release/build_service.py`.
2. In `fumadocs-editor-dev`: `pnpm install --frozen-lockfile`.
3. In `fumadocs-editor-dev/apps/reader`:
   - Linux: `pnpm exec tauri build --config src-tauri/tauri.release.conf.json --bundles deb,appimage`
   - Windows: `pnpm exec tauri build --config src-tauri/tauri.release.conf.json --bundles nsis`
4. Installers appear under `src-tauri/target/release/bundle`.

The `Build BookGraph installers` GitHub Actions workflow runs these steps on Ubuntu 24.04
and Windows. It creates downloadable build artifacts and does not publish a public release.
Run it manually from Actions after the workflow and source have been pushed to GitHub.

## Reader installation

- Windows: open the `*-setup.exe`, follow the installer, open BookGraph from Start.
  WebView2 is installed automatically if absent; an internet connection may be needed.
- Ubuntu/Debian: open the `.deb` in the system package installer, choose Install,
  then open BookGraph from the applications menu. System libraries are installed by
  the package manager; no terminal, Python, uv or Node is required.
- Linux portable: mark the `.AppImage` executable in Properties and open it.
  AppImage may need FUSE on the user's distribution. Prefer `.deb` for Ubuntu users.

Choose a local library folder and enter your own AI API configuration on first launch.
Windows installers are currently unsigned and Windows may show an unknown-publisher prompt.
Sign production installers with the publisher's certificate before a wider release.

Build Linux on the oldest supported distribution. Local Ubuntu 26.04 builds have only
been validated on Ubuntu 26.04; the workflow uses Ubuntu 24.04 for a broader baseline.
Do not describe an installer as tested on another OS until it has been installed there.

## Release checks

Run `scripts/release/smoke_service.py PATH_TO_FROZEN_SERVICE` to verify PDF preparation,
cover rendering, and the HTTP server with an empty PATH and temporary library. The script
never uses a real library or API credentials. Also test the full installed UI on each OS:
first launch, library selection, add PDF, image metadata, import MinerU results, read,
translate and repair with the user's own API, remove to Trash and uninstall.
