import { useState } from 'react'

// Chat component - AI chatbot interface
// Will integrate with Groq LLM and RAG
function Chat({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m Nakul\'s AI assistant. Ask me anything about his projects, skills, or experience!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Placeholder - will integrate Groq API here
      // For now, just echo the question
      const response = { role: 'assistant', content: 'I\'m being developed to answer that!' }
      setMessages(prev => [...prev, response])
    } catch (error) {
      console.error('Chat error:', error)
    }

    setLoading(false)
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-96 bg-dark-800 rounded-lg shadow-2xl border border-gray-700 flex flex-col z-40">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h3 className="font-bold text-white">Ask Me Anything</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-3 rounded-lg ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-dark-700 text-gray-300'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm">Thinking...</div>}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask about my projects..."
          className="flex-1 bg-dark-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
