import re
from collections import Counter
from pathlib import Path

import pytest

from bookgraph.mcp.errors import ReadingServiceError
from bookgraph.models import Section
from bookgraph.translation_chunks import split_translation_chunks, translate_in_chunks
from bookgraph.translation_provider import TranslationProviderConfig
from bookgraph.workspace import WorkspacePaths

CONFIG = TranslationProviderConfig("openai-compatible", "https://example.test", "model", 120)


class Provider:
    def __init__(self, fail_at: int | None = None) -> None:
        self.calls: list[str] = []
        self.fail_at = fail_at
        self.titles = 0

    def translate_section(self, source: str, *, target_language: str) -> str:
        self.calls.append(source)
        if len(self.calls) == self.fail_at:
            raise ReadingServiceError("Translation provider request failed.")
        return source.replace("English", "Vietnamese")

    def translate_title(self, title: str, *, target_language: str) -> str:
        self.titles += 1
        return "Translated title"


def section(text: str) -> Section:
    return Section(
        id="book.section", doc_id="book", title="Title", level=2, heading_path=["Title"], text=text
    )


def test_chunks_round_trip_and_keep_fences_math_tables_and_links_whole() -> None:
    blocks = [
        "English prose. " * 10,
        "```python\nprint('code')\n\n# another line\n```",
        "$$\n\\begin{aligned}\na &= b \\\\\n\nc &= d\n\\end{aligned}\n$$",
        "| English | Value |\n| --- | --- |\n| English | 10 |",
        "English with $x + y$ and ![figure](images/figure.jpg). " * 4,
    ]
    source = "\n\n".join(blocks) + "\n"
    chunks = split_translation_chunks(source, max_chars=180)
    assert "".join(chunks) == source
    for block in blocks[1:4]:
        assert any(block in chunk for chunk in chunks)
    assert len(chunks) > 3


def test_large_paragraph_splits_without_cutting_inline_math_or_links() -> None:
    equation = "$" + "x + " * 40 + "y$"
    link = "[English label](<images/a long path.png>)"
    source = "English " * 90 + equation + " English " * 90 + link + " English " * 30
    chunks = split_translation_chunks(source, max_chars=220)
    assert "".join(chunks) == source
    assert all(len(chunk) <= 220 for chunk in chunks)
    assert any(equation in chunk for chunk in chunks)
    assert any(link in chunk for chunk in chunks)


def test_resume_reuses_finished_parts_and_preserves_nonprose(tmp_path: Path) -> None:
    workspace = WorkspacePaths(tmp_path)
    code = "```python\nprint('English')\n```"
    equation = "$$\nx = \\frac{1}{2}\n$$"
    image = "![English caption](images/a.jpg)"
    source = "".join(f"English paragraph {i}. " * 6 + "\n\n" for i in range(5))
    source += code + "\n\n" + equation + "\n\n" + image
    first = Provider(fail_at=2)
    with pytest.raises(ReadingServiceError, match="part 2/"):
        translate_in_chunks(workspace, section(source), "vi", first, CONFIG, max_chars=170)
    resumed = Provider()
    body, title = translate_in_chunks(
        workspace, section(source), "vi", resumed, CONFIG, max_chars=170
    )
    assert first.calls[0] not in resumed.calls
    assert body == source.replace("English paragraph", "Vietnamese paragraph")
    assert code in body and equation in body and image in body
    assert all("print(" not in call and "\\frac" not in call for call in resumed.calls)
    assert title == "Translated title"
    cached = Provider()
    assert translate_in_chunks(workspace, section(source), "vi", cached, CONFIG, max_chars=170) == (
        body,
        title,
    )
    assert cached.calls == [] and cached.titles == 0


def test_changed_source_or_model_does_not_reuse_old_parts(tmp_path: Path) -> None:
    workspace = WorkspacePaths(tmp_path)
    provider = Provider()
    translate_in_chunks(workspace, section("English first."), "vi", provider, CONFIG)
    changed = Provider()
    body, _ = translate_in_chunks(workspace, section("English changed."), "vi", changed, CONFIG)
    assert body == "Vietnamese changed."
    assert len(changed.calls) == 1
    new_config = TranslationProviderConfig("openai-compatible", CONFIG.base_url, "new-model", 120)
    changed_model = Provider()
    translate_in_chunks(workspace, section("English changed."), "vi", changed_model, new_config)
    assert len(changed_model.calls) == 1


