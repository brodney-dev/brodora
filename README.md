# Brodora

**An open source, desktop-native personal acceleration system.**

Brodora is a platform built on Electron where tools compound together. The base install is intentionally lightweight — a runtime and marketplace for apps and plugins. You install what you need, enable it, and your Brodora grows with you.

---

## How it works

Brodora has three building blocks:

**Brodora itself** is the core — the runtime, the marketplace, the installer. On its own it's minimal. Its job is to be the foundation everything else runs on.

**Apps** are self-contained capability units. Install a blog writing app and it becomes a first-class part of your Brodora — its own navigation item, its own logic, fully integrated rather than bolted on.

**Plugins** are behavior modifiers. They attach to an existing app (or to Brodora itself) and extend or alter how it works. An SEO checker plugin for your blog app, for example. Plugins don't stand alone — they enhance what's already there.

---

## What's in this repo

This is a **pnpm** monorepo (`pnpm-workspace.yaml`) containing Brodora core and all Brodora-native apps and plugins. These are the reference implementations — built by the Brodora team, open source, and available by default in the marketplace.

```
brodora/
├── apps/          # Brodora-native applications
├── plugins/       # Brodora-native plugins
├── core/          # Brodora itself — runtime, marketplace, installer
└── packages/      # Shared ecosystem tooling (@brodora/ui, @brodora/icons, and more)
```

> **Third-party developers:** This repo is also your reference for building your own apps and plugins. The `packages/` directory contains tooling you can use, and the apps and plugins here show you how things fit together.

---

## Packages

| Package | Description |
| --- | --- |
| **`@brodora/ui`** | React UI primitives: layout (**Box**, **Stack**), forms (**TextField**, **Textarea**, **Select**, **Checkbox**, **RadioGroup**, **Switch**), feedback (**Alert**), overlays (**Dialog**, **Tooltip**), navigation (**Tabs**, **Link**), typography, and a **theme** + **`sx`** styling layer. |
| **`@brodora/icons`** | Re-exports **lucide-react** under a single workspace name so apps depend on `@brodora/icons` instead of reaching into icon implementation details. |

Both packages are TypeScript source exports, ship under the **MIT** license, and target **React 18+ / 19**.

### UI design choices

- **Theme-driven styling** via `ThemeProvider` / `useTheme` and an **`sx`-style** helper for component-level layout and overrides.
- **Storybook** documents components under `apps/storybook` for visual review and usage examples.

---

## The marketplace

Apps and plugins reach users through three paths:

- **Brodora-native** — everything in this monorepo, available by default
- **Trusted third-party** — reviewed and approved external apps/plugins listed in the marketplace
- **Direct install** — install anything directly by URL or file, no marketplace required

---

## Building for Brodora

A few things to know before you build:

- Apps integrate into the shared left navigation — they don't open new windows
- Apps follow the install → enable flow before becoming active in a user's Brodora
- Plugins must declare what app (or Brodora core) they target
- The `packages/` directory has shared tooling — including a UI library — that you're welcome to use

These conventions exist so that every app and plugin, regardless of who built it, feels like a natural part of the same system.

---

## Getting started

Clone the repository:

```bash
git clone git@github.com:brodney-dev/brodora.git
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

---

## Tooling

| Tool | Purpose |
| --- | --- |
| **pnpm** | Package manager (version pinned via `packageManager` in root `package.json`) |
| **Biome** | Linting and formatting (`biome.json`), run via lint-staged on staged files |
| **Husky + commitlint** | Git hooks — enforces conventional commits on `commit-msg`, runs lint-staged on pre-commit |
| **Commitizen + cz-git** | Guided commit messages via `pnpm commit` |

---

## Contributing

Contributions, ideas, and feedback are welcome. Please run Biome on changed files (or rely on lint-staged) and follow the conventional commit format enforced by commitlint.

As Brodora grows, contribution guidelines will expand — for now, match existing patterns in `packages/ui` and keep changes focused and well-scoped.

---

## Status

Brodora is in early development. Core architecture and the app/plugin system contracts are actively being established. Things will move fast and some surfaces will change — check back often.

---

## License

This project is licensed under the [MIT License](./LICENSE).