# Editorial Consistency Design

## Intent

Bring the CV, Systems, Publications, and Writing pages up to the visual standard already established by the homepage. The site should read like a concise academic profile rather than a collection of dashboard cards.

## Visual Direction

- Keep Roboto and the existing warm editorial palette.
- Prefer typography, spacing, and hairline rules over rounded containers, shadows, and decorative badges.
- Preserve the homepage as the visual reference; this pass extends its system instead of introducing a second one.
- Keep information density high enough for an academic audience while making hierarchy obvious at a glance.

## Page Changes

### Homepage

- Remove the repeated role and research tagline below the profile image; keep the email address as the useful contact action.
- Reduce the size and contrast of footer social icons so they do not compete with the page content.
- Leave the current content architecture and warm full-bleed sections intact.

### CV

- Replace the introductory Contact Information and Professional Summary cards with a single compact editorial header.
- Render each CV section as a flat section separated by hairline rules, with no card shadows or rounded containers.
- Use plain date text rather than pin-like visual markers.
- Remove generic award descriptions that repeat the award title while retaining genuinely explanatory details.
- Keep the left table of contents for fast navigation, beginning with Experience.

### Systems

- Make the page an index rather than a second set of project detail pages.
- Establish three levels: AutoIA as current primary work; GES and TQEX as two separate Huawei systems; CUHK systems as earlier research.
- Show one concise system description plus a small set of action links on the overview.
- Keep research threads and paper-level evidence on each detail page, not the index.

### Publications

- Remove the redundant `Full List` heading.
- Keep search visually compact.
- Rename abbreviated resource actions to `Abstract` and `BibTeX` and raise their type size slightly for legibility.

### Writing

- Rename the visible blog heading from `Hao Zhang` to `Writing`.
- Replace the card-like post container with a flat editorial entry.
- Remove decorative year and tag chips from the index while preserving useful metadata and translation links.
- Replace legacy `RAG` and `Information Architecture` tags with vocabulary aligned to the site's current positioning: context management and agent infrastructure.

## Responsive And Accessibility Constraints

- Preserve one-column reading flow on narrow screens and the existing desktop TOC behavior.
- Keep focus states and semantic heading order intact.
- Do not introduce horizontal overflow at common mobile and desktop widths.
- Maintain readable contrast for text, links, metadata, and controls.

## Acceptance Criteria

- All four Systems remain discoverable and their detail pages retain research evidence.
- The Systems index does not render research-thread detail.
- CV content remains complete, but the rendered page no longer presents sections as cards.
- Writing uses the new name and does not expose the retired tags on its index.
- Publication resource controls use unambiguous labels.
- The production Jekyll build, page-contract tests, and internal-link checks pass.
