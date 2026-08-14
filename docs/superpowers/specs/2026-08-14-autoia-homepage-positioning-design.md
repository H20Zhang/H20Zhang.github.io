# AutoIA Homepage Positioning Design

## Goal

Present AutoIA in language that an industry reader can understand immediately while preserving the homepage's concise editorial structure.

## Public Positioning

AutoIA should be framed as self-improving context infrastructure that evolves two coupled optimization objects: the external data environment constructed for an agent and the environment-specific retrieval pipelines used to access it. Task-level evaluation evolves retrieval pipelines while the environment remains fixed; persistent failures feed back into data integration, representation, indexing, and storage to rebuild the environment itself.

The public copy must not use `information architecture` or `information topology` for these choices, and it must not use `RAG` as the project boundary. `Context infrastructure` is the public umbrella term; environment construction should be described concretely through data integration, representation, indexing, and storage. Agent skills may package resulting capabilities but are not a primary optimization object in the homepage positioning.

## Terminology Basis

- The VA design system defines information architecture around content organization, labeling, and navigation for human-facing experiences, making the term misleading for this project: <https://design.va.gov/ia/>.
- LangChain defines context engineering as providing the right information and tools to a model, so `context` describes what the agent receives rather than the upstream data design: <https://docs.langchain.com/oss/python/langchain/context-engineering>.
- LangChain and the Agent Skills specification use `agent skills` for reusable capabilities that package specialized workflows and domain knowledge, supporting their treatment as a downstream packaging layer rather than the central optimization object: <https://docs.langchain.com/oss/python/deepagents/skills> and <https://agentskills.io/home>.
- Databricks separates a RAG system into a data pipeline and a RAG chain, with standard stages such as parsing, chunking, indexing, retrieval, and evaluation: <https://docs.databricks.com/aws/en/agents/retrieval-augmented-generation>.
- AWS likewise describes ingestion as parsing, chunking, embedding, and indexing, and uses retrieval and reranking for query-time behavior: <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html>.
- OpenAI and LangSmith use execution traces, evaluations, failure modes, and feedback loops for diagnosing and improving agents: <https://openai.com/index/inside-our-in-house-data-agent/> and <https://docs.langchain.com/langsmith/evaluation>.

## Homepage Copy

Replace the two Current Research paragraphs with:

> My research focuses on **self-improving context infrastructure for agents**: evolving both how an agent's external data environment is constructed and how information is retrieved from it. Evaluation feedback improves retrieval pipelines within a given environment, while persistent failures drive changes to data integration, indexing, and storage.
>
> [**AutoIA @ ByteDance**](/projects/1_autoia/) is the systems platform for this agenda. Its inner loop evolves environment-specific retrieval pipelines through task-level evaluation; its outer loop uses persistent failures to improve data integration and rebuild the environment itself.

Replace the AutoIA entry under Selected Systems with:

> [**AutoIA @ ByteDance**](/projects/1_autoia/) — self-improving context infrastructure that evolves both external data environments and the retrieval pipelines built for them.

Replace `database systems and Data+AI` with the idiomatic research-area phrase `database systems and AI`.

## Systems Card Copy

Use this description in the AutoIA project front matter, which supplies the Systems card:

> Self-improving context infrastructure that evolves both external data environments and the retrieval pipelines built for them.

## Scope

- Keep the homepage section count, layout, links, and typography unchanged.
- Update the AutoIA detail page to explain the harness relationship and nested inner/outer optimization loops without exposing internal object-model or API claims.
- Do not expose internal object-model or public-API claims.
- Do not publish without a separate explicit request.

## Acceptance Criteria

- The homepage describes the coupled evolution of external data environments and environment-specific retrieval pipelines and retains `database systems and AI`.
- The AutoIA Systems card uses the synchronized self-improving context-infrastructure description.
- The AutoIA detail page distinguishes pipeline evolution within a fixed environment from environment reconstruction through data integration.
- Neither edited surface uses `information architecture` or `information topology`.
- Existing homepage structure, site build, and internal links remain valid.
