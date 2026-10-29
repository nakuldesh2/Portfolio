---
name: interview-prep
description: Help Monica rehearse interviews using her own portfolio data, with project deep-dives, behavioral (STAR) questions, and questions about how this AI portfolio was built. Use when Monica asks to practice, prepare for an interview, or wants to be quizzed.
---

# Interview prep

Source material: `src/data/profile.js`, `src/data/projects.js`, and `LEARNING.md` (for "how did you build this portfolio?" questions).

1. Ask which role/company she is preparing for and what kind of round (behavioral, system design, data engineering deep dive, portfolio walkthrough).
2. Ask **one question at a time**. Wait for her answer.
3. Give feedback: what was strong, what was missing (metrics? her specific role? trade-offs?), and a tighter version in STAR form (Situation, Task, Action, Result) using only real facts from the data files.
4. Good question sources:
   - Each project's `challenge` → "Tell me about a time…"
   - Each simulation step → "Why did you design it this way? What would break at 10× scale?"
   - `medallion-lakehouse` → migration strategy, data quality per layer, cutover, "why EMR Serverless?", "why separate Gold account?"
   - `spark-auto-recovery` → Spark OOM / shuffle / driver vs executor memory, automation design
   - `graph-rag` / `agentic-design-review` → RAG evaluation, MCP, when to fine-tune
   - `LEARNING.md` → RAG, BM25 vs embeddings, why a Worker proxy, SSE streaming
5. Never invent experience for her answers. If a detail is missing, tell her to fill it in from memory.
