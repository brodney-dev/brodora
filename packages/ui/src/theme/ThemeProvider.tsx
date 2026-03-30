import * as React from "react";
import { mergeThemeAction, mergeThemeColors } from "./cssVars";
import {
	defaultTheme,
	defaultThemeAction,
	defaultThemeColors,
} from "./defaultColors";
import { createSpacing } from "./spacing";
import type {
	ColorScale,
	SemanticColorName,
	Theme,
	ThemeAction,
	ThemeColors,
	ThemeShape,
} from "./types";

const ThemeContext = React.createContext<Theme>(defaultTheme);

export interface ThemeProviderProps {
	children: React.ReactNode;
	/** Deep partial override per semantic color and shade. */
	colors?: Partial<Record<SemanticColorName, Partial<ColorScale>>>;
	/** Override disabled / interaction tokens used by components such as `Button`. */
	action?: Partial<ThemeAction>;
	/** Override `theme.shape` (e.g. default border radius). */
	shape?: Partial<ThemeShape>;
	/** Override the px multiplier for `theme.spacing(n)` and `sx` spacing shorthands. */
	spacingUnit?: number;
	/** Replace `theme.spacing` entirely (bypasses `spacingUnit`). */
	spacing?: (value: number) => string;
}

export function ThemeProvider({
	children,
	colors: colorsOverride,
	action: actionOverride,
	shape: shapeOverride,
	spacingUnit: spacingUnitOverride,
	spacing: spacingOverride,
}: ThemeProviderProps) {
	const theme = React.useMemo<Theme>(() => {
		const spacingUnit = spacingUnitOverride ?? defaultTheme.spacingUnit;
		const spacing = spacingOverride ?? createSpacing(spacingUnit);

		return {
			colors: mergeThemeColors(defaultThemeColors, colorsOverride),
			action: mergeThemeAction(defaultThemeAction, actionOverride),
			shape: { ...defaultTheme.shape, ...shapeOverride },
			spacingUnit,
			spacing,
		};
	}, [
		colorsOverride,
		actionOverride,
		shapeOverride,
		spacingUnitOverride,
		spacingOverride,
	]);

	return (
		<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
	);
}

/** Resolved theme from the nearest `ThemeProvider`, or `defaultTheme` when none wraps the tree. */
export function useTheme(): Theme {
	return React.useContext(ThemeContext);
}

export function useThemeColors(): ThemeColors {
	return useTheme().colors;
}
