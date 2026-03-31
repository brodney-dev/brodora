import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export type TagVariant =
	| "default"
	| "primary"
	| "success"
	| "warning"
	| "error";

export interface TagProps
	extends Omit<React.HTMLAttributes<HTMLSpanElement>, "style"> {
	variant?: TagVariant;
	/** When set, shows a remove control and calls this on click. */
	onRemove?: () => void;
	removeLabel?: string;
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(function Tag(
	{
		variant = "default",
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

	const palette = (() => {
		switch (variant) {
			case "primary":
				return {
					bg: colors.primary[50],
					fg: colors.primary[800],
					border: colors.primary[200],
				};
			case "success":
				return {
					bg: colors.success[50],
					fg: colors.success[900],
					border: colors.success[200],
				};
			case "warning":
				return {
					bg: colors.warning[50],
					fg: colors.warning[900],
					border: colors.warning[200],
				};
			case "error":
				return {
					bg: colors.error[50],
					fg: colors.error[900],
					border: colors.error[200],
				};
			default:
				return {
					bg: colors.secondary[100],
					fg: colors.secondary[800],
					border: colors.secondary[200],
				};
		}
	})();

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
		backgroundColor: palette.bg,
		color: palette.fg,
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
