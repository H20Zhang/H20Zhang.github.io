---
layout: single
title: "Context Management 的下一代：维护模型可感知的世界"
date: 2026-05-21 10:00:00 +0000
categories:
  - Agent
  - AI
  - Context Management
lang: zh
translation_url: /blog/2026/next-gen-agent-en/
translation_label: English
tags:
  - Context Management
  - Agent
  - RAG
  - Memory
  - Information Architecture
description: "下一代 Context Management 不只是把信息放进窗口，而是持续维护模型可感知的信息环境。"
key_points:
  - Context 不是输入，而是模型这一轮的现实。
  - Agentic Search 让系统更会找，但还不能修复一个本身不可搜索的世界。
  - 文档、索引、metadata 和外置 Memory 才是未来 context 直接依赖的信息环境。
  - Skill、Eval、Trace 是维护这套环境的控制资产和信号系统。
  - 失败 case、正确 case 和 benchmark 都应该反向更新信息结构。
---

Context Management 最早被理解成一个窗口管理问题：怎么塞更多 token，怎么摘要历史对话，怎么把 RAG 结果放进 context，怎么让长上下文不丢关键信息。

这些问题都重要，但它们只覆盖了第一层：**如何把信息放进窗口。** 下一代 Context Management 要处理的是更底层的问题：**如何维护一个能被模型正确感知、持续使用、并在使用中不断变好的信息环境。**

模型本身不接触外部世界。它只接触 context。因此，context 不是普通输入，而是模型这一轮的现实。模型在这一轮里相信什么、忽略什么、能调用什么、会沿着什么证据推理，都取决于 context 为它构造了一个怎样的世界。

如果这个世界是旧的、脏的、冲突的、没有来源的，模型越强，反而越可能错得更有说服力。

## 1. 长上下文不会自动解决 context 问题

长上下文扩大了窗口，但没有自动提高信号质量。窗口变长之后，能进入 context 的不只是有用信息，也包括更多噪声、旧证据、重复内容、冲突版本，以及模型自己之前生成的错误。

128K 的脏 context，不一定比 8K 的干净 context 更好。Context window 更像信道，不是仓库。真正重要的不是塞了多少 token，而是进入窗口的信息是否足够相关、足够新、足够可信、足够结构化。

因此，Context Management 的目标不应该是最大化填充率，而应该是最大化当前任务所需世界状态的表达质量。关键问题不是“还能塞什么”，而是：

- 当前任务需要模型看见什么？
- 哪些信息已经过时？
- 哪些来源可信？
- 哪些冲突必须显式暴露？
- 哪些内容根本不应该进入这一轮现实？

## 2. Agentic Search 解决的是“怎么找”

第一代 RAG 是开环的：

```text
query → retrieve → top-k → stuff into context
```

Agentic Search 往前走了一步。它会发现信息缺口，构造 query，检索，评估结果，改写 query，换源，找反证，再决定是否注入 context。这很重要，因为它让系统更会“找”。

但它仍然主要解决的是：**如何在已有信息环境里看得更好。** 如果信息环境本身不适合被搜索，Agentic Search 也会遇到上限。

### 被搜索的世界可能本身有问题

几个常见例子：

- 文档没有时间戳，系统很难判断新旧。
- 实体没有归一，query 改写也可能漏掉别名。
- summary 没有 provenance，模型可能把上一次生成的总结当成外部事实。
- 旧文档没有 deprecated，新旧证据会在 context 里同权竞争。
- 事实、猜测、计划、复盘混在同一个文档里，retriever 很难区分信号和噪声。

所以，下一步不是只让系统更会搜索，而是让被搜索的世界更值得被搜索。

## 3. Context 背后真正需要维护的是什么

Context 背后的信息环境可以分成三类：外部知识源、检索与组织结构、外置 Memory。它们才是未来 context 直接依赖的对象。

### 外部知识源

外部知识源包括文档、网页、数据库、知识库、代码仓库、产品文档、API 文档、业务规则和人工整理的说明。这些是 Agent 要感知的外部世界。

它们需要版本、时间戳、deprecated 标记、来源、可信度、结构化边界和 canonical source。没有这些基础治理，检索再强也只是从混乱信息里找相对不坏的片段。

### 检索与组织结构

检索与组织结构包括 chunk、index、metadata、entity resolver、alias table、temporal index、source trust、canonical summary 和 materialized view。

这些不是知识本身，而是让知识更容易被正确找到、正确排序、正确压缩、正确进入 context 的结构。很多 RAG 问题，本质上不是 query 问题，也不是 embedding 问题，而是这层结构没有维护好。

### 外置 Memory

外置 Memory 包括用户偏好、项目状态、历史结论、长期约束和会话外状态。Memory 是模型外部的长期状态层，会被召回进 context，并直接影响模型对当前任务的判断。

