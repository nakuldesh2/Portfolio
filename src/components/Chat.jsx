import { useState, useRef, useEffect } from 'react'
import { callGroqAPI, getFallbackResponse, isGroqConfigured } from '../services'

/**
 * Chat Component - AI Chatbot Interface
 *
 * Features:
 * - Uses RAG to retrieve relevant context from knowledge base
 * - Streams responses from Groq LLM for real-time display
 * - Fallback responses when API not configured
 * - Smooth animations and professional UI
 * - Resizable by dragging the top/left edges or top-left corner (size remembered)
 */
const DEFAULT_SIZE = { width: 420, height: 560 }
const MIN_SIZE = { width: 320, height: 360 }
const SIZE_STORAGE_KEY = 'chatSize'

function loadSize() {
  try {
    const saved = JSON.parse(localStorage.getItem(SIZE_STORAGE_KEY))
    if (saved?.width && saved?.height) return saved
  } catch {
    // Storage unavailable (private mode etc.) - use default
  }
  return DEFAULT_SIZE
}

function Chat({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m Nakul\'s AI assistant. I answer from his résumé and project notes, so ask about his experience, projects, or skills, e.g. "How did he migrate 2,500 tenants with zero downtime?"',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [size, setSize] = useState(loadSize)
  const [maximized, setMaximized] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    try {
      localStorage.setItem(SIZE_STORAGE_KEY, JSON.stringify(size))
    } catch {
      // Ignore - size just won't persist
    }
  }, [size])

  // Panel is anchored bottom-right, so dragging up/left grows it
  const startResize = (e, { horizontal, vertical }) => {
    e.preventDefault()
    setMaximized(false)
    const startX = e.clientX
    const startY = e.clientY
    const start = size

    const onMove = (ev) => {
      setSize({
        width: horizontal
          ? Math.min(Math.max(start.width + startX - ev.clientX, MIN_SIZE.width), window.innerWidth - 32)
          : start.width,
        height: vertical
          ? Math.min(Math.max(start.height + startY - ev.clientY, MIN_SIZE.height), window.innerHeight - 32)
          : start.height,
      })
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      document.body.style.userSelect = ''
    }

    document.body.style.userSelect = 'none'
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    // Add user message
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Replace (never mutate) the last message: StrictMode runs updaters twice in dev,
    // so in-place `+=` would append every chunk twice
    const updateLast = (getContent) =>
      setMessages(prev => [
        ...prev.slice(0, -1),
        { ...prev[prev.length - 1], content: getContent(prev[prev.length - 1].content) },
      ])

    try {
      // Initialize assistant message that will stream content
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      if (isGroqConfigured()) {
        // Use LLM with streaming
        await callGroqAPI(input, (chunk) => {
          updateLast(content => content + chunk)
        })
      } else {
        // Use fallback response
        const response = getFallbackResponse(input)
        updateLast(() => response)
      }
    } catch (error) {
      console.error('Chat error:', error)
      // Show error message
      updateLast(() => 'Sorry, something went wrong. Try again or use fallback responses.')
    }

    setLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      handleSend()
    }
  }

  return (
    <div
      className="fixed bottom-4 right-4 bg-slate-900 rounded-xl shadow-2xl shadow-black/50 border border-slate-800 flex flex-col z-40 overflow-hidden"
      style={{
        width: maximized ? 'calc(100vw - 2rem)' : size.width,
        height: maximized ? 'calc(100vh - 2rem)' : size.height,
        maxWidth: 'calc(100vw - 2rem)',
        maxHeight: 'calc(100vh - 2rem)',
      }}
    >
      {/* Resize handles: top edge, left edge, top-left corner */}
      <div
        onPointerDown={e => startResize(e, { vertical: true })}
        className="absolute top-0 left-4 right-0 h-1.5 cursor-ns-resize touch-none z-10 hover:bg-sky-400/40"
      />
      <div
        onPointerDown={e => startResize(e, { horizontal: true })}
        className="absolute top-4 left-0 bottom-0 w-1.5 cursor-ew-resize touch-none z-10 hover:bg-sky-400/40"
      />
      <div
        onPointerDown={e => startResize(e, { horizontal: true, vertical: true })}
        className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize touch-none z-20 group"
        title="Drag to resize"
      >
        <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-slate-600 group-hover:border-sky-400" />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-950">
        <div>
          <h3 className="font-semibold text-slate-50">Ask about my experience</h3>
          <p className="text-xs text-slate-500">AI assistant · RAG over my résumé + Groq LLM</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMaximized(m => !m)}
            className="text-slate-400 hover:text-slate-50 transition"
            title={maximized ? 'Restore size' : 'Maximize'}
            aria-label={maximized ? 'Restore size' : 'Maximize'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              {maximized
                ? <path d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4" />
                : <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" />}
            </svg>
          </button>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-50 transition text-xl"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-sky-400 text-slate-950 rounded-br-none'
                  : 'bg-slate-800 text-slate-200 rounded-bl-none'
              }`}
            >
              {/* Render message with line breaks */}
              {msg.content.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 text-slate-200 px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-800 bg-slate-950 flex gap-2">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about projects, skills, experience..."
          className="flex-1 bg-slate-800 text-slate-50 placeholder-slate-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none max-h-20"
          rows="1"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="px-4 py-2 bg-sky-400 hover:bg-sky-300 text-slate-950 font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          {loading ? '⏳' : '→'}
        </button>
      </div>

      {/* Info Message */}
      {!isGroqConfigured() && (
        <div className="px-4 py-2 bg-yellow-900 text-yellow-200 text-xs text-center border-t border-slate-800">
          Using fallback responses (API key not configured)
        </div>
      )}
    </div>
  )
}

export default Chat
