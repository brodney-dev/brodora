# Brodora

Brodora is an open source desktop platform built on Electron: the installer, launcher, and foundation for desktop apps. Think Steam, but for any kind of app.

---

## What Brodora Is

Brodora itself is lightweight by design. It's not a shell that apps live inside: it's the platform that gets them installed, keeps them up to date, and boots them when you need them. Each app runs as its own instance, the same way a game launched from Steam runs independently of Steam itself.

What Brodora brings to every app is the foundation: shared systems for storage, authentication, and more. Developers aren't rebuilding the same infrastructure from scratch, and users get a consistent experience across everything they install.

---

## How It Works

**Brodora** is the launcher and foundation. It handles discovery, installation, updates, and booting apps. It also exposes the core systems every app can build on. On its own, Brodora is minimal: its value is in what it enables.

**Apps** are independent, self-contained desktop applications installed and launched through Brodora. Each app boots its own instance: they don't share a window or bolt onto a common shell. Apps are built by the Brodora team or third-party developers, distributed through the marketplace, and can tap into Brodora's core systems.

**Plugins** are behavior modifiers that extend a specific app. They attach to an app (or to Brodora itself) and alter how it works. Plugins don't run standalone: they require a target to modify.

---

## Core Systems

Every app installed through Brodora has access to a set of shared foundational systems. These are provided by Brodora so apps don't have to solve them independently:

- **Storage**: A structured, shared data layer available to all apps
- **Authentication**: Identity and session management without each app rolling its own
- **UI primitives**: A shared component library (`@brodora/ui`) for building interfaces that feel consistent and native
- **Inter-app communication**: APIs for apps to share context and data when needed

> This list will grow as Brodora matures. These systems are what make building on Brodora meaningfully different from shipping a standalone Electron app.

---

## Developer Platform

Building for Brodora is a first-class experience. Brodora provides the tooling to scaffold, develop, and distribute apps without figuring out the plumbing yourself:

- **CLI tooling**: Scaffold a new app or plugin, run it locally, and publish it to the marketplace from the command line
- **Local dev runtime**: Develop your app against a live Brodora instance with access to all core systems
- **Distribution**: Package and submit your app to the marketplace, or distribute it directly via URL for sideloading
- **`@brodora/ui`**: A full React component library so your app feels consistent with the Brodora ecosystem without building a design system from scratch
- **Core system APIs**: Documented APIs for storage, auth, inter-app communication, and more. Ready to use with no setup.

The goal is that a developer can go from idea to a published, installable Brodora app without touching anything outside the Brodora toolchain.

---

## The Marketplace

Apps and plugins reach users through three paths:

- **Brodora-native**: built by the Brodora team, open source, available by default
- **Trusted third-party**: reviewed and approved external apps/plugins listed in the marketplace
- **Direct install**: install anything directly by URL or file, no marketplace required

---

## What's in This Repo

This is a **pnpm** monorepo (`pnpm-workspace.yaml`) containing Brodora core and all Brodora-native apps and plugins. These are the reference implementations: built by the Brodora team, open source, and available by default in the marketplace.

```
brodora/
├── apps/          # Brodora-native applications
├── plugins/       # Brodora-native plugins
├── core/          # Brodora itself: launcher, installer, core systems
└── packages/      # Shared ecosystem tooling (@brodora/ui, @brodora/icons, and more)
```

> **Third-party developers:** This repo is your reference for building your own apps and plugins. The `packages/` directory contains tooling you can use, and the apps and plugins here show how things fit together.

---

## Packages

| Package | Description |
| --- | --- |
| **`@brodora/ui`** | React UI primitives: layout (**Box**, **Stack**), forms (**TextField**, **Textarea**, **Select**, **Checkbox**, **RadioGroup**, **Switch**), feedback (**Alert**), overlays (**Dialog**, **Tooltip**), navigation (**Tabs**, **Link**), typography, and a **theme** + **`sx`** styling layer. |
| **`@brodora/icons`** | Re-exports **lucide-react** under a single workspace name so apps depend on `@brodora/icons` instead of reaching into icon implementation details. |

Both packages are TypeScript source exports, ship under the **MIT** license, and target **React 18+ / 19**.

### UI Design Choices

- **Theme-driven styling** via `ThemeProvider` / `useTheme` and an **`sx`-style** helper for component-level layout and overrides.
- **Storybook** documents components under `apps/storybook` for visual review and usage examples.

---

## Getting Started

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
| **Husky + commitlint** | Git hooks: enforces conventional commits on `commit-msg`, runs lint-staged on pre-commit |
| **Commitizen + cz-git** | Guided commit messages via `pnpm commit` |

---

## Contributing

Brodora is open source and contributions are welcome. That said, while the project is in early development the core team will be selective about what gets merged — the architecture and system contracts are still being defined, and changes need to stay coherent with the direction of the platform. If you're thinking about contributing something significant, opening a discussion first is the best way to avoid wasted effort.

For smaller changes, match existing patterns in `packages/ui`, run Biome on changed files (or rely on lint-staged), and follow the conventional commit format enforced by commitlint.

---

## Status

Brodora is in early development. Core architecture and the app/plugin system contracts are actively being established. Things will move fast and some surfaces will change: check back often.

---

## License

This project is licensed under the [MIT License](./LICENSE).