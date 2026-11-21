"""Build the Python service on the target OS. Requires uv and Rust on the build machine only."""

from __future__ import annotations

import json
import os
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TAURI = ROOT / "fumadocs-editor-dev/apps/reader/src-tauri"
OUT = ROOT / "build/release-service"


def run(*args: str) -> str:
    result = subprocess.run(args, cwd=ROOT, check=True, text=True, capture_output=False)
    return str(result.returncode)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    venv = OUT / "venv"
    uv = shutil.which("uv")
    if not uv:
        raise SystemExit("Install uv on the build machine first.")
    run(uv, "venv", "--python", "3.12", str(venv))
    python = venv / ("Scripts/python.exe" if os.name == "nt" else "bin/python")
    run(
        uv,
        "pip",
        "install",
        "--python",
        str(python),
        str(ROOT / "bookgraph") + "[http,desktop]",
        "pyinstaller>=6.11,<7",
        "certifi",
    )
    target = (
        subprocess.check_output(["rustc", "-vV"], text=True)
        .split("host: ")[1]
        .splitlines()[0]
    )
    args = [
        str(python),
        "-m",
        "PyInstaller",
        "--noconfirm",
        "--clean",
        "--onefile",
        "--name",
        "bookgraph-service",
        "--distpath",
        str(OUT / "dist"),
        "--workpath",
        str(OUT / "work"),
        "--specpath",
        str(OUT),
        "--collect-submodules",
        "bookgraph",
        "--collect-submodules",
        "uvicorn",
        "--collect-all",
        "pypdfium2",
        "--collect-all",
        "pypdfium2_raw",
        "--collect-all",
        "certifi",
        "--exclude-module",
        "pytest",
        "--exclude-module",
        "tkinter",
    ]
    # Keep dependency license/metadata files inside the frozen distribution.
    distributions = subprocess.check_output(
        [
            str(python),
            "-c",
            'import importlib.metadata,json; print(json.dumps([d.metadata["Name"] for d in importlib.metadata.distributions()]))',
        ],
        text=True,
    )
    for name in json.loads(distributions):
        args.extend(["--copy-metadata", name])
    args.append(str(ROOT / "scripts/release/service_entry.py"))
    run(*args)
    suffix = ".exe" if os.name == "nt" else ""
    source = OUT / "dist" / ("bookgraph-service" + suffix)
    target_dir = TAURI / "binaries"
    target_dir.mkdir(parents=True, exist_ok=True)
    target_path = target_dir / f"bookgraph-service-{target}{suffix}"
    shutil.copy2(source, target_path)
    print(f"Bundled service: {target_path}")


if __name__ == "__main__":
    main()
