---
layout: page
title: AutoIA @ ByteDance
description: A self-evolving harness for agent-team construction and feedback-driven evolution of external working environments.
importance: 1
category: systems
project_group: bytedance
external_url: https://www.volcengine.com/product/context-search?_vtm_=a441938.b105878.0_0.0_0.0.133_11_000J33hNUY2PtPrMwlQ3ilQxfn2UtC
external_label: Volcano Engine ContextSearch
related_publications: false
research_support:
  - area: Agent memory
    papers:
      - name: AdaMM
        venue: arXiv 2026
        url: /publications/#Arxiv-26-3
        summary: Adds queryable analytic memory alongside retrieval memory to support filtering, aggregation, ranking, and temporal comparison over multimodal histories.
        role: Supports query-adaptive memory through analytic views over multimodal histories.
---

I am developing AutoIA as a **self-evolving harness for AI agents** at ByteDance. Its central thesis is **agent evolution through environment evolution**. A builder agent team constructs and improves a persistent **external working environment**: access to data from files, databases, and apps, derived context (summaries, entities, views), memory (facts, experiences), tools (search, analysis), and skills (procedures, playbooks). Indexes and caches support efficient access. Task agents reuse these resources, and feedback from their executions guides what gets built or refined next.

## Problem

A capable model can still be limited by fragmented knowledge, missing tools or skills, or useful work discarded after each task. Prompt-level context is temporary; an external working environment is **persistent and reusable**. Its context infrastructure connects data sources and organizes source data, derived context, and access paths—not just retrieval tools. Memory can be a specialized use of the same underlying representations rather than a separate storage system. AutoIA studies how repeated reasoning and task-specific setup can become queryable representations and reusable computation.

## Three connected mechanisms

| Mechanism | Research question and approach |
| --- | --- |
| **Context IR** | How can source data (documents, database tables, app records) and derived context (summaries, entities, views) share a composable, queryable representation? Memory may be modeled as derived relations; indexes and caches are physical access paths. |
| **Agent-team construction** | How can builder agents discover unfamiliar sources, reuse seed specifications from successful cases, and construct reusable context views and access paths, memory, tools, skills, and ingestion workflows? |
| **Environment evolution** | How can task feedback determine which derived context, access paths, memory, tools, and skills should be created, reused, or refined for later work? |

**Task agents consume the environment; the builder team evolves it.** Improvements can persist beyond any one request. These are mechanisms under research and development, not a claim of measured end-to-end gains.

## Feedback-driven improvement

**Task loop.** A consumer agent accesses the current environment for data, derived context, memory, tools, and skills. Its outcomes and execution traces reveal missing information, weak retrieval, and repeated operations.

**Environment loop.** The builder team first improves retrieval and tool-use procedures with existing representations. When failures indicate missing structure or capability, it changes derived relations, access paths, memory, tools, or skills. This separates **using an environment better** from **making the environment itself better**.

**Harness evolution (longer term).** The builder team's own construction strategies and evaluation procedures may also evolve. This is a research direction, not a claim of realized recursive self-improvement.

## Research scope

AutoIA is an ongoing research and development project at ByteDance. The linked research supports specific parts of this agenda, but it does not establish that every mechanism is deployed together or that end-to-end improvements have been measured.

[Publications](/publications/) contains my broader research record, including independent academic collaborations.

## Product context

[Volcano Engine ContextSearch](https://www.volcengine.com/product/context-search?_vtm_=a441938.b105878.0_0.0_0.0.133_11_000J33hNUY2PtPrMwlQ3ilQxfn2UtC) provides the surrounding product context for context-search workloads. This link is not a claim about the current deployment architecture of AutoIA.
