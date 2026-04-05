import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface LinkProps
	extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "style"> {
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
	function Link({ sx, style, className, children, ...anchorProps }, ref) {
		const { colors } = useTheme();
		const sxStyles = useSxStyles(sx);

		const anchorStyle: React.CSSProperties = {
			color: colors.primary.main,
			textDecoration: "underline",
			textUnderlineOffset: "0.12em",
			cursor: "pointer",
			...sxStyles,
			...style,
		};

		return (
			<a ref={ref} className={className} style={anchorStyle} {...anchorProps}>
				{children}
			</a>
		);
	},
);

Link.displayName = "Link";
