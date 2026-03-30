---
name: brodora-ui-component
description: Adds a new React component to @brodora/ui and a matching Storybook story under Components/. Use when creating UI components, new primitives, Brodora design-system elements, or Storybook stories for packages/ui.
---

# Brodora UI component + Storybook story

## Locations

| Artifact | Path |
|----------|------|
| Component | `packages/ui/src/components/<PascalCase>.tsx` |
| Package export | `packages/ui/src/index.ts` — `export * from "./components/<Name>";` |
| Story | `apps/storybook/src/stories/<kebab-or-camel>.stories.tsx` |
| Shared story controls | `apps/storybook/src/storybook/` — import `layoutArgTypes` when the component exposes flex layout props |

## Component checklist

1. **`import * as React from "react"`** (matches existing components).
2. **Theme**: use **`useTheme()`** from `../theme` when colors, spacing, or action tokens are needed.
3. **`sx` prop** (recommended for presentational components): optional **`sx?: SxProps`**, **`useSxStyles(sx)`** from `../system/sx`, merge order **`{ ...defaults, ...sxStyles, ...style }`** so `style` wins.
4. **Props**: extend the narrowest DOM type (`React.ButtonHTMLAttributes`, `React.HTMLAttributes<HTMLDivElement>`, etc.); destructure **`style`**, **`sx`**, and **`children`** so `...rest` does not swallow them.
5. **Export** the component and a **props interface** (e.g. `export interface StackProps`).
6. Run **`pnpm run typecheck`** from **`packages/ui`**.

## Storybook checklist

1. **`import type { Meta, StoryObj } from "@storybook/react"`** and **`import * as React from "react"`** (avoids JSX / React namespace lint issues).
2. Import the component from **`@brodora/ui`**. **`ThemeProvider`** is already applied in **`apps/storybook/.storybook/preview.tsx`** — do not wrap each story unless testing provider overrides.
3. **Meta**: `title: "Components/<Name>"`, `component`, `tags: ["autodocs"]`, **`satisfies Meta<typeof Component>`**.
4. **`StoryObj<typeof meta>`** for stories; use **`args`** + **`render: (args) => ...`** when children are fixed (e.g. demo layout).
5. **Layout-related props** (`direction`, `alignItems`, `justifyContent`, `flexWrap`, `spacing`): spread **`...layoutArgTypes`** from **`../storybook`** into **`argTypes`** (see `stack.stories.tsx`).
6. Add at least one concrete story (default or primary use case).

## Minimal templates

**Export (`packages/ui/src/index.ts`)** — keep alphabetical order among component lines when reasonable:

```ts
export * from "./components/<Name>";
```

**Story skeleton**

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { <Name> } from "@brodora/ui";
import { layoutArgTypes } from "../storybook";

const meta = {
  title: "Components/<Name>",
  component: <Name>,
  tags: ["autodocs"],
  argTypes: {
    ...layoutArgTypes,
  },
} satisfies Meta<typeof <Name>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => <<Name> {...args} />,
};
```

Omit **`layoutArgTypes`** if the component has no matching props (avoid orphan controls).

## Do not

- Modify unrelated components or shared theme APIs.
- Add dependencies that are not required for the requested component.
- Invent new global CSS files unless the user asks.
- Skip **`packages/ui/src/index.ts`** — the package must re-export the component.
