---
layout: page
title: AutoIA @ ByteDance
description: Self-improving context infrastructure that uses task-level feedback to optimize retrieval pipelines first and, when needed, the underlying information environment.
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

AutoIA extends the agent harness beyond loop orchestration to the **external information environment** in which the agent operates. It uses task-level evaluation to optimize environment-specific retrieval pipelines first and, when needed, improve the underlying information environment itself.

## Problem

Agents depend on context assembled from documents, tables, multimodal data, memory, indexes, and external knowledge sources. Better agents therefore require more than a fixed retrieval pipeline: task-level feedback should first improve how context is retrieved and assembled and, when retrieval remains insufficient, drive changes to how the underlying information environment is integrated, organized, indexed, and stored.

## Core idea

AutoIA treats context infrastructure as a **nested optimization loop**.

**Inner loop.** With the external information environment fixed, task-level evaluations and execution traces guide the optimization of environment-specific retrieval pipelines.

**Outer loop.** When retrieval-level optimization is no longer sufficient, the same feedback drives changes to data integration, organization, representation, indexing, and storage, improving the underlying information environment itself.

Together, these loops form **self-improving context infrastructure**. A longer-term question is **recursive self-improvement (RSI)** — whether the mechanisms that generate, evaluate, and select improvements can themselves be improved.

## Research role

AutoIA is my context-infrastructure systems work at ByteDance. It studies how task-level feedback can improve retrieval and the information environment behind it—a practical step toward supporting sustained collaboration among humans and multiple agents.

The research linked below has ByteDance author affiliations and is relevant to this systems work. My broader research agenda and independent academic collaborations are presented separately under [Independent Research](/projects/5_independent_research/).

## Product context

- [Volcano Engine ContextSearch](https://www.volcengine.com/product/context-search?_vtm_=a441938.b105878.0_0.0_0.0.133_11_000J33hNUY2PtPrMwlQ3ilQxfn2UtC) — the surrounding product context for context-search workloads.

This link provides product context rather than a claim about the current deployment architecture of AutoIA.
