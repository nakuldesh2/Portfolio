// Resume component - skills, education, achievements
function Resume() {
  return (
    <section id="resume" className="py-20">
      <div className="space-y-12">
        <h2 className="text-4xl font-bold text-white">Experience & Skills</h2>

        {/* Placeholder - will be populated with data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-dark-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold text-cyan-400">Backend Development</h3>
            <p className="text-gray-300 mt-2">Java • Spring Boot • Python • Distributed Systems</p>
          </div>

          <div className="bg-dark-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold text-cyan-400">Cloud & DevOps</h3>
            <p className="text-gray-300 mt-2">AWS • Lambda • DynamoDB • Docker • CI/CD</p>
          </div>

          <div className="bg-dark-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold text-cyan-400">AI/ML</h3>
            <p className="text-gray-300 mt-2">LLMs • RAG • SageMaker • Bedrock • Feature Engineering</p>
          </div>

          <div className="bg-dark-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold text-cyan-400">Frontend</h3>
            <p className="text-gray-300 mt-2">React • JavaScript • Tailwind CSS • Responsive Design</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume
