import { education } from '../data/profile.js'
import SectionHeader from './SectionHeader.jsx'

export default function Education() {
  return (
    <section id="education" className="section">
      <SectionHeader eyebrow="Education" title="Education" />
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((e) => (
          <div key={e.school} className="card p-6">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-white">{e.school}</h3>
              <span className="text-xs text-slate-400">
                {e.period} · {e.location}
              </span>
            </div>
            <div className="mt-1 text-accent">{e.degree}</div>
            <div className="mt-4 text-xs uppercase tracking-wider text-slate-500">Coursework</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {e.coursework.map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
