---
name: update-profile
description: Update Monica's bio, experience, skills, education or achievements (for example from a new resume), and keep the AI assistant's answers accurate. Use when Monica shares a new resume, a new job, new skills, or corrections.
---

# Update profile content

1. Diff the new information against `src/data/profile.js` and list the changes for Monica before editing if anything is ambiguous.
2. Edit `src/data/profile.js` only. The UI and the chatbot knowledge base both read from it.
   - Experience bullets: copy the resume wording; don't embellish.
   - `heroStats` and `achievements`: every number must exist in a bullet or project.
   - New role with projects → add `projectIds` (and create projects with the `add-project` skill).
3. If wording changed for things interviewers ask about, add retrieval tests to `EXPECT` in `scripts/validate-data.mjs`.
4. Run `npm run check`, then `npm run ask -- "a question about the change"` and confirm the right chunk ranks first.
5. Run `npm run build`.
6. If the Worker's system prompt mentions something that changed (e.g. the email), update `worker/src/index.js` and remind Monica to redeploy the Worker (`deploy` skill).
