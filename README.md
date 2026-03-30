# Brodora

Brodora is a growing ecosystem of open-source tools, libraries, and developer utilities.

This monorepo is the home for projects under the Brodora umbrella—independent tools, shared packages, and supporting infrastructure that can evolve together over time.

## Vision

Brodora is focused on building useful, well-designed open-source software with an emphasis on:

* Simplicity
* Modularity
* Developer experience
* Reusability
* Long-term maintainability

Not every tool in Brodora is tightly coupled, but they share a common philosophy: practical software, thoughtfully built.

## Repository structure

This repository is a **pnpm** monorepo (`pnpm-workspace.yaml`). Typical locations:

* **`apps/`** — applications and demos (for example, Storybook for the UI kit)
* **`packages/`** — reusable libraries (`@brodora/ui`, `@brodora/icons`, and more as the ecosystem grows)
* **`examples/`** — usage examples and starters (workspace slot; add packages when needed)
* **`internal/`** — internal-only tooling (workspace slot)

The workspace also reserves `examples/*` and `internal/*` so new packages can land without changing the root layout.

## Packages

| Package | Description |
| --- | --- |
| **`@brodora/ui`** | React UI primitives: layout (**Box**, **Stack**), forms (**TextField**, **Textarea**, **Select**, **Checkbox**, **RadioGroup**, **Switch**), feedback (**Alert**), overlays (**Dialog**, **Tooltip**), navigation (**Tabs**, **Link**), typography, and a small **theme** + **`sx`** styling layer. |
| **`@brodora/icons`** | Re-exports **lucide-react** under a single workspace name so apps depend on `@brodora/icons` instead of reaching into icon implementation details. |

Both UI packages are **TypeScript** source exports (`"main"` / `"types"` point at `src`), ship under the **MIT** license, and target **React 18+ / 19**.

### UI design choices

* **Theme-driven styling** via `ThemeProvider` / `useTheme` and an **`sx`-style** helper for component-level layout and overrides.
* **Storybook** documents components under `apps/storybook` for visual review and usage examples.

## Tooling

* **Package manager:** [pnpm](https://pnpm.io/) (version pinned via `packageManager` in root `package.json`).
* **Linting / formatting:** [Biome](https://biomejs.dev/) (`biome.json`), with **lint-staged** running `biome check --write` on staged files.
* **Git hooks:** **Husky** with **commitlint** (conventional commits) on `commit-msg`; pre-commit runs lint-staged.
* **Commits:** **Commitizen** with **cz-git** (`pnpm commit`).

## Getting started

Clone the repository:

```bash
git clone git@github.com:YOUR_USERNAME/brodora.git
cd brodora
```

Install dependencies:

```bash
pnpm install
```

Useful workspace commands:

```bash
# Typecheck the UI package
pnpm --filter @brodora/ui typecheck

# Typecheck icons
pnpm --filter @brodora/icons typecheck

# Run Storybook for @brodora/ui (http://localhost:6006)
pnpm --filter @brodora/storybook dev

# Build a static Storybook bundle
pnpm --filter @brodora/storybook build
```

## Contributing

Contributions, ideas, and feedback are welcome.

Please run Biome on changed files (or rely on lint-staged) and follow the **conventional commit** format enforced by commitlint.

As Brodora grows, contribution guidelines can expand; for now, match existing patterns in `packages/ui` and keep changes focused and well-scoped.

## License

This project is licensed under the [MIT License](./LICENSE).
