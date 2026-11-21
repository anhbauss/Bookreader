"""Exercise a frozen service with no Python/uv/system PDF commands on PATH."""

from __future__ import annotations

import json
import os
import socket
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from urllib.request import urlopen

binary = Path(sys.argv[1]).resolve()
env = {
    key: value
    for key, value in os.environ.items()
    if not key.startswith(("BOOKGRAPH_", "PYTHON", "UV_"))
}
env["PATH"] = ""
with tempfile.TemporaryDirectory(prefix="bookgraph-release-check-") as temp:
    env["HOME"] = temp
    root = Path(temp)
    subprocess.run(
        [str(binary), "--desktop-self-check", str(root)], env=env, check=True
    )
    workspace = root / "library" / "release-check"
    with socket.socket() as listener:
        listener.bind(("127.0.0.1", 0))
        port = listener.getsockname()[1]
    server = subprocess.Popen(
        [str(binary), "serve-http", str(workspace), "--port", str(port)], env=env
    )
    try:
        for attempt in range(100):
            if server.poll() is not None:
                raise RuntimeError("Frozen HTTP server exited early")
            try:
                with urlopen(
                    f"http://127.0.0.1:{port}/api/documents", timeout=1
                ) as response:
                    assert response.status == 200
                    json.load(response)
                print(
                    "PASS: PDF preparation, render/crop, CLI and local HTTP without system tools"
                )
                break
            except OSError:
                time.sleep(0.2)
        else:
            raise RuntimeError("Frozen HTTP server did not become ready")
    finally:
        server.terminate()
        try:
            server.wait(timeout=10)
        except subprocess.TimeoutExpired:
            server.kill()
            server.wait()
