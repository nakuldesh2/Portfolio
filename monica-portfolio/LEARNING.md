# How this portfolio works (interview study guide)

Read this once and you can explain every part of the project in an interview.

**The 30-second pitch:**
> "My portfolio is itself an AI project. It's a React app on GitHub Pages where every project plays as an animated architecture simulation, and an AI assistant answers questions about my background using Retrieval-Augmented Generation. Retrieval is BM25 search in the browser over a knowledge base generated from the same data the page renders. Generation goes through a Cloudflare Worker that keeps the Groq API key secret and streams the open-weight gpt-oss-120b model's answer back over Server-Sent Events. It costs $0 to run, and CI validates the data on every push."

---

## 1. The big picture

```
            ┌──────────────── GitHub Pages (static) ─────────────────┐
 Browser ──►│ React UI ◄── src/data/*.js (single source of truth)    │
            │                    │                                    │
            │                    ▼                                    │
            │  knowledge.js → chunks → retriever.js (BM25 top-4)      │
            └────────────────────┬────────────────────────────────────┘
                                 │ POST {question, context, history}
                                 ▼
                     Cloudflare Worker (free)        ← holds GROQ_API_KEY secret
                     CORS allowlist · fixed prompt · size caps · rate limit
                                 │
                                 ▼
                     Groq API: gpt-oss-120b ──stream (SSE)──► back to browser
```

**Why this design?**
| Decision | Why | Trade-off |
|---|---|---|
| Static site on GitHub Pages | Free, fast, nothing to operate | No server, so any secret needs a separate proxy |
| Data in JS files, not a database | Versioned in git, reviewable, works offline | Editing content means a commit (fine for a portfolio) |
| KB generated from the UI data | Page and chatbot can never disagree | Chunking is code, not hand-tuned |
| BM25 instead of vector embeddings | ~30 chunks; keyword search is accurate, instant, free, and explainable | Misses pure paraphrases. Mitigated with a synonym map; embeddings are the next step |
| Worker proxy for the LLM | API key never reaches the browser | One more thing to deploy |
| Offline fallback | Site works even if the AI is down or not configured | Fallback answers are extracts, not prose |

---

## 2. RAG (Retrieval-Augmented Generation)

**Problem:** an LLM doesn't know Monica, and if you ask it anyway it will make things up (hallucinate).
**Fix:** before asking the LLM, *retrieve* the relevant facts and put them in the prompt with the instruction "answer only from this context".

Steps in this repo:
1. **Chunking** (`src/ai/knowledge.js`): one chunk per topic (each role, each project, each skill group). Small, focused chunks retrieve more precisely than one giant document.
2. **Retrieval** (`src/ai/retriever.js`): score every chunk against the question and keep the top 4.
3. **Augmentation**: the chunks are joined into a `CONTEXT` block (capped at about 6,000 characters to control cost).
4. **Generation** (`worker/src/index.js`): the system prompt says to answer only from the context, never invent numbers, and decline off-topic questions.
5. **Transparency**: the UI shows "Sources:" under each answer, which builds trust.

**Interview Q: "How do you prevent hallucinations?"** Grounding (context-only instruction), low temperature (0.3), source display, and an explicit "say you don't know" path. The data itself is reviewed (`reviewed` flag) and CI-validated.

## 3. BM25, the retrieval algorithm

For each query word *t* and chunk *d*:

```
score += IDF(t) × tf·(k1+1) / (tf + k1·(1 − b + b·len(d)/avgLen))
```
- **TF** (term frequency): more mentions → more relevant, with diminishing returns (`k1`)
- **IDF** (inverse document frequency): rare words ("Lake Formation") matter more than common ones ("data")
- **Length normalization** (`b`): long chunks don't win just by being long

Extras in this repo: stopword removal, light stemming ("pipelines" → "pipeline"), a **synonym map** ("outage" → incident, LSE, recovery), and hidden `keywords` on chunks so vague questions ("summarize her") still match.

**Interview Q: "Why not embeddings?"** At ~30 chunks BM25 is near-perfect, zero-cost, and debuggable (`npm run ask`). For thousands of documents or paraphrase-heavy queries I'd add embeddings (for example a small model in a Worker plus a vector index) and do **hybrid search**: BM25 + vectors with reciprocal-rank fusion.