def test_missing_protected_marker_is_rejected_before_checkpoint(tmp_path: Path) -> None:
    class DroppingProvider(Provider):
        def translate_section(self, source: str, *, target_language: str) -> str:
            return "Vietnamese text without the equation."

    with pytest.raises(ReadingServiceError, match="protected"):
        translate_in_chunks(
            WorkspacePaths(tmp_path), section("English $x_i$."), "vi", DroppingProvider(), CONFIG
        )
    assert not list(tmp_path.rglob("part-*.json"))


def test_lost_link_is_rejected_before_checkpoint(tmp_path: Path) -> None:
    class DroppingProvider(Provider):
        def translate_section(self, source: str, *, target_language: str) -> str:
            return "Vietnamese text without the link."

    with pytest.raises(ReadingServiceError, match="protected|structure"):
        translate_in_chunks(
            WorkspacePaths(tmp_path),
            section("English [reference](chapter.md)."),
            "vi",
            DroppingProvider(),
            CONFIG,
        )
    assert not list(tmp_path.rglob("part-*.json"))


def test_reordered_protected_formulas_are_rejected(tmp_path: Path) -> None:
    import re

    class ReorderingProvider(Provider):
        def translate_section(self, source: str, *, target_language: str) -> str:
            markers = re.findall(r"BOOKGRAPH_KEEP_[a-f0-9]+_[0-9]+_TOKEN", source)
            return f"Vietnamese {markers[1]} then {markers[0]}."

    with pytest.raises(ReadingServiceError, match="reordered"):
        translate_in_chunks(
            WorkspacePaths(tmp_path),
            section("English $x$ then $y$."),
            "vi",
            ReorderingProvider(),
            CONFIG,
        )


def test_a_corrupt_checkpoint_is_retranslated(tmp_path: Path) -> None:
    import json

    workspace = WorkspacePaths(tmp_path)
    translate_in_chunks(workspace, section("English text."), "vi", Provider(), CONFIG)
    checkpoint = next(tmp_path.rglob("part-*.json"))
    data = json.loads(checkpoint.read_text())
    data["translation"] = "Damaged content"
    checkpoint.write_text(json.dumps(data))
    provider = Provider()
    body, _ = translate_in_chunks(workspace, section("English text."), "vi", provider, CONFIG)
    assert body == "Vietnamese text."
    assert len(provider.calls) == 1


def test_silently_truncated_prose_is_not_checkpointed(tmp_path: Path) -> None:
    class TruncatedProvider(Provider):
        def translate_section(self, source: str, *, target_language: str) -> str:
            return "Only the beginning was translated."

    with pytest.raises(ReadingServiceError, match="incomplete"):
        translate_in_chunks(
            WorkspacePaths(tmp_path), section("English prose."), "vi", TruncatedProvider(), CONFIG
        )
    assert not list(tmp_path.rglob("part-*.json"))


def test_code_indentation_and_trailing_newlines_survive_assembly(tmp_path: Path) -> None:
    source = (
        "    print('English')\n    x = 1\n\nEnglish paragraph.\n\n```py\nprint('English')\n```\n"
    )
    body, _ = translate_in_chunks(
        WorkspacePaths(tmp_path), section(source), "vi", Provider(), CONFIG
    )
    assert body == source.replace("English paragraph", "Vietnamese paragraph")


def test_many_protected_formulas_have_unambiguous_markers(tmp_path: Path) -> None:
    source = "English " + " then ".join(f"$x_{{{i}}}$" for i in range(25))
    body, _ = translate_in_chunks(
        WorkspacePaths(tmp_path), section(source), "vi", Provider(), CONFIG
    )
    assert body == source.replace("English", "Vietnamese")


