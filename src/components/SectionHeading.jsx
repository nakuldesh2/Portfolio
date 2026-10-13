// Consistent section header: mono eyebrow + title + optional intro line
function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-sm text-sky-400 mb-2">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-50">{title}</h2>
      {children && <p className="mt-3 text-slate-400 max-w-2xl">{children}</p>}
    </div>
  )
}

export default SectionHeading
