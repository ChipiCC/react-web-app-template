---
description: Review changes against the frontend template conventions
agent: frontend-reviewer
---

Review the current diff and working tree changes against AGENTS.md.

Check for:

- Direct `fetch` calls, hardcoded API URLs, or feature code bypassing `lib/api`.
- Missing loading, error, empty, or retry states.
- Query keys not registered in `src/lib/api/queryKeys.ts`.
- New environment variables missing from `.env.example`, `vite-env.d.ts`, and `config.ts`.
- Hardcoded colors instead of semantic theme tokens.
- Accessibility regressions: labels, landmarks, focus, `aria-live`, heading order.
- Missing tests for new behavior or failure paths.
- Weakened TypeScript, ESLint, or formatting rules.

Report findings by severity with file and line references. Finish with missing tests
or documentation updates.
