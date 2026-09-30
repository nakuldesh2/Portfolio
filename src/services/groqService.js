/**
 * Groq LLM Service
 *
 * Handles calls to Groq API for ultra-fast LLM inference.
 * Groq provides:
 * - Free tier: 12,500 tokens/day (perfect for demo)
 * - Blazing fast: Best-in-class inference speed
 * - No credit card required
 *
 * Why Groq?
 * - Demonstrates understanding of modern LLM APIs
 * - Free tier sufficient for production demo
 * - Extremely fast (important for user experience)
 * - Shows you've evaluated multiple LLM providers
 */

import { getSystemPrompt, buildPromptContext } from './ragService'

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

// Check if API key is configured
export function isGroqConfigured() {
  return !!GROQ_API_KEY
}

/**
 * Call Groq API with streaming support
 *
 * Why streaming?
 * - Better UX: User sees response appearing in real-time
 * - Saves tokens: Only pay for tokens used
 * - Feels more responsive: Don't wait for full response
 */
export async function callGroqAPI(userQuery, onChunk) {
  if (!isGroqConfigured()) {
    throw new Error('Groq API key not configured. Set VITE_GROQ_API_KEY in .env')
  }

  const systemPrompt = getSystemPrompt()
  const contextPrompt = buildPromptContext(userQuery)
  const fullPrompt = `${contextPrompt}\n\nUser Question: ${userQuery}`

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768', // Fast open-source model
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: fullPrompt,
          },
        ],
        temperature: 0.7, // Balanced: not too rigid, not too random
        max_tokens: 500, // Keep responses concise
        stream: true, // Enable streaming for better UX
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Groq API error: ${error.error?.message || 'Unknown error'}`)
    }

    // Handle streaming response
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()

      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')

      // Keep last incomplete line in buffer
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)

          if (data === '[DONE]') {
            continue
          }

          try {
            const parsed = JSON.parse(data)
            const chunk = parsed.choices?.[0]?.delta?.content

            if (chunk) {
              onChunk(chunk)
            }
          } catch (e) {
            // Skip parsing errors
          }
        }
      }
    }
  } catch (error) {
    console.error('Groq API call failed:', error)
    throw error
  }
}

/**
 * Non-streaming fallback (if streaming fails)
 * Sometimes useful for debugging or constrained environments
 */
export async function callGroqAPISimple(userQuery) {
  if (!isGroqConfigured()) {
    throw new Error('Groq API key not configured')
  }

  const systemPrompt = getSystemPrompt()
  const contextPrompt = buildPromptContext(userQuery)
  const fullPrompt = `${contextPrompt}\n\nUser Question: ${userQuery}`

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-32768',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: fullPrompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Groq API error: ${error.error?.message}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || 'No response generated'
}

// Fallback response when API is not available
export function getFallbackResponse(query) {
  const responses = {
    'projects': 'I have worked on 10+ major projects including Tier-1 systems at Amazon, financial platforms at Ostrich, and enterprise software at SM Enterprises. Ask me about a specific project!',
    'skills': 'My core skills are Java/Spring Backend, Python, AWS Cloud, Distributed Systems, and AI/ML. I also have frontend experience with React.',
    'experience': 'I have 6+ years of experience building production systems. Most recently at Amazon working on Content Asset Service, before that at Ostrich Software Solutions and SM Enterprises.',
    'ai': 'I have experience with Generative AI through projects like SmartScanner (ML) and AI-Assisted Onboarding (LLM + RAG). I believe AI should optimize, not replace, deterministic controls.',
    'migration': 'I led a large-scale migration of 2,500+ customers to Scrutinizer with zero downtime using shadow mode and gradual traffic shift techniques.',
  }

  const keyword = Object.keys(responses).find(key => query.toLowerCase().includes(key))
  return responses[keyword] || 'Ask me about my projects, skills, experience, or specific technical achievements!'
}
