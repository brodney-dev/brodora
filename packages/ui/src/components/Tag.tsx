import * as React from "react";
import type { ThemeColorName } from "../system/color";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface TagProps
	extends Omit<React.HTMLAttributes<HTMLSpanElement>, "style"> {
	/** Semantic palette for fill, text, and border. */
	color?: ThemeColorName;
	/** When set, shows a remove control and calls this on click. */
	onRemove?: () => void;
	removeLabel?: string;
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(function Tag(
	{
		color: colorProp = "neutral",
		onRemove,
		removeLabel = "Remove",
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
	const palette = colors[colorProp];

	const rootStyle: React.CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		gap: "0.35rem",
		maxWidth: "100%",
		padding: "0.25rem 0.5rem",
		fontSize: "0.8125rem",
		lineHeight: 1.3,
		fontWeight: 500,
		borderRadius: `${shape.borderRadius}px`,
		border: `1px solid ${palette.border}`,
		backgroundColor: palette.container,
		color: palette.onContainer,
		...sxStyles,
		...style,
	};

	return (
		<span ref={ref} className={className} style={rootStyle} {...props}>
			<span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
				{children}
			</span>
			{onRemove && (
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						onRemove();
					}}
					style={{
						border: "none",
						background: "transparent",
						color: "inherit",
						cursor: "pointer",
						padding: 0,
						lineHeight: 1,
						fontSize: "1rem",
						opacity: 0.75,
					}}
				>
					×
				</button>
			)}
		</span>
	);
});

Tag.displayName = "Tag";
