import type { CSSProperties } from "react";
import type { Theme } from "../../theme/types";

/** Per-value theme callback: use at the property level, not on the whole `sx` object. */
export type SxThemeResolver<T> = (theme: Theme) => T;

/** Shorthand keys (`m`, `p`, `bgcolor`, …) before theme-aware wrapping. */
export interface SxShorthandBase {
	m?: number | string;
	mt?: number | string;
	mr?: number | string;
	mb?: number | string;
	ml?: number | string;
	mx?: number | string;
	my?: number | string;
	p?: number | string;
	pt?: number | string;
	pr?: number | string;
	pb?: number | string;
	pl?: number | string;
	px?: number | string;
	py?: number | string;
	/** Sets `backgroundColor`. */
	bgcolor?: string;
}

export type SxShorthandProps = {
	[K in keyof SxShorthandBase]?:
		| SxShorthandBase[K]
		| SxThemeResolver<NonNullable<SxShorthandBase[K]>>;
};

type CssSx = {
	[K in keyof CSSProperties]?:
		| CSSProperties[K]
		| SxThemeResolver<NonNullable<CSSProperties[K]>>;
};

/**
 * A single style object. Each field is either a normal CSS value or `(theme) => value`.
 * No arrays and no whole-object theme callback.
 */
export type SxProps = CssSx & SxShorthandProps;

/** Plain `sx`-like object without theme callbacks (for typing overrides, tests, etc.). */
export type SxObject = SxShorthandBase & CSSProperties;
