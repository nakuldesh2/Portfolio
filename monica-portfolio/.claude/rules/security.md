# Security rules

- **Never put an API key in frontend code or a `VITE_*` variable.** Everything under `src/` ships to the browser and is public.
- The Groq key lives only as a Cloudflare Worker secret: `npx wrangler secret put GROQ_API_KEY`.
- `.env`, `.env.local`, `worker/.dev.vars` are gitignored; never commit them.
- The Worker must keep: Origin allowlist (CORS), fixed model + system prompt, input size caps, `max_tokens` cap, rate limit.
- Never render model output with `dangerouslySetInnerHTML`; use the `Formatted` component in Chat.jsx.
- The system prompt must keep its instruction to ignore user attempts to override the rules (prompt injection).
