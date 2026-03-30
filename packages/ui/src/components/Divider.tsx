import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface DividerProps
	extends Omit<React.HTMLAttributes<HTMLHRElement>, "style"> {
	orientation?: "horizontal" | "vertical";
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
	function Divider(
		{
			orientation = "horizontal",
			sx,
			style,
			className,
			role = "separator",
			"aria-orientation": ariaOrientationProp,
			...props
		},
		ref,
	) {
		const { colors } = useTheme();
		const sxStyles = useSxStyles(sx);
		const ariaOrientation =
			ariaOrientationProp ??
			(orientation === "vertical" ? "vertical" : "horizontal");

		const lineStyle: React.CSSProperties =
			orientation === "vertical"
				? {
						display: "inline-block",
						alignSelf: "stretch",
						width: 1,
						minHeight: "1em",
						margin: "0 0.5rem",
						border: "none",
						backgroundColor: colors.secondary[200],
						flexShrink: 0,
					}
				: {
						display: "block",
						width: "100%",
						height: 1,
						margin: "0.5rem 0",
						border: "none",
						backgroundColor: colors.secondary[200],
						flexShrink: 0,
					};

		return (
			<hr
				ref={ref}
				role={role}
				aria-orientation={ariaOrientation}
				className={className}
				style={{ ...lineStyle, ...sxStyles, ...style }}
				{...props}
			/>
		);
	},
);

Divider.displayName = "Divider";
