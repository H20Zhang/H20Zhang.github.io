---
layout: page
title: AutoIA @ ByteDance
description: A self-evolving harness for AI agents, researching how task-level feedback can improve context, memory, and tools.
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

I am developing AutoIA as a **self-evolving harness for AI agents**. Its goal is to help agent teams build and continuously improve their context and tools, using task-level feedback to guide adaptation.

## Problem

Agents work through memory, tool interfaces, and context assembled from documents, tables, multimodal data, and external knowledge. AutoIA studies how feedback from task execution can improve these capabilities over time. Its current context-centered approach starts with how agents retrieve and assemble evidence, then examines the information environment that makes this evidence available.

## Core idea

AutoIA's current context-centered approach uses a **nested optimization loop** within the agent harness.

**Inner loop.** With the external information environment fixed, task-level evaluations and execution traces guide the optimization of environment-specific retrieval pipelines.

**Outer loop.** When retrieval-level optimization is no longer sufficient, the same feedback drives changes to data integration, organization, representation, indexing, and storage, improving the underlying information environment itself.

These loops provide a context-centered basis for an **evolving agent harness**. A longer-term question is **recursive self-improvement (RSI)**: whether the mechanisms that generate, evaluate, and select improvements can themselves be improved.

## Research role

AutoIA is my agent-harness research and development at ByteDance. It studies how agents can adapt through better context, memory, and task-level feedback. Data systems provide the supporting state and interfaces for this work, toward sustained collaboration among humans and multiple agents.

The research linked below has ByteDance author affiliations and is relevant to this harness research. My broader research agenda and independent academic collaborations are presented separately under [Independent Research](/projects/5_independent_research/).

## Product context

- [Volcano Engine ContextSearch](https://www.volcengine.com/product/context-search?_vtm_=a441938.b105878.0_0.0_0.0.133_11_000J33hNUY2PtPrMwlQ3ilQxfn2UtC) — the surrounding product context for context-search workloads.

This link provides product context rather than a claim about the current deployment architecture of AutoIA.
