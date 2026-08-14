---
layout: page
title: AutoIA @ ByteDance
description: Context infrastructure for agents, connecting retrieval and runtime execution with observability, evaluation, and continuous improvement.
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
        summary: builds a document-structured graph and maintains evolving evidence state for navigation over long documents
        role: supports stateful evidence construction through navigable document structure
  - area: Agent memory
    papers:
      - name: AdaMM
        venue: arXiv 2026
        url: /publications/#Arxiv-26-3
        summary: adds queryable analytic memory alongside retrieval memory for filtering, aggregation, ranking, and temporal comparison over multimodal histories
        role: supports query-adaptive memory through analytic views over multimodal histories
  - area: Semantic query layer
    papers:
      - name: Sema
        venue: PVLDB 2026
        url: /publications/#VLDB-26-2
        summary: brings LLM-powered semantic operators into SQL with optimization and adaptive execution
        role: provides first-class semantic operators and adaptive execution
      - name: CoreSemDB
        venue: COLM 2026
        url: /publications/#COLM-26
        summary: benchmarks hybrid semantic-relational queries combining structured predicates with semantic interpretation over text-rich data
        role: defines hybrid semantic-relational workloads for evaluating this layer
---

AutoIA is an internal system for building **context infrastructure for agents**. It connects context retrieval over heterogeneous data with agent execution, observability, evaluation, and continuous improvement.

## Problem

Agents depend on context assembled from documents, tables, multimodal data, memory, indexes, and external knowledge sources. Better agents therefore require more than stronger retrieval: the system must diagnose failures and improve how context is organized and accessed.

## Core idea

AutoIA closes the loop between **context infrastructure and agent execution**. Workloads and execution traces feed observability and evaluation, which in turn guide improvements to retrieval pipelines, tools, skills, and execution strategies.

The current focus is **self-improving agent infrastructure**: using execution feedback to improve system capabilities over time. A longer-term question is **recursive self-improvement (RSI)** — whether the mechanisms that generate, evaluate, and select improvements can themselves be improved.

## Research role

AutoIA is the systems platform connecting my work on knowledge organization, agent memory, semantic query processing, retrieval, and context management.

## Product context

- [Volcano Engine ContextSearch](https://www.volcengine.com/docs/6465/2096539) — the surrounding product context for context-search workloads.

This link provides product context rather than a claim about the current deployment architecture of AutoIA.
