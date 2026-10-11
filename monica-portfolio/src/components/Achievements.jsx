import { achievements } from '../data/profile.js'
import SectionHeader from './SectionHeader.jsx'

const GRADIENTS = {
  accent: 'from-sky-400 to-cyan-300',
  violet: 'from-violet-400 to-fuchsia-300',
  mint: 'from-emerald-400 to-teal-300',
  amber: 'from-amber-400 to-orange-300',
  rose: 'from-rose-400 to-pink-300',
}

export default function Achievements() {
  return (
    <section id="achievements" className="section">
      <SectionHeader eyebrow="Achievements" title="Impact in numbers" subtitle="Every number here is backed by a project you can explore above." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a) => (
          <div key={a.title} className="card p-5">
            <div className={`bg-gradient-to-r ${GRADIENTS[a.color]} bg-clip-text text-3xl font-extrabold text-transparent`}>{a.metric}</div>
            <div className="mt-2 font-semibold text-white">{a.title}</div>
            <p className="mt-1 text-sm text-slate-400">{a.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
