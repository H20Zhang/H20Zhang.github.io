# Cobalt Mandarin Palette Design

## Goal

Replace the dry Silver Iris light theme with the selected third visual direction: a neutral technical editorial surface energized by cobalt links and a restrained orange-red section accent.

## Visual source of truth

- Selected generated reference: `/workspace/scratch/ecbaf0f6ddaf/generated_images/exec-eeba2f37-a396-44c9-ae96-3972b489e093.png`
- Reference dimensions: `1514 × 1039`
- Inspiration verified from the live sites of Chip Huyen and Julia Evans: near-white technical surfaces, saturated interaction color, and color concentrated in links or small labels rather than broad background tints.

## Light-theme tokens

| Role | Value | Use |
| --- | --- | --- |
| Page, surface, navbar | `#fdfdfd` | Keeps the page visually clean and nearly white. |
| Alternate section | `#f7f7f7` | Separates homepage bands without introducing a colored wash. |
| Primary text | `#1a1a1a` | Provides crisp editorial contrast. |
| Secondary text | `#6b7280` | Supports metadata and descriptions without looking faded. |
| Primary interaction | `#3f5fcc` | Links, active navigation, and normal interactive emphasis. |
| Interaction hover | `#273f9f` | Clear darker hover/focus state. |
| Section accent | `#cc4b00` | Homepage section labels only; never a competing link color. |
| Divider | `#e5e7eb` | Neutral structural separation. |

## Semantic integration

- Keep the existing page, surface, section, text, link, hover, and divider token interfaces.
- Add `--global-section-accent-color` so section labels do not reuse the link color.
- In the light theme, map that token to `#cc4b00`.
- In the dark theme, map it to the existing dark accent so the current dark appearance remains coherent.
- Change only `.about-section-label` to consume the new token. Links and active navigation continue to use `--global-theme-color`.

## Constraints and non-goals

- Preserve all layout, typography, spacing, copy, images, responsive behavior, and interactions.
- Preserve the existing dark-theme palette except for exposing the new semantic alias.
- Do not add gradients, shadows, cards, decorative assets, or broad orange surfaces.
- Do not publish or change `master` without a separate explicit instruction.

## Acceptance criteria

- The compiled light `:root` rule contains all eight selected palette values.
- Homepage section labels compile to the orange-red section accent while normal links remain cobalt.
- The dark theme retains its current values and receives a coherent section-accent alias.
- The Jekyll build, homepage design tests, built-site contract tests, JavaScript syntax check, and internal-link check pass.
- Browser screenshot comparison uses the selected reference at `1514 × 1039`; if the cloud browser cannot render the local preview, `design-qa.md` records `final result: blocked` rather than claiming visual fidelity.
