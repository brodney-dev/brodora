import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface SkeletonProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
	width?: number | string;
	height?: number | string;
	/** When true, renders a circle skeleton (uses `height` as diameter when `width` is unset). */
	circle?: boolean;
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
	function Skeleton(
		{
			width = "100%",
			height = "1rem",
			circle = false,
			sx,
			style,
			className,
			...props
		},
		ref,
	) {
		const { colors, shape } = useTheme();
		const sxStyles = useSxStyles(sx);

		const w = width ?? "100%";
		const h = height ?? "1rem";
		const radius = circle ? "9999px" : `${shape.borderRadius}px`;

		const rootStyle: React.CSSProperties = {
			width: w,
			height: h,
			borderRadius: radius,
			background: `linear-gradient(90deg, ${colors.secondary.main} 0%, ${colors.background.main} 45%, ${colors.secondary.main} 90%)`,
			backgroundSize: "200% 100%",
			animation: "brodora-skeleton 1.25s ease-in-out infinite",
			...sxStyles,
			...style,
		};

		return (
			<div
				ref={ref}
				className={`brodora-skeleton ${className ?? ""}`.trim()}
				style={rootStyle}
				{...props}
			>
				<style>
					{`@keyframes brodora-skeleton { 0%{ background-position: 200% 0; } 100%{ background-position: -200% 0; } } @media (prefers-reduced-motion: reduce){ .brodora-skeleton{ animation: none !important; } }`}
				</style>
			</div>
		);
	},
);

Skeleton.displayName = "Skeleton";
