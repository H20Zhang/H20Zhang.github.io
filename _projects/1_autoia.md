---
layout: page
title: AutoIA @ ByteDance
description: A system for co-evolving agent harnesses and shared environments through task feedback and reusable construction experience.
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

I am developing AutoIA as a system for **self-evolving agent harnesses and shared working environments** at ByteDance. An **agent harness** configures how an agent works—its tools, skills, execution strategies, and access to context. A **shared environment** persists beyond individual tasks and agents, providing reusable data, context, memory, and capabilities that multiple agents can use, and that people or other services could also access.

A builder agent team uses a composable **Context IR** to discover unfamiliar sources and construct both layers. It refines tools, skills, and workflows alongside derived relations, memory, indexes, and other shared assets. Task feedback guides these changes, while successful projects, seed specifications, and construction experience inform future work. The central thesis is **agent evolution through harness–environment co-evolution**.

## Problem

A capable model can still struggle when knowledge is fragmented, useful tools are missing, or the same setup work must be repeated for every task. **Harness evolution** improves how an agent uses tools, skills, and context. **Environment evolution** improves the persistent information and capabilities that many agents can reuse. These boundaries are not mutually exclusive: a tool or skill can be a shared capability in the environment and also be selected or configured within an agent's harness.

AutoIA treats context infrastructure as more than retrieval. It connects files, databases, and apps; organizes source data and derived context; and supports queryable memory and efficient access paths. The research problem is how to turn task outcomes and past construction experience into validated, reusable improvements at both levels.

## Four connected mechanisms

| Mechanism | Research question and approach |
| --- | --- |
| **Context IR** | How can source data (documents, database tables, app records) and derived context (summaries, entities, views) share a composable, queryable representation? Evolving schemas and ontologies organize meaning; memory can be modeled as derived relations, while indexes and caches serve as physical access paths. |
| **Agent-team construction** | How can builder agents discover unfamiliar sources, reuse seed specifications and prior solutions, and construct context views, ingestion workflows, memory, tools, skills, and access paths? |
| **Harness–environment co-evolution** | How can task feedback improve agent-facing tools, skills, and execution strategies, while also evolving shared representations, memory, and reusable capabilities? |
| **Experience-driven builder evolution** | How can builders retain successful project artifacts, reusable construction strategies, and evaluation experience, and adapt future construction decisions based on what worked? |

**Task agents use harnesses to access shared environments; builder agents evolve both and retain experience about how to build them.** These are mechanisms under research and development, not a claim of measured end-to-end gains.

## Feedback-driven improvement

**Task execution.** Consumer agents use their harnesses to access shared data, context, memory, tools, and skills. Task outcomes and execution traces reveal missing information, ineffective workflows, and opportunities to reuse successful procedures.

**Harness evolution.** Builder agents create or refine tools, skills, workflows, and execution strategies to improve how task agents operate. A tool or skill may be implemented once as a shared asset, then bound differently by different harnesses.

**Environment evolution.** When limitations lie in shared resources rather than agent execution, builders improve source integration, schemas and ontologies, derived relations, memory, access paths, or reusable tool implementations.

**Builder evolution.** Successful projects, seed specifications, failures, and evaluation lessons become construction experience for later tasks. Builders reuse and adapt this experience when exploring unfamiliar workloads, rather than starting each new environment from scratch. This is experience-driven improvement of the building process—not a claim that the underlying improvement algorithm autonomously rewrites itself.

A central systems challenge is **validation before shared reuse**: incorrect derived information or a faulty tool can propagate across agents. Provenance, versioning, and task-level evaluation help distinguish durable improvements from one-off successes.

## Research scope

AutoIA is an ongoing research and development project at ByteDance. The linked research supports specific parts of this agenda, but it does not establish that every mechanism is deployed together or that end-to-end improvements have been measured.

[Publications](/publications/) contains my broader research record, including independent academic collaborations.

## Product context

[Volcano Engine ContextSearch](https://www.volcengine.com/product/context-search?_vtm_=a441938.b105878.0_0.0_0.0.133_11_000J33hNUY2PtPrMwlQ3ilQxfn2UtC) provides the surrounding product context for context-search workloads. This link is not a claim about the current deployment architecture of AutoIA.
