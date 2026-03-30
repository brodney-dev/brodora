import type { ColorShade, SemanticColorName } from "./types";

export const SEMANTIC_COLOR_NAMES = [
	"primary",
	"secondary",
	"error",
	"success",
	"info",
	"warning",
] as const satisfies readonly SemanticColorName[];

export const COLOR_SHADES = [
	50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const satisfies readonly ColorShade[];
