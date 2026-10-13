// The "R" in RAG: find the knowledge-base chunks most relevant to a question.
//
// Algorithm: BM25, the classic ranking function behind search engines like
// Elasticsearch/Lucene. Score is high when a chunk contains the query's rare
// words (IDF) several times (TF), normalized so long chunks don't win just by
// being long. It runs in the browser in well under a millisecond for this KB.
//
// Why not vector embeddings? With ~30 chunks, keyword search plus a small
// synonym map is accurate, free, needs no model download, and is easy to
// explain and debug. Embeddings are the natural next upgrade.

const STOPWORDS = new Set(
  ('a an and are as at be but by can could did do does for from had has have her hers how i in is it its me ' +
    'my of on or our she so tell than that the their them then there these this those to was we were what when ' +
    'where which who whom why will with would you your about any some more most much did done give show please ' +
    'monica monica\'s choudhari narendra describe explain talk walk through ' +
    // Conversational filler that appears in almost every question ("share more about her project").
    'project projects share detail details info information elaborate know tell me thing things work worked').split(' '),
)

// Query expansion: interviewers rarely use the exact words on a resume.
const SYNONYMS = {
  aws: ['amazon'],
  amazon: ['aws'],
  ml: ['machine', 'learning', 'model'],
  ai: ['genai', 'generative', 'model', 'llm'],
  genai: ['generative', 'ai', 'llm'],
  llm: ['generative', 'ai', 'bedrock', 'rag'],
  etl: ['pipeline', 'pipelines', 'spark'],
  pipeline: ['etl', 'pipelines'],
  warehouse: ['redshift', 'medallion', 'warehousing', 'lakehouse'],
  medallion: ['raw', 'curated', 'warehouse'],
  save: ['cost', 'savings'],
  incident: ['lse', 'outage', 'on-call', 'recovery'],
  outage: ['incident', 'lse', 'recovery', 'failures'],
  oncall: ['on-call', 'incident', 'lse'],
  failure: ['error', 'incident', 'recovery'],
  challenging: ['incident', 'lse', 'challenge'],
  hardest: ['incident', 'lse', 'challenge'],
  security: ['anonymization', 'cryptopan', 'oauth', 'lake', 'formation', 'governance'],
  agent: ['agentic', 'mcp', 'llm'],
  agentic: ['agent', 'mcp', 'llm'],
  mcp: ['model', 'context', 'protocol', 'agentic'],
  rag: ['retrieval', 'graph', 'embeddings', 'deepseek'],
  streaming: ['kafka', 'real-time', 'event-driven'],
  kafka: ['streaming', 'event-driven', 'real-time'],
  backend: ['c++', 'java', 'api', 'services', 'microservice'],
  frontend: ['react', 'angular', 'web'],
  lakehouse: ['medallion', 'bronze', 'silver', 'gold'],
  airflow: ['dag', 'orchestration', 'mwaa'],
  privacy: ['anonymization', 'cryptopan'],
  governance: ['lake', 'formation', 'permissions', 'glue'],
  permissions: ['lake', 'formation', 'governance'],
  monitoring: ['cloudwatch', 'alerts', 'dashboards', 'observability'],
  scaling: ['scale', 'emr', 'dynamic'],
  education: ['university', 'degree', 'master', 'coursework', 'northeastern'],
  degree: ['education', 'master', 'university'],
  school: ['education', 'university'],
  study: ['education', 'coursework'],
  skill: ['skills', 'languages', 'tools'],
  tech: ['skills', 'technologies'],
  stack: ['skills', 'technologies'],
  language: ['languages', 'python', 'sql'],
  contact: ['email', 'linkedin', 'github'],
  email: ['contact'],
  reach: ['contact', 'email'],
  leadership: ['led', 'spearheaded', 'coordinated', 'agile', 'planning', 'stakeholders'],
  lead: ['led', 'spearheaded', 'coordinated'],
  team: ['cross-functional', 'collaborated', 'stakeholders'],
  quality: ['data-quality', 'checks', 'accuracy', 'tests'],
  testing: ['tests', 'qa', 'ci/cd', 'test'],
  intern: ['internship'],
  internship: ['intern'],
  experience: ['role', 'engineer', 'analyst'],
  impact: ['achievements', 'metrics'],
  achievement: ['achievements', 'impact', 'metrics'],
  forecast: ['forecasting', 'statistical'],
  chatbot: ['portfolio', 'rag', 'groq'],
  built: ['portfolio'],
}

