import { resume } from '../data/resume'
import SectionHeading from './SectionHeading'

// Skills component - tech stack by category, plus engineering principles
function Skills() {
  return (
    <section id="skills" className="py-20 border-t border-slate-800/80">
      <SectionHeading eyebrow="03 — Skills" title="Tools I use in production" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {resume.skills.map(group => (
          <div key={group.category}>
            <h3 className="text-sm font-semibold text-slate-50 mb-3">{group.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map(item => (
                <li key={item} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sm text-slate-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="mt-16 mb-6 text-xl font-semibold text-slate-50">How I work</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resume.principles.map(principle => (
          <div key={principle.title} className="p-5 rounded-xl border border-slate-800 bg-slate-900/40">
            <h4 className="font-semibold text-slate-50">{principle.title}</h4>
            <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{principle.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
