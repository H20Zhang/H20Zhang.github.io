# GES Research Grouping and Typography Refinement

## Problem statement

The site needs two focused refinements:

1. Make Huawei-era graph research discoverable from **GES @ Huawei** without implying that every graph paper is a component of the GES product system.
2. Increase overall readability and replace the current collection of near-duplicate small font sizes with a coherent editorial type hierarchy.

The work applies to the existing Jekyll site. It does not change the font family, color palette, navigation model, page structure, or publication metadata.

## Research-grouping boundary

The GES detail page will distinguish two kinds of evidence.

### Core GES systems line

These works remain presented as direct parts or extensions of the production graph-system line:

- GES, SIGMOD 2025
- RapidStore, VLDB 2025
- Revisiting the Design of In-Memory Dynamic Graph Storage, SIGMOD 2025
- Aquila, VLDB 2026

### Related Huawei-era graph research

The following papers will appear in a separately labelled research thread. The copy must describe them as adjacent graph-query, streaming-graph, or graph-learning research rather than GES components:

- Label Constrained Reachability Queries on Time Dependent Graphs, ICDE 2024
- Attributed Network Embedding in Streaming Style, ICDE 2024
- Breaking Free from Label Limitations: A Novel Unsupervised Attack Method for Graph Classification, DASFAA 2025

Tensor-centric graph work remains exclusively under **TQEX @ Huawei**: TenGraph, TGraph, and tensorized k-TTC search. The 2023 VLDB Journal extension of Learned Sketch remains with the earlier CUHK research line because its research provenance predates the Huawei systems line.

## Typography system

The current site mixes many values between `0.70rem` and `0.96rem`, creating visible drift between page descriptions, system metadata, CV dates, labels, and publication controls. The refinement will use a 17px root size and four recurring editorial roles:

| Role | Target | Use |
| --- | --- | --- |
| Body | `1rem` | Primary prose and system descriptions |
| Secondary | `0.94rem` | Supporting prose, CV bullets, post summaries |
| Metadata | `0.84rem` | Dates, venues, links, compact actions |
| Label | `0.75rem` | Uppercase section and grouping labels |

Page-specific display headings keep their existing hierarchy and scale proportionally with the root size. No text that carries primary meaning should fall below the metadata size. Labels may use the smaller size because weight, spacing, and uppercase styling provide additional hierarchy.

## Page-level application

- **Homepage:** preserve the hero and section layout; normalize small profile/footer metadata and section labels.
- **Systems:** increase descriptions and action links, and align group labels with the shared label role.
- **System details:** increase page descriptions, research-thread labels, venues, and expanded paper summaries.
- **CV:** raise dates, metadata, summaries, and bullet text while retaining the compact two-column editorial structure.
- **Writing and Publications:** normalize post metadata, summaries, filters, and publication controls to the same roles.

## Responsive behavior

The 17px root size applies across breakpoints. Existing responsive layout changes remain intact. Verification must confirm that navigation, CV grids, system cards, publication controls, and long paper titles do not overflow at desktop and mobile widths.

## Acceptance criteria

- GES shows the three additional Huawei-era graph papers in a clearly separate related-research thread.
- TQEX retains exclusive ownership of the tensor-centric graph papers.
- The root text size is 17px and the touched components use the four-role hierarchy.
- No primary content is rendered with a custom size below the metadata role.
- Jekyll builds successfully, automated site-contract tests pass, and internal links remain valid.
- Visual QA confirms readable hierarchy and no regressions on the homepage, Systems, GES, CV, Writing, and Publications pages.

## Non-goals

- Reclassifying the complete publication list by employer affiliation.
- Claiming unrelated graph-learning work as part of the GES implementation.
- Changing fonts, colors, spacing architecture, content width, or navigation.
- Republishing automatically; publication remains a separate explicit action.
