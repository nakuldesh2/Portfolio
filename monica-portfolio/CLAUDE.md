# Monica Choudhari: AI-Powered Portfolio

Interactive portfolio for **Monica Narendra Choudhari (Software Engineer: backend, data platforms, AI)**. Hiring managers open the GitHub Pages link and can:
1. Read her experience, skills, achievements and education
2. Click any project to watch an **animated, step-by-step simulation** of its architecture
3. Ask an **AI assistant** (RAG + gpt-oss-120b on Groq; model set in worker/wrangler.toml) anything about her background

## Commands
```bash
npm install          # once
npm run dev          # http://localhost:5173
npm run check        # validate project/simulation data + retrieval tests (run after ANY data edit)
npm run ask -- "q"   # show what the retriever finds for a question
npm run build        # production build → dist/
```

## Architecture (read before editing)
```
src/data/profile.js     ← single source of truth: bio, skills, experience, achievements, education
src/data/projects.js    ← projects + their simulation configs (nodes / edges / steps)
        │
        ├──► React UI (src/components/*)          renders the page
        └──► src/ai/knowledge.js                  builds RAG chunks from the SAME data
                 └► src/ai/retriever.js           BM25 search + synonyms (runs in browser)
                      └► src/ai/chatClient.js     POST question+context → Worker, stream SSE back
                           └► worker/src/index.js Cloudflare Worker: holds GROQ_API_KEY, fixed system prompt, CORS, limits
src/lib/simulation.js   ← shared geometry/constants for the simulation (used by UI and validator)
scripts/validate-data.mjs ← `npm run check`
```
- No `VITE_CHAT_API_URL` → the chatbot runs in **offline mode** (answers straight from retrieved text). The site always works.
- Vite `base: './'` → works under any GitHub Pages repo name.

## Rules (always follow)
- `.claude/rules/content-accuracy.md`: never invent facts, metrics or tech about Monica
- `.claude/rules/simulations.md`: how simulation configs must be structured
- `.claude/rules/security.md`: no API keys in frontend code, ever
- `.claude/rules/code-style.md`: conventions

## Skills (workflows)
- `add-project`: add or update a project end to end
- `design-simulation`: turn a system-design image or description into an animated simulation
- `update-profile`: apply resume changes and keep the chatbot accurate
- `deploy`: publish to GitHub Pages and deploy the AI Worker
- `interview-prep`: quiz Monica on her own projects using the portfolio data

## Definition of done for any change
1. `npm run check` passes
2. `npm run build` passes
3. For visual changes: open `npm run dev` (or take a Playwright screenshot) and look at the change
