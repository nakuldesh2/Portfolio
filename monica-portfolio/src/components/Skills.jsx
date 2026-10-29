import { skills } from '../data/profile.js'
import SectionHeader from './SectionHeader.jsx'

const ACCENTS = ['#38bdf8', '#a78bfa', '#34d399', '#fbbf24', '#f472b6']

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeader eyebrow="Skills" title="Toolbox" subtitle="What I use to build backend, data and AI systems end to end." />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <div key={s.category} className="card p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: ACCENTS[i % ACCENTS.length] }} />
              <h3 className="font-semibold text-white">{s.category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {s.items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
