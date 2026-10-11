# Monica Choudhari · AI-Powered Portfolio

An interactive portfolio for a Software Data Engineer, built so hiring managers can:

- **Explore** experience, skills, achievements and education
- **Watch** every project run as an animated, step-by-step architecture simulation
- **Ask** an AI assistant anything about Monica's background (RAG + Llama 3.3 on Groq)

Everything runs on free tiers: GitHub Pages (hosting), GitHub Actions (CI/CD), Cloudflare Workers (AI proxy), Groq (LLM).

**Live site:** `https://monicachoudhari.github.io/portfolio/` (after you publish, see below)

---

## Quick start

> ⚠️ Monica's site lives in the **`monica-portfolio/` folder**. The repository root is Nakul's portfolio,
> so running `npm run dev` from the root shows Nakul's site. Always `cd monica-portfolio` first.

```bash
git clone https://github.com/nakuldesh2/Portfolio.git
cd Portfolio
git checkout claude/stoic-pascal-trin0t   # until PR #1 is merged; after that, main works too
cd monica-portfolio                       # ← important
npm install
npm run dev                               # open http://localhost:5173
```

If you already have the repo cloned: `git fetch && git checkout claude/stoic-pascal-trin0t && cd monica-portfolio`.
If a server is still running from the root (Nakul's site), stop it with Ctrl+C first. Otherwise Vite moves to port 5174 and 5173 keeps showing Nakul's site.

The AI assistant works immediately in **offline mode**: it searches the portfolio data and answers from it.
Turn on **live AI** with the Worker setup below.

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run check` | Validates every project/simulation and runs retrieval tests |
| `npm run ask -- "question"` | Shows which knowledge chunks the chatbot would use |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |

---

## Publish to your GitHub (one time, ~10 minutes)

1. **Create the repo**: on GitHub (signed in as `MonicaChoudhari`) click **New repository** → name it `portfolio` → Public → *don't* add a README → Create.
2. **Copy this folder out of Nakul's repo and push it as the root of Monica's repo:**
   ```bash
   cp -r Portfolio/monica-portfolio ~/monica-portfolio   # copy OUTSIDE Nakul's repo
   cd ~/monica-portfolio
   rm -rf node_modules dist
   git init -b main
   git add .
   git commit -m "AI-powered portfolio"
   git remote add origin https://github.com/MonicaChoudhari/portfolio.git
   git push -u origin main
   ```
3. **Turn on Pages**: repo → Settings → Pages → *Build and deployment* → Source: **GitHub Actions**.
4. The **Actions** tab shows the deploy running. When it's green, the site is live at
   `https://monicachoudhari.github.io/portfolio/`.

Every later `git push` redeploys automatically.

> Tip: to get the shorter URL `https://monicachoudhari.github.io/`, name the repo `MonicaChoudhari.github.io` instead.
> Paths are relative (`base: './'` in `vite.config.js`), so either name works without code changes.

## Turn on the live AI assistant (free)

The browser must never hold an API key, since anything on GitHub Pages is public. A tiny Cloudflare Worker keeps the key secret.

1. Create a free Groq API key: https://console.groq.com/keys
2. Create a free Cloudflare account, then:
   ```bash
   cd worker
   npx wrangler login
   npx wrangler secret put GROQ_API_KEY    # paste the key when prompted
   npx wrangler deploy                     # prints your Worker URL
   ```
3. On GitHub: repo → Settings → Secrets and variables → Actions → **Variables** tab → New variable
   `VITE_CHAT_API_URL` = the Worker URL (e.g. `https://monica-portfolio-chat.yourname.workers.dev`)
4. Actions → *Deploy to GitHub Pages* → **Run workflow**.

The chat header changes from "Offline mode" to "Live · RAG + Llama 3.3 on Groq".
If your Pages URL differs, update `ALLOWED_ORIGINS` in `worker/wrangler.toml` and redeploy the Worker.

---

## Project structure

```
src/
  data/profile.js        bio, skills, experience, achievements, education  ← edit content here
  data/projects.js       projects + simulation storyboards                 ← edit projects here
  ai/knowledge.js        builds the chatbot knowledge base from the data above
  ai/retriever.js        BM25 search (the "R" in RAG)
  ai/chatClient.js       calls the Worker and streams the answer (the "G" in RAG)
  lib/simulation.js      shared simulation geometry
  components/            React UI (Simulation.jsx is the animation engine)
worker/                  Cloudflare Worker: secure proxy to Groq
scripts/                 validate-data.mjs (npm run check), ask.mjs (npm run ask)
.claude/                 AI-assistant rules + skills for working on this repo
CLAUDE.md                project guide for Claude Code
LEARNING.md              how everything works, written for interview prep
```

## Working on it with Claude Code

This repo is set up as an AI-assisted project. `CLAUDE.md` explains the architecture, `.claude/rules/` holds the guardrails (content accuracy, security, simulation layout), and `.claude/skills/` holds repeatable workflows:

| Skill | Use it to… |
|---|---|
| `add-project` | add/update a project from details or a system-design image |
| `design-simulation` | storyboard an architecture into an animation |
| `update-profile` | apply resume changes safely |
| `deploy` | publish the site and the AI Worker |
| `interview-prep` | get quizzed on your own projects |

## Content status

All 10 projects were drafted **from the resume only** and are marked `reviewed: false`.
`npm run check` lists them. Review each one (architecture, wording, metrics), then set `reviewed: true`.
