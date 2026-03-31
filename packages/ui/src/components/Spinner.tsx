import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface SpinnerProps
	extends Omit<React.SVGAttributes<SVGSVGElement>, "style"> {
	size?: number;
	thickness?: number;
	variant?: "primary" | "muted";
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
	function Spinner(
		{
			size = 20,
			thickness = 2,
			variant = "primary",
			sx,
			style,
			className,
			...props
		},
		ref,
	) {
		const { colors } = useTheme();
		const sxStyles = useSxStyles(sx);
		const stroke =
			variant === "muted" ? colors.secondary[500] : colors.primary[600];
		const r = 9;
		const c = 2 * Math.PI * r;

		const rootStyle: React.CSSProperties = {
			width: size,
			height: size,
			display: "inline-block",
			verticalAlign: "middle",
			...sxStyles,
			...style,
		};

		return (
			<>
				<svg
					ref={ref}
					className={`brodora-spinner ${className ?? ""}`.trim()}
					viewBox="0 0 24 24"
					role="img"
					style={rootStyle}
					{...props}
				>
					<circle
						cx="12"
						cy="12"
						r={r}
						fill="none"
						stroke={stroke}
						strokeWidth={thickness}
						strokeLinecap="round"
						strokeDasharray={`${c * 0.6} ${c}`}
					/>
				</svg>
				<style>
					{`@keyframes brodora-spin { to { transform: rotate(360deg); } } .brodora-spinner { animation: brodora-spin 0.75s linear infinite; } @media (prefers-reduced-motion: reduce){ .brodora-spinner { animation: none !important; } }`}
				</style>
			</>
		);
	},
);

Spinner.displayName = "Spinner";
