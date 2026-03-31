import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";

export interface BoxProps
	extends Omit<React.HTMLAttributes<HTMLElement>, "style"> {
	/** Host element; default `div`. */
	as?: keyof React.JSX.IntrinsicElements;
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const Box = React.forwardRef<HTMLElement, BoxProps>(function Box(
	{ as = "div", sx, style, className, children, ...props },
	ref,
) {
	const sxStyles = useSxStyles(sx);
	const Tag = as as React.ElementType;

	return React.createElement(
		Tag,
		{
			ref,
			className,
			style: { ...sxStyles, ...style },
			...props,
		},
		children,
	);
});

Box.displayName = "Box";
