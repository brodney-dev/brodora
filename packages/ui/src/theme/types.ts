export type SemanticColorName =
	| "primary"
	| "secondary"
	| "error"
	| "success"
	| "info"
	| "warning"
	| "background"
	| "neutral"
	| "inverse";

/** Per-role tokens: surfaces, text-on-surface, and a dedicated border for each ramp. */
export interface SemanticColorTokens {
	main: string;
	onMain: string;
	container: string;
	onContainer: string;
	border: string;
}

export type ThemeColors = Record<SemanticColorName, SemanticColorTokens>;

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
