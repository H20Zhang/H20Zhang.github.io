---
layout: single
title: "When Intelligence Becomes Abundant: Organizing the Shared Information World of Humans and AI Agents"
seo_title: "Shared Information World for Humans and AI Agents | Hao Zhang"
date: 2026-08-24 08:30:00 +0800
last_modified_at: 2026-08-24
permalink: /blog/2026/shared-information-world-ai-agents/
categories:
  - Agent
  - AI
  - Data Systems
lang: en
translation_url: /blog/2026/shared-information-world-ai-agents-zh/
translation_lang: zh
translation_label: 中文
description: "As AI agents become abundant, the bottleneck shifts from reasoning to coherent shared information. A systems view of multi-writer data integration, memory, and context infrastructure."
keywords: "AI agents, context infrastructure, shared information world, shared information state, semantic data integration, agent memory, multi-agent systems, knowledge organization"
seo_topics:
  - AI agents
  - Context infrastructure
  - Shared information state
  - Semantic data integration
  - Multi-agent systems
tags:
  - AI Agents
  - Context Infrastructure
  - Data Integration
  - Multi-Agent Systems
  - Knowledge Organization
key_points:
  - As intelligence becomes abundant, coherent shared information becomes a scarcer systems resource.
  - Multi-agent information organization is a continual, multi-writer semantic data integration problem.
  - The durable object should be a provenance-aware shared information state, not a pile of agent memories.
  - Context is a task-specific view over shared state rather than the state itself.
  - Context infrastructure is a practical systems entry point to this broader human-agent information problem.
---

An operating system is needed not because one program is difficult to run, but because many programs must share the same machine without corrupting one another. I think AI is approaching an analogous transition.

Today, much of the discussion around AI agents still asks how to make **one agent** reason better, search better, remember longer, or use tools more reliably. Those are important problems. But if models become much more capable and much cheaper—or eventually reach something like AGI—the scaling variable changes. We will not just have a better agent. We will have many autonomous readers and writers acting on the same information environment, alongside humans.

At that point, the hard systems problem is no longer only intelligence. It is **coherence**.

My long-term question is:

> **How do we organize and maintain the shared information world through which humans and AI agents understand, coordinate, and act?**

I increasingly think this is a data systems problem at its core. More specifically, it is a form of **continual, multi-writer semantic data integration**, with context construction as the read interface.

## 1. When intelligence becomes abundant, coherence becomes scarce

For a single agent over a mostly static corpus, the dominant question is often retrieval: can the agent find the right evidence, fit it into the context window, and reason over it?

A human-agent ecosystem changes the failure mode. Agent A summarizes a design discussion. Agent B turns that summary into a plan. A human later changes one constraint. Agent C reads an older document and takes an action. Agent D writes a retrospective that mixes observed facts with an inferred explanation. All of these artifacts may then become inputs to future agents.

The problem is no longer just whether information can be found. The problem is whether the information world itself still makes sense.

A sufficiently capable model can reason well over the wrong state. A large context window can contain many mutually inconsistent versions. Agentic search can retrieve a stale decision with great confidence. More agents can create more derived artifacts faster than humans can inspect them.

So the scarce resource shifts. Reasoning capacity may become abundant while **coherent, trustworthy, shared information state** becomes harder to maintain.

This is why I do not think “just give every agent a long context window” is a satisfying end state. A long window is a larger channel into the world. It does not make the world coherent.

## 2. This is data integration—but the writers are autonomous

Traditional data integration asks how to combine heterogeneous sources into a useful unified view: resolve entities, align schemas, clean values, track lineage, reconcile duplicates, and expose consistent query semantics.

The future human-agent setting inherits all of that, then makes one assumption much harder: the sources are no longer mostly passive.

Agents continuously create new information. They produce summaries, hypotheses, plans, decisions, code, tool results, memories, explanations, and derived views. Those outputs can immediately become inputs to other agents. Every read can create new writes.

That creates what I think of as **semantic write amplification**. One underlying event can produce many derived statements, each with a different scope and status. A meeting produces notes; an agent produces a summary; another agent extracts a decision; a workflow turns the decision into a task; a later retrospective explains why the task existed. If provenance is lost, these layers collapse into a pile of text that all looks equally factual.

The integration problem therefore has to represent more than “what value belongs to this entity?” It has to represent **what kind of claim this is, who or what produced it, when it was valid, what evidence supports it, who has authority over it, and what supersedes it**.

This also means there may not be one globally normalized truth. A plan can be valid for one team but not another. A user preference can be stable in one context and irrelevant in another. Two agents can hold competing hypotheses without either being a database error.

