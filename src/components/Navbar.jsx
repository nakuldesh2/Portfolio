// Navbar component - navigation and chat toggle
function Navbar({ onChatClick }) {
  return (
    <nav className="sticky top-0 z-50 bg-dark-900 bg-opacity-95 backdrop-blur-sm border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name */}
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Nakul Deshpande
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-8">
            <a href="#resume" className="text-gray-300 hover:text-white transition">Skills</a>
            <a href="#projects" className="text-gray-300 hover:text-white transition">Projects</a>
          </div>

          {/* Chat Button */}
          <button
            onClick={onChatClick}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2"
          >
            <span>💬</span>
            <span>Ask Me</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