## 4. Streaming with Server-Sent Events

Groq streams tokens as they're generated:
```
data: {"choices":[{"delta":{"content":"Monica"}}]}
data: {"choices":[{"delta":{"content":" led"}}]}
data: [DONE]
```
The Worker pipes this stream straight through (it never buffers the whole answer). The browser reads it with `response.body.getReader()`.
**The subtle bug to mention:** network chunks don't align with lines, so a JSON line can arrive in two halves. `readSSE()` buffers until a newline before parsing.
**Why stream?** Time-to-first-token drops from seconds to about 200 ms, so the UI feels instant.

## 5. Security of the AI proxy

- **Secret management:** `GROQ_API_KEY` is a Worker secret (`wrangler secret put`), encrypted at rest, never in git or the bundle.
- **Abuse prevention:** an Origin allowlist (CORS), a fixed model and system prompt (callers can't use it as a general-purpose LLM), size caps on question/context/history, `max_tokens` 600, and a per-IP rate limit.
- **Prompt injection:** the system prompt tells the model to ignore instructions in user messages. Damage is limited anyway, because the model only sees public portfolio data.
- **XSS:** model output is rendered as React elements by a tiny formatter, never with `dangerouslySetInnerHTML`.

**Honest limitation (good to volunteer):** the in-memory rate limit is per Worker isolate, so it's best-effort. For production I'd use Cloudflare's Rate Limiting binding or Durable Objects. CORS also doesn't stop non-browser clients; the caps and rate limit are what bound the cost.

## 6. The simulation engine

`src/components/Simulation.jsx` is **data-driven**: every animation is just a config in `src/data/projects.js`:
```js
nodes: [{ id: 'lam', label: 'Lambda Workers', kind: 'compute', x: 480, y: 220 }, …]
edges: [['exp', 'lam', 'shards'], …]
steps: [{ title, text, nodes: [...], edges: ['exp->lam'], status: { allow: 'ok' }, metrics: [...] }]
```
- Edges are **cubic Bézier curves** between the facing sides of two boxes. The label sits at the curve midpoint, B(0.5) = (P0 + 3P1 + 3P2 + P3) / 8.
- "Data particles" use native SVG `<animateMotion>` along each edge path, so the browser animates them without React re-renders. Pausing calls `svg.pauseAnimations()`.
- Steps auto-advance with a timer in `useEffect`, and the timer is cleaned up on every change (no leaked timers).
- **Accessibility:** respects `prefers-reduced-motion`, has `aria-label`s, keyboard Escape closes the modal.
- **Validation:** `npm run check` catches unknown node ids, overlapping boxes, out-of-bounds nodes and bad statuses, and runs in CI before every deploy.

## 7. CI/CD

`.github/workflows/deploy.yml`: `npm ci` → `npm run check` → `npm run build` → upload artifact → `actions/deploy-pages`.
Bad data fails the build, so a broken page never goes live. This is the same idea as data-quality gates in a medallion pipeline, which makes a nice bridge to Monica's own work.

## 8. Using AI to build it (rules + skills)

The repo is set up for AI-assisted development with Claude Code:
- `CLAUDE.md`: architecture + commands, so the assistant understands the codebase
- `.claude/rules/`: guardrails, for example *never invent metrics*, *never put keys in frontend code*
- `.claude/skills/`: repeatable workflows (add a project, design a simulation, deploy, interview prep)

**Interview angle:** "I treat the AI like a junior teammate: clear docs, explicit guardrails, and automated checks (`npm run check`) that verify its work instead of trusting it."

---

## Likely interview questions (practice these)

1. *Walk me through what happens when I type a question in the chat.* (Sections 2–4, in order)
2. *What would you change to support 10,000 documents?* (embeddings + hybrid search, chunk overlap, a re-ranker, caching)
3. *How do you keep the chatbot's answers accurate as your resume changes?* (single source of truth + CI retrieval tests)
4. *How would you measure chatbot quality?* (a golden Q&A set like the `EXPECT` list, hit-rate@k for retrieval, LLM-as-judge for faithfulness, and logging thumbs-up/down with consent)
5. *What are the security risks of putting an LLM on a public site?* (Section 5)
6. *Why React + Vite and not Next.js?* (static content, no SSR needed, fastest dev loop, free static hosting)