Memory 最大的风险不是召回不到，而是写错了、过期了、冲突了，还继续以“长期事实”的身份进入 context。因此，Memory 需要写入门槛、provenance、时间戳、置信度、冲突检测、版本和遗忘机制。

## 4. Skill、Eval、Trace 的位置

Skill、Eval、Trace 很重要，但它们和文档、索引、Memory 不是同一类东西。文档、索引、metadata、Memory、canonical view，是未来 context 直接依赖的信息环境；Skill、Eval、Trace，更像维护这个环境的控制资产和信号系统。

### Skill：行动侧控制资产

Skill 沉淀的是稳定成功的任务流程：什么时候触发，context 怎么组装，工具怎么调用，输出怎么验证，失败怎么 fallback。它会影响 context，但它不是被搜索的外部世界本身。

### Eval / Benchmark：测量系统

Eval 和 benchmark 不只是判断最终答案对不对，更应该定位问题出在 search、memory、evidence、citation、context budget，还是文档结构。它们的价值是告诉系统该维护哪里。

### Trace：维护信号

Trace 记录本轮 context 是怎么来的，哪些信息被选中，哪些被丢弃，哪里发生冲突，最终错误和哪段信息有关。Trace 本身不是目标环境，但它是环境维护的证据来源。

更清晰的分法是：

```text
被维护的对象：docs / index / metadata / memory / canonical views
维护的控制面：skill / eval / benchmark / trace / validation
```

下一代 Context Management 的核心，是用这些控制面持续维护未来 context 所依赖的信息环境。

## 5. 维护发生在使用前、使用中、使用后

环境维护不是单一动作，而是贯穿 Agent 的整个生命周期。

### 使用前维护：让环境更容易被感知

在 Agent 真正被调用之前，就应该把信息环境整理到一个更适合被感知的状态：

- 文档有版本，旧结论能失效。
- 实体有 alias，summary 有 provenance。
- 索引和 chunk 适合任务。
- 高频问题有 canonical view。
- 外置 memory 有时间戳和置信度。
- 低可信信息不会和权威证据同权竞争。

这一步类似数据库里的 schema design、index design、statistics refresh、materialized view 和 data cleaning。没有这一步，每次 runtime search 都是在临场救火。

### 使用中维护：把交互变成维护信号

交互过程中，用户纠错、工具失败、检索缺失、memory 冲突、validator 报错，都不应该只是本轮事件。它们应该变成维护信号。

例如，用户纠正事实，可能意味着 canonical doc 或 memory 需要更新；用户指出引用错误，可能意味着 provenance 或 source trust 有问题；检索漏掉关键实体，可能意味着 alias table 或 entity resolver 缺失；某条 memory 误导当前任务，可能意味着它需要降权、确认或删除。

### 使用后维护：让系统积累复利

一批任务结束后，可以基于失败 case、正确 case 和 benchmark 做系统性维护：清理过时文档，重建 index，调整 chunking，维护 source trust，更新 canonical summary，清理 memory，把失败 trace 转成 eval case，把成功路径转成 workflow 或 skill，根据 benchmark 定位系统性短板。

使用前维护让系统少踩坑，使用中维护让系统及时纠偏，使用后维护让系统积累复利。

## 6. 失败 case、正确 case 和 benchmark 都是维护信号

很多系统只在失败时更新。这不够。失败 case 告诉系统哪里坏了，正确 case 告诉系统什么值得固化，benchmark 告诉系统性短板在哪里。三者应该共同驱动信息环境维护。

### 失败 case：暴露结构缺陷

如果模型答错，是因为检索结果过时，那问题不只是本轮 context 坏了，而是外部文档需要 deprecated 机制。如果模型召回了错误 memory，那问题不只是本轮召回坏了，而是 Memory 需要冲突检测和过期机制。如果模型引用了没有来源的 summary，那问题不只是 citation 缺失，而是 derived artifact 需要 provenance。

失败 case 的价值，是暴露信息环境里的缺口、污染和结构缺陷。

### 正确 case：沉淀可复用结构

正确 case 同样重要。如果某类任务在某种 context 组织方式下稳定成功，这不是应该被丢掉的临时经验，而应该被沉淀：

- 成功的 query pattern 可以变成 query template。
- 稳定有效的 evidence set 可以变成 canonical view。
- 高频任务的上下文结构可以被物化。
- 成功的 tool sequence 可以变成 skill。
- 高质量人工回答可以变成 eval reference。

### Benchmark：定位系统性短板

Benchmark 的价值，是把 Context Management 变成可测量的系统问题。一个好的 benchmark 不只是测最终答案对不对，还应该拆开看：Search 有没有找到关键证据，Memory 有没有召回正确长期状态，Context 有没有暴露冲突，是否引用了过时信息，是否把低可信 summary 当成事实，context budget 是否被噪声浪费，失败是否能归因到具体信息结构。

