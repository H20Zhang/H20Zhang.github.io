---
layout: page
title: AutoIA @ ByteDance
description: Self-improving context infrastructure that evolves both external data environments and the retrieval pipelines built for them.
importance: 1
category: systems
external_url: https://www.volcengine.com/docs/6465/2096539
external_label: Volcano Engine ContextSearch
related_publications: false
research_support:
  - area: Knowledge organization
    papers:
      - name: DocNavRAG
        venue: arXiv 2026
        url: /publications/#Arxiv-26-4
        summary: Builds a document-structured graph and maintains an evolving evidence state for navigation over long documents.
        role: Supports stateful evidence construction through navigable document structure.
  - area: Agent memory
    papers:
      - name: AdaMM
        venue: arXiv 2026
        url: /publications/#Arxiv-26-3
        summary: Adds queryable analytic memory alongside retrieval memory to support filtering, aggregation, ranking, and temporal comparison over multimodal histories.
        role: Supports query-adaptive memory through analytic views over multimodal histories.
  - area: Semantic query layer
    papers:
      - name: Sema
        venue: PVLDB 2026
        url: /publications/#VLDB-26-2
        summary: Introduces LLM-powered semantic operators in SQL with optimization and adaptive execution.
        role: Provides the semantic query layer with first-class operators and adaptive execution.
      - name: CoreSemDB
        venue: COLM 2026
        url: /publications/#COLM-26
        summary: Benchmarks hybrid semantic-relational queries that combine structured predicates with semantic interpretation over text-rich data.
        role: Defines workloads for evaluating the semantic query layer.
---

AutoIA extends the agent harness beyond loop orchestration to the **external data environment** in which the agent operates. It evolves both environment construction and environment-specific retrieval pipelines through task-level evaluation.

## Problem

Agents depend on context assembled from documents, tables, multimodal data, memory, indexes, and external knowledge sources. Better agents therefore require more than stronger retrieval: retrieval pipelines must be optimized for the environment they operate over, and persistent failures must feed back into how that environment is constructed.

## Core idea

AutoIA treats context infrastructure as a **nested optimization loop**.

**Inner loop.** With the external data environment fixed, task-level evaluations and execution traces guide the evolution of environment-specific retrieval pipelines.

**Outer loop.** When pipeline-level optimization converges but failures persist, those failures drive changes to data integration, representation, indexing, and storage, rebuilding the environment itself.

Together, these loops form **self-improving context infrastructure**. A longer-term question is **recursive self-improvement (RSI)** — whether the mechanisms that generate, evaluate, and select improvements can themselves be improved.

## Research role

AutoIA is the systems platform connecting my work on data integration, knowledge organization, agent memory, semantic query processing, retrieval, and context management.

## Product context

- [Volcano Engine ContextSearch](https://www.volcengine.com/docs/6465/2096539) — the surrounding product context for context-search workloads.

This link provides product context rather than a claim about the current deployment architecture of AutoIA.
