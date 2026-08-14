# Visual Polish Implementation Plan

1. **Accent system** — add shared light/dark indigo accent variables and wire both themes to the same hue family.
2. **Profile treatment** — remove portrait shadow, add a subtle border/radius, and restyle profile metadata as quiet secondary sans-serif text.
3. **Systems overview** — switch the Systems grid to a single-column editorial layout and simplify each System entry while preserving the same project frontmatter and links.
4. **Research Threads** — add dedicated semantic classes around native `<details>` rows and style them as divider-based disclosure rows with restrained expansion content.
5. **Publications** — soften venue badges and action controls while preserving bibliography markup, anchors, filtering, and publication data.
6. **Rhythm** — make section spacing more deliberate without changing page information architecture.
7. **Validation** — run the existing GitHub Pages build and internal link/anchor checker, then verify the final Pages deployment and inspect generated HTML for Systems, System detail, Publications, and About.