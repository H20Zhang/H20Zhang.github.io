# About, CV, and Systems Link Polish

## Goal

Tighten emphasis and link affordances across the About, CV, and Systems pages without changing their established editorial structure or cobalt–mandarin palette.

## Content emphasis

- On About, bold only the words `declarative` and `imperative` inside their existing leaderboard links; keep the years regular weight.
- On CV, bold only `Hongyi Honor School` inside its existing link.
- Link both CV advisor names to the same official CUHK profile pages already used on About: Prof. Jeffrey Xu Yu and Prof. Hong Cheng.

## Link treatment

- Reuse the existing About prose-link treatment for content-level links on Systems: a persistent 1px underline with a muted underline color, a small underline offset, and a stronger underline on hover or keyboard focus.
- Apply it to research-paper links on the Systems overview and to research/action links on individual system detail pages.
- Keep system title links and other navigation-like headings free of underlines. Their scale and placement already communicate interactivity, and underlining every title would add unnecessary visual noise.

## About hero scale

- Reduce the `Context infrastructure for agents.` headline by roughly ten percent across its responsive range.
- Preserve its current font weight, line height, letter spacing, and relationship to the biography copy so the change feels like refinement rather than a new hierarchy.

## Verification

- Add source and built-site regression checks for the three emphasis changes, both advisor destinations, the Systems underline rule, and the reduced hero scale.
- Build the full Jekyll site, run all tests and the internal-link checker, then inspect About, Systems overview, each system detail page, and CV at desktop width.
- Publish directly to `master` only after local verification passes, then confirm the deployment workflow succeeds.
