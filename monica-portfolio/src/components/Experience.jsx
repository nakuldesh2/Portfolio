import { useState } from 'react'
import { experience } from '../data/profile.js'
import { getProject } from '../data/projects.js'
import SectionHeader from './SectionHeader.jsx'

function Role({ role, onOpenProject }) {
  const [expanded, setExpanded] = useState(false)
  const bullets = expanded ? role.bullets : role.bullets.slice(0, 3)
  return (
    <li className="relative pl-8">
      <span className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-accent bg-ink-950" />
      <div className="card p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-white">{role.role}</h3>
            <div className="text-accent">{role.company}</div>
          </div>
          <div className="font-mono text-xs text-slate-400">{role.period}</div>
        </div>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-300">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
              {b}
            </li>
          ))}
        </ul>
        {role.bullets.length > 3 && (
          <button onClick={() => setExpanded((e) => !e)} className="mt-3 text-sm text-accent hover:underline">
            {expanded ? 'Show less' : `Show ${role.bullets.length - 3} more`}
          </button>
        )}
        {role.projectIds.length > 0 && (
          <div className="mt-4 border-t border-ink-700 pt-4">
            <div className="mb-2 text-xs uppercase tracking-wider text-slate-500">See it in action</div>
            <div className="flex flex-wrap gap-2">
              {role.projectIds.map((id) => {
                const p = getProject(id)
                return (
                  p && (
                    <button
                      key={id}
                      onClick={() => onOpenProject(id)}
                      className="rounded-lg border border-ink-600 bg-ink-800 px-3 py-1.5 text-xs text-slate-200 transition hover:border-accent hover:text-white"
                    >
                      ▶ {p.title}
                    </button>
                  )
                )
              })}
            </div>
          </div>
        )}
      </div>
    </li>
  )
}

export default function Experience({ onOpenProject }) {
  return (
    <section id="experience" className="section">
      <SectionHeader
        eyebrow="Experience"
        title="Where I've worked"
        subtitle="From C++ backend systems and Kafka streaming to cloud data platforms and agentic AI at AWS. Click any project to watch an animated walkthrough."
      />
      <ol className="relative space-y-6 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-ink-600">
        {experience.map((r) => (
          <Role key={`${r.company}-${r.role}`} role={r} onOpenProject={onOpenProject} />
        ))}
      </ol>
    </section>
  )
}
