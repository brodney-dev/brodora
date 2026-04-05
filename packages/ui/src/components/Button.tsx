import * as React from "react";
import type { ThemeColorName } from "../system/color";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	/** Semantic palette; fills with `main`, text `onMain`, outline `border`. */
	color?: ThemeColorName;
	startNode?: React.ReactNode;
	endNode?: React.ReactNode;
	sx?: SxProps;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	function Button(
		{
			children,
			color: colorProp = "primary",
			startNode,
			endNode,
			disabled,
			style,
			sx,
			...props
		},
		ref,
	) {
		const { colors, action } = useTheme();
		const sxStyles = useSxStyles(sx);
		const isDisabled = Boolean(disabled);
		const palette = colors[colorProp];

		return (
			<button
				ref={ref}
				{...props}
				disabled={isDisabled}
				style={{
					padding: "0.5rem 1rem",
					borderRadius: "0.5rem",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "0.5rem",
					...(isDisabled
						? {
								border: `1px solid ${action.disabledBorder}`,
								background: action.disabledBackground,
								color: action.disabled,
								opacity: action.disabledOpacity ?? 0.5,
								cursor: "not-allowed",
							}
						: {
								border: `1px solid ${palette.border}`,
								background: palette.main,
								color: palette.onMain,
								cursor: "pointer",
							}),
					...sxStyles,
					...style,
				}}
			>
				{startNode && <span>{startNode}</span>}
				{children}
				{endNode && <span>{endNode}</span>}
			</button>
		);
	},
);

Button.displayName = "Button";
