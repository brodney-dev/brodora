import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface EmptyStateProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style" | "title"> {
	heading: React.ReactNode;
	description?: React.ReactNode;
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
	function EmptyState(
		{ heading, description, sx, style, className, children, ...props },
		ref,
	) {
		const { colors } = useTheme();
		const sxStyles = useSxStyles(sx);

		const rootStyle: React.CSSProperties = {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			textAlign: "center",
			gap: "0.75rem",
			padding: "2rem 1.25rem",
			maxWidth: "28rem",
			margin: "0 auto",
			color: colors.secondary[700],
			...sxStyles,
			...style,
		};

		const titleStyle: React.CSSProperties = {
			margin: 0,
			fontSize: "1.125rem",
			fontWeight: 600,
			color: colors.secondary[900],
		};

		const descStyle: React.CSSProperties = {
			margin: 0,
			fontSize: "0.875rem",
			lineHeight: 1.55,
		};

		return (
			<div ref={ref} className={className} style={rootStyle} {...props}>
				<p style={titleStyle}>{heading}</p>
				{description != null && description !== "" && (
					<p style={descStyle}>{description}</p>
				)}
				{children}
			</div>
		);
	},
);

EmptyState.displayName = "EmptyState";
