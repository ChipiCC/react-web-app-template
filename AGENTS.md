# AGENTS.md

Guidance for AI coding agents (and humans) working in this repository.
Keep this file up to date when conventions, commands, or structure change.

## Project overview

A production-ready frontend SPA template built with React, React Router, TanStack Query, Tailwind
CSS, Vite, and Bun. It ships a landing page and a complete API example so the full request path is
visible before you add a real domain.

The example feature is intentionally generic. Delete `src/features/example/`, the `/example` route,
and its mocks when you start a real product.

## Setup

```bash
mise install        # Node 24 + Bun 1.4.3 from .mise.toml
bun install
cp .env.example .env.local
bun run dev         # http://localhost:5173
```

The dev server uses MSW by default, so the API example works without a backend.

## Commands

| Purpose         | Command                 |
| --------------- | ----------------------- |
| Dev server      | `bun run dev`           |
| Build           | `bun run build`         |
| Preview         | `bun run preview`       |
| Lint            | `bun run lint`          |
| Fix lint issues | `bun run lint:fix`      |
| Format          | `bun run format`        |
| Format check    | `bun run format:check`  |
| Type check      | `bun run typecheck`     |
| Tests (watch)   | `bun run test`          |
| Tests (once)    | `bun run test:run`      |
| Coverage        | `bun run test:coverage` |
| All checks      | `bun run check`         |

**Definition of done:** `bun run check` passes. Do not weaken TypeScript, ESLint, or tests to make a
change pass.

## Architecture

```text
src/
├── app/                 # composition root: providers, router, layout, pages, config, theme
├── components/ui/       # shared presentational primitives used across features
├── features/            # vertical slices; each feature owns its API, hooks, components, types
├── lib/                 # framework-agnostic infrastructure and utilities
│   └── api/             # fetch gateway, errors, query keys
├── styles/              # Tailwind entry point and design tokens
└── test/                # test setup, providers, MSW handlers
```

### Responsibilities

- `app/` wires the application together. Pages compose feature components; they do not own
  transport concerns.
- `features/<name>/` is self-contained. A feature may expose a page-ready component but must not
  import from another feature's internals. Promote shared code to `components/ui` or `lib/`.
- `lib/api/` is the only place that knows the API base URL or calls `fetch`.
- `components/ui/` holds reusable primitives with no feature knowledge.
- `test/` holds cross-cutting test utilities. Co-located tests live next to the code they test.

## Data fetching

- Use TanStack Query for all server state. Do not add a global store for data the server owns.
- Use local state for form/UI state. Add Zustand or another client store only when realtime or
  cross-route client state genuinely needs it.
- Every feature defines its endpoint functions in `api.ts` and exposes query options/hooks. A
  component never calls `fetch`, `apiRequest`, or a raw URL directly.
- Add query keys to `src/lib/api/queryKeys.ts` so invalidation is predictable.
- Use the `queryOptions` helper so a query's key and function stay together.
- Always render explicit loading, error, empty, and success states. Use `Skeleton`, `Spinner`,
  `StatePanel`, and `errorMessage` before inventing new patterns.
- Do not use React Router loaders for data that TanStack Query owns; that duplicates caching and
  error handling.

### Adding a feature

1. Create `src/features/<name>/` with `types.ts`, `api.ts`, `hooks/`, and `components/`.
2. Add a typed endpoint function that calls `apiRequest<T>(path, options)`.
3. Define `queryOptions` (or a mutation hook) and a hook that wraps `useQuery`/`useMutation`.
4. Add query keys to `src/lib/api/queryKeys.ts`.
5. Build a presentational component that receives data through props where practical.
6. Add the route and navigation entry if the feature is user-facing.
7. Add a co-located test using MSW.
8. Run `bun run check`.

## API client

`src/lib/api/client.ts` is the single HTTP gateway. It:

- Resolves relative or absolute base URLs.
- Serializes JSON bodies and sets headers.
- Supports per-request timeouts and caller cancellation.
- Normalizes network, timeout, HTTP, and invalid-JSON failures into `ApiError`.
- Handles `204 No Content`.

