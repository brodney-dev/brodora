export type SemanticColorName =
  | "primary"
  | "secondary"
  | "error"
  | "success"
  | "info"
  | "warning";

export type ColorShade =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;

export type ColorScale = Record<ColorShade, string>;

export type ThemeColors = Record<SemanticColorName, ColorScale>;

export interface ThemeAction {
  disabled: string;
  disabledBackground: string;
  disabledBorder: string;
  disabledOpacity: number;
}

export interface ThemeShape {
  /** Base radius in px; `sx` numeric `borderRadius` multiplies this (MUI-style). */
  borderRadius: number;
}

export interface Theme {
  colors: ThemeColors;
  action: ThemeAction;
  shape: ThemeShape;
  /** Px multiplier for `spacing(n)` and `sx` numeric margins, padding, and gap (`n × spacingUnit`). */
  spacingUnit: number;
  /** `value × theme.spacingUnit` as a px string. */
  spacing: (value: number) => string;
}
