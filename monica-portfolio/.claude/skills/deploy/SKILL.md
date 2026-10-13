---
name: deploy
description: Publish the portfolio to GitHub Pages and deploy or update the Cloudflare Worker that powers the live AI chatbot. Use when Monica asks to deploy, publish, go live, fix the live site, or turn on the AI.
---

# Deploy

## Website → GitHub Pages (free)
1. The repo is on GitHub (e.g. `MonicaChoudhari/portfolio`) with this project at the **repo root**.
2. One-time: Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Push to `main`. `.github/workflows/deploy.yml` runs `npm ci → npm run check → npm run build` and deploys.
4. URL: `https://monicachoudhari.github.io/<repo-name>/` (lowercase username).
5. If it fails, open the Actions tab and read the failing step. `npm run check` errors name the exact project and field.

## AI chatbot → Cloudflare Worker (free) + Groq (free)
1. Get a free Groq API key at https://console.groq.com/keys
2. In `worker/`:
   ```bash
   npx wrangler login
   npx wrangler secret put GROQ_API_KEY     # paste the key; it is stored encrypted, never in git
   npx wrangler deploy                      # prints https://monica-portfolio-chat.<subdomain>.workers.dev
   ```
3. Check `ALLOWED_ORIGINS` in `worker/wrangler.toml` includes `https://monicachoudhari.github.io`.
4. GitHub repo → Settings → Secrets and variables → Actions → **Variables** → `VITE_CHAT_API_URL` = the Worker URL.
5. Re-run the deploy workflow. The chat header should say "Live · RAG + LLM on Groq". If the Worker logs `model_not_found`, Groq retired the model: update MODEL in `worker/wrangler.toml` and redeploy.
6. Smoke test: `curl https://<worker-url>/health` → `{"ok":true,...}`

## Local AI testing
`cd worker && cp .dev.vars.example .dev.vars` (add the key), run `npx wrangler dev`, then in the project root
`VITE_CHAT_API_URL=http://localhost:8787 npm run dev`.