The expected error envelope is:

```json
{ "error": { "code": "invalid_request", "message": "Human-readable reason", "details": {} } }
```

`apiErrorFromResponse` also accepts a flat `{ code, message }` fallback. Surface `message` to the
user and keep `code` for programmatic handling.

## Configuration

- Browser-exposed variables must start with `VITE_` and are public. Never put secrets in them.
- Add new variables to `.env.example`, `src/vite-env.d.ts`, and `src/app/config.ts`.
- `src/app/config.ts` validates configuration at startup. Fail fast on malformed values.
- `VITE_API_BASE_URL` may be a same-origin path such as `/api` or an absolute URL.
- `VITE_USE_MOCK_API` only takes effect in development; production builds never enable MSW.
- For authenticated APIs, use a same-origin BFF or cookie-based session, not a key embedded in the
  bundle.

## Routing

- Routes live in `src/app/router.tsx` using library-mode React Router.
- Layout routes render shared chrome through `Outlet`.
- Keep the root `errorElement` and the catch-all not-found route.
- Add `aria-current`/active states through `NavLink` rather than manual pathname comparisons.

## Theme and styling

- Design tokens live in `src/styles/index.css` under `@theme inline` and `--app-*` CSS variables.
- Use semantic Tailwind utilities (`bg-surface`, `text-ink`, `border-line`, `text-accent`). Do not
  hardcode hex colors in components.
- Every color must work in both light and dark themes. Check contrast before adding a token.
- Theme preference is `system | light | dark`, persisted in `localStorage` and applied through
  `data-theme` on `<html>`. Keep `index.html`'s bootstrap script in sync with `theme.ts`.
- Use `cn` for conditional class names.
- Do not encode status with color alone; pair it with text, icons, or badges.
- Respect `prefers-reduced-motion` and keep focus-visible styles intact.

## Accessibility

- Use semantic landmarks and heading order.
- Label every form control and interactive control.
- Keep the skip link and `main` landmark.
- Use `aria-live` for async status changes where appropriate.
- Test keyboard focus paths for new interactive UI.

## Testing

- Unit/component tests use Vitest, React Testing Library, and MSW.
- Co-locate tests as `*.test.ts(x)`.
- Use `renderWithProviders` from `src/test/render.tsx` for router and Query context.
- Test user-visible behavior, not implementation details.
- Keep MSW handlers deterministic. Use `server.use(...)` for per-test overrides.
- Add tests for the failure path whenever you add a data-driven view.
- Playwright is not included by default. Add it when the product needs end-to-end coverage.

## Dependency updates

- Dependabot is the only dependency bot. Do not add Renovate or a second updater.
- `.github/dependabot.yml` watches Bun (`package.json` + `bun.lock`) and GitHub Actions weekly.
- `.github/workflows/dependabot-automerge.yml` auto-merges PRs whose highest bump is a patch.
  Minor and major updates are reviewed manually.
- Keep the required CI check name (`Lint, types, tests, build`) in sync with the `master` ruleset
  if you rename the CI job.
- `bun.lock` is generated. Update dependencies with `bun update` (or `bun add` / `bun remove`);
  never edit the lockfile by hand.
- Security updates are enabled on the repository. Treat them as urgent and review the advisory.

## Code style

- Strict TypeScript. Avoid `any`; prefer discriminated unions and explicit guards.
- Use function components and named exports.
- Keep presentational components free of fetching and side effects.
- Use the `@/` alias for imports from `src/`.
- Avoid unnecessary `useEffect` state synchronization. Prefer derived state, keys, or external
  stores.
- Keep files focused. If a component file grows past a screen of logic, split it.

## Do not

- Do not bypass `lib/api/client.ts` or hardcode API URLs in components.
- Do not put server data in a global client store.
- Do not add a dependency without checking whether the platform or an existing package covers it.
- Do not weaken strict TypeScript, ESLint, or tests to make a change pass.
- Do not commit `.env` files, coverage, build output, or generated reports.
- Do not enable mocks in production.
- Do not hand-edit `public/mockServiceWorker.js`; regenerate it with `bunx msw init public --save`.
