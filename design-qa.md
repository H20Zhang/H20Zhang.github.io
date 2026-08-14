# Cobalt Mandarin Design QA

## Comparison target

- Source visual truth: `/workspace/scratch/ecbaf0f6ddaf/generated_images/exec-eeba2f37-a396-44c9-ae96-3972b489e093.png`.
- Source pixels: `1514 × 1039`.
- Implementation: `https://h20zhang.github.io/?palette=19560b9`, light theme, homepage root route.
- Browser-rendered implementation pixels and CSS viewport: `1363 × 936` at `devicePixelRatio: 1`.
- Density normalization: the source was proportionally normalized to `1363 × 936`; source and implementation were then opened together in the same comparison input.
- Implementation screenshot path: the browser capture was rendered and inspected in-session, but a durable file path could not be written because the browser share directory returned `EROFS`.

## Evidence captured

- Full-view comparison: normalized source and live implementation were compared together at `1363 × 936` after the Pages deployment completed.
- Focused color comparison: the first live pass exposed one cascade mismatch in the profile email; computed styles confirmed that the profile contact used the muted token while section links already used cobalt.
- Post-fix evidence: the deployed profile contact, body links, active navigation, and semantic interaction token all resolve to `#3f5fcc`; section labels resolve to `#cc4b00`; the page background resolves to `#fdfdfd`.
- Primary interactions: the theme toggle switched themes and was restored to light; the Systems navigation opened `/projects/` and returned successfully.
- Console inspection: no site-origin errors or warnings remained; a browser-extension-only metadata error was excluded from the site result.
- Automated verification covers 24 design and built-site contract tests, 41 generated HTML files and their internal anchors, JavaScript syntax, and diff whitespace.

## Required fidelity surfaces

- Fonts and typography: the same production type scale, weights, line heights, and wrapping are preserved; no actionable drift was visible.
- Spacing and layout rhythm: hero proportions, two-column alignment, section rhythm, dividers, image radius, and whitespace match the selected direction at the normalized viewport.
- Colors and visual tokens: neutral white surfaces, cobalt interaction states, mandarin section labels, graphite text, and neutral dividers match the target hierarchy.
- Image quality and asset fidelity: the selected Tianfu Greenway cycling photo is present, sharp, and uses the intended `4 / 3` crop without distortion.
- Copy and content: the selected homepage copy and section ordering match the target; no unintended wrapping or truncation was visible.
- Responsiveness and interactions: desktop navigation and theme switching were exercised; responsive Sass contracts remain covered automatically. A separate mobile raster comparison was not required because the selected source has no mobile state.
- Accessibility: visible links remain underlined, the theme control now has the descriptive name `Change color theme`, and semantic navigation remains keyboard-addressable.

## Findings

- No actionable P0, P1, or P2 findings remain.
- [P3] The browser-generated screenshot could not be persisted to a durable shared-file path because the browser share mount was read-only. This affects artifact retention, not the rendered site.

## Implementation checklist

- [x] Apply the selected Cobalt Mandarin semantic tokens.
- [x] Use cobalt for interaction states and reserve mandarin for small homepage section labels.
- [x] Correct the profile-contact cascade so the email uses the primary interaction color.
- [x] Give the theme toggle a descriptive accessible name.
- [x] Compare the normalized source and deployed implementation in the same visual input.
- [x] Exercise navigation and theme switching; inspect site console output.
- [x] Build and run automated validation.

## Comparison history

- Initial local pass: blocked because the cloud browser rejected the local preview with `net::ERR_BLOCKED_BY_CLIENT`.
- First deployed pass: [P1] the profile email appeared muted because `.profile .more-info a` overrode the intended homepage cobalt rule. `_sass/_components.scss` was corrected and a regression test was added.
- Interaction pass: [P2] the theme button exposed icon glyphs as its accessible name. `_includes/header.liquid` now supplies `aria-label="Change color theme"`, covered by a built-site contract test.
- Final pass: the normalized full-view comparison showed no remaining P0/P1/P2 visual differences; computed color tokens, navigation, theme switching, and console state were verified.

final result: passed
