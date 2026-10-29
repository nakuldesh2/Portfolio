import { useEffect, useMemo, useRef, useState } from 'react'
import { CANVAS, KIND, NODE, STATUS, edgeGeometry, labelWidth } from '../lib/simulation.js'

// Data-driven architecture animation. A project's `simulation` config (nodes,
// edges, steps) is drawn as an SVG diagram. Each step highlights part of the
// system and sends "data particles" along the active edges using native SVG
// <animateMotion>, so the browser animates them without React re-renders.

const STEP_MS = 4200
const STATUS_GLYPH = { error: '✕', warn: '!', ok: '✓' }

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export default function Simulation({ project }) {
  const { simulation: sim, id: pid } = project
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const svgRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  const nodes = useMemo(() => Object.fromEntries(sim.nodes.map((n) => [n.id, n])), [sim])
  const edges = useMemo(
    () =>
      sim.edges.map(([from, to, label]) => ({
        id: `${from}->${to}`,
        domId: `${pid}-e-${from}-${to}`,
        from,
        to,
        label,
        ...edgeGeometry(nodes[from], nodes[to]),
      })),
    [sim, nodes, pid],
  )

  const current = sim.steps[step]
  const last = step === sim.steps.length - 1
  const activeNodes = new Set(current.nodes)
  const activeEdges = new Set(current.edges)
  const status = current.status || {}

  // Auto-advance while playing; stop on the last step.
  useEffect(() => {
    if (!playing || last) return
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS)
    return () => clearTimeout(t)
  }, [playing, step, last])

  // Pause/resume the SVG's own animation clock along with the step timer.
  useEffect(() => {
    const svg = svgRef.current
    if (!svg?.pauseAnimations) return
    playing ? svg.unpauseAnimations() : svg.pauseAnimations()
  }, [playing])

  const go = (i) => {
    setStep(Math.max(0, Math.min(sim.steps.length - 1, i)))
  }
  const togglePlay = () => {
    if (last) {
      setStep(0)
      setPlaying(true)
    } else {
      setPlaying((p) => !p)
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div className="flex flex-col justify-center rounded-2xl border border-ink-700 bg-ink-950/80 p-2 sm:p-3">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`}
          className="h-auto w-full"
          role="img"
          aria-label={`Animated architecture of ${project.title}. Step ${step + 1}: ${current.title}`}
        >
          <defs>
            <pattern id={`${pid}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a2540" strokeWidth="1" opacity="0.5" />
            </pattern>
            {Object.entries(KIND).map(([k, v]) => (
              <marker
                key={k}
                id={`${pid}-arrow-${k}`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={v.color} />
              </marker>
            ))}
            <marker id={`${pid}-arrow-idle`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#26345a" />
            </marker>
            <filter id={`${pid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width={CANVAS.w} height={CANVAS.h} fill={`url(#${pid}-grid)`} />

          {/* Edges */}
          {edges.map((e) => {
            const on = activeEdges.has(e.id)
            const color = KIND[nodes[e.from].kind].color
            return (
              <g key={e.id}>
                <path
                  id={e.domId}
                  d={e.d}
                  fill="none"
                  stroke={on ? color : '#26345a'}
                  strokeWidth={on ? 2.5 : 1.5}
                  strokeDasharray={on ? '7 7' : undefined}
                  className={on && !reduced ? 'edge-flow' : undefined}
                  markerEnd={`url(#${pid}-arrow-${on ? nodes[e.from].kind : 'idle'})`}
                  opacity={on ? 1 : 0.7}
                  style={{ transition: 'stroke 400ms, opacity 400ms' }}
                />
                {e.label && e.span > labelWidth(e.label) + 24 && (
                  <g transform={`translate(${e.mid[0]} ${e.mid[1]})`} opacity={on ? 1 : 0.45}>
                    <rect x={-labelWidth(e.label) / 2} y={-10} width={labelWidth(e.label)} height={20} rx={10} fill="#0b1220" stroke={on ? color : '#26345a'} />
                    <text textAnchor="middle" dy="4" fontSize="11" fill={on ? color : '#64748b'} fontFamily="JetBrains Mono, monospace">
                      {e.label}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {/* Data particles (keyed by step so they restart on each step) */}
          {!reduced &&
            edges
              .filter((e) => activeEdges.has(e.id))
              .map((e) =>
                [0, 0.6, 1.2].map((delay) => (
                  <circle key={`${step}-${e.id}-${delay}`} r="5" fill={KIND[nodes[e.from].kind].color} filter={`url(#${pid}-glow)`}>
                    <animateMotion dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" calcMode="linear">
                      <mpath href={`#${e.domId}`} />
                    </animateMotion>
                  </circle>
                )),
              )}

          {/* Nodes */}
          {sim.nodes.map((n) => {
            const on = activeNodes.has(n.id)
            const kind = KIND[n.kind]
            const st = status[n.id]
            const stroke = st ? STATUS[st] : on ? kind.color : '#26345a'
            return (
              <g
                key={n.id}
                transform={`translate(${n.x - NODE.w / 2} ${n.y - NODE.h / 2})`}
                opacity={on || st ? 1 : 0.45}
                style={{ transition: 'opacity 400ms' }}
              >
                {(on || st) && (
                  <rect
                    x={-4}
                    y={-4}
                    width={NODE.w + 8}
                    height={NODE.h + 8}
                    rx={15}
                    fill="none"
                    stroke={stroke}
                    strokeOpacity="0.35"
                    strokeWidth="6"
                    className={st === 'error' && !reduced ? 'node-alarm' : undefined}
                  />
                )}
                <rect width={NODE.w} height={NODE.h} rx={12} fill={on ? '#111a2e' : '#0b1220'} stroke={stroke} strokeWidth={on || st ? 2 : 1.2} />
                <rect x={0} y={10} width={4} height={NODE.h - 20} rx={2} fill={kind.color} />
                <text x={NODE.w / 2 + 2} y={26} textAnchor="middle" fontSize="14.5" fontWeight="600" fill="#e2e8f0" fontFamily="Inter, sans-serif">
                  {n.label}
                </text>
                {n.sub && (
                  <text x={NODE.w / 2 + 2} y={45} textAnchor="middle" fontSize="11.5" fill="#94a3b8" fontFamily="Inter, sans-serif">
                    {n.sub}
                  </text>
                )}
                {st && (
                  <g transform={`translate(${NODE.w - 2} 2)`}>
                    <circle r="10" fill={STATUS[st]} />
                    <text textAnchor="middle" dy="4" fontSize="12" fontWeight="700" fill="#0b1220">
                      {STATUS_GLYPH[st]}
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>

        {/* Legend */}
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 px-2 pb-1 text-[11px] text-slate-400">
          {[...new Set(sim.nodes.map((n) => n.kind))].map((k) => (
            <span key={k} className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: KIND[k].color }} />
              {KIND[k].label}
            </span>
          ))}
        </div>
      </div>

      {/* Narration + controls */}
      <div className="flex flex-col rounded-2xl border border-ink-700 bg-ink-900/80 p-4">
        <div className="mb-1 font-mono text-xs uppercase tracking-wider text-accent">
          Step {step + 1} / {sim.steps.length}
        </div>
        <h4 key={`t-${step}`} className="animate-fade-up text-lg font-semibold text-white">
          {current.title}
        </h4>
        <p key={`p-${step}`} className="animate-fade-up mt-2 text-sm leading-relaxed text-slate-300">
          {current.text}
        </p>

        {current.metrics?.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {current.metrics.map((m) => (
              <div key={`${step}-${m.label}`} className="animate-pop rounded-xl border border-ink-700 bg-ink-950 p-3">
                <div className="bg-gradient-to-r from-accent to-accent-violet bg-clip-text text-xl font-bold text-transparent">{m.value}</div>
                <div className="text-[11px] text-slate-400">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-5">
          <div className="mb-3 h-1 overflow-hidden rounded-full bg-ink-700">
            <div
              key={`bar-${step}-${playing}`}
              className={`h-full bg-gradient-to-r from-accent to-accent-violet ${playing && !last ? 'progress-run' : ''}`}
              style={{ width: last ? '100%' : playing ? undefined : `${((step + 1) / sim.steps.length) * 100}%`, animationDuration: `${STEP_MS}ms` }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => go(step - 1)} disabled={step === 0} className="sim-btn" aria-label="Previous step">
              ‹
            </button>
            <button onClick={togglePlay} className="sim-btn flex-1 font-medium" aria-label={playing && !last ? 'Pause' : 'Play'}>
              {last ? '↻ Replay' : playing ? '❚❚ Pause' : '▶ Play'}
            </button>
            <button onClick={() => go(step + 1)} disabled={last} className="sim-btn" aria-label="Next step">
              ›
            </button>
          </div>
          <ol className="mt-4 space-y-1">
            {sim.steps.map((s, i) => (
              <li key={s.title}>
                <button
                  onClick={() => {
                    go(i)
                    setPlaying(false)
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1 text-left text-xs transition ${
                    i === step ? 'bg-ink-700 text-white' : 'text-slate-400 hover:bg-ink-800 hover:text-slate-200'
                  }`}
                >
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] ${i <= step ? 'bg-accent text-ink-950' : 'bg-ink-700'}`}>
                    {i + 1}
                  </span>
                  {s.title}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
