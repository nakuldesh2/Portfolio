import { useEffect } from 'react'
import Simulation from './Simulation.jsx'

export default function ProjectModal({ project, onClose, onAsk }) {
  // Close on Escape and lock background scroll while open.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-ink-950/85 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <div className="mx-auto my-6 max-w-7xl px-3 sm:my-10 sm:px-6">
        <div className="card overflow-hidden">
          <div className="flex items-start justify-between gap-4 border-b border-ink-700 p-5 sm:p-6">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="chip">{project.category}</span>
                <span className="text-xs text-slate-400">
                  {project.company} · {project.period}
                </span>
              </div>
              <h3 id="project-title" className="text-xl font-bold text-white sm:text-2xl">
                {project.title}
              </h3>
            </div>
            <button onClick={onClose} className="sim-btn" aria-label="Close">
              ✕
            </button>
          </div>

          <div className="p-4 sm:p-6">
            <Simulation key={project.id} project={project} />

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {project.impact.map((m) => (
                <div key={m.label} className="rounded-xl border border-ink-700 bg-ink-950/60 p-4">
                  <div className="gradient-text text-2xl font-bold">{m.value}</div>
                  <div className="text-sm text-slate-400">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold text-white">Overview</h4>
                <p className="text-sm leading-relaxed text-slate-300">{project.summary}</p>
                <h4 className="mb-2 mt-5 font-semibold text-white">The challenge</h4>
                <p className="text-sm leading-relaxed text-slate-300">{project.challenge}</p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-white">Approach</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  {project.approach.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="text-accent">→</span>
                      {a}
                    </li>
                  ))}
                </ul>
                <h4 className="mb-2 mt-5 font-semibold text-white">Tech</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-accent/30 bg-accent/5 p-4">
              <p className="text-sm text-slate-300">Have a question about this project? The AI assistant knows the details.</p>
              <button onClick={() => onAsk(`Tell me more about the ${project.title} project`)} className="btn-primary px-4 py-2 text-sm">
                ✦ Ask AI about this project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
