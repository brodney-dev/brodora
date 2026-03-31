import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface LinearProgressProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
	/** When provided, renders determinate progress (0–100). Otherwise indeterminate. */
	value?: number;
	/** Height of the bar in px. */
	height?: number;
	/** Color variant. */
	variant?: "primary" | "success" | "error";
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const LinearProgress = React.forwardRef<
	HTMLDivElement,
	LinearProgressProps
>(function LinearProgress(
	{ value, height = 6, variant = "primary", sx, style, className, ...props },
	ref,
) {
	const { colors, shape } = useTheme();
	const sxStyles = useSxStyles(sx);

	const clamped = value == null ? undefined : Math.max(0, Math.min(100, value));

	const trackColor = colors.secondary[200];
	const barColor =
		variant === "success"
			? colors.success[600]
			: variant === "error"
				? colors.error[600]
				: colors.primary[600];

	const rootStyle: React.CSSProperties = {
		position: "relative",
		width: "100%",
		height,
		borderRadius: `${shape.borderRadius}px`,
		backgroundColor: trackColor,
		overflow: "hidden",
		...sxStyles,
		...style,
	};

	const determinateStyle: React.CSSProperties = {
		height: "100%",
		width: `${clamped ?? 0}%`,
		backgroundColor: barColor,
		transition: "width 0.2s ease",
	};

	const indeterminateBarStyle: React.CSSProperties = {
		position: "absolute",
		left: 0,
		top: 0,
		height: "100%",
		width: "35%",
		backgroundColor: barColor,
		borderRadius: `${shape.borderRadius}px`,
		animation: "brodora-linear-progress 1.1s ease-in-out infinite",
	};

	return (
		<div
			ref={ref}
			role="progressbar"
			className={className}
			style={rootStyle}
			{...props}
		>
			{clamped == null ? (
				<>
					<div
						className="brodora-linear-progress-bar"
						style={indeterminateBarStyle}
					/>
					<style>
						{`@keyframes brodora-linear-progress { 0% { transform: translateX(-100%); } 100% { transform: translateX(285%); } } @media (prefers-reduced-motion: reduce){ .brodora-linear-progress-bar{ animation: none !important; } }`}
					</style>
				</>
			) : (
				<div style={determinateStyle} />
			)}
		</div>
	);
});

LinearProgress.displayName = "LinearProgress";
