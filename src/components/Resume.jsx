import { resume } from '../data/resume'

// Resume component - skills, education, achievements
function Resume() {
  return (
    <section id="resume" className="py-20">
      <div className="space-y-16">
        {/* Section Header */}
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Experience & Skills</h2>
          <p className="text-gray-400">6+ years building Tier-1 systems at Amazon, fintech platforms at Ostrich, and enterprise software</p>
        </div>

        {/* Skills Grid */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8">Technical Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resume.skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-dark-800 p-6 rounded-lg border border-gray-700 hover:border-cyan-400 transition">
                <h4 className="text-lg font-bold text-cyan-400 mb-3">{skillGroup.category}</h4>
                <p className="text-gray-300">{skillGroup.items.join(' • ')}</p>
                <span className="text-xs text-gray-500 mt-2 block">Proficiency: {skillGroup.proficiency}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8">Work Experience</h3>
          <div className="space-y-6">
            {resume.experience.map((job, idx) => (
              <div key={idx} className="bg-dark-800 p-8 rounded-lg border border-gray-700 hover:border-blue-400 transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white">{job.role}</h4>
                    <p className="text-blue-400">{job.company}</p>
                  </div>
                  <span className="text-gray-400 text-sm">{job.duration}</span>
                </div>
                <ul className="space-y-2">
                  {job.highlights.slice(0, 4).map((highlight, hIdx) => (
                    <li key={hIdx} className="text-gray-300 flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">→</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8">Impact Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {resume.keyMetrics.map((metric, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-600 to-cyan-600 p-6 rounded-lg text-center">
                <p className="text-3xl font-bold text-white">{metric.value}</p>
                <p className="text-blue-100 text-sm mt-2">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Principles */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8">Engineering Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resume.principles.map((principle, idx) => (
              <div key={idx} className="bg-dark-800 p-6 rounded-lg border border-gray-700">
                <h4 className="text-lg font-bold text-cyan-400 mb-2">{principle.title}</h4>
                <p className="text-gray-300 text-sm">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume
