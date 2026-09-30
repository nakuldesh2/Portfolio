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
 */
function Chat({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m Nakul\'s AI assistant powered by RAG (Retrieval-Augmented Generation). Ask me anything about his projects, skills, experience, or architectural achievements!',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

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

    try {
      // Initialize assistant message that will stream content
      const assistantMessage = { role: 'assistant', content: '' }
      setMessages(prev => [...prev, assistantMessage])

      if (isGroqConfigured()) {
        // Use LLM with streaming
        await callGroqAPI(input, (chunk) => {
          setMessages(prev => {
            const updated = [...prev]
            updated[updated.length - 1].content += chunk
            return updated
          })
        })
      } else {
        // Use fallback response
        const response = getFallbackResponse(input)
        assistantMessage.content = response
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = assistantMessage
          return updated
        })
      }
    } catch (error) {
      console.error('Chat error:', error)
      // Show error message
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1].content =
          'Sorry, something went wrong. Try again or use fallback responses.'
        return updated
      })
    }

    setLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      handleSend()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-96 bg-dark-800 rounded-lg shadow-2xl border border-gray-700 flex flex-col z-40 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-dark-900">
        <div>
          <h3 className="font-bold text-white">Ask Me Anything</h3>
          <p className="text-xs text-gray-400">Powered by RAG + Groq LLM</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition text-xl"
        >
          ✕
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-dark-700 text-gray-300 rounded-bl-none'
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
            <div className="bg-dark-700 text-gray-300 px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700 bg-dark-900 flex gap-2">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about projects, skills, experience..."
          className="flex-1 bg-dark-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-20"
          rows="1"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          {loading ? '⏳' : '→'}
        </button>
      </div>

      {/* Info Message */}
      {!isGroqConfigured() && (
        <div className="px-4 py-2 bg-yellow-900 text-yellow-200 text-xs text-center border-t border-gray-700">
          Using fallback responses (API key not configured)
        </div>
      )}
    </div>
  )
}

export default Chat
