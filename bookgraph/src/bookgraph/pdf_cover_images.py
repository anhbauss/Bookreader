"""PDF cover rendering and cropping with bundled libraries, without system commands."""

from __future__ import annotations

import os
import uuid
from pathlib import Path


def render_front_pages(pdf: Path, directory: Path) -> list[Path]:
    import pypdfium2 as pdfium

    directory.mkdir(parents=True, exist_ok=True)
    paths = []
    with pdfium.PdfDocument(str(pdf)) as document:
        for index in range(min(5, len(document))):
            page = document[index]
            try:
                bitmap = page.render(scale=min(2, 1200 / max(page.get_size())))
                try:
                    image = bitmap.to_pil()
                    try:
                        path = directory / f"page-{index:02}.jpg"
                        image.convert("RGB").save(path, format="JPEG", quality=80)
                        paths.append(path)
                    finally:
                        image.close()
                finally:
                    bitmap.close()
            finally:
                page.close()
    return paths


def crop_cover(source: Path, target: Path, crop: list[float]) -> None:
    from PIL import Image

    target.parent.mkdir(parents=True, exist_ok=True)
    staged = target.with_name(f".{uuid.uuid4().hex}.tmp")
    try:
        with Image.open(source) as image:
            width, height = image.size
            left, top, right, bottom = crop
            box = (
                round(width * left / 1000),
                round(height * top / 1000),
                round(width * right / 1000),
                round(height * bottom / 1000),
            )
            if box[2] <= box[0] or box[3] <= box[1]:
                raise ValueError("Cover crop is empty.")
            with image.crop(box) as result:
                result.convert("RGB").save(staged, format="JPEG", quality=90)
        os.replace(staged, target)
    finally:
        staged.unlink(missing_ok=True)
