# Visual Polish Design

## Goal
Make the site feel like a deliberate researcher/builder portfolio rather than a customized academic template, while preserving its restrained, technical character.

## Design direction
Use a quiet technical-editorial visual language: neutral surfaces, one restrained accent hue, strong typographic hierarchy, light dividers, and minimal component chrome. Do not add gradients, illustration-heavy hero sections, glass effects, decorative animation, or extra iconography.

## Scope
This pass changes presentation only. It does not change research positioning, page information architecture, publication data, System-to-paper mappings, Blog content, navigation structure, or URLs.

### 1. Unified accent system
- Replace the current highly saturated light-mode purple and dark-mode cyan with one shared indigo/blue-violet hue family.
- Light and dark themes vary luminance/contrast while keeping the same hue identity.
- Reuse the same accent for inline links, active navigation, subtle tags, and hover states.

### 2. Profile treatment
- Remove monospace styling from profile metadata.
- Reduce profile metadata size and contrast so it reads as secondary information.
- Replace the visible portrait shadow with a light border and restrained corner radius.
- Preserve the current portrait, placement, and responsive behavior.

### 3. Systems overview
- Replace the two-column Bootstrap-card arrangement with a single-column editorial list of full-width System entries.
- Keep System title, description, research threads, and external actions, but reduce nested-card density.
- Use borders/dividers and spacing rather than shadow or colored containers to establish hierarchy.
- Preserve the existing project frontmatter as the single data source.

### 4. System detail Research Threads
- Style each paper disclosure as a clean row with a divider, paper/venue summary line, and a restrained disclosure indicator.
- On expansion, indent the supporting text slightly and retain existing `View publication` and `Code` actions.
- Continue using native `<details>` for accessibility and zero-JavaScript behavior.
- Avoid nested cards or tinted backgrounds.

### 5. Publications page
- Reduce the visual weight of venue badges: use a subtle outline/tinted treatment instead of saturated filled blocks.
- Reduce action-button weight for DOI/arXiv/HTML/Bib links, using compact low-chrome controls while retaining clear click affordance.
- Preserve paper title as the dominant element, followed by authors and venue/year.
- Keep existing bibliography anchors, filtering behavior, author indicators, and publication data unchanged.

## Global rhythm
- Keep the current site max width for data-heavy pages such as Publications and Systems.
- Improve narrative-page readability with slightly tighter prose measure where practical without restructuring layouts.
- Favor larger spacing before section headings than after them to improve vertical rhythm.
- Do not redesign Blog; use its existing restrained border/radius/hover treatment as the reference level of polish for other pages.

## Accessibility and behavior
- Preserve visible keyboard focus states.
- Maintain adequate contrast in both themes.
- Do not remove the persistent inline-link underline system added previously.
- Preserve native disclosure semantics and existing responsive behavior.

## Validation
- Run the existing Jekyll build and internal link/anchor checker.
- Verify About, Systems overview, all System detail pages, Publications, Blog, News, and CV still render.
- Verify publication deep links/filtering and System `View publication` behavior remain unchanged.
- Check light and dark theme variables for consistent accent hue and sufficient contrast.
- Check mobile layout for portrait, Systems entries, Research Threads, and publication actions.

## Non-goals
- No new content sections.
- No new illustration or image-generation work.
- No navigation changes.
- No Blog redesign.
- No changes to research terminology or copy beyond incidental UI labels if required for layout.