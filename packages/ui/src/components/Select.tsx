import { ChevronDown } from "@brodora/icons";
import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface SelectProps
	extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "style"> {
	error?: boolean;
	/** When true, the control stretches to the width of its container. */
	fullWidth?: boolean;
	sx?: SxProps;
	style?: React.CSSProperties;
	/** Classes applied to the native `<select>`. */
	selectClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	function Select(
		{
			error,
			fullWidth,
			sx,
			style,
			className,
			selectClassName,
			disabled,
			...selectProps
		},
		ref,
	) {
		const { colors, action, shape } = useTheme();
		const sxStyles = useSxStyles(sx);
		const [focused, setFocused] = React.useState(false);
		const isDisabled = Boolean(disabled);

		const rootStyle: React.CSSProperties = {
			display: "inline-block",
			width: fullWidth ? "100%" : undefined,
			minWidth: fullWidth ? 0 : undefined,
			...sxStyles,
			...style,
		};

		const wrapStyle: React.CSSProperties = {
			position: "relative",
			width: fullWidth ? "100%" : undefined,
		};

		const selectStyle: React.CSSProperties = {
			width: "100%",
			minWidth: 0,
			boxSizing: "border-box",
			appearance: "none",
			WebkitAppearance: "none",
			fontSize: "1rem",
			lineHeight: 1.5,
			padding: "0.5rem 2.25rem 0.5rem 0.75rem",
			borderRadius: `${shape.borderRadius}px`,
			borderWidth: 1,
			borderStyle: "solid",
			outline: "none",
			cursor: isDisabled ? "not-allowed" : "pointer",
			...(isDisabled
				? {
						borderColor: action.disabledBorder,
						backgroundColor: action.disabledBackground,
						color: action.disabled,
						opacity: action.disabledOpacity ?? 0.5,
					}
				: error
					? {
							borderColor: colors.error.border,
							backgroundColor: colors.secondary.container,
							color: colors.secondary.onContainer,
						}
					: {
							borderColor: colors.secondary.border,
							backgroundColor: colors.secondary.container,
							color: colors.secondary.onContainer,
						}),
			...(focused && !isDisabled
				? { boxShadow: `0 0 0 2px ${colors.primary.container}` }
				: {}),
		};

		const iconWrapStyle: React.CSSProperties = {
			position: "absolute",
			right: "0.625rem",
			top: "50%",
			transform: "translateY(-50%)",
			pointerEvents: "none",
			display: "flex",
			color: isDisabled ? action.disabled : colors.secondary.onMain,
		};

		return (
			<div className={className} style={rootStyle}>
				<div style={wrapStyle}>
					<select
						ref={ref}
						{...selectProps}
						className={selectClassName}
						disabled={isDisabled}
						onFocus={(e) => {
							selectProps.onFocus?.(e);
							setFocused(true);
						}}
						onBlur={(e) => {
							selectProps.onBlur?.(e);
							setFocused(false);
						}}
						style={selectStyle}
					/>
					<span style={iconWrapStyle}>
						<ChevronDown size={18} strokeWidth={2} />
					</span>
				</div>
			</div>
		);
	},
);

Select.displayName = "Select";
