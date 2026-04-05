import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface NavItemProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	/** Selected / current route or menu state. */
	active?: boolean;
	/** Stretch to container width (typical for vertical side nav). Default `true`. */
	fullWidth?: boolean;
	startNode?: React.ReactNode;
	endNode?: React.ReactNode;
	sx?: SxProps;
}

export const NavItem = React.forwardRef<HTMLButtonElement, NavItemProps>(
	function NavItem(
		{
			children,
			active = false,
			fullWidth = true,
			startNode,
			endNode,
			disabled,
			type = "button",
			style,
			sx,
			...props
		},
		ref,
	) {
		const { colors, shape } = useTheme();
		const sxStyles = useSxStyles(sx);
		const isDisabled = Boolean(disabled);

		const rootStyle: React.CSSProperties = {
			boxSizing: "border-box",
			margin: 0,
			font: "inherit",
			cursor: isDisabled ? "not-allowed" : "pointer",
			padding: "0.5rem 0.75rem",
			fontSize: "1rem",
			lineHeight: 1.5,
			textAlign: "left",
			width: fullWidth ? "100%" : undefined,
			minWidth: fullWidth ? 0 : undefined,
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			gap: "0.5rem",
			borderRadius: `${shape.borderRadius}px`,
			borderWidth: 1,
			borderStyle: "solid",
			outline: "none",
			...(isDisabled
				? {
						borderColor: colors.neutral.border,
						backgroundColor: colors.secondary.container,
						color: colors.secondary.onMain,
						opacity: 0.85,
					}
				: active
					? {
							borderColor: colors.neutral.border,
							backgroundColor: colors.neutral.main,
							color: colors.neutral.onMain,
							fontWeight: 600,
						}
					: {
							borderColor: "transparent",
							backgroundColor: "transparent",
							color: colors.secondary.onContainer,
							fontWeight: 500,
						}),
			...sxStyles,
			...style,
		};

		return (
			<button
				ref={ref}
				type={type}
				disabled={isDisabled}
				aria-current={active ? "page" : undefined}
				style={rootStyle}
				{...props}
			>
				{startNode != null ? (
					<span style={{ flexShrink: 0 }}>{startNode}</span>
				) : null}
				<span style={{ flex: 1, minWidth: 0 }}>{children}</span>
				{endNode != null ? (
					<span style={{ flexShrink: 0 }}>{endNode}</span>
				) : null}
			</button>
		);
	},
);

NavItem.displayName = "NavItem";