def test_missing_middle_marker_is_not_misreported_as_reordering(tmp_path: Path) -> None:
    class MissingMarkerProvider(Provider):
        def translate_section(self, source: str, *, target_language: str) -> str:
            self.calls.append(source)
            markers = re.findall(r"BOOKGRAPH_KEEP_[a-f0-9]+_[0-9]+_TOKEN", source)
            return source.replace(markers[1], "")

    provider = MissingMarkerProvider()
    with pytest.raises(ReadingServiceError, match="lost or changed protected") as failure:
        translate_in_chunks(
            WorkspacePaths(tmp_path), section("English $a$ then $b$ then $c$."),
            "vi", provider, CONFIG,
        )
    assert "reordered" not in str(failure.value)
    assert "3 attempts" in str(failure.value)
    assert len(provider.calls) == 3
    assert not list(tmp_path.rglob("part-*.json"))


@pytest.mark.parametrize("kind", ["missing", "duplicate", "reordered", "incomplete", "structure"])
def test_invalid_part_is_retried_without_retranslating_valid_parts(
    tmp_path: Path, kind: str,
) -> None:
    class FlakyProvider(Provider):
        def translate_section(self, source: str, *, target_language: str) -> str:
            self.calls.append(source)
            if "English part 2:" in source and self.calls.count(source) < 3:
                # The first two valid parts are already durable; invalid output isn't saved.
                assert len(list(tmp_path.rglob("part-*.json"))) == 2
                markers = re.findall(r"BOOKGRAPH_KEEP_[a-f0-9]+_[0-9]+_TOKEN", source)
                if kind == "missing":
                    return source.replace(markers[1], "")
                if kind == "duplicate":
                    return source.replace(markers[1], markers[1] * 2)
                if kind == "reordered":
                    return source.replace(markers[0], "SWAP").replace(
                        markers[1], markers[0]
                    ).replace("SWAP", markers[1])
                if kind == "incomplete":
                    return re.sub(r"BOOKGRAPH_KEEP_[a-f0-9]+_END", "", source)
                # An invented Markdown link is rejected by structural verification.
                return source.replace("English", "[Vietnamese](https://invented.invalid)")
            return source.replace("English", "Vietnamese")

    source = "\n\n".join(
        f"English part {i}: $x_{{{i}}}$ then $y_{{{i}}}$. " + "word " * 16
        for i in range(4)
    )
    assert len(split_translation_chunks(source, max_chars=160)) == 4
    provider = FlakyProvider()
    workspace = WorkspacePaths(tmp_path)
    body, _ = translate_in_chunks(
        workspace, section(source), "vi", provider, CONFIG, max_chars=160,
    )
    assert body == source.replace("English", "Vietnamese")
    assert sorted(Counter(provider.calls).values()) == [1, 1, 1, 3]
    assert len(list(tmp_path.rglob("part-*.json"))) == 4
    cached = Provider()
    assert translate_in_chunks(
        workspace, section(source), "vi", cached, CONFIG, max_chars=160,
    )[0] == body
    assert cached.calls == []


def test_exhausted_validation_retries_keep_prior_parts_for_manual_resume(tmp_path: Path) -> None:
    class InvalidProvider(Provider):
        def translate_section(self, source: str, *, target_language: str) -> str:
            self.calls.append(source)
            if "second" in source:
                return "Incomplete response"
            return source.replace("English", "Vietnamese")

    source = "English first. " * 5 + "\n\n" + "English second. " * 5
    workspace = WorkspacePaths(tmp_path)
    invalid = InvalidProvider()
    with pytest.raises(ReadingServiceError, match="part 2/2.*3 attempts"):
        translate_in_chunks(workspace, section(source), "vi", invalid, CONFIG, max_chars=90)
    assert len(invalid.calls) == 4
    assert len(list(tmp_path.rglob("part-*.json"))) == 1
    resumed = Provider()
    body, _ = translate_in_chunks(
        workspace, section(source), "vi", resumed, CONFIG, max_chars=90,
    )
    assert body == source.replace("English", "Vietnamese")
    assert len(resumed.calls) == 1


def test_provider_request_errors_are_not_automatically_retried(tmp_path: Path) -> None:
    provider = Provider(fail_at=1)
    with pytest.raises(ReadingServiceError, match="provider request failed"):
        translate_in_chunks(WorkspacePaths(tmp_path), section("English."), "vi", provider, CONFIG)
    assert len(provider.calls) == 1
