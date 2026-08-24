---
layout: single
title: "当智能变得充裕：如何组织人类与 AI Agent 共享的信息世界"
seo_title: "人类与 AI Agent 的共享信息世界 | Hao Zhang"
date: 2026-08-24 08:20:00 +0800
last_modified_at: 2026-08-24
permalink: /blog/2026/shared-information-world-ai-agents-zh/
categories:
  - Agent
  - AI
  - Data Systems
lang: zh
translation_url: /blog/2026/shared-information-world-ai-agents/
translation_lang: en
translation_label: English
description: "当 AI Agent 大量出现后，瓶颈会从单个模型的推理能力转向共享信息的一致性。本文从多写者语义数据集成、共享信息状态与 Context Infrastructure 的角度讨论这个问题。"
keywords: "AI Agent, Context Infrastructure, 共享信息世界, 共享信息状态, 语义数据集成, Agent Memory, Multi-Agent, 知识组织"
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
  - 当智能变得充裕后，真正稀缺的系统资源可能转向一致、可信的共享信息。
  - 大规模 Agent 的信息组织，本质上是持续、多写者的语义数据集成问题。
  - 系统需要维护带 provenance 的共享信息状态，而不是堆积彼此孤立的 Agent Memory。
  - Context 应该被理解为共享信息状态面向特定任务的动态视图。
  - Context Infrastructure 是今天可以进入这一长期问题的系统切口。
---

操作系统之所以必要，不是因为运行一个程序有多难，而是因为很多程序需要共享同一台机器，同时又不能互相破坏。我觉得 AI 正在接近一个类似的转折点。

今天我们讨论 AI Agent，通常还是围绕**一个 Agent**：怎么让它推理更强、搜索更好、记忆更久、工具调用更稳定。这些问题都重要。但如果模型继续变强、变便宜，甚至最终达到类似 AGI 的能力，真正发生变化的不只是单个 Agent 的能力，而是系统里会出现越来越多能够自主读写信息、做决定和执行任务的智能体，并且它们还要和人一起工作。

到了那个阶段，最难的系统问题可能不再只是 intelligence，而是 **coherence**。

我长期真正想问的问题是：

> **我们如何组织和维护一个由人类与 AI Agent 共同理解、协作和行动的共享信息世界？**

我越来越觉得，这个问题的根仍然是 data systems。更准确地说，它像一个**持续、多写者的语义数据集成问题**，而 Context 则是这个共享状态面向每个任务的读取接口。

## 1. 当智能变得充裕，一致的信息反而会变稀缺

如果只有一个 Agent 面对一个相对静态的语料库，核心问题通常是 retrieval：能不能找到正确证据，把它放进 Context，再让模型基于这些信息完成推理。

但在人和大量 Agent 共存的系统里，失败模式会完全不同。

Agent A 总结了一次设计讨论；Agent B 根据这个总结生成计划；后来人修改了其中一个约束；Agent C 又从旧文档里读到了早先版本并执行了动作；Agent D 最后写复盘时，把观测到的事实和自己推断出来的原因混在了一起。这些内容之后还可能继续被别的 Agent 当作输入。

这时问题已经不只是“信息能不能被找到”，而是：**被搜索的那个信息世界本身，还是否保持一致和可解释。**

足够强的模型可以在错误的 state 上做出非常好的推理。超长 Context 可以同时装下很多互相冲突的版本。Agentic Search 可以非常努力地找到一个已经失效的决策。Agent 越多，系统产生 summary、plan、memory、derived view 的速度甚至可能远远超过人能检查它们的速度。

所以稀缺资源会发生变化：推理能力可能越来越充裕，而**一致、可信、可共享的信息状态**会越来越难维护。

这也是为什么我不认为“给每个 Agent 一个更长的 Context Window”会是终局。更长的窗口只是让模型看世界的信道更宽，它不会自动让这个世界变得更干净。

## 2. 这是 Data Integration，但写入者变成了自主智能体

传统 Data Integration 解决的是：如何把异构数据源整合成一个有用的统一视图。里面有 entity resolution、schema matching、data cleaning、lineage、deduplication，以及一致的 query semantics。

未来的人-Agent 系统继承这些问题，同时打破了一个过去常常成立的假设：**数据源大多是被动的。**

Agent 会持续制造新的信息。它们会写 summary、hypothesis、plan、decision、code、tool result、memory、explanation 和各种 derived view。更关键的是，这些输出会立刻变成别的 Agent 的输入。一次读取很可能马上引出更多写入。

这会产生一种我称为 **semantic write amplification** 的现象：一个底层事件会被不断转写成很多语义不同的派生内容。

例如一次会议产生原始记录；Agent 生成 summary；另一个 Agent 从中抽取 decision；workflow 把 decision 转成 task；之后的复盘又解释为什么当初产生这个 task。如果 provenance 丢了，最后系统里只剩下一堆看起来同样“像事实”的文本。

因此，未来的数据集成不能只回答“这个实体的值是什么”，而要回答：

**这是什么类型的 claim、由谁产生、什么时候有效、基于什么证据、谁有权修改它、以及后来什么信息取代了它。**

而且这里未必存在一个全局唯一的“真值”。一个计划可能只对某个团队有效；一个用户偏好在一个场景下稳定，在另一个场景下完全无关；两个 Agent 也可能同时持有两个竞争性 hypothesis，而这并不意味着数据库坏了。

