import { createSpacing, defaultSpacingUnit } from "./spacing";
import type { Theme, ThemeAction, ThemeColors } from "./types";

export const defaultThemeAction: ThemeAction = {
	disabled: "rgba(255, 255, 255, 0.38)",
	disabledBackground: "rgba(255, 255, 255, 0.12)",
	disabledBorder: "rgba(255, 255, 255, 0.12)",
	disabledOpacity: 0.5,
};

/** Default design tokens: dark app shell with readable contrasts on slate surfaces. */
export const defaultThemeColors: ThemeColors = {
	primary: {
		main: "#3b82f6",
		onMain: "#ffffff",
		container: "#172554",
		onContainer: "#93c5fd",
		border: "#2563eb",
	},
	secondary: {
		main: "#334155",
		onMain: "#cbd5e1",
		container: "#1e293b",
		onContainer: "#e2e8f0",
		border: "#475569",
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
		main: "#0f172a",
		onMain: "#f1f5f9",
		container: "#1e293b",
		onContainer: "#e2e8f0",
		border: "#334155",
	},
	/** Dividers, chrome, and non-brand grays. */
	neutral: {
		main: "#64748b",
		onMain: "#f8fafc",
		container: "#1e293b",
		onContainer: "#cbd5e1",
		border: "#334155",
	},
	/** Light / inverted surfaces (e.g. tooltips, menus on dark UI). */
	inverse: {
		main: "#f1f5f9",
		onMain: "#0f172a",
		container: "#ffffff",
		onContainer: "#0f172a",
		border: "#e2e8f0",
	},
};

export const defaultTheme: Theme = {
	colors: defaultThemeColors,
	action: defaultThemeAction,
	shape: { borderRadius: 4 },
	spacingUnit: defaultSpacingUnit,
	spacing: createSpacing(defaultSpacingUnit),
};
