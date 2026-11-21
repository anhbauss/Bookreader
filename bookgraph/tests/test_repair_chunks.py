from pathlib import Path

import pytest

from bookgraph.mcp.errors import ReadingServiceError
from bookgraph.repair_chunks import repair_in_chunks


class Repairer:
    def __init__(self, fail_at: int | None = None) -> None:
        self.calls: list[tuple[str, str]] = []
        self.fail_at = fail_at

    def repair_markdown(self, content: str, *, context: str) -> tuple[str, str]:
        self.calls.append((content, context))
        if len(self.calls) == self.fail_at:
            raise ReadingServiceError("Provider timed out.")
        return "1.2 Title", content.replace("broken", "fixed")

    def repair_region(self, content: str, *, context: str) -> str:
        return self.repair_markdown(content, context=context)[1]


def test_long_repair_resumes_completed_parts_with_bounded_context(tmp_path: Path) -> None:
    source = "\n\n".join(f"broken paragraph {i}. " * 30 for i in range(8))
    first = Repairer(fail_at=2)
    with pytest.raises(ReadingServiceError, match="part 2/"):
        repair_in_chunks(
            source,
            source,
            "1.2 Title",
            "markdown",
            first,
            tmp_path,
            lambda title, body: None,
            max_chars=1000,
        )
    resumed = Repairer()
    title, body = repair_in_chunks(
        source,
        source,
        "1.2 Title",
        "markdown",
        resumed,
        tmp_path,
        lambda title, body: None,
        max_chars=1000,
    )
    assert first.calls[0] not in resumed.calls
    assert body == source.replace("broken", "fixed")
    assert title == "1.2 Title"
    assert all(len(context) < 4500 and source not in context for _, context in resumed.calls)
    cached = Repairer()
    assert repair_in_chunks(
        source,
        source,
        "1.2 Title",
        "markdown",
        cached,
        tmp_path,
        lambda title, body: None,
        max_chars=1000,
    ) == (title, body)
    assert cached.calls == []


def test_invalid_part_is_not_saved_and_whole_formulas_are_not_split(tmp_path: Path) -> None:
    formula = "$$\n" + "x + " * 70 + "y\n$$"
    source = "broken paragraph. " * 30 + "\n\n" + formula

    def invalid(title: str | None, body: str) -> None:
        raise ReadingServiceError("Unsafe result")

    provider = Repairer()
    with pytest.raises(ReadingServiceError, match="Unsafe result"):
        repair_in_chunks(
            source, "", "1.2 Title", "markdown", provider, tmp_path, invalid, max_chars=400
        )
    assert not list(tmp_path.glob("part-*.json"))
    assert any(
        formula in part
        for part in __import__(
            "bookgraph.translation_chunks", fromlist=["split_translation_chunks"]
        ).split_translation_chunks(source, max_chars=400)
    )


def test_truncated_repair_is_not_checkpointed(tmp_path: Path) -> None:
    class Truncated(Repairer):
        def repair_markdown(self, content: str, *, context: str) -> tuple[str, str]:
            return "1.2 Title", "Only the beginning."

    with pytest.raises(ReadingServiceError, match="incomplete"):
        repair_in_chunks(
            "broken prose",
            "",
            "1.2 Title",
            "markdown",
            Truncated(),
            tmp_path,
            lambda title, body: None,
        )
    assert not list(tmp_path.glob("part-*.json"))
