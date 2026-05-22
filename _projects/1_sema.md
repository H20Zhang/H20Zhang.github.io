---
layout: page
title: SEMA
description: Semantic query engine for multimodal ETL, semantic ad-hoc querying, and unified analytics.
importance: 1
category: systems
related_publications: false
---

SEMA is a multimodal semantic data system for querying and transforming heterogeneous data with LLM-powered semantic operators.

## Problem

AI data pipelines need to process text, tables, images, video, and semi-structured records in one workflow. Traditional query engines are strong at relational operators, but they do not expose semantic interpretation as an optimizable first-class database operator.

## Core idea

SEMA embeds LLM semantic operators into database query plans. Through **SemaSQL**, users express semantic querying and ETL in a SQL-like form; the engine then optimizes execution with operator reordering, semantic fusion, prompt batching, and adaptive execution.

## My role

System design and architecture for the semantic query-engine direction, including semantic operator abstraction, query-plan integration, and execution optimization around token cost and latency.

## Evidence

- [ArXiv paper](/publications/#Arxiv-26)
- First-class LLM semantic operators inside DuckDB-style query plans.
- Adaptive execution techniques including operator reordering, semantic fusion, and prompt batching.

## Impact

SEMA shows that semantic ETL and ad-hoc semantic querying can be managed inside a query engine. Reported semantic-query speedups are **2–10×**, while preserving a database-style interface for heterogeneous AI data processing.
