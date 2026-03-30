import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface TextFieldProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
	label?: React.ReactNode;
	helperText?: React.ReactNode;
	error?: boolean;
	/** When true, the field stretches to the width of its container. */
	fullWidth?: boolean;
	sx?: SxProps;
	style?: React.CSSProperties;
	/** Classes applied to the native `<input>`. */
	inputClassName?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
	function TextField(
		{
			label,
			helperText,
			error,
			fullWidth,
			sx,
			style,
			className,
			inputClassName,
			id: idProp,
			disabled,
			...inputProps
		},
		ref,
	) {
		const { colors, action, shape } = useTheme();
		const sxStyles = useSxStyles(sx);
		const [focused, setFocused] = React.useState(false);
		const generatedId = React.useId();
		const inputId = idProp ?? generatedId;
		const helperId = `${inputId}-helper`;
		const isDisabled = Boolean(disabled);
		const showHelper = helperText != null && helperText !== "";

		const rootStyle: React.CSSProperties = {
			display: "flex",
			flexDirection: "column",
			alignItems: "stretch",
			gap: "0.25rem",
			width: fullWidth ? "100%" : undefined,
			minWidth: fullWidth ? 0 : undefined,
			...sxStyles,
			...style,
		};

		const labelStyle: React.CSSProperties = {
			fontSize: "0.875rem",
			fontWeight: 500,
			color: colors.secondary[800],
		};

		const inputStyle: React.CSSProperties = {
			width: "100%",
			minWidth: 0,
			boxSizing: "border-box",
			fontSize: "1rem",
			lineHeight: 1.5,
			padding: "0.5rem 0.75rem",
			borderRadius: `${shape.borderRadius}px`,
			borderWidth: 1,
			borderStyle: "solid",
			outline: "none",
			...(isDisabled
				? {
						borderColor: action.disabledBorder,
						backgroundColor: action.disabledBackground,
						color: action.disabled,
						opacity: action.disabledOpacity ?? 0.5,
						cursor: "not-allowed",
					}
				: error
					? {
							borderColor: colors.error[500],
							backgroundColor: colors.secondary[50],
							color: colors.secondary[900],
						}
					: {
							borderColor: colors.secondary[300],
							backgroundColor: colors.secondary[50],
							color: colors.secondary[900],
						}),
			...(focused && !isDisabled
				? { boxShadow: `0 0 0 2px ${colors.primary[200]}` }
				: {}),
		};

		const helperStyle: React.CSSProperties = {
			fontSize: "0.75rem",
			lineHeight: 1.4,
			color: error ? colors.error[600] : colors.secondary[600],
		};

		return (
			<div className={className} style={rootStyle}>
				{label != null && label !== "" && (
					<label htmlFor={inputId} style={labelStyle}>
						{label}
					</label>
				)}
				<input
					ref={ref}
					{...inputProps}
					id={inputId}
					className={inputClassName}
					disabled={isDisabled}
					aria-invalid={error ? true : undefined}
					aria-describedby={showHelper ? helperId : undefined}
					onFocus={(e) => {
						inputProps.onFocus?.(e);
						setFocused(true);
					}}
					onBlur={(e) => {
						inputProps.onBlur?.(e);
						setFocused(false);
					}}
					style={inputStyle}
				/>
				{showHelper && (
					<span id={helperId} style={helperStyle}>
						{helperText}
					</span>
				)}
			</div>
		);
	},
);

TextField.displayName = "TextField";
