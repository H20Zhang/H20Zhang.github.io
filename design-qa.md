# Cobalt Mandarin Design QA

## Comparison target

- Source visual truth: `/workspace/scratch/ecbaf0f6ddaf/generated_images/exec-eeba2f37-a396-44c9-ae96-3972b489e093.png`.
- Source pixels: `1514 × 1039`.
- Published implementation: `https://h20zhang.github.io/?audit=8e41c37e`, light theme.
- Browser-rendered implementation pixels and CSS viewport: `1363 × 936` at `devicePixelRatio: 1`.
- Density normalization: the source was normalized to `1363 × 936`; the source and published homepage were opened together in the same comparison input.
- Screenshot retention: all twelve published routes were captured and inspected in-session. A durable browser screenshot path could not be written because the browser share directory returned `EROFS`.

## Audited routes

1. `/` — homepage hero, selected research, systems, publications, and primary links: passed.
2. `/publications/` — publication list, venue labels, actions, and author metadata: passed.
3. `/projects/` — Systems hierarchy, titles, descriptions, and external references: passed.
4. `/cv/` — editorial CV typography, navigation, experience, and list density: passed.
5. `/blog/` — Writing index hierarchy, metadata, and translation link: passed.
6. `/projects/1_autoia/` — AutoIA detail prose, headings, and research threads: passed.
7. `/blog/2026/next-gen-agent-en/` — English article hero, body, table prose, and sidebar: passed.
8. `/blog/2026/next-gen-agent-zh/` — Chinese article hero, body, table prose, and sidebar: passed.
9. `/projects/3_ges/` — GES detail prose, evidence links, and impact section: passed.
10. `/projects/2_tqex/` — TQEX detail prose, workload list, and research threads: passed.
11. `/projects/4_database_graph_systems/` — CUHK systems detail hierarchy, descriptions, and links: passed.
12. `/news/` — news table typography, bold emphasis, dates, and links: passed.

## Evidence captured

- All twelve routes report `font-weight: 400` on the page body, no horizontal overflow, and no visible 300-weight content prose.
- The Systems index reports `font-weight: 400` for every `.system-entry-title`.
- Article and News table cells report `font-weight: 400` after the third-party table rule is overridden.
- The homepage contains twelve bold links. Every nested `<strong>` resolves to the same cobalt `rgb(63, 95, 204)` as its parent link; mismatch count is zero.
- The normalized source and final homepage were compared together. Layout rhythm, neutral surfaces, cobalt interaction states, mandarin labels, graphite text, and image crop remain consistent with the selected direction.
- Automated verification covers 28 design and built-site contract tests plus internal links and anchors across 41 generated HTML files.
- GitHub Actions deployment run `31851972987` completed successfully for commit `8e41c37b8fe7d113004664bd0fa5c74e57ffc012`.

## Required fidelity surfaces

- Fonts and typography: Roboto is preserved. Reading text and metadata use regular weight; display headings retain their lighter editorial role.
- Spacing and layout rhythm: existing structure, page order, two-column alignment, dividers, and whitespace remain unchanged.
- Colors and visual tokens: cobalt is consistently used for links and active states; mandarin remains limited to small section labels.
- Image quality and asset fidelity: the Tianfu Greenway cycling photo remains sharp and uses the intended `4 / 3` crop without distortion.
- Copy and content: all current homepage, system, CV, publication, and writing content is preserved.
- Responsiveness: no audited route produces horizontal overflow at the selected desktop viewport.
- Accessibility: visible text links remain recognizable, the theme control retains its descriptive label, and navigation remains semantic.

## Findings

- No actionable P0, P1, or P2 findings remain.
- [P3] Browser screenshots could not be persisted to the read-only share mount. This affects audit artifact retention only, not the published site.

## Implementation checklist

- [x] Make bold text inside links inherit the link color.
- [x] Set site body prose to regular weight.
- [x] Override third-party table cells that reverted to light weight.
- [x] Set Systems index titles to regular weight.
- [x] Add regression contracts for all four typography and link fixes.
- [x] Run the contract suite in the deployment workflow.
- [x] Inspect every homepage-reachable internal route visually after deployment.
- [x] Compare the final homepage and selected design reference in the same visual input.

## Comparison history

- Initial published pass: [P1] global `strong` styling kept bold links graphite even though the anchor itself was cobalt. `a strong { color: inherit; }` corrected the cascade.
- Typography pass: [P2] the base theme assigned 300 weight to the body and directly to table cells; Systems titles also inherited the light display weight. Body and table prose plus Systems titles now resolve to 400.
- CI pass: the production minifier removed whitespace inside `rgba()`, exposing a format-sensitive palette assertion. The test now compares normalized CSS values without weakening the semantic color contract.
- Final pass: all twelve routes passed computed-style, overflow, and visual inspection; the homepage/source comparison showed no remaining P0/P1/P2 visual differences.

final result: passed

## Structural label and list consistency follow-up

### Scope

- Systems: all overview entries now share AutoIA's title and narrative roles; group labels alone use mandarin.
- Writing: article titles and summaries now reuse the Systems list roles; `ESSAYS` provides the structural label.
- Publications and CV: year dividers and CV section titles use the same restrained mandarin label role.
- System details and essays: research-thread labels and article-sidebar labels use the same role without changing prose, metadata, or link colors.

### Local verification

- The production build completes successfully.
- All 33 contract tests pass, including dedicated assertions for shared Systems/Writing typography and the six structural-label selectors.
- Internal links and anchors are valid across all 41 generated HTML files.
- JavaScript syntax, deployment workflow YAML, and whitespace checks pass.
- Desktop and mobile typography contracts require `1.55rem` and `1.35rem` titles respectively, with regular-weight graphite narratives at `1rem / 1.68`.
- Published visual inspection remains the release gate because the selected cloud browser cannot access the isolated local worktree preview.

follow-up result: implementation verified locally; published visual QA pending release
