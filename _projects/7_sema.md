---
layout: page
title: SEMA
permalink: /projects/sema/
description: High-performance semantic query engine built on DuckDB that treats LLM-powered semantic operators as first-class citizens in SQL.
importance: 2
category: systems
project_group: independent
related_publications: false
highlights:
  - label: End-to-End Speedup
    value: 2–10× faster across 26 semantic queries
  - label: Core Stack
    value: SemaSQL + LLM-assisted optimizer + Adaptive Query Execution
  - label: Venue & Role
    value: PVLDB 2026 · Project Lead
figure:
  path: /assets/img/publication_preview/sema.webp
  alt: A SemaSQL query flows through SEMA's parser and planner, an LLM-assisted optimizer that reduces redundancy and deduces predicates, and an adaptive executor that fuses semantic filters.
  caption: "SEMA end-to-end query compilation and execution pipeline: SemaSQL parsing, LLM-assisted logical optimization, and runtime adaptive operator fusion (PVLDB 2026)."
research_support:
  - area: Semantic query engine
    papers:
      - name: SEMA
        venue: PVLDB 2026
        url: /publications/#VLDB-26-2
        summary: Introduces SemaSQL, logical semantic optimization, and runtime adaptive execution to make LLM-powered semantic operators first-class citizens inside DuckDB.
        role: Defines the query language, logical optimizer rules, and adaptive execution engine.
  - area: Hybrid semantic-relational benchmarking
    papers:
      - name: CoreSemDB
        venue: COLM 2026
        url: /publications/#COLM-26
        summary: Benchmarks hybrid semantic-relational query processing over text-rich relational databases across diverse operator combinations.
        role: Evaluates the broader design space of hybrid semantic-relational queries over text-rich tables.
---

**SEMA** is a high-performance semantic query engine built on **DuckDB** that brings LLM reasoning directly into relational query processing, allowing SQL queries to filter, join, aggregate, and extract insights across structured columns and natural-language text together.

## Problem

Integrating LLMs into data analytics faces a sharp systems gap:
- **DataFrame scripts** lack the relational query optimizer, storage engine, and pipeline parallelism of modern analytical DBMSs.
- **SQL UDF wrappers** treat LLM calls as opaque black boxes, hiding semantic logic from the optimizer while conventional cost models fail to capture token cost, latency, and LLM non-determinism.

## Core idea

SEMA makes semantic operators **first-class citizens** across parsing, logical optimization, and physical execution:

- **Declarative `SemaSQL` dialect:** Lets users embed natural-language predicates and semantic expressions directly inside standard SQL clauses (`WHERE`, `SELECT`, `JOIN`, `GROUP BY`) without manual prompt plumbing.
- **LLM-assisted logical optimization:** Compresses redundant natural-language expressions and deduces cheap relational filter constraints (such as non-null or domain predicates) to prune rows before invoking LLMs.
- **Adaptive Query Execution (AQE):** Uses runtime statistics during execution to dynamically reorder predicates, fuse compatible semantic operators into single prompts, and batch requests—seeking a Pareto-efficient balance among latency, token cost, and accuracy.

## My role

**Project lead** of SEMA, initiating the research problem and leading the overall system architecture, `SemaSQL` language formulation, LLM-assisted logical optimization, and runtime adaptive execution design.

## Impact

Across 26 semantic queries spanning classification, summarization, text extraction, and ranking workloads, SEMA achieves **2–10× end-to-end speedups** over three evaluated baseline systems while maintaining competitive result quality.

## Evidence

- [Sema: A High-Performance System for LLM-Based Semantic Query Processing (PVLDB 2026)](https://doi.org/10.14778/3836663.3836685)
- [CoreSemDB: Benchmarking Hybrid Semantic-Relational Query Processing over Text-Rich Databases (COLM 2026)](/publications/#COLM-26)

## System boundary

SEMA and CoreSemDB are independent academic research collaborations and are presented separately from ByteDance's AutoIA system.
