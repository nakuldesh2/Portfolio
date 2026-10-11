---
paths:
  - src/data/projects.js
  - src/components/Simulation.jsx
  - src/lib/simulation.js
---
# Simulation config rules

- Canvas is 1000 × 480; nodes are 164 × 60 and positioned by their **center** (x, y). Keep x in [95, 905], y in [45, 435].
- Aim for ≥ 30px between boxes; `npm run check` fails when boxes are closer than 10px.
- Node `kind` is one of: source, compute, storage, ml, gate, alert, consumer. The color legend is generated from it.
- Labels ≤ 20 characters; put detail in `sub` (≤ 24 characters).
- Edges are `[from, to, optionalLabel]`; steps reference them as `"from->to"`. Labels on edges shorter than the label are hidden automatically, so keep labels to 1 word.
- Flow should read left → right. Use vertical offsets for branches, never cross an edge through a box.
- Steps: 4–6 per project, one idea per step, `text` ≤ 2 sentences, written for a hiring manager rather than an engineer.
- Show failure honestly when the story has it: `status: { nodeId: 'error' | 'warn' | 'ok' }`.
- `metrics` only use numbers from the resume (see content-accuracy.md).
- Geometry constants live in `src/lib/simulation.js`. Never duplicate them.
