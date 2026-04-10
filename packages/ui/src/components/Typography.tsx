import * as React from "react";
import { ThemeColorPathFull } from "../system/color";
import {
	resolveThemeTokenString,
	type SxProps,
	useSxStyles,
} from "../system/sx";
import { useTheme } from "../theme";

export type TypographyVariant =
	| "display"
	| "title"
	| "h1"
	| "h2"
	| "h3"
	| "body"
	| "body-sm"
	| "caption"
	| "label";

type IntrinsicTag = keyof React.JSX.IntrinsicElements;

const variantConfig: Record<
	TypographyVariant,
	{ defaultTag: IntrinsicTag; styles: React.CSSProperties }
> = {
	display: {
		defaultTag: "h1",
		styles: {
			fontSize: "2.5rem",
			fontWeight: 700,
			lineHeight: 1.2,
			letterSpacing: "-0.02em",
			margin: 0,
		},
	},
	title: {
		defaultTag: "h2",
		styles: {
			fontSize: "2rem",
			fontWeight: 600,
			lineHeight: 1.25,
			letterSpacing: "-0.015em",
			margin: 0,
		},
	},
	h1: {
		defaultTag: "h1",
		styles: {
			fontSize: "1.875rem",
			fontWeight: 600,
			lineHeight: 1.3,
			letterSpacing: "-0.01em",
			margin: 0,
		},
	},
	h2: {
		defaultTag: "h2",
		styles: {
			fontSize: "1.5rem",
			fontWeight: 600,
			lineHeight: 1.35,
			margin: 0,
		},
	},
	h3: {
		defaultTag: "h3",
		styles: {
			fontSize: "1.25rem",
			fontWeight: 600,
			lineHeight: 1.4,
			margin: 0,
		},
	},
	body: {
		defaultTag: "p",
		styles: {
			fontSize: "1rem",
			fontWeight: 400,
			lineHeight: 1.6,
			margin: 0,
		},
	},
	"body-sm": {
		defaultTag: "p",
		styles: {
			fontSize: "0.875rem",
			fontWeight: 400,
			lineHeight: 1.55,
			margin: 0,
		},
	},
	caption: {
		defaultTag: "span",
		styles: {
			fontSize: "0.75rem",
			fontWeight: 400,
			lineHeight: 1.5,
			margin: 0,
		},
	},
	label: {
		defaultTag: "span",
		styles: {
			fontSize: "0.75rem",
			fontWeight: 600,
			lineHeight: 1.4,
			letterSpacing: "0.04em",
			textTransform: "uppercase",
			margin: 0,
		},
	},
};

export interface TypographyProps
	extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
	variant?: TypographyVariant;
	/** Semantic ramp; text uses that ramp’s `main` token. Default: `inverse` → `theme.colors.inverse.main`. */
	color?: ThemeColorPathFull;
	as?: IntrinsicTag;
	children: React.ReactNode;
	sx?: SxProps;
}

export function Typography({
	variant = "body",
	color = "inverse.main",
	as,
	children,
	style,
	sx,
	...rest
}: TypographyProps) {
	const theme = useTheme();
	const sxStyles = useSxStyles(sx);
	const config = variantConfig[variant];
	const Tag = (as ?? config.defaultTag) as React.ElementType;

	return React.createElement(
		Tag,
		{
			...rest,
			style: {
				...config.styles,
				color: resolveThemeTokenString(theme, color),
				...sxStyles,
				...style,
			},
		},
		children,
	);
}
