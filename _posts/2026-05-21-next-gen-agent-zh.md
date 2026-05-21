---
layout: single
title: "下一代 Agent：从调用工具到治理自己的可感知世界"
date: 2026-05-21 10:00:00 +0000
categories:
  - Agent
  - AI
lang: zh
tags:
  - Agent
  - Information Architecture
  - Governance
  - Memory
  - Search
---

tldr：下一代 Agent 的核心，不是更会调用工具，也不是更会写 prompt，而是能和自己的外部信息环境共同演化。

模型越强，越不能只盯着模型。

真正决定 Agent 上限的，是它所处的世界：它能看见什么，记住什么，相信什么，行动依赖什么，失败之后改造什么。

外部信息不是资料库。

外部信息是 Agent 的世界。

更准确地说，是它的可感知世界。

---

## 1. 现在的 Agent 叙事太窄了

现在大家讲 Agent，通常是这个公式：

LLM + Tool + Memory + RAG + Planner

这个公式没错。

但它把最重要的东西说轻了。

它让人以为 Agent 的主体是 LLM，其他东西只是外挂。

Tool 是外挂。

RAG 是外挂。

Memory 是外挂。

Skill 是外挂。

Eval 是外挂。

这会导致一个错误的工程直觉：只要模型够强，再给它接上足够多的工具和知识库，Agent 就会自然变强。

现实不是这样。

生产里的 Agent 不是生活在模型内部。

它生活在一个外部信息环境里。

这个环境决定它的感知、记忆、行动和学习。

如果这个环境是脏的，Agent 会被污染。

如果这个环境是乱的，Agent 会迷路。

如果这个环境不可追溯，Agent 会把猜测当事实。

如果这个环境不会更新，Agent 会反复犯同样的错。

所以，下一代 Agent 的问题不是：

怎么让模型更像一个独立智能体？

而是：

怎么构造一个能让智能稳定发生的外部信息环境？

---

## 2. 外部信息到底是什么

对一个 Agent 来说，外部信息不是“上下文材料”。

它至少扮演四个角色。

**第一，它是感知对象**

Search 不是 RAG 插件。

Search 是 Agent 的眼睛。

模型本身不知道外部世界发生了什么。它看到的世界，是 Search 帮它找来的世界。

如果搜索只会返回 top-k 文档，Agent 的眼睛就是近视的。

如果搜索知道 source、freshness、provenance、conflict、coverage，Agent 才开始有真正的感知。

**第二，它是长期状态**

Memory 不是聊天记录。

Memory 是 Agent 对用户、项目、任务和环境的长期状态估计。

它决定 Agent 认为“现在是什么情况”。

一条错误 memory，不是一次错误。

它是未来很多次错误的种子。

**第三，它是行动空间**

Tool schema、API docs、workflow、Skill registry，不只是说明书。

它们定义了 Agent 能做什么、不能做什么、应该怎么做。

对 Agent 来说，工具不是外部函数。

工具是世界里的 affordance。

Skill 不是 prompt 模板。

Skill 是行动习惯。

**第四，它是学习材料**

Trace、Eval、失败日志、用户反馈，不只是 observability。

它们是 Agent 未来能不能变好的原料。

没有 trace，失败只是失败。

有 trace，失败才可能变成结构更新。

所以外部信息不是输入。

外部信息是 Agent 的感知世界、状态世界、行动世界和学习世界。

这四个世界合在一起，才是 Agent 真正的外部信息架构。

---

## 3. 下一代 Agent，不是更自治，而是更会维护世界

很多人谈下一代 Agent，会自然想到更强 autonomy。

更长任务。

更多工具。

更少人工干预。

更复杂 planning。

但 autonomy 如果没有信息治理，只是更快地把错误放大。

一个不会区分事实和猜测的 Agent，越自治越危险。

一个不会清理 memory 的 Agent，越长期越混乱。

一个不会验证 source 的 Agent，越会搜索越容易被噪声带偏。

一个不会把失败转成结构更新的 Agent，跑一万次也不会真正变聪明。

所以，下一代 Agent 的关键能力不是“更自主”。

而是：能维护自己的可感知世界。

它不只是从知识库里找答案。

它会整理知识库。

它不只是召回 memory。

它会清理 memory。

它不只是调用 Skill。

它会沉淀 Skill。

它不只是记录 trace。

它会把 trace 变成 eval、规则、索引和文档更新。

它不只是适应环境。

它会改造环境，让未来的自己更容易做对。

---

## 4. Agent 和外部信息架构应该共同演化

真正的闭环应该是这样：

执行任务 → 搜索外部信息 → 组装 context → 行动 → 产生 trace → eval 发现偏差 → 归因失败 → 更新 memory / skill / index / metadata / docs / eval → 未来任务受益

这个闭环里，模型只是其中一个节点。

更重要的是信息环境的更新。

搜索失败，不一定该改 query

也许该改 chunk。

也许该补 metadata。

也许该建 entity resolver。

也许该加 temporal index。

也许该生成 canonical summary。

也许该把旧文档标成 deprecated。

回答不稳定，不一定该改 prompt

也许该沉淀 Skill。

也许该固定 tool sequence。

也许该增加 validator。

也许该把成功路径变成 workflow。

记忆误导，不一定该提醒模型

