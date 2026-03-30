import * as React from "react";
import type { Theme } from "../../theme/types";
import { expandSxShorthands } from "./expandShorthands";
import { resolveThemeTokenString } from "./resolveToken";
import type { SxProps } from "./types";

type Dict = Record<string, unknown>;

const SPACING_KEYS = new Set([
	"margin",
	"marginTop",
	"marginRight",
	"marginBottom",
	"marginLeft",
	"padding",
	"paddingTop",
	"paddingRight",
	"paddingBottom",
	"paddingLeft",
	"gap",
	"rowGap",
	"columnGap",
]);

const TOKEN_STRING_KEYS = new Set([
	"color",
	"backgroundColor",
	"borderColor",
	"borderTopColor",
	"borderRightColor",
	"borderBottomColor",
	"borderLeftColor",
	"outlineColor",
	"caretColor",
	"fill",
	"stroke",
	"textDecorationColor",
	"columnRuleColor",
]);

function resolveSxField(theme: Theme, value: unknown): unknown {
	if (value === undefined || value === null) return undefined;
	if (typeof value === "function") {
		return (value as (t: Theme) => unknown)(theme);
	}
	return value;
}

/** Resolves per-property `(theme) => …` callbacks; output is a flat dict before shorthand expansion. */
function unwindSxProps(theme: Theme, sx: SxProps | undefined): Dict {
	if (sx == null) return {};
	const out: Dict = {};
	for (const [key, val] of Object.entries(sx)) {
		const resolved = resolveSxField(theme, val);
		if (resolved !== undefined) out[key] = resolved;
	}
	return out;
}

/**
 * Turns `sx` into a plain `style` object using the current theme (spacing, palette refs, shorthands).
 */
export function resolveSx(
	theme: Theme,
	sx: SxProps | undefined,
): React.CSSProperties {
	const unwound = unwindSxProps(theme, sx);
	const expanded = expandSxShorthands(unwound);
	const out: Record<string, unknown> = {};

	for (const [key, raw] of Object.entries(expanded)) {
		if (raw === undefined || raw === null) continue;

		let value: unknown = raw;

		if (key === "borderRadius" && typeof value === "number") {
			value = `${value * theme.shape.borderRadius}px`;
		} else if (SPACING_KEYS.has(key) && typeof value === "number") {
			value = theme.spacing(value);
		} else if (TOKEN_STRING_KEYS.has(key) && typeof value === "string") {
			value = resolveThemeTokenString(theme, value);
		}

		out[key] = value;
	}

	return out as React.CSSProperties;
}
