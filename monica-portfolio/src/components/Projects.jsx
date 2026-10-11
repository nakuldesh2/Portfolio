import { useState } from 'react'
import { projects } from '../data/projects.js'
import { CANVAS, KIND, NODE, edgeGeometry } from '../lib/simulation.js'
import SectionHeader from './SectionHeader.jsx'

// A tiny, text-free thumbnail of the project's architecture for the card.
function MiniDiagram({ sim }) {
  const byId = Object.fromEntries(sim.nodes.map((n) => [n.id, n]))
  return (
    <svg viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`} className="h-full w-full" aria-hidden>
      {sim.edges.map(([a, b]) => (
        <path key={`${a}-${b}`} d={edgeGeometry(byId[a], byId[b]).d} fill="none" stroke="#26345a" strokeWidth="6" />
      ))}
      {sim.nodes.map((n) => (
        <rect key={n.id} x={n.x - NODE.w / 2} y={n.y - NODE.h / 2} width={NODE.w} height={NODE.h} rx={14} fill="#111a2e" stroke={KIND[n.kind].color} strokeWidth="5" />
      ))}
    </svg>
  )
}

export default function Projects({ onOpenProject }) {
  const categories = ['All', ...new Set(projects.map((p) => p.category))]
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="section">
      <SectionHeader
        eyebrow="Projects"
        title="Projects you can watch run"
        subtitle="Each project opens as an interactive, step-by-step animation of how the system works, with the real impact numbers."
      />
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-3 py-1 text-sm transition ${
              filter === c ? 'bg-accent text-ink-950' : 'border border-ink-600 text-slate-300 hover:border-accent'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <button
            key={p.id}
            onClick={() => onOpenProject(p.id)}
            className="card group flex flex-col overflow-hidden text-left transition hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10"
          >
            <div className="relative h-36 border-b border-ink-700 bg-ink-950/70 p-3">
              <MiniDiagram sim={p.simulation} />
              <span className="absolute inset-0 grid place-items-center bg-ink-950/0 opacity-0 transition group-hover:bg-ink-950/50 group-hover:opacity-100">
                <span className="btn-primary px-4 py-2 text-sm">▶ Play simulation</span>
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="chip">{p.category}</span>
                <span className="text-xs text-slate-500">{p.company}</span>
              </div>
              <h3 className="font-semibold text-white">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-slate-400">{p.summary}</p>
              <div className="mt-auto flex gap-4 pt-4">
                {p.impact.slice(0, 2).map((m) => (
                  <div key={m.label}>
                    <div className="gradient-text text-lg font-bold">{m.value}</div>
                    <div className="text-[11px] text-slate-500">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
