import { COLOR_ROLES, SEMANTIC_COLOR_NAMES } from "../../theme/constants";
import type { SemanticColorName, Theme, ThemeAction } from "../../theme/types";

const ROLE_PATTERN = COLOR_ROLES.join("|");
const PALETTE_RE = new RegExp(
	`^(${SEMANTIC_COLOR_NAMES.join("|")})\\.(${ROLE_PATTERN})$`,
);

const ACTION_KEYS = new Set<keyof ThemeAction>([
	"disabled",
	"disabledBackground",
	"disabledBorder",
	"disabledOpacity",
]);

/**
 * Resolves `primary.main`, `neutral.border`, `inverse.onMain`, etc. → theme color; `action.disabled` → theme action token.
 * Otherwise returns the input unchanged.
 */
export function resolveThemeTokenString(theme: Theme, value: string): string {
	const paletteMatch = value.match(PALETTE_RE);
	if (paletteMatch) {
		const name = paletteMatch[1] as SemanticColorName;
		const role = paletteMatch[2] as keyof (typeof theme.colors)[typeof name];
		const palette = theme.colors[name];
		if (palette && role in palette) {
			return palette[role];
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
