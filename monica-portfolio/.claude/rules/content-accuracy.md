# Content accuracy (highest-priority rule)

This site is shown to hiring managers. A single invented claim can cost Monica an offer.

- Every fact, metric, employer, date and technology must come from Monica's resume or from Monica directly.
- **Never invent numbers.** If a simulation step needs a metric that doesn't exist, use none or a qualitative arrow (↑ / ↓).
- When you have to fill in plausible architecture detail (for example the internal steps of a pipeline), keep it generic, keep `reviewed: false` on the project, and tell Monica exactly what to confirm.
- Only Monica flips `reviewed: true`.
- Don't add tech chips for tools she didn't use on that project.
- Keep confidential details out: no internal service names beyond what's on the resume, no customer names, no internal URLs.
- Contact info: email and GitHub only. Leave out the phone number and home address.
- The chatbot system prompt (worker/src/index.js) must keep telling the model to answer only from context.
