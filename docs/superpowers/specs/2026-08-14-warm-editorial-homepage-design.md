# Warm Editorial Homepage Design

## Goal

Recreate the selected Product Design mock as the homepage of Hao Zhang's existing Jekyll site: the original editorial layout with a restrained warm-gray palette and brick-red accents.

The page should read first as a clear research identity—name, role, research thesis, and portrait—and then as a compact research dossier. The redesign must improve visual hierarchy without changing research claims, URLs, or navigation behavior.

## Source of truth

- Selected visual: `/workspace/scratch/ecbaf0f6ddaf/generated_images/exec-95710597-e82e-4019-bf0e-1cc2bdfb10a9.png`
- Approved palette comparison: `/workspace/scratch/ecbaf0f6ddaf/generated_images/exec-13bbbdd5-75d9-48f6-a6c4-5aadfa0a528f.png` (right-hand direction).
- Reference canvas: `1024 × 1536`, representing a `1440px`-wide scrollable desktop page.
- Existing source: the current `master` branch of `H20Zhang/H20Zhang.github.io`.

## Visual system

### Light theme

- Neutral warm-gray hero and navigation surface: `#f7f5f2`.
- Light gray-taupe alternate section surface: `#efeae4`.
- Restrained brick accent: `#984936`; stronger hover: `#733527`.
- Charcoal-brown text: `#2b2623`; muted taupe-gray text: `#6f6661`.
- Dividers use a neutral brown-gray mixture at roughly 16% opacity.
- Section surfaces alternate between warm gray-white and gray-taupe. They remain flat: no cards, gradients, shadows, or decorative texture.
- Warmth must come primarily from the brick accent and subtle undertones, not from a yellow cast across every large surface.

### Dark theme

- Preserve the existing theme toggle and use an espresso canvas `#241a16`, raised surface `#2e211c`, warm ivory text `#f4eadf`, muted mushroom text `#c2b2a7`, lighter terracotta accent `#e58b6d`, and hover accent `#f0a084`.
- Maintain readable contrast and visible hover/focus states.

## Homepage structure

1. Keep the existing fixed navigation, routes, theme toggle, and page order.
2. Replace the floating-profile homepage header with a two-column hero:
   - Left: `Hao Zhang`, role, `Data systems for agents.`, and the existing one-paragraph introduction.
   - Right: the existing portrait and the existing role/tagline/email metadata.
3. Render each existing content section as a semantic two-column row:
   - Left rail: compact uppercase section label.
   - Right rail: the current Markdown content and links.
4. Alternate flat warm gray-white and gray-taupe section surfaces across the viewport while keeping content aligned to the existing maximum width.
5. End with the existing social links and a quiet build-date label.

## Responsive behavior

- At desktop widths, hero columns use roughly `2fr / 0.9fr`; section rows use a `176px` label rail plus a flexible content column.
- Below `768px`, the hero and section rows collapse to one column.
- On mobile, the portrait follows the identity text, section labels sit above content, typography scales down without changing the information order, and there is no horizontal overflow.

## Site-wide scope

- Apply the chosen warm-gray color tokens to all light-theme pages so navigation, links, cards, publications, Systems, and Blog remain visually consistent.
- Preserve the current dark-theme palette unchanged in this refinement.
- Limit structural markup changes to the About/homepage. Other page information architecture and component behavior remain unchanged.
- Keep the current portrait, social icons, icon library, content, URLs, publication anchors, and JavaScript behavior.

## Non-goals

- No deployment or push to GitHub.
- No changes to research copy, project data, publication data, navigation labels, or routes.
- No new raster assets, custom icons, gradients, shadows, decorative illustration, or animation.

## Acceptance criteria

- Source contract tests confirm the selected palette, homepage semantic structure, responsive rules, and stylesheet wiring.
- `bundle exec jekyll build` and `python3 scripts/check_internal_links.py _site` succeed.
- Cloud-browser screenshots at desktop and mobile widths match the selected visual's hierarchy, spacing, surfaces, portrait treatment, and color direction.
- Design QA compares the selected visual and browser-rendered implementation together and reports `final result: passed`.
