// Projects component - showcase of major projects
function Projects() {
  // Placeholder projects - will be populated with actual data
  const projects = [
    { id: 1, name: 'Loading Projects...', description: 'Building your portfolio showcase' }
  ]

  return (
    <section id="projects" className="py-20">
      <div className="space-y-12">
        <h2 className="text-4xl font-bold text-white">Featured Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-dark-800 p-6 rounded-lg border border-gray-700 hover:border-cyan-400 transition cursor-pointer">
              <h3 className="text-xl font-bold text-white">{project.name}</h3>
              <p className="text-gray-300 mt-2">{project.description}</p>
              <button className="mt-4 text-cyan-400 hover:text-cyan-300 transition">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
