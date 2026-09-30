// Hero component - welcome section with intro
function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 animate-fade-in">
      <div className="text-center space-y-6">
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Software Engineer
          </span>
          <br />
          <span className="text-white">& AI Systems Builder</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Designing and building Tier-1 distributed systems with a focus on
          <span className="text-cyan-400"> production reliability</span>,
          <span className="text-blue-400"> AI/ML integration</span>, and
          <span className="text-cyan-400"> security-first architecture</span>.
        </p>

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-4 pt-8 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-400">10+</p>
            <p className="text-gray-400">Major Projects</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-cyan-400">Billions</p>
            <p className="text-gray-400">Records Processed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-400">Tier-1</p>
            <p className="text-gray-400">Production Systems</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center pt-8">
          <a href="#resume" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
            View Experience
          </a>
          <a href="#projects" className="px-6 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-dark-900 rounded-lg transition">
            See Projects
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
