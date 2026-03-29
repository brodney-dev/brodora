import * as React from "react";
import { useSxStyles, type SxProps } from "../system/sx";
import { useTheme } from "../theme";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Flex main axis; default stacks vertically. */
  direction?: React.CSSProperties["flexDirection"];
  /** Gap as a spacing multiplier (`theme.spacing(spacing)`). Omit or `0` for no gap. */
  spacing?: number;
  alignItems?: React.CSSProperties["alignItems"];
  justifyContent?: React.CSSProperties["justifyContent"];
  flexWrap?: React.CSSProperties["flexWrap"];
  sx?: SxProps;
}

export function Stack({
  children,
  direction = "column",
  spacing = 0,
  alignItems,
  justifyContent,
  flexWrap,
  sx,
  style,
  ...props
}: StackProps) {
  const theme = useTheme();
  const sxStyles = useSxStyles(sx);
  const gap = spacing > 0 ? theme.spacing(spacing) : undefined;

  return (
    <div
      {...props}
      style={{
        display: "flex",
        flexDirection: direction,
        alignItems,
        justifyContent,
        flexWrap,
        gap,
        ...sxStyles,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
