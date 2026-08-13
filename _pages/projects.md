---
layout: page
title: Systems
permalink: /projects/
description: Selected systems spanning context infrastructure for agents, production graph systems, and earlier database/graph research.
nav: true
nav_order: 2
---

A selective systems portfolio: **AutoIA @ ByteDance** develops context infrastructure for agents, **GES @ Huawei Cloud** demonstrates production-scale graph-system impact, and **Database & Graph Research Systems @ CUHK** capture the systems foundation behind this trajectory.

<div class="row row-cols-1 row-cols-md-2">
  <div class="col mb-4">
    <div class="card h-100 hoverable">
      <div class="card-body">
        <h3 class="card-title"><a href="/projects/1_autoia/">AutoIA @ ByteDance</a></h3>
        <p class="card-text">Context infrastructure for agents, connecting retrieval and runtime execution with observability, evaluation, and continuous improvement.</p>
        <hr>
        <p class="small"><strong>Knowledge organization</strong>: <a href="https://arxiv.org/abs/2608.01565">DocNavRAG</a> — stateful evidence construction through navigable document structure.</p>
        <p class="small"><strong>Agent memory</strong>: <a href="https://arxiv.org/abs/2607.29440">AdaMM</a> — query-adaptive memory through analytic views over multimodal histories.</p>
        <p class="small"><strong>Semantic query layer</strong>: <a href="/publications/#VLDB-26-2">Sema</a> — first-class semantic operators and adaptive execution; <a href="/publications/#COLM-26">CoreSemDB</a> — hybrid semantic-relational workloads for evaluating this layer.</p>
      </div>
    </div>
  </div>

  <div class="col mb-4">
    <div class="card h-100 hoverable">
      <div class="card-body">
        <h3 class="card-title"><a href="/projects/3_ges/">GES @ Huawei Cloud</a></h3>
        <p class="card-text">Production graph database service for high-throughput interactive graph workloads.</p>
        <hr>
        <p class="small"><strong>Service architecture &amp; execution</strong>: <a href="/publications/#SIGMOD-25-1">GES</a> — composable service architecture and factorized execution.</p>
        <p class="small"><strong>Dynamic storage</strong>: <a href="/publications/#VLDB-25">RapidStore</a> — scalable concurrent dynamic graph storage; <a href="/publications/#SIGMOD-25-3">DGS Study</a> — storage and concurrency bottlenecks shaping this design space.</p>
        <p class="small"><strong>Incremental graph queries</strong>: <a href="/publications/#VLDB-26">Aquila</a> — high-concurrency incremental graph query processing.</p>
      </div>
    </div>
  </div>

  <div class="col mb-4">
    <div class="card h-100 hoverable">
      <div class="card-body">
        <h3 class="card-title"><a href="/projects/4_database_graph_systems/">Database &amp; Graph Research Systems @ CUHK</a></h3>
        <p class="card-text">Earlier research systems spanning distributed SQL execution, graph analytics, and compressed subgraph processing.</p>
        <hr>
        <p class="small"><strong>Distributed query execution</strong>: <a href="/publications/#SIGMOD-22-1">Secco</a> — separates communication from local computation.</p>
        <p class="small"><strong>Distributed graph analytics</strong>: <a href="/publications/#VLDB-20">DISC</a> — maps local subgraph counting to relational execution.</p>
        <p class="small"><strong>Compressed graph processing</strong>: <a href="/publications/#VLDB-18">Crystal</a> — avoids materializing large intermediate and output sets.</p>
      </div>
    </div>
  </div>
</div>
