---
name: design-simulation
description: Convert a system-design diagram (image) or an architecture description into an animated simulation config (nodes, edges, steps) for a portfolio project. Use when Monica shares a design image or asks to change how a project's animation looks or flows.
---

# Design a project simulation

The `<Simulation>` component (src/components/Simulation.jsx) animates any config. Your job is the **storyboard**.
Read `.claude/rules/simulations.md` first.

## 1. Read the design
From the image or description, list:
- **Components**, mapped to a kind: source (where data comes from), compute (jobs/services/Lambdas), storage (S3/DynamoDB/Redshift/tables), ml (models/LLMs), gate (validation/permissions/approval), alert (monitoring/alarms), consumer (dashboards/apps/users)
- **Data flows** between them (direction matters)
- **The story**: what problem happens, what the system does about it, and the result

Merge minor components so there are **5–8 nodes**. A hiring manager should understand it in 20 seconds.

## 2. Lay it out on the 1000 × 480 canvas
Use a column grid, with x = 95, 290, 490, 700, 905 for left → right flow,
and rows y = 70–100 (top branch), 220 (main line), 340–410 (bottom branch / support systems).
- The main data path goes on the middle row.
- Validation/gates sit above the step they guard; CI/CD, monitoring and fallbacks sit below.
- Feedback loops: keep the two nodes vertically aligned (same x) so the edge is a clean vertical line.

## 3. Write 4–6 steps
Each step = one idea: `{ title, text, nodes, edges, status?, metrics? }`
- Step 1: the input / normal state
- Middle steps: the key engineering decisions (the "why it's clever" moments)
- If the project is about failure or recovery: include an `error` step, then the fix (`ok`)
- Last step: the outcome, with the real impact `metrics`
- `text` ≤ 2 sentences, plain English, active voice

## 4. Validate and look
```bash
npm run check   # catches unknown ids, overlaps, out-of-bounds nodes, bad statuses
npm run dev     # play it; fix crossings by moving nodes, not by adding edges
```
