# Reader — layout & interaction spec

## Desktop shell
- Dark-reader reference uses a full-height, near-black/warm-charcoal canvas; no card-like outer page.
- Header: 56–64px high, full width, subtle bottom border. Left cluster = back/library icon + book/chapter context; right cluster = Search, Visual Settings, user/action icons.
- Header UI is sans 13–14px; icon hit areas 32–36px square with 8px radius hover surface.
- Reading area is centered under header; max width ~1120px; 40–56px outer gutters; large vertical breathing room.

## Two-column reading body
- Desktop: two equal text columns with ~48–64px central gutter. Each column ~430–470px.
- Bilingual pairing: columns begin from same content block/chapter location; preserve visual alignment where possible, not strict line-by-line alignment.
- Book prose: serif, 18px (default), line-height 1.8–1.95; paragraph margin-bottom 1.15em; color muted high-contrast rather than pure white.
- Chapter label/number: compact sans uppercase/muted. Chapter title: serif, 28–34px, strong contrast, 20–28px margin below.
- Quote/aside: serif italic or differentiated muted color; avoid bordered callout chrome.
- At <=900px, switch to one text column. Reading-mode selector determines Original / Translation / Bilingual behavior; Bilingual stacks or uses a segmented view rather than squeezing two columns.

## Previous / Next Page
- At article end: centered horizontal navigation row, 24–32px above page edge.
- Two text-forward buttons: left arrow + `Previous Page`; `Next Page` + right arrow. Sans 14px medium.
- Buttons have transparent base, 8px radius, 10px 12px padding; hover uses theme-raised surface and accent-tinted text.
- Disable previous/next unavailable directions visibly (muted, no hover).

## Visual Settings popover
- Trigger is header icon/button (`Visual Settings`); popover anchors below it, width 300–340px, 12px radius, 16–20px padding, elevated shadow.
- Group labels: uppercase/small sans (11–12px), muted; groups separated by 1px divider and 16px vertical gaps.
- Theme: three selectable swatches/tiles: `Light`, `Dark`, `Paper`; tile selected state = accent outline/check.
- Font: serif/sans selection with preview glyph or name. Reader title/body default to serif.
- Size: 4 discrete controls, `S / M / L / XL`; default corresponds to 18px prose. Active state filled accent.
- `Vertical Scroll`: toggle control, on state accented; off retains paged previous/next navigation.
- Keyboard: Escape closes; focus remains trapped while opened only if modal implementation is used—popover otherwise supports normal tab exit.

## Search modal: empty & results
- Dialog centered, width 600–680px desktop; 16px radius; 20–24px padding.
- Backdrop: translucent dark overlay plus `backdrop-filter: blur(8–12px)`; click backdrop/Escape closes.
- Header: `Search in book` title at left; close icon button at right.
- Input: full width, 44–48px high; search icon on left; clear (`×`) button appears only with query; visible focus accent ring.
- Empty state (`Search_before`): concise helper copy centered in content region; no fake result rows.
- Results (`Search`): vertically scrollable result list, each result is a full-width row with 12–16px vertical padding and 8px radius hover state.
- Row metadata: chapter number in Roman numerals (`I`, `II`, …), small uppercase/muted; result sentence/body in serif or readable UI serif.
- Matched term: soft light-purple background highlight with normal foreground contrast; retain multiple highlights per row.
- Clicking a result navigates reader to its chapter/location, closes modal, and preserves/briefly emphasizes current match.

## Motion & accessibility
- Use 140–200ms opacity/transform easing for popover/modal; respect `prefers-reduced-motion`.
- Visible keyboard focus on all header actions, size buttons, toggles, navigation, results.
- Minimum 44px height for primary touch targets on mobile.
