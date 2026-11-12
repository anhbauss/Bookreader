Phần I>
trinh-quoc-bau@Xiaoxin-Pro:~$ cd /home/trinh-quoc-bau/Documents/Book_reader/bookgraph
trinh-quoc-bau@Xiaoxin-Pro:~/Documents/Book_reader/bookgraph$ uv run --extra dev --extra http pytest -q \
  tests/test_quality.py \
  tests/test_translation_structure.py \
  tests/test_translation_assets.py \
  tests/test_translation_alignment.py \
  tests/test_http_api.py
..........................................................F...............................                                                                                                                                             [100%]
================================================================================================================== FAILURES ==================================================================================================================
______________________________________________________________________________________ test_unclaimed_write_is_not_vouched_for_an_asset_a_reparse_adds _______________________________________________________________________________________

workspace = WorkspacePaths(root=PosixPath('/tmp/pytest-of-trinh-quoc-bau/pytest-0/test_unclaimed_write_is_not_vo0')), tmp_path = PosixPath('/tmp/pytest-of-trinh-quoc-bau/pytest-0/test_unclaimed_write_is_not_vo0')

    def test_unclaimed_write_is_not_vouched_for_an_asset_a_reparse_adds(
        workspace: WorkspacePaths, tmp_path: Path
    ) -> None:
        _, _, third = _section_ids(workspace)  # no figure/table yet
        service.write_section_translation(workspace, DOC, third, "vi", "# Phần Ba\n\nChữ.\n")
        # A re-parse adds an uncaptioned figure whose file was never staged: the section
        # text, and so its hash, stay the same.
        blocks = [
            *_blocks(),
            CanonicalBlock(id="b10", type="image", text="", asset_path="never.png", page_idx=2),
        ]
        document = Document(doc_id=DOC, title="Tiny Book", blocks=blocks)
        write_document(document, workspace.sources_parsed / DOC)
        write_sections(
            HeadingSegmenter(target_level=2).segment(document), workspace.sources_sections / DOC
        )
    
        view = service.get_section_translation(workspace, DOC, third, "vi")
        export = _export(workspace)
    
>       assert (view.status, view.section_has_assets) == ("fresh", True)
E       AssertionError: assert ('stale', True) == ('fresh', True)
E         
E         At index 0 diff: 'stale' != 'fresh'
E         Use -v to get more diff

tests/test_translation_assets.py:263: AssertionError
========================================================================================================== short test summary info ===========================================================================================================
FAILED tests/test_translation_assets.py::test_unclaimed_write_is_not_vouched_for_an_asset_a_reparse_adds - AssertionError: assert ('stale', True) == ('fresh', True)
trinh-quoc-bau@Xiaoxin-Pro:~/Documents/Book_reader/bookgraph$ 

Phần 2>
trinh-quoc-bau@Xiaoxin-Pro:~$ cd /home/trinh-quoc-bau/Documents/Book_reader/fumadocs-editor-dev
pnpm --filter book-reader types:check
pnpm --filter book-reader test
pnpm --filter book-reader build
.                                        | [WARN] Unsupported engine: wanted: {"node":">=24"} (current: {"node":"v22.22.1","pnpm":"11.5.3"})
packages/studio                          | [WARN] Unsupported engine: wanted: {"node":">=24"} (current: {"node":"v22.22.1","pnpm":"11.5.3"})
$ tsc --noEmit
.                                        | [WARN] Unsupported engine: wanted: {"node":">=24"} (current: {"node":"v22.22.1","pnpm":"11.5.3"})
packages/studio                          | [WARN] Unsupported engine: wanted: {"node":">=24"} (current: {"node":"v22.22.1","pnpm":"11.5.3"})
$ vitest run

 RUN  v4.1.11 /home/trinh-quoc-bau/Documents/Book_reader/fumadocs-editor-dev/apps/reader

 ✓ src/reading.test.ts (3 tests) 13ms
 ✓ src/translation.test.ts (3 tests) 13ms
 ✓ src/reader.test.ts (5 tests) 19ms

 Test Files  3 passed (3)
      Tests  11 passed (11)
   Start at  11:52:09
   Duration  708ms (transform 308ms, setup 0ms, import 426ms, tests 45ms, environment 1ms)

.                                        | [WARN] Unsupported engine: wanted: {"node":">=24"} (current: {"node":"v22.22.1","pnpm":"11.5.3"})
packages/studio                          | [WARN] Unsupported engine: wanted: {"node":">=24"} (current: {"node":"v22.22.1","pnpm":"11.5.3"})
$ vite build
vite v8.2.2 building client environment for production...
✓ 1828 modules transformed.
computing gzip size...
dist/index.html                                                     0.46 kB │ gzip:  0.29 kB
dist/assets/geist-cyrillic-ext-wght-normal-DjL33-gN.woff2           7.42 kB
dist/assets/jetbrains-mono-vietnamese-wght-normal-Bt-aOZkq.woff2    7.50 kB
dist/assets/geist-vietnamese-wght-normal-6IgcOCM7.woff2             8.00 kB
dist/assets/jetbrains-mono-greek-wght-normal-Bw9x6K1M.woff2         9.00 kB
dist/assets/jetbrains-mono-cyrillic-wght-normal-D73BlboJ.woff2     12.10 kB
dist/assets/geist-cyrillic-wght-normal-BEAKL7Jp.woff2              15.08 kB
dist/assets/jetbrains-mono-latin-ext-wght-normal-DBQx-q_a.woff2    15.19 kB
dist/assets/geist-latin-ext-wght-normal-DC-KSUi6.woff2             16.51 kB
dist/assets/geist-latin-wght-normal-BgDaEnEv.woff2                 29.40 kB
dist/assets/jetbrains-mono-latin-wght-normal-B9CIFXIH.woff2        40.40 kB
dist/assets/index-CfQgETES.css                                     17.90 kB │ gzip:  6.53 kB
dist/assets/index-dCpg63cJ.js                                     207.77 kB │ gzip: 65.36 kB

✓ built in 524ms
trinh-quoc-bau@Xiaoxin-Pro:~/Documents/Book_reader/fumadocs-editor-dev$ 
