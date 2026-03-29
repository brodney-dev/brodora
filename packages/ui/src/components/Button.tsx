import * as React from "react";
import { useSxStyles, type SxProps } from "../system/sx";
import { useTheme } from "../theme";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  startNode?: React.ReactNode;
  endNode?: React.ReactNode;
  sx?: SxProps;
}

export function Button({
  children,
  startNode,
  endNode,
  disabled,
  style,
  sx,
  ...props
}: ButtonProps) {
  const { colors, action } = useTheme();
  const sxStyles = useSxStyles(sx);
  const isDisabled = Boolean(disabled);

  return (
    <button
      {...props}
      disabled={isDisabled}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        ...(isDisabled
          ? {
              border: `1px solid ${action.disabledBorder}`,
              background: action.disabledBackground,
              color: action.disabled,
              opacity: action.disabledOpacity ?? 0.5,
              cursor: "not-allowed",
            }
          : {
              border: `1px solid ${colors.primary[700]}`,
              background: colors.primary[600],
              color: "#ffffff",
              cursor: "pointer",
            }),
        ...sxStyles,
        ...style,
      }}
    >
      {startNode && <span>{startNode}</span>}
      {children}
      {endNode && <span>{endNode}</span>}
    </button>
  );
}

