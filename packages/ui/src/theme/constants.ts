import type { SemanticColorName } from "./types";

export const SEMANTIC_COLOR_NAMES = [
	"primary",
	"secondary",
	"error",
	"success",
	"info",
	"warning",
	"background",
	"neutral",
	"inverse",
] as const satisfies readonly SemanticColorName[];

export const COLOR_ROLES = [
	"main",
	"onMain",
	"container",
	"onContainer",
	"border",
] as const;
