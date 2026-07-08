---
layout: page
title: CoreSemDB
description: Benchmark for hybrid semantic-relational query processing over text-rich databases.
importance: 2
category: benchmarks
related_publications: false
---

CoreSemDB is a benchmark for evaluating hybrid semantic-relational query processing over databases with rich textual content.

## Problem

Text-rich databases require queries that combine relational predicates with semantic interpretation over long-form or semi-structured text. Existing database benchmarks are strong at structured query processing, but they do not directly test whether systems can jointly handle symbolic constraints, text-grounded semantics, and query-level evaluation.

## Core idea

CoreSemDB turns semantic-relational query processing into a benchmarkable workload. It targets the same broad problem space as SEMA, but from the evaluation side: instead of proposing an execution engine, it defines workloads for comparing systems that combine relational query processing with semantic reasoning over text.

## My role

Benchmark framing and research positioning for semantic-relational query processing over text-rich databases.

## Evidence

- [CoreSemDB, COLM 2026](/publications/)
- Focuses on hybrid semantic-relational query processing.
- Targets databases whose records contain substantial textual content.

## Impact

CoreSemDB complements system work such as SEMA by providing an evaluation substrate for semantic-relational database workloads. The benchmark helps separate system capability from prompt engineering or ad-hoc task construction.
