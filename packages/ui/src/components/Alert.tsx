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
				border: colors.success[200],
				background: colors.success[50],
				titleColor: colors.success[900],
				bodyColor: colors.success[800],
			};
		case "warning":
			return {
				border: colors.warning[200],
				background: colors.warning[50],
				titleColor: colors.warning[900],
				bodyColor: colors.warning[800],
			};
		case "error":
			return {
				border: colors.error[200],
				background: colors.error[50],
				titleColor: colors.error[900],
				bodyColor: colors.error[800],
			};
		case "info":
		default:
			return {
				border: colors.info[200],
				background: colors.info[50],
				titleColor: colors.info[900],
				bodyColor: colors.info[800],
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
		{
			variant = "info",
			title,
			children,
			sx,
			style,
			className,
			role,
			...props
		},
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
				{title != null && title !== "" && (
					<p style={titleStyle}>{title}</p>
				)}
				<div style={bodyStyle}>{children}</div>
			</div>
		);
	},
);

Alert.displayName = "Alert";
