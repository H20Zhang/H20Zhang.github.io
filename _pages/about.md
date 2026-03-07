---
permalink: /
title: "Hao Zhang"
description: "Research scientist working on Data+AI systems, databases, vector search, and graph/tensor data systems."
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

I am a Research Scientist at ByteDance focused on **Data+AI systems**. I received my Ph.D. from the Department of Systems Engineering and Engineering Management at The Chinese University of Hong Kong (advisor: Prof. Jeffrey Xu Yu) in 2022, and my B.S. in Computer Science from Wuhan University in 2017.

I work at the intersection of **databases, AI systems, vector/search infrastructure, and analytics engines** for structured and unstructured data.

**Quick links:** [Publications](/publications/) · [Systems](/systems/) · [CV](/cv/) · [Google Scholar](https://scholar.google.com/citations?user=PLwImrcAAAAJ&hl=en) · [LinkedIn](https://www.linkedin.com/in/hao-zhang-ab18b413b/)

## Research Themes

### Data+AI Infrastructure
Building practical query and analytics systems that combine database principles with modern AI workloads.

### Vector, Graph, and Tensor Data Systems
Designing system architectures for mixed data modalities and high-performance analytical workloads.

### Distributed Query Processing
Developing scalable methods for joins, counting, and graph analytics in distributed environments.

## Selected Systems and Projects

1. **SEMA (Semantic Query Engine)** (2024–present)  
   A multimodal data system for semantic ETL, semantic querying, and analytics across text, image, video, and structured data. [Details](/systems/sema/)
2. **TDB (Tensor-Centric DB)** (2022–present)  
   A GPU/NPU-oriented data engine design for SQL and graph workloads over tensor runtimes. [Details](/systems/tdb/)
3. **DISC** (research system)  
   A distributed system for general subgraph counting built on relational operations and Spark. [Paper](/publication/VLDB-20)

## Selected Papers

{% assign selected_papers = site.publications | where: "selected", true | sort: "date" | reverse %}
{% for paper in selected_papers limit:4 %}
- **{{ paper.title }}** ({{ paper.venue }}, {{ paper.date | date: "%Y" }})  
  {{ paper.excerpt }}  
  [Read paper]({{ paper.paperurl }})
{% endfor %}

## Recent News

- **2025-12:** Ranked #1 in the LDBC SNB Interactive Imperative leaderboard (Huawei team period).
- **2025-09:** Ranked #1 in the LDBC SNB Interactive Declarative leaderboard.
- **2025:** Joined ByteDance as Research Scientist.

## Collaboration and Internship

I welcome research collaboration on Data+AI systems, database systems, and graph/vector analytics infrastructure.

For internship opportunities (Shenzhen, Beijing, Shanghai), please email: `zhanghao.ai [at] bytedance [dot] com`.
