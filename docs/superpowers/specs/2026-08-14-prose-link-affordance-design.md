# Prose Link Affordance Design

## Goal
Make clickable entities in prose visually distinguishable from ordinary bold emphasis without making the site feel link-heavy.

## Scope
Apply a persistent light underline only to links inside prose paragraphs and list items within page/post content. This includes papers, systems, advisors, selected writing, news items, and similar inline references.

Do not change navigation links, card titles, publication action buttons, social icons, buttons, badges, or other components that already have an obvious interactive affordance.

## Visual treatment
- Keep the existing theme-link color.
- Add a subtle 1px underline in the default state.
- Use a small underline offset so the line does not collide with glyph descenders.
- Keep the underline visually lighter than body text.
- On hover/focus, strengthen the underline while preserving the existing theme color.
- Bold links remain bold; the underline is the primary signal that they are clickable.

## Implementation boundary
Implement the behavior in the shared typography stylesheet, scoped to prose containers rather than global `a` elements. Prefer paragraph/list anchors within article/post content and avoid component-specific areas such as navbar, cards, social controls, publication buttons, and project controls.

## Accessibility
The clickable state must not rely on color alone. The persistent underline provides a non-color affordance. Keyboard focus behavior must remain visible and must not be removed or weakened.

## Validation
- Verify About, Systems detail pages, Blog posts, and News-style prose show the new underline on inline links.
- Verify navbar links, card titles, publication buttons, social icons, and other controls do not gain the prose underline.
- Run the existing Jekyll build and internal link/anchor checker.
- Check both light and dark themes for sufficient underline visibility and visual restraint.
