import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

const sliderClass = "brodora-slider-input";

export interface SliderProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"style" | "type" | "size"
	> {
	/** Track height in px. */
	trackHeight?: number;
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
	function Slider(
		{ trackHeight = 6, disabled, sx, style, className, ...inputProps },
		ref,
	) {
		const { colors, action, shape } = useTheme();
		const sxStyles = useSxStyles(sx);
		const isDisabled = Boolean(disabled);

		const track = colors.secondary.main;
		const fill = isDisabled ? action.disabledBorder : colors.primary.main;
		const thumbBorder = isDisabled
			? action.disabledBorder
			: colors.primary.border;
		const thumbSize = 18;
		const thumbOffset = (thumbSize - trackHeight) / 2;

		const rootStyle: React.CSSProperties = {
			display: "block",
			width: "100%",
			minWidth: 0,
			padding: "0.5rem 0",
			...sxStyles,
			...style,
		};

		const inputStyle: React.CSSProperties = {
			width: "100%",
			height: `${Math.max(trackHeight, thumbSize)}px`,
			margin: 0,
			padding: 0,
			background: "transparent",
			cursor: isDisabled ? "not-allowed" : "pointer",
			opacity: isDisabled ? (action.disabledOpacity ?? 0.5) : 1,
			accentColor: colors.primary.main,
		};

		return (
			<div className={className} style={rootStyle}>
				<input
					ref={ref}
					type="range"
					className={sliderClass}
					disabled={isDisabled}
					{...inputProps}
					style={inputStyle}
				/>
				<style>
					{`
						.${sliderClass} {
							-webkit-appearance: none;
							appearance: none;
						}
						.${sliderClass}::-webkit-slider-runnable-track {
							height: ${trackHeight}px;
							border-radius: ${shape.borderRadius}px;
							background: ${track};
						}
						.${sliderClass}::-webkit-slider-thumb {
							-webkit-appearance: none;
							appearance: none;
							width: ${thumbSize}px;
							height: ${thumbSize}px;
							margin-top: -${thumbOffset}px;
							border-radius: 50%;
							background: ${colors.background.container};
							border: 2px solid ${thumbBorder};
							box-shadow: 0 1px 2px rgba(0,0,0,0.12);
						}
						.${sliderClass}::-moz-range-track {
							height: ${trackHeight}px;
							border-radius: ${shape.borderRadius}px;
							background: ${track};
						}
						.${sliderClass}::-moz-range-progress {
							height: ${trackHeight}px;
							border-radius: ${shape.borderRadius}px;
							background: ${fill};
						}
						.${sliderClass}::-moz-range-thumb {
							width: ${thumbSize}px;
							height: ${thumbSize}px;
							border-radius: 50%;
							background: ${colors.background.container};
							border: 2px solid ${thumbBorder};
							box-shadow: 0 1px 2px rgba(0,0,0,0.12);
						}
					`}
				</style>
			</div>
		);
	},
);

Slider.displayName = "Slider";
