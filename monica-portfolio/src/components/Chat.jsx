import { useEffect, useRef, useState } from 'react'
import { askAssistant, isLiveAI } from '../ai/chatClient.js'

const STARTERS = [
  'Summarize Monica in 3 bullet points',
  'What was her most impactful project?',
  'What are her strongest technical skills?',
  'Tell me about her leadership experience',
]

const WELCOME = {
  role: 'assistant',
  content:
    "Hi! I'm Monica's AI assistant. Ask me anything about her experience, projects, skills, or education. My answers come from her real resume and project data.",
}

// Minimal, safe formatter: **bold**, _italic_, and "- " bullets as React
// elements. No dangerouslySetInnerHTML, so model output can't inject HTML.
function Formatted({ text }) {
  const inline = (line, key) =>
    line.split(/(\*\*[^*]+\*\*|_[^_]+_)/g).map((part, i) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={`${key}-${i}`} className="text-white">{part.slice(2, -2)}</strong>
      if (/^_[^_]+_$/.test(part)) return <em key={`${key}-${i}`} className="text-slate-400">{part.slice(1, -1)}</em>
      return part
    })
  return text.split('\n').map((line, i) => {
    const bullet = line.match(/^\s*[-*•]\s+(.*)/)
    if (bullet)
      return (
        <div key={i} className="flex gap-2">
          <span className="text-accent">•</span>
          <span>{inline(bullet[1], i)}</span>
        </div>
      )
    return line.trim() ? <p key={i}>{inline(line, i)}</p> : <div key={i} className="h-2" />
  })
}

export default function Chat({ open, setOpen, request }) {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const abortRef = useRef(null)
  const live = isLiveAI()

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Questions sent from elsewhere on the page (hero chips, project modal).
  useEffect(() => {
    if (request?.question) send(request.question)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request])

  useEffect(() => () => abortRef.current?.abort(), [])

  async function send(text) {
    const question = text.trim()
    if (!question || busy) return
    setInput('')
    setBusy(true)
    const history = messages.filter((m) => m !== WELCOME)
    setMessages((m) => [...m, { role: 'user', content: question }, { role: 'assistant', content: '', pending: true }])

    const appendToLast = (fn) =>
      setMessages((m) => {
        const copy = [...m]
        copy[copy.length - 1] = fn(copy[copy.length - 1])
        return copy
      })

    abortRef.current = new AbortController()
    try {
      const { mode, sources, fallbackReason } = await askAssistant({
        question,
        history,
        signal: abortRef.current.signal,
        onToken: (t) => appendToLast((msg) => ({ ...msg, content: msg.content + t, pending: false })),
      })
      appendToLast((msg) => ({ ...msg, pending: false, mode, fallbackReason, sources: sources.map((s) => s.title) }))
    } catch (err) {
      if (err.name !== 'AbortError') {
        appendToLast((msg) => ({ ...msg, pending: false, content: 'Sorry, something went wrong. Please try again.' }))
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="btn-primary fixed bottom-5 right-5 z-40 rounded-full px-5 py-3 shadow-2xl"
          aria-label="Open AI assistant"
        >
          <span aria-hidden>✦</span> Ask<span className="hidden sm:inline"> about Monica</span>
        </button>
      )}

      {open && (
        <div className="fixed inset-x-2 bottom-2 z-[60] flex h-[78vh] flex-col overflow-hidden rounded-2xl border border-ink-600 bg-ink-900 shadow-2xl shadow-black/50 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:h-[600px] sm:w-[400px]">
          <div className="flex items-center justify-between border-b border-ink-700 bg-ink-800/80 px-4 py-3">
            <div>
              <div className="font-semibold text-white">Monica's AI Assistant</div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-accent-mint' : 'bg-accent-amber'}`} />
                {live ? 'Live · RAG + Llama 3.3 on Groq' : 'Offline mode · answers from profile search'}
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="sim-btn" aria-label="Close assistant">
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'flex justify-end' : ''}>
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user' ? 'bg-accent text-ink-950' : 'border border-ink-700 bg-ink-950/60 text-slate-200'
                  }`}
                >
                  {m.pending ? (
                    <span className="inline-flex gap-1" aria-label="Thinking">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="typing-dot h-1.5 w-1.5 rounded-full bg-slate-400" style={{ animationDelay: `${d * 0.15}s` }} />
                      ))}
                    </span>
                  ) : m.role === 'user' ? (
                    m.content
                  ) : (
                    <div className="space-y-1">
                      <Formatted text={m.content} />
                    </div>
                  )}
                  {m.sources?.length > 0 && (
                    <div className="mt-2 border-t border-ink-700 pt-2 text-[10px] text-slate-500">
                      Sources: {m.sources.join(' · ')}
                    </div>
                  )}
                  {m.fallbackReason && (
                    <div className="mt-1 text-[10px] text-accent-amber">Live AI unavailable ({m.fallbackReason}), showing profile excerpts.</div>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2">
                {STARTERS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-ink-600 px-3 py-1 text-xs text-slate-300 transition hover:border-accent hover:text-white"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex gap-2 border-t border-ink-700 p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={600}
              placeholder="Ask about projects, skills, impact…"
              className="flex-1 rounded-xl border border-ink-600 bg-ink-950 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-accent"
              aria-label="Your question"
            />
            <button type="submit" disabled={busy || !input.trim()} className="btn-primary px-4 py-2 text-sm disabled:opacity-50">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
}
