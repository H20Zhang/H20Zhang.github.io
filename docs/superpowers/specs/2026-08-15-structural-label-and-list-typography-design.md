# Structural Labels and List Typography

## Goal

Make the Systems and Writing indexes read as one editorial system, while extending the About page's mandarin section labels across the site without recreating a globally orange visual treatment.

## Scope

- All four Systems entries use the current AutoIA title and narrative typography.
- The Writing index article title and description use the same title and narrative typography as Systems.
- Existing metadata roles such as dates, language, venues, and links remain smaller and neutral.
- Mandarin is reserved for structural eyebrow labels that divide major content regions.

## Typography Contract

- List title: `1.55rem`, weight `400`, line height `1.3`, graphite text.
- List narrative: `1rem`, weight `400`, line height `1.68`, graphite text.
- Systems importance and era continue to be communicated by group labels, order, content, and spacing rather than smaller type.
- At `576px` and below, both Systems and Writing titles use `1.35rem` so long titles wrap consistently.

## Structural Label Contract

- Color: `var(--global-section-accent-color)` (`#cc4b00` in the light theme).
- Size: preserve each existing label's `0.72–0.76rem` role rather than enlarging it.
- Weight: `600`.
- Treatment: uppercase with restrained letter spacing.
- The accent applies only to labels that answer which structural section the reader has entered.

Apply the role to:

- Systems group labels: Current, Huawei Systems, Earlier Research.
- Writing index label: Essays.
- Publication year dividers.
- CV section titles.
- System-detail research-thread labels.
- Long-form article sidebar labels.

Do not apply it to:

- Page titles or ordinary section headings.
- Dates, language tags, venues, or other metadata.
- Links and actions, which remain cobalt.
- Body emphasis, which remains graphite.
- News dates, which are chronological metadata rather than section labels.

## Accessibility and Responsiveness

- The accent is supplementary; hierarchy remains understandable from semantic headings, order, borders, and spacing without relying on color alone.
- Contrast is checked in both light and dark themes through the existing semantic token.
- Long Systems and Writing titles are checked at desktop and mobile widths for readable wrapping and no horizontal overflow.

## Verification

- Built CSS contract tests assert identical Systems and Writing title/narrative roles.
- Contract tests assert the semantic accent token on each structural-label selector.
- Production Jekyll build, internal-link validation, and the full unit suite must pass.
- Browser QA covers Systems, Writing, Publications, CV, a system detail page, and both article languages at desktop and mobile widths.
