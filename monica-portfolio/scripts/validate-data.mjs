// `npm run check`: catches data mistakes before they reach the live site.
//   1. Structural checks on every project + simulation config
//   2. Retrieval sanity checks: known questions must find the right chunk
// Exits non-zero on errors, so CI blocks a broken deploy.

import { projects } from '../src/data/projects.js'
import { experience } from '../src/data/profile.js'
import { buildKnowledgeBase } from '../src/ai/knowledge.js'
import { createRetriever } from '../src/ai/retriever.js'

import { CANVAS, KIND, LABEL_MAX_CHARS, NODE, STATUS } from '../src/lib/simulation.js'

const KINDS = Object.keys(KIND)
const STATUSES = Object.keys(STATUS)

const errors = []
const warnings = []
const err = (where, msg) => errors.push(`✗ ${where}: ${msg}`)

const ids = new Set()
for (const p of projects) {
  const where = `project "${p.id}"`
  if (ids.has(p.id)) err(where, 'duplicate project id')
  ids.add(p.id)
  for (const f of ['title', 'company', 'period', 'category', 'summary', 'challenge']) {
    if (!p[f]) err(where, `missing "${f}"`)
  }
  for (const f of ['approach', 'impact', 'tech']) {
    if (!Array.isArray(p[f]) || !p[f].length) err(where, `"${f}" must be a non-empty array`)
  }
  if (p.reviewed === false) warnings.push(`• ${p.id}: not yet confirmed by Monica (reviewed: false)`)

  const sim = p.simulation
  if (!sim) {
    err(where, 'missing simulation')
    continue
  }
  const nodeIds = new Set()
  for (const n of sim.nodes) {
    if (nodeIds.has(n.id)) err(where, `duplicate node "${n.id}"`)
    nodeIds.add(n.id)
    if (!KINDS.includes(n.kind)) err(where, `node "${n.id}" has unknown kind "${n.kind}"`)
    if (n.x - NODE.w / 2 < 0 || n.x + NODE.w / 2 > CANVAS.w || n.y - NODE.h / 2 < 0 || n.y + NODE.h / 2 > CANVAS.h)
      err(where, `node "${n.id}" at (${n.x}, ${n.y}) is outside the ${CANVAS.w}x${CANVAS.h} canvas`)
    if (n.label.length > LABEL_MAX_CHARS) warnings.push(`• ${p.id}/${n.id}: label "${n.label}" may overflow its box`)
  }
  for (let i = 0; i < sim.nodes.length; i++)
    for (let j = i + 1; j < sim.nodes.length; j++) {
      const a = sim.nodes[i]
      const b = sim.nodes[j]
      if (Math.abs(a.x - b.x) < NODE.w + 10 && Math.abs(a.y - b.y) < NODE.h + 10)
        err(where, `nodes "${a.id}" and "${b.id}" overlap`)
    }
  const edgeIds = new Set()
  for (const [from, to] of sim.edges) {
    if (!nodeIds.has(from)) err(where, `edge ${from}->${to}: unknown node "${from}"`)
    if (!nodeIds.has(to)) err(where, `edge ${from}->${to}: unknown node "${to}"`)
    edgeIds.add(`${from}->${to}`)
  }
  if (!sim.steps?.length) err(where, 'simulation needs at least one step')
  sim.steps?.forEach((s, i) => {
    const w = `${where} step ${i + 1}`
    if (!s.title || !s.text) err(w, 'needs title and text')
    for (const n of s.nodes || []) if (!nodeIds.has(n)) err(w, `unknown node "${n}"`)
    for (const e of s.edges || []) if (!edgeIds.has(e)) err(w, `unknown edge "${e}" (edges are "from->to")`)
    for (const [n, st] of Object.entries(s.status || {})) {
      if (!nodeIds.has(n)) err(w, `status for unknown node "${n}"`)
      if (!STATUSES.includes(st)) err(w, `unknown status "${st}"`)
    }
  })
}

for (const e of experience)
  for (const id of e.projectIds) if (!ids.has(id)) err(`experience "${e.company} / ${e.role}"`, `unknown project "${id}"`)

// Retrieval sanity checks: [question, id the top-3 results must include]
const retrieve = createRetriever(buildKnowledgeBase())
const EXPECT = [
  ['What is medallion architecture?', 'project-medallion-lakehouse'],
  ['How did she build the Airflow DAG generator?', 'project-medallion-lakehouse'],
  ['Tell me about the agentic AI and MCP work', 'project-agentic-design-review'],
  ['How did she safely delete 19 petabytes of data?', 'project-controlled-deletion'],
  ['Tell me about the deletion project', 'project-controlled-deletion'],
  ['SSO and OpenID Connect with Cognito', 'project-partner-onboarding'],
  ['How did she replace the SFTP workflow?', 'project-partner-onboarding'],
  ['How did she automate Spark out of memory recovery?', 'project-spark-auto-recovery'],
  ['Kafka streaming experience', 'project-kafka-feed-platform'],
  ['IP anonymization CryptoPAN', 'project-cryptopan-anonymization'],
  ['Where did she study?', 'edu-Northeastern University'],
  ['What did she do at Bosch?', 'exp-Bosch-Backend Engineer'],
  ['How can I contact her?', 'contact'],
  ['What cloud services does she know?', 'skills-Cloud Services'],
  ['Explain the spark job recovery', 'project-spark-auto-recovery'],
  ['What did she do at Wavteq?', 'exp-Wavteq-Software Engineer'],
]
// Questions about things NOT in the profile must retrieve nothing, so the
// assistant says "I don't have that" instead of answering about something else.
const EXPECT_NOTHING = ['Tell me about her DeepSeek fine-tuning', 'Tell me about her blockchain work', 'What is your favorite food?']
for (const q of EXPECT_NOTHING) {
  const got = retrieve(q, 3).map((c) => c.id)
  if (got.length) err('retrieval', `"${q}" → expected no matches, got [${got.join(', ')}]`)
}
for (const [q, expected] of EXPECT) {
  const got = retrieve(q, 3).map((c) => c.id)
  if (!got.includes(expected)) err('retrieval', `"${q}" → expected "${expected}" in top 3, got [${got.join(', ')}]`)
}

console.log(`Checked ${projects.length} projects and ${EXPECT.length + EXPECT_NOTHING.length} retrieval cases.`)
if (warnings.length) console.log(`\nWarnings:\n${warnings.join('\n')}`)
if (errors.length) {
  console.error(`\nErrors:\n${errors.join('\n')}`)
  process.exit(1)
}
console.log('\n✓ All checks passed')
