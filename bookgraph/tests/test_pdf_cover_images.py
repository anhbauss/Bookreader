from pathlib import Path

from PIL import Image
from pypdf import PdfWriter

from bookgraph.pdf_cover_images import crop_cover, render_front_pages


def test_front_pages_render_without_system_pdf_tools(tmp_path: Path) -> None:
    pdf = tmp_path / "book.pdf"
    writer = PdfWriter()
    for _ in range(7):
        writer.add_blank_page(width=600, height=900)
    with pdf.open("wb") as stream:
        writer.write(stream)
    pages = render_front_pages(pdf, tmp_path / "pages")
    assert len(pages) == 5
    with Image.open(pages[0]) as image:
        assert max(image.size) <= 1200


def test_wraparound_crop_keeps_only_front_cover(tmp_path: Path) -> None:
    source = tmp_path / "spread.jpg"
    image = Image.new("RGB", (1000, 600), "red")
    image.paste("blue", (500, 0, 1000, 600))
    image.save(source)
    target = tmp_path / "different-directory" / "cover.jpg"
    crop_cover(source, target, [500, 0, 1000, 1000])
    with Image.open(target) as result:
        assert result.size == (500, 600)
        assert result.getpixel((250, 300))[2] > 240
