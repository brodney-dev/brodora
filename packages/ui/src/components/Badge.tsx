import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export type BadgeVariant =
	| "default"
	| "primary"
	| "success"
	| "warning"
	| "error"
	| "outline";

export interface BadgeProps
	extends Omit<React.HTMLAttributes<HTMLSpanElement>, "style"> {
	variant?: BadgeVariant;
	size?: "sm" | "md";
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
	function Badge(
		{
			variant = "default",
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

		const padding = size === "sm" ? "0.125rem 0.5rem" : "0.25rem 0.625rem";
		const fontSize = size === "sm" ? "0.75rem" : "0.8125rem";

		const palette = (() => {
			switch (variant) {
				case "primary":
					return {
						bg: colors.primary[100],
						fg: colors.primary[800],
						border: `1px solid ${colors.primary[200]}`,
					};
				case "success":
					return {
						bg: colors.success[100],
						fg: colors.success[800],
						border: `1px solid ${colors.success[200]}`,
					};
				case "warning":
					return {
						bg: colors.warning[100],
						fg: colors.warning[800],
						border: `1px solid ${colors.warning[200]}`,
					};
				case "error":
					return {
						bg: colors.error[100],
						fg: colors.error[800],
						border: `1px solid ${colors.error[200]}`,
					};
				case "outline":
					return {
						bg: "transparent",
						fg: colors.secondary[700],
						border: `1px solid ${colors.secondary[300]}`,
					};
				default:
					return {
						bg: colors.secondary[100],
						fg: colors.secondary[800],
						border: `1px solid ${colors.secondary[200]}`,
					};
			}
		})();

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
			backgroundColor: palette.bg,
			color: palette.fg,
			border: palette.border,
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
