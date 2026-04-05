import { SEMANTIC_COLOR_NAMES } from "./constants";
import type {
	SemanticColorName,
	SemanticColorTokens,
	ThemeAction,
	ThemeColors,
} from "./types";

export function mergeThemeColors(
	base: ThemeColors,
	override?: Partial<Record<SemanticColorName, Partial<SemanticColorTokens>>>,
): ThemeColors {
	if (!override) return base;
	const next = { ...base };
	for (const name of SEMANTIC_COLOR_NAMES) {
		const partial = override[name];
		if (partial) {
			next[name] = { ...base[name], ...partial };
		}
	}
	return next;
}

export function mergeThemeAction(
	base: ThemeAction,
	override?: Partial<ThemeAction>,
): ThemeAction {
	return override ? { ...base, ...override } : base;
}
