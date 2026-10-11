---
layout: page
title: AutoIA @ ByteDance
description: A self-evolving agent harness connecting context representations, agent-team construction, and feedback-driven evolution.
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

I am developing AutoIA as a **self-evolving harness for AI agents** at ByteDance. It studies how agent teams can build and continuously improve their context, memory, and tools through task-level feedback.

## Problem

An agent's performance depends not only on its model, but also on the knowledge it can access, the tools it can use, and how these are organized. AutoIA studies how this information environment can improve across tasks, rather than being rebuilt from scratch for every execution.

## Three connected mechanisms

| Mechanism | Research question |
| --- | --- |
| **Context IR** | How can heterogeneous sources and derived knowledge share a composable, queryable representation? |
| **Context teams** | How can agent teams discover sources and construct useful context representations and tools? |
| **Context evolution** | How can task feedback guide what to retain, revise, and reuse in later tasks? |

Together, these mechanisms connect **agents improving their information environment** with **a better environment supporting more capable agents**. They describe the system's research design, not a claim of measured end-to-end gains.

## Feedback-driven improvement

AutoIA's current context-centered approach uses a **nested optimization loop** within the agent harness.

**Inner loop.** With the external information environment fixed, task-level evaluations and execution traces guide the optimization of environment-specific retrieval pipelines.

**Outer loop.** When retrieval-level optimization is no longer sufficient, the same feedback drives changes to data integration, organization, representation, indexing, and storage, improving the underlying information environment itself.

A longer-term question is **recursive self-improvement (RSI)**: whether the mechanisms that generate, evaluate, and select improvements can themselves be improved.

## Research scope

AutoIA is my agent-harness research and development at ByteDance. The research linked below has ByteDance author affiliations and supports specific parts of this agenda; it is not evidence that every component is deployed as part of AutoIA.

My broader research agenda and independent academic collaborations are presented separately under [Independent Research](/projects/5_independent_research/).

## Product context

[Volcano Engine ContextSearch](https://www.volcengine.com/product/context-search?_vtm_=a441938.b105878.0_0.0_0.0.133_11_000J33hNUY2PtPrMwlQ3ilQxfn2UtC) provides the surrounding product context for context-search workloads. This link is not a claim about the current deployment architecture of AutoIA.
