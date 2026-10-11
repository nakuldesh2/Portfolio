export default function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-10">
      <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</div>
      <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-slate-400">{subtitle}</p>}
    </div>
  )
}