Benchmark 不是为了刷分，而是为了告诉系统该维护哪里。

成熟循环应该是：

```text
真实交互 + 失败 case + 正确 case + benchmark
→ 归因 context failure / success pattern
→ 更新 docs / metadata / index / memory / canonical view / trust
→ 必要时更新 skill / eval / validation
→ 重新运行 benchmark
→ 发布新的信息环境版本
```

经历错误不等于学习，重复成功也不等于能力。只有失败和成功都改变了未来的信息结构，系统才真的在变强。

## 7. 几个典型例子

| 现象 | 普通修复 | 结构维护 |
|---|---|---|
| 检索到了旧文档 | 下次加 recency bias | 补时间戳，标 deprecated，建立 temporal index |
| 同一实体有多个名字 | query expansion | 维护 alias table 和 entity resolver |
| Summary 被当成事实 | 提醒模型注意引用 | 所有 derived summary 必须带 provenance；无来源 summary 默认低信任 |
| Memory 误导当前任务 | 提示模型以当前任务为准 | memory 加时间衰减、冲突检测、用户确认和版本 |
| 重复任务不稳定 | 写更长 prompt | 如果是信息缺口，补文档和 canonical view；如果是行动流程不稳定，再沉淀 Skill |
| 用户反复纠错 | 把反馈记进日志 | 把纠错转成 documentation patch、memory update、retrieval test 或 eval case |

失败不只是触发 retry，成功也不只是返回结果。它们都应该成为维护信号。

## 8. Context Manager 会变成信息环境的控制面

如果这个判断成立，context manager 就不是 prompt assembler，也不只是 RAG orchestrator。它会变成 Agent 的 information control plane。

它至少要做几件事：

```text
Sensing：获取外部证据
Selection：预算约束下选择信息
Structuring：标注来源、时间、信任、冲突
State：控制 memory / belief 的读取和写入
Validation：判断 context 是否足够可信和完整
Maintenance：把失败和成功都转成环境更新
```

第一代 context manager 主要做 Selection。下一代 context manager 要做完整闭环：既要构造当前世界，也要维护未来世界；既要回答“这轮放什么”，也要回答“为什么每次都缺这个”；既要知道“这次为什么失败”，也要知道“这次为什么成功，能不能固化”。

## 9. 最大风险：把错误维护进环境

环境维护是能力，也是风险。最危险的不是当前 context 不完美，而是错误进入未来 context 的生成环境。

典型路径是：

```text
模型生成错误
→ 写入 summary / memory / knowledge base / canonical doc
→ 下一轮被检索或召回
→ 进入 context
→ 被模型当成外部事实
→ 错误被强化
```

这就是信息正反馈。一次 hallucination 只是输出污染，错误 memory 是状态污染，错误 summary 是知识污染，错误 canonical doc 是环境污染。如果错误进一步进入 eval reference，那就是目标污染。目标污染最严重，因为系统会开始奖励错误。

因此，下一代 Context Management 必须内置信息免疫系统：

- provenance：每段信息知道来源；
- trust tier：raw evidence、tool output、human note、model summary、hypothesis 不能同权；
- validation gate：写入长期结构前必须验证；
- versioning：summary、memory、index、canonical view、eval 都能回滚；
- TTL / decay：长期状态会自然失效；
- conflict detection：冲突不能静默共存；
- write permission：模型生成内容不能默认成为未来事实。

没有这些机制，environment maintenance 会变成自污染自动化。

## 10. 结论

Context Management 的下一代，不是更长窗口，也不是更复杂的 RAG pipeline。Agentic Search 已经让系统更会“找”。下一步是让系统更会“维护被找的世界”。

真正的问题是：**系统能不能维护一个干净、可追溯、可更新、可失效、可被正确搜索的信息环境；并在每次调用时，从这个环境中构造出足够好的运行时世界。**

这件事包括两部分。第一，构造当前 context：从文档、检索结果、memory、工具返回和用户输入中，选择足够可信、足够新、足够相关的信息，组织成模型这一轮能使用的世界。第二，维护未来 context 的来源：让文档有版本，让 summary 有 provenance，让 memory 会过期，让索引能更新，让实体能归一，让错误不会被写成未来事实。

Skill 和 Eval 很重要，但它们不是外部信息环境本身。Skill 是行动经验的控制资产，Eval / Benchmark 是测量和维护的控制资产。它们的价值在于帮助系统发现：哪些信息结构应该被修复，哪些成功路径应该被固化，哪些错误不应该再次进入 context。

Context 不是模型的输入。Context 是模型的世界。而下一代 Context Management，不只是实时构造这个世界，更是持续维护这个世界，并让它在使用前、使用中、使用后都变得更适合被模型正确感知。
