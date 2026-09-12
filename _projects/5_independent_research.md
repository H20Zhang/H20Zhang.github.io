---
layout: page
title: Independent Research
description: Research projects and academic collaborations across data systems and AI, presented separately from my company projects.
importance: 0
category: research
project_group: independent
explore_label: Explore research
related_publications: false
research_support:
  - area: Semantic query processing
    papers:
      - name: Sema
        venue: PVLDB 2026
        url: /publications/#VLDB-26-2
        summary: Introduces LLM-powered semantic operators in SQL with optimization and adaptive execution.
        role: Studies efficient query processing over structured data and semantic content as a separate academic collaboration.
  - area: Document retrieval
    papers:
      - name: DocNavRAG
        venue: arXiv 2026
        url: /publications/#Arxiv-26-4
        summary: Builds a document-structured graph and maintains an evolving evidence state for navigation over long documents.
        role: Studies how document structure and stateful retrieval support complex document question answering.
  - area: Hardware-efficient graph algorithms
    papers:
      - name: Tensorized k-TTC search
        venue: SIGMOD 2026
        url: /publications/#SIGMOD-26-1
        summary: Uses a tensor-based framework for index construction, online community search, and maintenance on heterogeneous GPUs.
        role: Studies portable acceleration of graph-search workloads as a separate academic collaboration.
---

My independent research and academic collaborations span **data systems and AI**. This is a collection of separate projects, not a single system or a research agenda limited to context management.

## Research directions

**Semantic query processing.** How can database systems combine relational operations with semantic reasoning while controlling execution cost? Sema explores first-class semantic operators, query optimization, and adaptive execution.

**Document retrieval.** How can agents navigate large document collections and accumulate the evidence needed for complex questions? DocNavRAG explores document-structured graphs and stateful evidence construction.

**Hardware-efficient graph algorithms.** How can irregular graph workloads make effective use of heterogeneous accelerators? Tensorized k-TTC search explores portable index construction, community search, and maintenance.

## Longer-term exploration

I also explore **shared context for multi-agent and human–agent collaboration**: how knowledge, memory, and work artifacts can be organized into shared, evolving information environments, while providing the right context for each participant and task. The goal is to let people and agents reuse prior work, carry decisions across tasks, and respond to changing information.

This is a longer-term research direction, rather than a claim that the projects above already implement a complete collaboration system.

- [When Intelligence Becomes Abundant: Organizing the Shared Information World of Humans and AI Agents](/blog/2026/shared-information-world-ai-agents/)
- [The Next Generation of Context Management](/blog/2026/next-gen-agent-en/)

The original publications retain their author affiliations. [Publications](/publications/) contains the complete research record; [Research & Systems](/projects/) separates these collaborations from my institutional system projects.
