# AutoIA Homepage Positioning Design

## Goal

Present AutoIA in language that an industry reader can understand immediately while preserving the homepage's concise editorial structure.

## Public Positioning

AutoIA should be framed as task- and feedback-driven context infrastructure. Its distinctive claim is that context retrieval is not fixed: evaluation and failure analysis can improve retrieval pipelines and agent skills, and can also trigger changes to data preparation, indexing, and storage.

The public copy must not use `information architecture` or `information topology` for these data-system choices, and it must not use `RAG` as the project boundary. `Context infrastructure` and `agent skills` remain part of the positioning; the upstream design choices should instead be named concretely as data preparation, indexing, storage, and retrieval.

## Terminology Basis

- The VA design system defines information architecture around content organization, labeling, and navigation for human-facing experiences, making the term misleading for this project: <https://design.va.gov/ia/>.
- LangChain defines context engineering as providing the right information and tools to a model, so `context` describes what the agent receives rather than the upstream data design: <https://docs.langchain.com/oss/python/langchain/context-engineering>.
- LangChain and the Agent Skills specification use `agent skills` for reusable capabilities that package specialized workflows and domain knowledge: <https://docs.langchain.com/oss/python/deepagents/skills> and <https://agentskills.io/home>.
- Databricks separates a RAG system into a data pipeline and a RAG chain, with standard stages such as parsing, chunking, indexing, retrieval, and evaluation: <https://docs.databricks.com/aws/en/agents/retrieval-augmented-generation>.
- AWS likewise describes ingestion as parsing, chunking, embedding, and indexing, and uses retrieval and reranking for query-time behavior: <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html>.
- OpenAI and LangSmith use execution traces, evaluations, failure modes, and feedback loops for diagnosing and improving agents: <https://openai.com/index/inside-our-in-house-data-agent/> and <https://docs.langchain.com/langsmith/evaluation>.

## Homepage Copy

Replace the two Current Research paragraphs with:

> My research asks: **how can data systems continuously improve the context agents use to complete tasks?** Rather than treating context retrieval as fixed, I study how task outcomes and execution traces can guide the preparation, indexing, and retrieval of heterogeneous data.
>
> [**AutoIA @ ByteDance**](/projects/1_autoia/) is the systems platform for this agenda. It closes this loop: evaluation and failure analysis improve retrieval pipelines and agent skills, while persistent failures trigger changes to data preparation, indexing, and storage. This is a concrete path toward **self-improving agent infrastructure**.

Replace the AutoIA entry under Selected Systems with:

> [**AutoIA @ ByteDance**](/projects/1_autoia/) — task- and feedback-driven context infrastructure that improves data preparation and indexing, retrieval pipelines, and agent skills.

Replace `database systems and Data+AI` with the idiomatic research-area phrase `database systems and AI`.

## Systems Card Copy

Use this description in the AutoIA project front matter, which supplies the Systems card:

> Task- and feedback-driven context infrastructure that improves data preparation and indexing, retrieval pipelines, and agent skills.

## Scope

- Keep the homepage section count, layout, links, and typography unchanged.
- Keep the AutoIA detail-page body unchanged; this update only synchronizes its card description.
- Do not expose internal object-model or public-API claims.
- Do not publish without a separate explicit request.

## Acceptance Criteria

- The homepage uses the approved concise positioning and `database systems and AI`.
- The AutoIA Systems card uses the synchronized public description.
- Neither edited surface uses `information architecture` or `information topology`.
- Existing homepage structure, site build, and internal links remain valid.
