---
name: add-project
description: Add a new project to Monica's portfolio or update an existing one, including its animated simulation, impact metrics and chatbot knowledge. Use when Monica shares project details, a system-design image, or asks to add/edit/remove a project.
---

# Add or update a project

## 1. Gather facts (ask for anything missing, don't guess)
- Title, company, period, category (reuse an existing category if one fits)
- One-paragraph summary, the challenge, 3–5 approach bullets
- Impact metrics: **only real numbers** (see `.claude/rules/content-accuracy.md`)
- Tech actually used on this project
- Architecture: a system-design image or a description of the components and the data flow

## 2. Write the entry
Add an object to `src/data/projects.js` with the same shape as the existing ones:
`id` (kebab-case, unique), `title`, `company`, `period`, `category`, `reviewed`, `summary`, `challenge`, `approach[]`, `impact[{value,label}]`, `tech[]`, `simulation{nodes,edges,steps}`.

- New from Monica's own detailed description → `reviewed: true` only if she confirms it.
- Anything you inferred → `reviewed: false`, and list what she must confirm.

## 3. Design the simulation
Follow the `design-simulation` skill.

## 4. Link it
Add the project `id` to the right role's `projectIds` in `src/data/profile.js` so it shows under "See it in action".
If the project produces a headline metric, consider adding it to `achievements`.

## 5. Teach the chatbot
Nothing to do by hand: `src/ai/knowledge.js` generates a chunk from the project automatically.
Add one retrieval test to the `EXPECT` list in `scripts/validate-data.mjs`:
`['<a question an interviewer would ask>', 'project-<id>']`

## 6. Verify
```bash
npm run check                     # must pass
npm run ask -- "<your test question>"
npm run build
```
Then look at it: `npm run dev`, open the project, and play every step. Check for overlapping boxes, unreadable labels, and edges crossing boxes.

## 7. Report back to Monica
Say what you added, which details were inferred, and what she should confirm.
