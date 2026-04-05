import * as React from "react";
import type { ThemeColorName } from "../system/color";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface IconButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: "sm" | "md" | "lg";
	/** Semantic palette: icon uses `onContainer`, hover background uses `container`. */
	color?: ThemeColorName;
	sx?: SxProps;
}

const sizePx: Record<NonNullable<IconButtonProps["size"]>, number> = {
	sm: 32,
	md: 40,
	lg: 48,
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
	function IconButton(
		{
			size = "md",
			color: colorProp = "secondary",
			disabled,
			children,
			style,
			sx,
			type = "button",
			...props
		},
		ref,
	) {
		const { colors, action } = useTheme();
		const sxStyles = useSxStyles(sx);
		const isDisabled = Boolean(disabled);
		const dim = sizePx[size];
		const [hover, setHover] = React.useState(false);
		const palette = colors[colorProp];

		return (
			<button
				ref={ref}
				type={type}
				disabled={isDisabled}
				{...props}
				onMouseEnter={(e) => {
					props.onMouseEnter?.(e);
					setHover(true);
				}}
				onMouseLeave={(e) => {
					props.onMouseLeave?.(e);
					setHover(false);
				}}
				style={{
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					width: dim,
					height: dim,
					padding: 0,
					borderRadius: "0.5rem",
					border: "1px solid transparent",
					...(isDisabled
						? {
								background: action.disabledBackground,
								color: action.disabled,
								opacity: action.disabledOpacity ?? 0.5,
								cursor: "not-allowed",
							}
						: {
								background: hover ? palette.container : "transparent",
								color: palette.onContainer,
								cursor: "pointer",
							}),
					...sxStyles,
					...style,
				}}
			>
				{children}
			</button>
		);
	},
);

IconButton.displayName = "IconButton";