function stem(word) {
  if (word.length > 5 && word.endsWith('ing')) return word.slice(0, -3)
  if (word.length > 4 && word.endsWith('ies')) return word.slice(0, -3) + 'y'
  if (word.length > 4 && word.endsWith('ed')) return word.slice(0, -2)
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1)
  return word
}

export function tokenize(text) {
  return (text.toLowerCase().match(/[a-z0-9][a-z0-9/+.-]*[a-z0-9]|[a-z0-9]/g) || [])
    .filter((t) => !STOPWORDS.has(t))
    .map(stem)
}

// Query tokens are stemmed, so look synonyms up by stemmed key too.
const STEMMED_SYNONYMS = Object.fromEntries(Object.entries(SYNONYMS).map(([k, v]) => [stem(k), v]))

function expandQuery(tokens) {
  const out = [...tokens]
  for (const t of tokens) {
    for (const s of STEMMED_SYNONYMS[t] || []) out.push(...tokenize(s))
  }
  return out
}

export function createRetriever(chunks, { k1 = 1.4, b = 0.75 } = {}) {
  // Titles are repeated so a title match counts more than a passing mention.
  const docs = chunks.map((c) => {
    const tokens = tokenize(`${c.title} ${c.title} ${c.keywords || ''} ${c.text}`)
    const tf = new Map()
    for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1)
    return { chunk: c, tf, length: tokens.length }
  })
  const avgLen = docs.reduce((n, d) => n + d.length, 0) / Math.max(docs.length, 1)
  const df = new Map()
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) || 0) + 1)
  const idf = (t) => {
    const n = df.get(t) || 0
    return Math.log(1 + (docs.length - n + 0.5) / (n + 0.5))
  }

  return function retrieve(query, topK = 4) {
    const original = new Set(tokenize(query))
    const terms = expandQuery([...original])
    if (!terms.length) return []
    const scored = docs.map((d) => {
      let score = 0
      for (const t of new Set(terms)) {
        const f = d.tf.get(t)
        if (!f) continue
        // Words the user actually typed count fully; synonyms count half.
        const weight = original.has(t) ? 1 : 0.5
        score += weight * idf(t) * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.length) / avgLen)))
      }
      return { ...d.chunk, score }
    })
    const ranked = scored.filter((c) => c.score > 0).sort((x, y) => y.score - x.score)
    if (!ranked.length || ranked[0].score < MIN_SCORE) return []
    // Drop weak tail matches: a chunk scoring under 30% of the best one is
    // usually a coincidental shared word, and it would mislead the LLM.
    return ranked.filter((c) => c.score >= ranked[0].score * 0.3).slice(0, topK)
  }
}

// Below this, the best match is a coincidence rather than an answer.
const MIN_SCORE = 1

// A follow-up like "tell me more" or "why?" has no searchable words of its own,
// so the caller should search with the previous question instead.
export const isFollowUp = (question) => tokenize(question).length === 0

// Turn retrieved chunks into the context block sent to the LLM.
export function formatContext(chunks, maxChars = 6000) {
  let out = ''
  for (const c of chunks) {
    const block = `### ${c.title}\n${c.text}\n\n`
    if (out.length + block.length > maxChars) break
    out += block
  }
  return out.trim()
}

// Used when no LLM is reachable: answer straight from the best matches.
export function offlineAnswer(question, chunks) {
  if (!chunks.length) {
    return (
      "I couldn't find that in Monica's profile. Try asking about her experience at AWS, a specific project " +
      '(for example the medallion lakehouse or the agentic AI design-review platform), her skills, or her education.'
    )
  }
  const lines = chunks.slice(0, 2).map((c) => {
    const text = c.text.length > 300 ? c.text.slice(0, 300).replace(/\s+\S*$/, '') + '…' : c.text
    return `**${c.title}**\n${text}`
  })
  return `Here's what I found in Monica's profile:\n\n${lines.join('\n\n')}`
}
