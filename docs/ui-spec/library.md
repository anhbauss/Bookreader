# Library — layout spec

## Canvas
- Desktop reference: 1280px-wide thumbnail; content container max-width ~1120px, centered.
- Page background: warm off-white; vertical scroll. Ignore purple floating browser-extension controls at right.
- Main horizontal padding: 48–64px desktop; section spacing: 40–56px.

## Top bar
- Full-width, white/off-white bar; bottom divider at very low contrast.
- Container: logo/title at left; navigation links centered/right; compact avatar/action cluster at far right.
- Height: 64–72px. UI labels use sans, 14–15px, medium weight.
- Active navigation item: dark text with short accent underline or filled/outlined active state.
- Avatar: circular, ~32px; dark green fill.

## Hero: greeting + Reading Goal
- Two-column row, ~65/35 split; generous top/bottom breathing room (48px each).
- Left: greeting eyebrow/label, prominent serif heading, brief sans supporting copy.
- Right: `Reading Goal` card aligned to heading block top.
- Goal card: light surface, 12–16px radius, 20–24px inner padding; goal progress, value/label, and a compact control/action.
- Heading wraps naturally; target 34–42px desktop. Avoid full-width paragraphs (>560px).

## Currently Reading
- Section header row: serif title at left (`Currently Reading`); optional text action at right.
- Header to card rail gap: 18–24px.
- Horizontal scrolling rail; cards retain fixed width and do not squeeze.
- Rail can overflow viewport at right; use scroll snapping (`start`) and hide scrollbar visually while retaining mousewheel/trackpad drag.

## Book card
- Card width: 240–270px; radius 12px; subtle border/shadow; overflow hidden.
- Cover: portrait ratio near 2:3, card width; cover image sits above metadata.
- Body padding: 14–16px; title in serif 18–20px / 1.25; author/meta in sans 13–14px muted.
- Reading-status/progress line near card bottom; progress track 4–6px tall and full available width.
- Progress fill is muted brick red; show percent/current-page label only if data exists.
- Metadata text: max 2 lines for book title, ellipsis/clamp; author 1 line ellipsis.
- Card hover: translateY(-3px), elevated soft shadow, cover subtle scale (1.02); transition 160–200ms ease-out.
- Card click target includes cover and metadata; avoid nested competing buttons.

## Responsive behavior
- <=900px: page gutters 24px; hero stacks with goal card beneath copy; card rail stays horizontal.
- <=640px: top bar condenses; hide nonessential navigation behind menu; gutters 16px; heading 30–34px.
