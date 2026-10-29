// `npm run ask -- "your question"`: see what the retriever would send to the LLM.
// Handy for debugging "why did the chatbot answer that?"
import { buildKnowledgeBase } from '../src/ai/knowledge.js'
import { createRetriever, offlineAnswer } from '../src/ai/retriever.js'

const question = process.argv.slice(2).join(' ') || 'What did Monica build at AWS?'
const results = createRetriever(buildKnowledgeBase())(question, 4)
console.log(`Q: ${question}\n`)
for (const r of results) console.log(`${r.score.toFixed(2).padStart(6)}  ${r.title}`)
console.log(`\nOffline answer:\n${offlineAnswer(question, results)}`)
