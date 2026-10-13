# Nakul Deshpande — Portfolio

**Live site:** https://nakuldesh2.github.io/Portfolio/

Personal portfolio of a software engineer working on Tier-1 distributed systems, cloud infrastructure and applied AI/ML. Beyond the usual résumé content, it has two interactive pieces:

- **Project simulations** — each project opens as a step-by-step animated walkthrough of how the system works (SVG diagram with traffic flowing along the active paths, narrated steps, real results).
- **"Ask my AI" chatbot** — answers questions about my experience using retrieval-augmented generation over a structured knowledge base, streamed from an LLM on Groq.

## Tech stack

| Area | Choice |
|------|--------|
| UI | React 18, Vite, Tailwind CSS |
| Simulations | Data-driven SVG + `<animateMotion>` (no animation library) |
| Chatbot | Keyword/IDF retrieval over a JSON knowledge base → Groq LLM, streamed via SSE |
| API key security | Cloudflare Worker proxy holds the Groq key; the browser never sees it |
| Hosting / CI | GitHub Pages, deployed by GitHub Actions on every push to `main` |

## How the chatbot works

1. The question is tokenised (stopwords removed) and scored against one document per experience, project, skill group and achievement in `src/data/knowledgeBase.js`, weighting rare terms higher (IDF).
2. A short profile plus the top matches are sent with the question to the Cloudflare Worker (`worker/worker.js`).
3. The Worker adds the API key, calls Groq, and streams the answer back; the UI renders tokens as they arrive.
4. The prompt instructs the model to answer only from the supplied context and say so when something isn't covered.

## Project structure

```
src/
  components/   UI sections, Simulation player, Chat
  data/         knowledgeBase.js (chatbot), projects.js, simulations.js, resume.js, contact.js
  services/     ragService.js (retrieval + prompt), groqService.js (streaming client)
worker/         Cloudflare Worker source (Groq proxy)
public/         portrait, architecture diagrams
```

## Running locally

```bash
npm ci --legacy-peer-deps
npm run dev        # http://localhost:5173/Portfolio/
npm run build      # production build in dist/
```

The chatbot uses the deployed Worker by default; set `VITE_GROQ_WORKER_URL` to point at a different one.

## Accessibility & performance

Lighthouse (mobile): Performance 96 · Accessibility 100 · Best Practices 100 · SEO 100. Keyboard navigable (skip link, focus-managed dialogs, arrow keys in simulations), WCAG AA contrast, honours `prefers-reduced-motion`.

## Contact

nakuldeshpande92@gmail.com · [GitHub](https://github.com/nakuldesh2)
