"""Frozen local service entry point. Never loads build-machine settings or credentials."""

import multiprocessing
import os
import sys

import certifi

if __name__ == "__main__":
    multiprocessing.freeze_support()
    os.environ.setdefault("SSL_CERT_FILE", certifi.where())
    if len(sys.argv) == 2 and sys.argv[1] == "--desktop-list-models":
        from bookgraph.model_catalog import main

        raise SystemExit(main())
    if len(sys.argv) == 3 and sys.argv[1] == "--desktop-self-check":
        from pathlib import Path

        from bookgraph.mineru_assisted import prepare_mineru_workspace
        from bookgraph.pdf_cover_images import crop_cover, render_front_pages
        from pypdf import PdfWriter

        root = Path(sys.argv[2])
        root.mkdir(parents=True, exist_ok=True)
        pdf = root / "source.pdf"
        writer = PdfWriter()
        writer.add_blank_page(width=600, height=900)
        with pdf.open("wb") as stream:
            writer.write(stream)
        pages = render_front_pages(pdf, root / "images")
        crop_cover(pages[0], root / "cover.jpg", [0, 0, 1000, 1000])
        (root / "library").mkdir(exist_ok=True)
        prepare_mineru_workspace(root / "library", pdf, "Release Check")
        print("PASS: bundled PDF libraries and preparation")
        raise SystemExit(0)
    from bookgraph.cli import app

    app()
