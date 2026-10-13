/**
 * RAG Service (Retrieval-Augmented Generation)
 *
 * This service retrieves relevant context from Nakul's knowledge base
 * based on user questions, which is then sent to the LLM.
 *
 * WHY RAG?
 * --------
 * Instead of fine-tuning the LLM (expensive, complex):
 * 1. User asks a question
 * 2. Search knowledge base for relevant context
 * 3. Send context + question to Groq
 * 4. Get grounded answer (no hallucinations)
 *
 * This approach:
 * - Keeps answers factually accurate
 * - Is easy to update (just edit JSON)
 * - Shows understanding of production AI patterns
 * - Works on static GitHub Pages (no backend needed)
 */

import { knowledgeBase } from '../data/knowledgeBase'

// Words too common to signal relevance
const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'did', 'do', 'does', 'for',
  'from', 'has', 'have', 'he', 'his', 'how', 'i', 'in', 'is', 'it', 'me', 'my', 'of',
  'on', 'or', 'tell', 'that', 'the', 'this', 'to', 'was', 'what', 'when', 'where',
  'which', 'who', 'why', 'with', 'you', 'your', 'about', 'nakul', 'nakuls',
  'any', 'some', 'there', 'their', 'give', 'explain', 'describe', 'know', 'work',
])

// Lowercase, split on non-alphanumerics, drop stopwords, crude plural stemming
function tokenize(text) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(w => w.length > 1 && !STOPWORDS.has(w))
    .map(w => (w.length > 3 && w.endsWith('s') ? w.slice(0, -1) : w))
}

// Render any KB value (string, array, nested object) as readable text
function toText(value, indent = '') {
  if (Array.isArray(value)) {
    return value.map(v => `${indent}- ${toText(v, indent + '  ').trimStart()}`).join('\n')
  }
  if (value && typeof value === 'object') {
    return Object.entries(value)
      .filter(([key]) => key !== 'id')
      .map(([key, v]) => {
        const text = toText(v, indent + '  ')
        return typeof v === 'object' ? `${indent}${key}:\n${text}` : `${indent}${key}: ${text}`
      })
      .join('\n')
  }
  return String(value)
}

// Flatten the knowledge base into one document per experience, project, skill group, etc.
// In production, you'd chunk and embed these with a vector model instead
function buildDocuments() {
  const docs = []
  Object.entries(knowledgeBase).forEach(([section, value]) => {
    if (section === 'professional') return
    const entries = Array.isArray(value) ? value.map(item => [section, item]) : Object.entries(value)
    entries.forEach(([key, item]) => {
      const title = item.name || item.title || item.company || item.category || item.institution || key.replace(/_/g, ' ')
      const body = `${title}\n${toText(item)}`
      // Section label is shown to the LLM but not indexed, so "experience" doesn't match every job
      docs.push({ text: `[${section}] ${body}`, tokens: new Set(tokenize(body)), titleTokens: new Set(tokenize(title)) })
    })
  })
  return docs
}

const documents = buildDocuments()

// Rare terms (e.g. "SageMaker") matter more than ones that appear everywhere (e.g. "AWS")
const idf = term => {
  const df = documents.filter(d => d.tokens.has(term)).length
  return df === 0 ? 0 : Math.log(documents.length / df) + 1
}

// Search knowledge base for relevant information (keyword match weighted by IDF)
export function retrieveContext(query, limit = 4) {
  const terms = [...new Set(tokenize(query))]
  if (terms.length === 0) return []

  return documents
    .map(doc => ({
      doc,
      score: terms.reduce((sum, term) => {
        if (!doc.tokens.has(term)) return sum
        // Matches in the title (project name, company) count double
        return sum + idf(term) * (doc.titleTokens.has(term) ? 2 : 1)
      }, 0),
    }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(r => r.doc.text)
}

// Always-included overview so broad questions ("what's his background?") still get grounded answers
function getProfileContext() {
  const { title, summary } = knowledgeBase.professional
  const roles = knowledgeBase.experience
    .map(job => `- ${job.role} at ${job.company} (${job.duration}): ${job.focus}. Impact: ${job.impact}`)
    .join('\n')
  return `${title}\n${summary}\n\nExperience:\n${roles}`
}

// Build context string for LLM prompt
export function buildPromptContext(query) {
  const relevantContext = retrieveContext(query)

  return `
I'm an AI assistant representing Nakul Deshpande's portfolio.

Profile:
${getProfileContext()}
${relevantContext.length > 0 ? `
Relevant Information:
${relevantContext.map((ctx, i) => `${i + 1}. ${ctx}`).join('\n\n')}
` : ''}
Answer the user's question based on this information about Nakul's experience and projects.
If the information above doesn't cover the question, say so rather than guessing.
    `
}

// Build system prompt for consistent behavior
export function getSystemPrompt() {
  return `You are an AI assistant representing Nakul Deshpande's professional portfolio.

Your role:
- Answer questions about Nakul's experience, skills, and projects
- Highlight relevant technical achievements
- Explain how different skills were applied in production systems
- Be honest about limitations and areas for improvement
- Direct hiring managers to specific projects when relevant

Tone:
- Professional but friendly
- Technical (hiring managers understand complex systems)
- Confident but humble
- Concise (answer in 1-2 paragraphs)

Never:
- Make up projects or experience
- Exaggerate metrics
- Claim expertise where it doesn't exist
- Go off-topic from professional experience`
}
