# Publications Year Rail Design

## Problem

The Publications page already uses the mandarin structural-label color, but each year currently occupies a full-width row above its papers. The year reads as a detached timestamp because the divider, year, and first publication do not share a clear alignment.

The change should borrow the About page's section logic without turning the publication list into an About-page clone.

## Scope

- Apply the change only to `/publications/`.
- Keep the existing page title, description, authorship note, filter, publication markup, venue badges, paper metadata, and action buttons.
- Treat each generated bibliography year as a section with a left-side year label and a right-side publication list.
- Keep mandarin for the year label and cobalt for links and interactive controls.
- On `/projects/`, bring the `Core idea` and `Research` metadata rows into the same editorial hierarchy as About: mandarin structural labels, graphite explanatory copy, and cobalt research links.

## Desktop Layout

The direct children of `.publications` form a two-column grid:

- A compact year rail of approximately `6rem`.
- A flexible publication column that receives the remaining width.
- A restrained gap of approximately `2rem` between the two columns.

Each `h2.bibliography` sits in the year rail and aligns to the top of its corresponding `ol.bibliography`. The year uses the same small, regular structural-label role as About. Aligned divider segments run across the year and publication columns while preserving the intentional column gap.

The publication list keeps its current internal layout. This avoids shrinking the title and metadata column to About's narrower prose width.

## Responsive Layout

Below the tablet breakpoint, the layout returns to one column:

- The year appears above its list.
- The year and list share the same left edge.
- The divider remains above the year.
- The gap is reduced so a new year does not create excessive empty space.

No horizontal scrolling is allowed at either desktop or mobile widths.

## Visual Hierarchy

- Year labels: mandarin, uppercase-compatible small label role, weight `600`.
- Publication titles: unchanged graphite hierarchy.
- Venue badges and action controls: unchanged.
- Dividers: neutral and subtle; they separate years rather than individual label text.
- Alternating About-page backgrounds are intentionally excluded because they would make a dense research record visually noisy.

### Systems metadata

- `Core idea` and `Research` use the same `0.75rem`, weight `600`, restrained-letter-spacing structural-label role as About.
- Core-idea copy remains graphite so the explanatory sentence reads as content rather than navigation.
- Research paper names use cobalt because they are interactive destinations; separators stay quiet gray.
- The existing compact two-column metadata layout is retained instead of copying About's wider `176px` rail into each system entry.

## Accessibility And Semantics

- Preserve the generated `h2` year headings and ordered lists.
- Preserve DOM and reading order: year first, then its papers.
- Do not use visual reordering that changes keyboard or assistive-technology order.
- Retain visible link affordances and existing focus behavior.

## Verification

- Contract tests assert the desktop two-column grid, compact year rail, responsive single-column fallback, and unchanged semantic `h2`/`ol` sequence.
- Production build and all existing tests pass.
- Internal links and publication anchors remain valid.
- Published visual QA checks the first and later year boundaries, long paper titles, filter placement, divider continuity, and horizontal overflow.
- Published visual QA also checks the first Systems entry and a Huawei entry for label color, link affordance, wrapping, and mobile stacking.

## Non-goals

- Rewriting publication content or grouping papers by research theme.
- Changing venue badge, button, author, or metadata styles.
- Applying About's alternating background bands.
- Changing the homepage Selected Publications section.
