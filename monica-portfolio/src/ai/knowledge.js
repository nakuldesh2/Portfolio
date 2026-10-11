// Builds the chatbot's knowledge base from the same data the UI renders.
// No separate hand-written KB means it can never drift out of sync with the page.
//
// `keywords` are searchable but never shown: they help generic questions
// ("summarize her", "most impactful work") find the right chunk.
//
// A "chunk" is a small, self-contained piece of text about one topic. RAG works
// best when each chunk answers one kind of question (e.g. "tell me about the
// deletion project"), so we create one chunk per role, project, skill group, etc.

import { profile, education, skills, experience, achievements } from '../data/profile.js'
import { projects } from '../data/projects.js'

export function buildKnowledgeBase() {
  const chunks = []
  const add = (id, title, text, extra = {}) => chunks.push({ id, title, text, ...extra })

  add(
    'about',
    'About Monica',
    `${profile.name} is a ${profile.title} based in ${profile.location}. ${profile.summary} ${profile.tagline}`,
    { keywords: 'summary summarize overview background introduction profile who career strengths' },
  )

  add(
    'contact',
    'Contact',
    `Email: ${profile.email}. GitHub: ${profile.github}.` +
      (profile.linkedin ? ` LinkedIn: ${profile.linkedin}.` : '') +
      ` Based in ${profile.location}. Open to Software Data Engineer / Data Engineer roles.`,
  )

  for (const e of education) {
    add(
      `edu-${e.school}`,
      `Education: ${e.school}`,
      `${e.degree} from ${e.school} (${e.location}). Coursework: ${e.coursework.join(', ')}.`,
    )
  }

  add(
    'skills-all',
    'Skills overview',
    skills.map((s) => `${s.category}: ${s.items.join(', ')}.`).join(' '),
  )
  for (const s of skills) {
    add(`skills-${s.category}`, `Skills: ${s.category}`, `${s.category}: ${s.items.join(', ')}.`)
  }

  for (const e of experience) {
    const related = e.projectIds
      .map((id) => projects.find((p) => p.id === id)?.title)
      .filter(Boolean)
    add(
      `exp-${e.company}-${e.role}`,
      `${e.role} at ${e.company} (${e.period})`,
      `${e.role} at ${e.company}, ${e.period}. ${e.bullets.join(' ')}` +
        (related.length ? ` Related projects: ${related.join('; ')}.` : ''),
    )
  }

  for (const p of projects) {
    add(
      `project-${p.id}`,
      `Project: ${p.title}`,
      [
        `${p.title} (${p.company}, ${p.period}, ${p.category}).`,
        p.summary,
        `Challenge: ${p.challenge}`,
        `Approach: ${p.approach.join(' ')}`,
        `Impact: ${p.impact.map((i) => `${i.value} ${i.label}`).join('; ')}.`,
        `Technologies: ${p.tech.join(', ')}.`,
        `How it works step by step: ${p.simulation.steps.map((s) => `${s.title}: ${s.text}`).join(' ')}`,
      ].join(' '),
      { projectId: p.id },
    )
  }

  add(
    'achievements',
    'Key achievements and metrics',
    achievements.map((a) => `${a.metric} ${a.title}: ${a.detail}`).join(' '),
    { keywords: 'impact impactful accomplishments proud best biggest results metrics strongest highlights' },
  )

  add(
    'portfolio',
    'About this portfolio and chatbot',
    'This portfolio is a React + Vite + Tailwind site hosted free on GitHub Pages. Each project has an animated, step-by-step simulation of its architecture. ' +
      'The AI assistant uses Retrieval-Augmented Generation (RAG): it searches a knowledge base generated from the portfolio data with BM25 ranking, then sends the top matches to a Llama model on Groq through a Cloudflare Worker that keeps the API key secret and streams the answer back. ' +
      'If the AI service is unavailable it falls back to answering directly from the retrieved profile text.',
  )

  return chunks
}
