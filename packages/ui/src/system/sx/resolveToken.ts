import { COLOR_SHADES, SEMANTIC_COLOR_NAMES } from "../../theme/constants";
import type {
	ColorShade,
	SemanticColorName,
	Theme,
	ThemeAction,
} from "../../theme/types";

const PALETTE_RE = new RegExp(
	`^(${SEMANTIC_COLOR_NAMES.join("|")})\\.(50|100|200|300|400|500|600|700|800|900)$`,
);

const ACTION_KEYS = new Set<keyof ThemeAction>([
	"disabled",
	"disabledBackground",
	"disabledBorder",
	"disabledOpacity",
]);

/**
 * Resolves `primary.600` → theme color, `action.disabled` → theme action token.
 * Otherwise returns the input unchanged.
 */
export function resolveThemeTokenString(theme: Theme, value: string): string {
	const paletteMatch = value.match(PALETTE_RE);
	if (paletteMatch) {
		const name = paletteMatch[1] as SemanticColorName;
		const shade = Number(paletteMatch[2]) as ColorShade;
		if (COLOR_SHADES.includes(shade)) {
			return theme.colors[name][shade];
		}
	}

	if (value.startsWith("action.")) {
		const key = value.slice(7) as keyof ThemeAction;
		if (ACTION_KEYS.has(key)) {
			return String(theme.action[key]);
		}
	}

	return value;
}
