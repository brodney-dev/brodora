import type { SemanticColorName, SemanticColorTokens } from "../../theme/types";

/** Semantic palette key only, e.g. `"primary"` | `"secondary"`. */
export type ThemeColorName = SemanticColorName;

/** `palette.main` or `palette.container` for every semantic palette. */
export type ThemeColorPathExtended = {
	[K in ThemeColorName]: `${K}.main` | `${K}.container`;
}[ThemeColorName];

/** Every `palette.role` path, including `onMain`, `onContainer`, and `border`. */
export type ThemeColorPathFull = {
	[K in ThemeColorName]: {
		[R in keyof SemanticColorTokens]: `${K}.${R & string}`;
	}[keyof SemanticColorTokens];
}[ThemeColorName];
