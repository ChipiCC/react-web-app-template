---
description: Scaffold a new feature slice following the template conventions
agent: build
---

Add a new feature named $ARGUMENTS following the architecture and conventions in
AGENTS.md.

1. Create `src/features/<name>/types.ts` with the domain types.
2. Add `src/features/<name>/api.ts` with typed endpoint functions that call
   `apiRequest` from `@/lib/api/client`. Never call `fetch` directly.
3. Add the query keys to `src/lib/api/queryKeys.ts`.
4. Add `src/features/<name>/hooks/use<Name>.ts` using `useQuery` or `useMutation`.
5. Add presentational components under `src/features/<name>/components/`.
6. Add a route in `src/app/router.tsx` and a navigation entry in
   `src/app/layout/AppShell.tsx` if the feature is user-facing.
7. Add a co-located test using MSW, including the failure path.
8. Run `bun run check`.

Keep the feature self-contained. Promote shared UI to `src/components/ui` and shared
infrastructure to `src/lib`.
