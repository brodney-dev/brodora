import * as React from "react";
import type { ThemeColorName } from "../system/color";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

/** Filled soft chip vs transparent with border. */
export type BadgeAppearance = "soft" | "outline";

export interface BadgeProps
	extends Omit<React.HTMLAttributes<HTMLSpanElement>, "style"> {
	/** Semantic palette for fill, text, and border. */
	color?: ThemeColorName;
	appearance?: BadgeAppearance;
	size?: "sm" | "md";
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
	function Badge(
		{
			color: colorProp = "neutral",
			appearance = "soft",
			size = "sm",
			sx,
			style,
			className,
			children,
			...props
		},
		ref,
	) {
		const { colors, shape } = useTheme();
		const sxStyles = useSxStyles(sx);
		const palette = colors[colorProp];

		const paletteStyle =
			appearance === "outline"
				? {
						bg: "transparent" as const,
						fg: palette.onContainer,
						border: `1px solid ${palette.border}`,
					}
				: {
						bg: palette.container,
						fg: palette.onContainer,
						border: `1px solid ${palette.border}`,
					};

		const padding = size === "sm" ? "0.125rem 0.5rem" : "0.25rem 0.625rem";
		const fontSize = size === "sm" ? "0.75rem" : "0.8125rem";

		const rootStyle: React.CSSProperties = {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			gap: "0.25rem",
			padding,
			fontSize,
			fontWeight: 600,
			lineHeight: 1.25,
			borderRadius: `${shape.borderRadius}px`,
			backgroundColor: paletteStyle.bg,
			color: paletteStyle.fg,
			border: paletteStyle.border,
			whiteSpace: "nowrap",
			maxWidth: "100%",
			...sxStyles,
			...style,
		};

		return (
			<span ref={ref} className={className} style={rootStyle} {...props}>
				{children}
			</span>
		);
	},
);

Badge.displayName = "Badge";
