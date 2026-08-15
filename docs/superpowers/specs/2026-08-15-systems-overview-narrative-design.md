# Systems Overview Narrative Design

## Goal

Make `/projects/` independently readable rather than a thin navigation index, while preserving the existing flat editorial visual language and keeping detail pages as the place for architecture, system boundaries, and paper-by-paper roles.

## Information hierarchy

Each system entry exposes four layers in-place: title, a short research narrative, one `Core idea`, and a compact `Research` link row. A visible `Explore system →` action makes the detail page the natural next step rather than a requirement for basic comprehension.

Information density is intentionally asymmetric. AutoIA receives the richest narrative because it represents the current research agenda; GES and TQEX each communicate one system thesis plus evidence; the CUHK group stays compressed and serves as research lineage.

## Content model

Overview-specific copy lives in `_data/systems_overview.yml` rather than duplicating detail-page front matter. The existing project metadata continues to own titles, external links, ordering, and detail-page content.

The narrative arc across the page is: distributed query and graph execution → production graph systems and heterogeneous execution → self-improving context infrastructure for agents.

## Presentation

Keep the existing border-separated list, typography, and group labels. Do not introduce cards, thumbnails, badges, or collapsible content. Add only lightweight typographic roles for `Core idea`, `Research`, and the explicit detail-page CTA.

## Validation

The page should remain responsive, preserve existing external project and benchmark links, retain the Current / Huawei Systems / Earlier Research grouping, and avoid copying full detail-page sections onto the overview.