也许该给 memory 加时间衰减。

也许该做冲突检测。

也许该要求用户确认。

也许该删除旧状态。

系统不会变好，不一定是模型不会反思

也许是失败 trace 没有进入学习回路。

也许 eval 只打分，不归因。

也许每次人工修复都没有转化成结构更新。

经历错误不等于学习。

只有错误改变了未来的信息结构，才叫学习。

---

## 5. 外部信息架构会成为新的护城河

模型 API 可以调用。

Prompt 可以复制。

RAG demo 可以很快搭出来。

但干净、可追溯、可演化的外部信息架构，很难复制。

它来自真实任务。

来自失败 trace。

来自长期 memory 治理。

来自用户反馈。

来自 domain workflow。

来自 eval 体系。

来自文档习惯、metadata 习惯、版本习惯和组织习惯。

它很慢。

但也正因为慢，它会成为壁垒。

未来的 Agent 公司，表面上看是在卖模型应用。

实际上是在积累一种东西：

面向 Agent 的世界模型工程。

这里的世界模型，不是模型参数里的 world model。

而是模型外部的、可检索、可验证、可更新、可行动的信息世界。

谁的世界更干净，谁的 Agent 就更稳。

谁的世界更可追溯，谁的 Agent 就更可信。

谁的世界更容易被重构，谁的 Agent 就更能进化。

---

## 6. 最大风险：Agent 把错误写进世界

Agent 能改造外部信息架构，是下一代能力。

也是最大风险。

因为它可能把自己的错误写成未来事实。

模型生成错误 → 写入 summary / memory / knowledge base / skill rule → 后续 search 检索到 → 模型把它当外部证据 → 错误被强化

这比一次 hallucination 严重得多。

一次 hallucination 是输出污染。

错误 memory 是状态污染。

错误 summary 是知识污染。

错误 skill 是行动污染。

错误 eval case 是目标污染。

目标污染最可怕。

因为系统会开始奖励错误。

所以，下一代 Agent 必须有信息免疫系统。

不是简单的 safety filter。

而是更底层的 epistemic hygiene：

- 每条信息都有 provenance；
- 每个来源都有 trust tier；
- 每次写入都有 validation gate；
- 每个结构更新都有 version；
- 每个长期状态都有 decay / TTL；
- 每个 derived artifact 都能追溯到 raw evidence；
- 每次 evolve 都能 rollback；
- 每个自我修改都有速率限制。

没有这套东西，self-evolve 不是进化。

是自污染。

---

## 7. 下一代 Agent 的形态

我认为下一代 Agent 不应该被设计成“一个会调用很多工具的聊天机器人”。

它更像一个持续运行的信息生命体。

它有感知层。

不只是 retrieval，而是 active sensing：发现缺口、主动搜索、评估证据、寻找反证。

它有状态层。

不只是 memory，而是 belief management：写入、确认、冲突、遗忘、版本。

它有行动层。

不只是 tool calling，而是 skill execution：复用验证过的流程，控制风险，处理失败。

它有学习层。

不只是 logging，而是 trace-to-structure：把失败变成 eval、规则、索引、文档和 skill 更新。

它有治理层。

不只是 guardrail，而是 information governance：provenance、trust、validation、rollback、权限和更新速率。

这五层加起来，才是 Agent 的下一代架构。

- Perception：Search / Retrieval / Active Sensing
- State：Memory / Belief / Context
- Action：Tool / Skill / Workflow
- Learning：Trace / Eval / Feedback
- Governance：Provenance / Trust / Version / Rollback

今天很多系统只有第一层和第三层。

会搜。

会调工具。

但状态是脏的，学习是假的，治理是缺的。

这种 Agent 可以 demo。

但很难长期稳定运行。

---

## 8. 真正的问题

所以，下一代 Agent 的问题不是：

模型能不能更强？

当然能。

上下文能不能更长？

当然能。

工具能不能更多？

当然能。

但这些不是最核心的问题。

真正的问题是：

Agent 能不能维护一个适合自己思考和行动的世界？

它能不能让重要信息更容易被看见？

能不能让过时信息自然失效？

能不能让事实、推测、总结、计划、偏好、规则分层？

能不能把失败变成未来结构？

能不能把经验变成 Skill？

能不能防止错误写入长期状态？

能不能在改造环境的同时不污染环境？

这才是 Agent 工程的下半场。

---

## 9. 结论

AI 的上半场，是模型能力的竞争。

谁的模型更强，谁赢。

AI Agent 的下半场，会变成外部信息架构的竞争。

谁能治理好模型所处的世界，谁赢。

因为 Agent 不是孤立的大脑。

它需要眼睛、记忆、习惯、工具、痛觉和免疫系统。

Search 是眼睛。

Context 是视野。

Memory 是长期状态。

Skill 是行动习惯。

Tool 是手。

Trace 和 Eval 是痛觉。

Governance 是免疫系统。

外部信息架构，是它生活的世界。

未来真正强的 Agent，不只是能在世界里找到答案。

它会持续整理世界。

修正世界。

压缩世界。

验证世界。

遗忘世界。

并让未来的自己生活在一个更容易做对的世界里。

模型越强，这件事越重要。

因为越强的模型，越需要一个干净的世界。