系统的目标不是消除所有分歧，而是让**分歧、适用范围、authority 和时间语义**足够明确，使未来的读取者能够正确使用这些信息。

## 3. 系统应该维护 Shared Information State，而不是一堆 Memory

我觉得这种系统真正应该维护的对象，是一个 **shared information state**。

它比 Agent Memory 更广，也比传统 Knowledge Base 更动态。它既容纳原始证据，也容纳派生内容，但必须保留足够的结构去区分两者。人和 Agent 都可以读写它，它也必须能够持续演化，同时不把历史静默改写掉。

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

我认为这里至少有四个核心 invariant。

- **Provenance**：任何派生信息都应该能追溯到产生它的证据和变换过程。
- **Temporal semantics**：系统要知道一个 claim 什么时候开始有效、什么时候失效、后来被什么 supersede。
- **Authority 与 permission**：模型生成的 summary、工具观测结果和人明确做出的 decision，不应该拥有同样的写权限。
- **可逆的 derivation**：summary、memory、canonical view 等物化状态，在输入变化时应该能重建、回滚或撤销。

它不会简单等于 Knowledge Graph、Database、Version Control 或 Memory System 中的任何一个。它们各自提供了一部分能力，但缺少一个专门面对**由智能体持续解释、派生、争议和重写的语义状态**的统一抽象。

这里最危险的问题也不再是一轮回答里的 hallucination，而是 hallucination 被写成长期状态，之后又被当作 evidence 检索出来，影响另一个 Agent，最后逐渐变成“大家都认为是真的”。

一旦模型输出开始成为未来输入，信息质量就变成了一个 feedback-control problem。

## 4. Context 应该是 Shared State 上的一个 View

从这个角度看，我对 Context Management 的理解也会发生变化。

Context 不应该等于数据库本身。它应该是 shared information state 面向当前任务生成的一个 **task-specific view**：

```text
shared state
  --(actor, task, time, permissions, evidence needs, budget)-->
context
```

不同 Agent 不一定应该看到一样的 Context。人和 Agent 也不应该默认看到同样的信息。正确的视图取决于任务、角色、authority、时效要求、对不确定性的容忍度，以及 attention budget。

这样一来，很多现在被分散讨论的方向其实可以统一起来。

**Data Integration 是 write / maintenance path。** 它决定新观测和派生 claim 如何进入信息世界，entity 和 version 怎么对齐，冲突和 stale state 怎么处理。

**Memory 是 durable 或 materialized state。** 有些 memory 接近原始事实，有些其实是压缩后的 view、推断出的 preference 或缓存的 conclusion。不同类型的 memory 应该拥有不同生命周期。

**RAG 和 Agentic Search 是 read path。** 它们负责在信息世界中导航，为当前任务收集证据。

**Context Management 是 view construction。** 它把这些证据组织成当前这一轮里，人或 Agent 应该看到的有限世界。

这样看，一个 retrieval miss 和一个错误的 memory write 并不是两个无关的产品 bug，而是同一个 information lifecycle 上不同位置的 failure。

这也是为什么 search 再强也不够。Search 可以帮助我们从一个混乱世界里尽量找到正确内容，但它无法在读取时彻底修复缺失的 provenance、模糊的 authority、静默发生的 supersession，以及已经进入长期状态的自我强化错误。

## 5. 面向 Human-Agent Ecosystem 的系统研究议题

如果这个 framing 是对的，我觉得至少有三层系统问题值得做。

第一层是 **integration and maintenance plane**：接收人的输入、工具观测和 Agent 输出，做 entity normalization、provenance 保留、conflict detection、state compaction，并判断哪些写入值得成为长期状态。

第二层是 **shared-state substrate**：为 fact、claim、decision、hypothesis、preference 和 derived view 提供 versioned、permissioned、provenance-aware 的存储和语义。它需要理解 supersession 和 rollback，而不仅仅是 CRUD。

第三层是 **context plane**：做 retrieval、navigation、query planning、compression 和 view materialization，在每个任务的 budget 下构造正确 Context。任务结果产生的 feedback 又应该反过来改善 read path 和底层 state。

这里最重要的约束，是这些闭环不能变成自动化的 self-contamination。成功的 Agent 应该能够改善未来的信息组织，但失败的 Agent 不能轻易把自己的错误升级成下一轮的“ground truth”。这要求 validation gate、provenance、authority、versioning，以及能够把 failure 追溯到具体信息状态变化的 eval。

我现在做的 [**AutoIA**](/projects/1_autoia/) 可以看作进入这个长期问题的一个现实切口：一边改善 Agent 的 external information environment，一边改善从这个环境构造 task-specific context 的 pipeline，并用任务级反馈把两者连成闭环。之前的文章 [**《Context Management 的下一代：维护模型可感知的世界》**](/blog/2026/next-gen-agent-zh/) 主要讨论的是面向单个 Agent 的这一层边界。

更大的问题是：当这个“可感知的世界”不再只服务一个 Agent，而是**由人和大量 Agent 共同读写、持续改写**时，系统应该长成什么样。

我现在还不知道最终的 abstraction 会是什么。它大概率不会简单等于今天的 Database、Knowledge Graph、Memory System 或 RAG Stack。

但我越来越确定问题本身：

**当智能变得充裕以后，组织共享信息的基础设施，可能会变得和提供智能本身的基础设施一样重要。**

这是我长期想做的信息系统。
