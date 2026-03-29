import * as React from "react";
import { useTheme } from "../../theme";
import { resolveSx } from "./resolveSx";
import type { SxProps } from "./types";

/** Resolves `sx` for the current theme; stable when `theme` and `sx` are stable. */
export function useSxStyles(sx?: SxProps): React.CSSProperties {
  const theme = useTheme();
  return React.useMemo(() => resolveSx(theme, sx), [theme, sx]);
}
