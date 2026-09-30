// Footer component - social links and contact info
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-950 border-t border-gray-700 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-white mb-4">About</h3>
            <p className="text-gray-400 text-sm">
              Software engineer specializing in distributed systems, AI/ML, and production-scale engineering.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-cyan-400 transition">GitHub</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">LinkedIn</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Email</a></li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-bold text-white mb-4">Built With</h3>
            <p className="text-gray-400 text-sm">
              React • Vite • Tailwind CSS • Groq LLM
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
          <p>© {currentYear} Nakul Deshpande. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
