// The "G" in RAG: send the question plus retrieved context to the LLM and
// stream the answer back token by token.
//
// The browser never sees an API key. It talks to our Cloudflare Worker
// (worker/src/index.js), which holds the Groq key as a secret, enforces the
// system prompt, and proxies the streamed response.

import { buildKnowledgeBase } from './knowledge.js'
import { createRetriever, formatContext, offlineAnswer } from './retriever.js'

const CHAT_API_URL = (import.meta.env.VITE_CHAT_API_URL || '').replace(/\/$/, '')

const knowledgeBase = buildKnowledgeBase()
const retrieve = createRetriever(knowledgeBase)
// When nothing matches, the LLM still gets a general picture of Monica.
const GENERAL_CONTEXT = knowledgeBase.filter((c) => ['about', 'achievements', 'skills-all'].includes(c.id))

export const isLiveAI = () => Boolean(CHAT_API_URL)

/**
 * @param {object}   opts
 * @param {string}   opts.question
 * @param {Array}    opts.history   previous {role, content} messages
 * @param {Function} opts.onToken   called with each streamed text fragment
 * @param {AbortSignal} [opts.signal]
 * @returns {Promise<{mode: 'live'|'offline', sources: Array}>}
 */
export async function askAssistant({ question, history = [], onToken, signal }) {
  // Short follow-ups ("tell me more") have few keywords, so borrow the previous question's.
  const lastUser = [...history].reverse().find((m) => m.role === 'user')?.content || ''
  const query = question.split(/\s+/).length < 6 && lastUser ? `${question} ${lastUser}` : question
  const sources = retrieve(query, 4)

  if (!CHAT_API_URL) {
    onToken(offlineAnswer(question, sources))
    return { mode: 'offline', sources }
  }

  // Only cite chunks that actually fit into the context the model sees.
  const context = formatContext(sources.length ? sources : GENERAL_CONTEXT)
  const cited = sources.filter((c) => context.includes(`### ${c.title}\n`))

  let streamed = false
  try {
    const res = await fetch(`${CHAT_API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal,
      body: JSON.stringify({
        question,
        context,
        // Keep only recent turns: enough for follow-ups, small enough to be cheap.
        history: history.slice(-6).map((m) => ({ role: m.role, content: m.content.slice(0, 1500) })),
      }),
    })
    if (!res.ok || !res.body) throw new Error(`Chat API returned ${res.status}`)

    await readSSE(res.body, (t) => {
      streamed = true
      onToken(t)
    })
    return { mode: 'live', sources: cited }
  } catch (err) {
    if (err.name === 'AbortError') throw err
    if (streamed) {
      // Part of the answer already arrived; don't append a second answer.
      onToken('\n\n_(Connection interrupted. Please ask again.)_')
      return { mode: 'live', sources: cited }
    }
    console.warn('Live AI unavailable, falling back to offline answer:', err)
    onToken(offlineAnswer(question, sources))
    return { mode: 'offline', sources }
  }
}

// Server-Sent Events: the response body is a stream of lines like
//   data: {"choices":[{"delta":{"content":"Hello"}}]}
// ending with `data: [DONE]`. Network chunks can split a line in half, so we
// buffer until we see a newline before parsing.
async function readSSE(body, onToken) {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() // last item may be an incomplete line
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('data:')) continue
      const data = trimmed.slice(5).trim()
      if (data === '[DONE]') return
      try {
        const token = JSON.parse(data).choices?.[0]?.delta?.content
        if (token) onToken(token)
      } catch {
        // Ignore keep-alive or malformed lines.
      }
    }
  }
}
