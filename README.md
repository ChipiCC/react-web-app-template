# Web App Template

A production-ready frontend template for React single-page apps.

- **Stack:** React 19, React Router, TanStack Query, Tailwind CSS 4, Vite, TypeScript
- **Runtime:** Bun 1.4.3, Node 24
- **Quality:** strict TypeScript, ESLint, Prettier, Vitest, React Testing Library, MSW
- **Design:** semantic theme tokens with light, dark, and system preference support
- **CI:** GitHub Actions running lint, format, typecheck, tests, and build
- **Automation:** Dependabot updates with CI-gated patch auto-merge

The template ships a landing page and a working API example so you can see the intended structure
before replacing it with your first real feature.

## Quick start

```bash
mise install       # optional: installs Node 24 + Bun 1.4.3
bun install
cp .env.example .env.local
bun run dev        # http://localhost:5173
```

No backend is required in development. MSW serves the example endpoint by default.

## Scripts

| Command                 | Purpose                                         |
| ----------------------- | ----------------------------------------------- |
| `bun run dev`           | Vite dev server                                 |
| `bun run build`         | Type-check and build to `dist/`                 |
| `bun run preview`       | Preview the production build                    |
| `bun run lint`          | ESLint                                          |
| `bun run lint:fix`      | ESLint with auto-fixes                          |
| `bun run format`        | Prettier write                                  |
| `bun run format:check`  | Prettier check                                  |
| `bun run typecheck`     | `tsc -b`                                        |
| `bun run test`          | Vitest watch mode                               |
| `bun run test:run`      | Vitest once                                     |
| `bun run test:coverage` | Coverage report                                 |
| `bun run check`         | Lint, format check, typecheck, tests, and build |

## Project structure

```text
src/
├── app/                 # providers, router, layout, pages, config, theme
├── components/ui/       # shared UI primitives
├── features/example/    # example feature slice
├── lib/api/             # fetch gateway, errors, query keys
├── lib/cn.ts            # conditional class names
├── styles/index.css     # Tailwind entry point + design tokens
└── test/                # setup, test providers, MSW handlers
```

## Routes

| Route      | Purpose                                              |
| ---------- | ---------------------------------------------------- |
| `/`        | Landing page                                         |
| `/example` | API client example with loading/error/success states |
| `*`        | Not found                                            |

## Configuration

Copy `.env.example` to `.env.local`:

| Variable            | Default | Notes                                                        |
| ------------------- | ------- | ------------------------------------------------------------ |
| `VITE_API_BASE_URL` | `/api`  | Same-origin path or absolute URL; no trailing slash required |
| `VITE_USE_MOCK_API` | `true`  | Development only; production builds always disable MSW       |

`VITE_*` values are public in the browser bundle. Never put API keys or secrets in them. For
authenticated APIs, use a same-origin BFF or cookie-based session.

### Using a real API

```bash
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=http://localhost:8000/api
```

The backend must allow the frontend origin through CORS if it lives on a different origin.

## API client example

The example follows one path:

1. `src/features/example/api.ts` calls `apiRequest<ExampleMessage>('/example', { signal })`.
2. `src/features/example/hooks/useExampleMessage.ts` subscribes with TanStack Query.
3. `src/features/example/components/ExampleQueryCard.tsx` renders loading, error, and success.
4. `src/app/pages/ApiExamplePage.tsx` composes the feature and explains the wiring.

The shared client in `src/lib/api/client.ts` handles JSON, timeouts, cancellation, `204` responses,
network failures, and the error envelope:

```json
{ "error": { "code": "invalid_request", "message": "Human readable reason" } }
```

Add a new feature by copying the `features/example` shape, adding query keys in
`src/lib/api/queryKeys.ts`, and registering the route in `src/app/router.tsx`.

## Theme

Design tokens are CSS variables in `src/styles/index.css`:

- `canvas`, `surface`, `surface-raised`, `surface-hover`
- `line`, `ink`, `muted`, `faint`
- `accent`, `accent-strong`, `positive`, `negative`, `warning`, `info`

Use semantic Tailwind utilities such as `bg-surface`, `text-ink`, and `border-line`. The theme
toggle cycles through system, light, and dark. The preference is persisted in `localStorage`, and an
inline script in `index.html` applies it before the first paint.

## Mock API

MSW handlers live in `src/test/mocks/handlers.ts`. The browser worker starts only when
`VITE_USE_MOCK_API=true` and the build is running in development. The Node worker is used by tests.

When you add an endpoint, add its handler there and regenerate the worker only if the MSW version
changes:

```bash
bunx msw init public --save
```

## Testing

Tests are co-located with the code they cover. `src/test/render.tsx` wraps components in a fresh
Query client and a `MemoryRouter`; `src/test/setup.ts` starts the MSW server and resets handlers
between tests.

## CI

`.github/workflows/ci.yml` runs on pushes to `master` and on pull requests:

1. `bun install --frozen-lockfile`
2. `bun run lint`
3. `bun run format:check`
4. `bun run typecheck`
5. `bun run test:run`
6. `bun run build`

No deploy job is included. The template is a static SPA; `vercel.json` provides the required
fallback. Configure an equivalent rewrite (`/* -> /index.html`) on other static hosts.

## Dependency updates

Dependabot keeps Bun packages and GitHub Actions current. It is configured in
`.github/dependabot.yml`:

| Ecosystem      | Schedule | Grouping                         |
| -------------- | -------- | -------------------------------- |
| Bun            | Weekly   | Minor and patch updates together |
| GitHub Actions | Weekly   | Individual PRs                   |

Major updates arrive one per PR so breaking changes get individual review.
`.github/workflows/dependabot-automerge.yml` enables auto-merge for Dependabot PRs whose **highest**
bump is a patch. Auto-merge completes only after the required `Lint, types, tests, build` check
passes on `master`.

The repository must have **Allow auto-merge** enabled and a branch ruleset on `master` that
requires the CI check. Both are configured for this repository.

Patch-only auto-merge is deliberately conservative. To widen it, change the condition in the
workflow and update the ruleset; do not auto-merge minor or major updates without reviewing the
release notes. Dependabot alerts and automated security updates are enabled in the repository
settings. GitHub does not yet support Dependabot security updates for Bun, so run `bun audit`
before releases.

## Using this template

1. Rename the app in `src/app/config.ts`, `index.html`, `package.json`, and the README.
2. Replace the favicon and social metadata.
3. Keep or delete `src/features/example/`, the `/example` route, and the related mocks.
4. Set `VITE_API_BASE_URL` and disable mocks for real development.
5. Update `AGENTS.md` when your conventions diverge.
6. Add the first real feature with the `features/example` structure.
