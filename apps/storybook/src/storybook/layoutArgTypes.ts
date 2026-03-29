import type { ArgTypes } from "@storybook/react";

export const FLEX_DIRECTION_OPTIONS = [
  "column",
  "row",
  "column-reverse",
  "row-reverse",
] as const;

export const ALIGN_ITEMS_OPTIONS = [
  "stretch",
  "flex-start",
  "flex-end",
  "center",
  "baseline",
] as const;

export const JUSTIFY_CONTENT_OPTIONS = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
] as const;

export const FLEX_WRAP_OPTIONS = ["nowrap", "wrap", "wrap-reverse"] as const;

/**
 * Reusable Storybook controls for flex layout props (`Stack`, layout demos, etc.).
 * Spread into `meta.argTypes`: `argTypes: { ...layoutArgTypes }`.
 */
export const layoutArgTypes = {
  direction: {
    control: "select",
    options: [...FLEX_DIRECTION_OPTIONS],
    description: "Flex main axis",
  },
  alignItems: {
    control: "select",
    options: [...ALIGN_ITEMS_OPTIONS],
  },
  justifyContent: {
    control: "select",
    options: [...JUSTIFY_CONTENT_OPTIONS],
  },
  flexWrap: {
    control: "select",
    options: [...FLEX_WRAP_OPTIONS],
  },
  spacing: {
    control: { type: "number", min: 0, max: 12, step: 1 },
    description: "Gap as a theme spacing multiplier",
  },
} satisfies ArgTypes;
