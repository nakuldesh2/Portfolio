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

// Simple text similarity function
// In production, you'd use vector embeddings for better matching
function calculateSimilarity(text1, text2) {
  const words1 = text1.toLowerCase().split(/\s+/)
  const words2 = text2.toLowerCase().split(/\s+/)

  const commonWords = words1.filter(w => words2.includes(w))
  return commonWords.length / Math.max(words1.length, words2.length)
}

// Search knowledge base for relevant information
export function retrieveContext(query) {
  const results = []

  // Search projects
  knowledgeBase.projects.forEach(project => {
    const similarity = calculateSimilarity(
      query,
      `${project.name} ${project.summary} ${project.technologies.join(' ')}`
    )
    if (similarity > 0.1) {
      results.push({
        type: 'project',
        score: similarity,
        content: `Project: ${project.name}\nSummary: ${project.summary}\nTechnologies: ${project.technologies.join(', ')}`
      })
    }
  })

  // Search skills
  Object.values(knowledgeBase.skills).forEach(skillGroup => {
    const similarity = calculateSimilarity(
      query,
      `${skillGroup.category} ${skillGroup.items.join(' ')}`
    )
    if (similarity > 0.05) {
      results.push({
        type: 'skill',
        score: similarity,
        content: `${skillGroup.category}: ${skillGroup.items.join(', ')}`
      })
    }
  })

  // Search experience
  knowledgeBase.experience.forEach(job => {
    const similarity = calculateSimilarity(
      query,
      `${job.company} ${job.role} ${job.keyResponsibilities.join(' ')}`
    )
    if (similarity > 0.1) {
      results.push({
        type: 'experience',
        score: similarity,
        content: `${job.role} at ${job.company}\n${job.keyResponsibilities.slice(0, 2).join(', ')}`
      })
    }
  })

  // Search achievements
  knowledgeBase.achievements.forEach(achievement => {
    const similarity = calculateSimilarity(
      query,
      `${achievement.title} ${achievement.impact}`
    )
    if (similarity > 0.1) {
      results.push({
        type: 'achievement',
        score: similarity,
        content: `${achievement.title}: ${achievement.impact}`
      })
    }
  })

  // Sort by relevance and return top 3
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(r => r.content)
}

// Build context string for LLM prompt
export function buildPromptContext(query) {
  const relevantContext = retrieveContext(query)

  if (relevantContext.length === 0) {
    return `
I'm an AI assistant representing Nakul Deshpande's portfolio.

About Nakul:
- Software engineer with 6+ years of experience
- Built Tier-1 distributed systems at Amazon
- Expertise in backend architecture, cloud systems, and AI/ML integration
- Passionate about production reliability and safe migrations
    `
  }

  return `
I'm an AI assistant representing Nakul Deshpande's portfolio.

Relevant Information:
${relevantContext.map((ctx, i) => `${i + 1}. ${ctx}`).join('\n\n')}

Answer the user's question based on this information about Nakul's experience and projects.
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
