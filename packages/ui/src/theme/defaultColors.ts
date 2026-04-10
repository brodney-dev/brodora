import { createSpacing, defaultSpacingUnit } from "./spacing";
import type { Theme, ThemeAction, ThemeColors } from "./types";

export const defaultThemeAction: ThemeAction = {
	disabled: "rgba(255, 255, 255, 0.38)",
	disabledBackground: "rgba(255, 255, 255, 0.12)",
	disabledBorder: "rgba(255, 255, 255, 0.12)",
	disabledOpacity: 0.5,
};

/** Default design tokens: black app shell, light text; inverse ramp for menus/tooltips. */
export const defaultThemeColors: ThemeColors = {
	primary: {
		main: "#408A71",
		onMain: "#ffffff",
		container: "#10221c",
		onContainer: "#a8dcc8",
		border: "#357a63",
	},
	secondary: {
		main: "#525252",
		onMain: "#fafafa",
		container: "#1c1c1c",
		onContainer: "#e5e5e5",
		border: "#404040",
	},
	error: {
		main: "#ef4444",
		onMain: "#ffffff",
		container: "#450a0a",
		onContainer: "#fecaca",
		border: "#f87171",
	},
	success: {
		main: "#22c55e",
		onMain: "#ffffff",
		container: "#14532d",
		onContainer: "#bbf7d0",
		border: "#4ade80",
	},
	info: {
		main: "#0ea5e9",
		onMain: "#ffffff",
		container: "#0c4a6e",
		onContainer: "#7dd3fc",
		border: "#38bdf8",
	},
	warning: {
		main: "#f59e0b",
		onMain: "#ffffff",
		container: "#78350f",
		onContainer: "#fde68a",
		border: "#fbbf24",
	},
	background: {
		main: "#000000",
		onMain: "#ffffff",
		container: "#161616",
		onContainer: "#f5f5f5",
		border: "#2a2a2a",
	},
	/** Dividers, chrome, and non-brand grays. */
	neutral: {
		main: "#737373",
		onMain: "#ffffff",
		container: "#171717",
		onContainer: "#d4d4d4",
		border: "#404040",
	},
	/** Light / inverted surfaces (e.g. tooltips, menus on dark UI). */
	inverse: {
		main: "#ffffff",
		onMain: "#000000",
		container: "#f5f5f5",
		onContainer: "#0a0a0a",
		border: "#e5e5e5",
	},
};

export const defaultTheme: Theme = {
	colors: defaultThemeColors,
	action: defaultThemeAction,
	shape: { borderRadius: 2 },
	spacingUnit: defaultSpacingUnit,
	spacing: createSpacing(defaultSpacingUnit),
};
