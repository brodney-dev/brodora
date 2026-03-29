import * as React from "react";
import { useSxStyles, type SxProps } from "../system/sx";
import { useTheme, type ThemeColors } from "../theme";

export type TypographyVariant =
  | "display"
  | "title"
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "body-sm"
  | "caption"
  | "label";

type IntrinsicTag = keyof React.JSX.IntrinsicElements;

type TextTone = "foreground" | "muted" | "subtle";

function toneColor(colors: ThemeColors, tone: TextTone): string {
  switch (tone) {
    case "foreground":
      return colors.secondary[900];
    case "muted":
      return colors.secondary[600];
    case "subtle":
      return colors.secondary[500];
  }
}

const variantConfig: Record<
  TypographyVariant,
  { defaultTag: IntrinsicTag; tone: TextTone; styles: React.CSSProperties }
> = {
  display: {
    defaultTag: "h1",
    tone: "foreground",
    styles: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
      margin: 0,
    },
  },
  title: {
    defaultTag: "h2",
    tone: "foreground",
    styles: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: "-0.015em",
      margin: 0,
    },
  },
  h1: {
    defaultTag: "h1",
    tone: "foreground",
    styles: {
      fontSize: "1.875rem",
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
      margin: 0,
    },
  },
  h2: {
    defaultTag: "h2",
    tone: "foreground",
    styles: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.35,
      margin: 0,
    },
  },
  h3: {
    defaultTag: "h3",
    tone: "foreground",
    styles: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
      margin: 0,
    },
  },
  body: {
    defaultTag: "p",
    tone: "foreground",
    styles: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.6,
      margin: 0,
    },
  },
  "body-sm": {
    defaultTag: "p",
    tone: "muted",
    styles: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.55,
      margin: 0,
    },
  },
  caption: {
    defaultTag: "span",
    tone: "subtle",
    styles: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.5,
      margin: 0,
    },
  },
  label: {
    defaultTag: "span",
    tone: "muted",
    styles: {
      fontSize: "0.75rem",
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      margin: 0,
    },
  },
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: IntrinsicTag;
  children: React.ReactNode;
  sx?: SxProps;
}

export function Typography({
  variant = "body",
  as,
  children,
  style,
  sx,
  ...rest
}: TypographyProps) {
  const { colors } = useTheme();
  const sxStyles = useSxStyles(sx);
  const config = variantConfig[variant];
  const Tag = (as ?? config.defaultTag) as React.ElementType;

  return React.createElement(
    Tag,
    {
      ...rest,
      style: {
        ...config.styles,
        color: toneColor(colors, config.tone),
        ...sxStyles,
        ...style,
      },
    },
    children
  );
}
