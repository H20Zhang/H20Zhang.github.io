# Typography Polish Design

## Goal

Improve the homepage and publications page without changing the site's established warm editorial identity. The work should make dense research content easier to scan and remove the homepage's horizontal overflow.

## Visual direction

- Keep Roboto, the current heading scale, navigation, uppercase section labels, warm palette, and compact academic layout.
- Give long-form homepage copy a regular weight and slightly more deliberate sizing so it remains readable beside the oversized editorial heading.
- Give publication author and venue metadata a regular weight while preserving their size, hierarchy, and muted color.
- Preserve the alternating full-width homepage bands without relying on a `100vw` pseudo-element that includes the browser scrollbar width.

## Implementation

- Homepage introduction: `1rem`, weight `400`, line-height `1.62`.
- Homepage section content: `0.96rem`, weight `400`, line-height `1.62`.
- Publication authors and periodicals: retain their existing sizes and line-height, add weight `400`.
- Full-bleed bands: paint the section background with a `100vmax` box shadow and clip it to the section block. This preserves edge-to-edge color while keeping the document width equal to the viewport width.

## Acceptance criteria

- The homepage has no horizontal scroll at desktop or mobile widths.
- Alternating section bands still reach both viewport edges.
- Heading scale and overall density remain unchanged.
- Homepage paragraphs and publication metadata are visibly clearer without appearing heavy.
- Jekyll build, built-site contracts, internal-link checks, and browser inspection pass.