The goal is not to erase disagreement. The goal is to make disagreement, scope, authority, and time explicit enough that future readers can use them correctly.

## 3. Manage shared information state, not a pile of memories

The object I would like such a system to maintain is a **shared information state**.

It is broader than an agent memory store and more dynamic than a conventional knowledge base. It contains raw evidence and derived artifacts, but keeps enough structure to distinguish them. It supports both humans and agents as readers and writers. It can evolve without silently rewriting history.

```text
humans / agents / tools / databases / documents
                    ↓ reads + writes
             shared information state
        provenance · time · authority · versions
                 permissions · conflicts
                    ↓ task-specific view
              model context / human view
                    ↓
              action + feedback
                    ↺
```

I think four invariants matter especially.

- **Provenance.** Derived information should remain connected to the evidence and transformations that produced it.
- **Temporal semantics.** A system should know when a claim became valid, when it expired, and what superseded it.
- **Authority and permissions.** A model-generated summary, a tool observation, and an explicit human decision should not have identical write authority.
- **Reversible derivation.** Summaries, memories, canonical views, and other materialized state should be rebuildable or retractable when their inputs change.

This is not simply a knowledge graph, a database, version control, or a memory system. Each provides part of the abstraction. The missing piece is a substrate designed for **semantic state that is continuously interpreted, derived, contested, and rewritten by intelligent actors**.

The dangerous case is not just a hallucination in one answer. It is a hallucination that becomes durable state, gets retrieved as evidence, influences another agent, and is eventually mistaken for shared truth. Once model output becomes future input, information quality becomes a feedback-control problem.

## 4. Context is a view over shared state

This framing also changes how I think about context management.

Context should not be the database. It should be a **task-specific view** over the shared information state:

```text
shared state
  --(actor, task, time, permissions, evidence needs, budget)-->
context
```

Different agents should not necessarily see the same context. Neither should a human and an agent. The correct view depends on the task, role, authority, recency requirements, uncertainty tolerance, and attention budget.

This gives a cleaner interpretation of several areas that are often discussed separately.

**Data integration is the write and maintenance path.** It decides how new observations and derived claims enter the information world, how entities and versions are reconciled, and how stale or conflicting state is handled.

**Memory is durable or materialized state.** Some memories are close to source facts; others are compressed views, inferred preferences, or cached conclusions. Their lifecycle should depend on what kind of state they represent.

**RAG and agentic search are the read path.** They navigate the information world to collect evidence for the current task.

**Context management is view construction.** It turns that evidence into the bounded world an agent or human should perceive now.

Seen this way, a retrieval miss and a bad memory write are not separate product bugs. They are failures at different points in one information lifecycle.

This is also why better search alone is insufficient. Search can compensate for a messy information world, but it cannot fully repair missing provenance, ambiguous authority, silent supersession, or self-reinforcing derived state at read time.

## 5. A systems research agenda for human-agent ecosystems

If this framing is right, I see three layers of systems work.

First is an **integration and maintenance plane**: ingest observations and agent outputs, normalize entities, preserve provenance, detect conflicts, compact repeated state, and decide which writes deserve to become durable.

Second is a **shared-state substrate**: versioned, permissioned, provenance-aware storage for facts, claims, decisions, hypotheses, preferences, and derived views. It needs semantics for supersession and rollback, not only CRUD.

Third is a **context plane**: retrieval, navigation, query planning, compression, and view materialization under task-specific budgets. Feedback from task outcomes should improve both this read path and the state it reads from.

The most important design constraint is that these loops must not turn into automated self-contamination. A successful agent should be able to improve future information organization; an incorrect agent should not be able to promote its own mistake into the next generation of “ground truth.” That requires validation gates, provenance, authority, versioning, and evaluation that can trace failures back to information-state changes.

My current work on [**AutoIA**](/projects/1_autoia/) is a practical entry point into this agenda: improve the external information environment and the pipelines that construct task-specific context from it, using task-level feedback to close the loop. My earlier essay, [**The Next Generation of Context Management: Maintaining the Model's Perceivable World**](/blog/2026/next-gen-agent-en/), focuses on that single-agent-facing boundary.

The larger vision is what happens when that perceivable world is no longer maintained for one agent, but is **shared and continuously rewritten by humans and many agents together**.

I do not know what the final abstraction will be. It may not look like today's database, knowledge graph, memory system, or RAG stack. But I think the problem is becoming clearer:

**As intelligence becomes abundant, the infrastructure that organizes shared information may become as important as the infrastructure that provides intelligence itself.**

That is the information system I want to work toward.
