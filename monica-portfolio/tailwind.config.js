/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#070b14', 900: '#0b1220', 800: '#111a2e', 700: '#1a2540', 600: '#26345a' },
        accent: { DEFAULT: '#38bdf8', soft: '#7dd3fc', violet: '#a78bfa', mint: '#34d399', amber: '#fbbf24', rose: '#fb7185' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
