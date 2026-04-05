import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { type ThemeColors, useTheme } from "../theme";

export type AlertVariant = "info" | "success" | "warning" | "error";

function variantStyles(
	variant: AlertVariant,
	colors: ThemeColors,
): {
	border: string;
	background: string;
	titleColor: string;
	bodyColor: string;
} {
	switch (variant) {
		case "success":
			return {
				border: colors.success.border,
				background: colors.success.container,
				titleColor: colors.success.onContainer,
				bodyColor: colors.success.onContainer,
			};
		case "warning":
			return {
				border: colors.warning.border,
				background: colors.warning.container,
				titleColor: colors.warning.onContainer,
				bodyColor: colors.warning.onContainer,
			};
		case "error":
			return {
				border: colors.error.border,
				background: colors.error.container,
				titleColor: colors.error.onContainer,
				bodyColor: colors.error.onContainer,
			};
		case "info":
		default:
			return {
				border: colors.info.border,
				background: colors.info.container,
				titleColor: colors.info.onContainer,
				bodyColor: colors.info.onContainer,
			};
	}
}

export interface AlertProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style" | "title"> {
	variant?: AlertVariant;
	/** Optional heading row (not the native `title` tooltip attribute). */
	title?: React.ReactNode;
	children: React.ReactNode;
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
	function Alert(
		{ variant = "info", title, children, sx, style, className, role, ...props },
		ref,
	) {
		const { colors, shape } = useTheme();
		const sxStyles = useSxStyles(sx);
		const palette = variantStyles(variant, colors);
		const implicitRole = variant === "error" ? "alert" : "status";

		const rootStyle: React.CSSProperties = {
			padding: "0.75rem 1rem",
			borderRadius: `${shape.borderRadius}px`,
			borderWidth: 1,
			borderStyle: "solid",
			borderColor: palette.border,
			backgroundColor: palette.background,
			...sxStyles,
			...style,
		};

		const titleStyle: React.CSSProperties = {
			margin: 0,
			marginBottom: title != null && title !== "" ? "0.35rem" : 0,
			fontSize: "0.875rem",
			fontWeight: 600,
			lineHeight: 1.35,
			color: palette.titleColor,
		};

		const bodyStyle: React.CSSProperties = {
			margin: 0,
			fontSize: "0.875rem",
			lineHeight: 1.5,
			color: palette.bodyColor,
		};

		return (
			<div
				ref={ref}
				role={role ?? implicitRole}
				className={className}
				style={rootStyle}
				{...props}
			>
				{title != null && title !== "" && <p style={titleStyle}>{title}</p>}
				<div style={bodyStyle}>{children}</div>
			</div>
		);
	},
);

Alert.displayName = "Alert";
