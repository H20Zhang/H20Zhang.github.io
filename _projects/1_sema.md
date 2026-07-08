---
layout: page
title: SEMA
description: Semantic query engine for multimodal ETL, semantic ad-hoc querying, and unified analytics.
importance: 1
category: systems
related_publications: false
---

SEMA is a multimodal semantic data system for querying and transforming heterogeneous data with LLM-powered semantic operators. Together with CoreSemDB, this line studies both the **system** and **benchmark** sides of semantic-relational query processing over text-rich databases.

## Problem

AI data pipelines need to process text, tables, images, video, and semi-structured records in one workflow. Traditional query engines are strong at relational operators, but they do not expose semantic interpretation as an optimizable first-class database operator. A separate challenge is evaluation: semantic-relational workloads need benchmarks that test both structured query semantics and text-grounded interpretation.

## Core idea

SEMA embeds LLM semantic operators into database query plans. Through **SemaSQL**, users express semantic querying and ETL in a SQL-like form; the engine then optimizes execution with operator reordering, semantic fusion, prompt batching, and adaptive execution. CoreSemDB complements this direction by benchmarking hybrid semantic-relational query processing over databases with rich textual content.

## My role

System design and architecture for the semantic query-engine direction, including semantic operator abstraction, query-plan integration, and execution optimization around token cost and latency.

## Evidence

- [Sema, PVLDB 2026, to appear](/publications/#VLDB-26-2)
- [CoreSemDB, COLM 2026, to appear](/publications/)
- First-class LLM semantic operators inside DuckDB-style query plans.
- Adaptive execution techniques including operator reordering, semantic fusion, and prompt batching.

## Impact

SEMA shows that semantic ETL and ad-hoc semantic querying can be managed inside a query engine. CoreSemDB adds an evaluation layer for comparing hybrid semantic-relational query processing over text-rich databases. Reported semantic-query speedups for SEMA are **2–10×**, while preserving a database-style interface for heterogeneous AI data processing.
