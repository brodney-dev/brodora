import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

type RadioGroupContextValue = {
	name: string;
	value: string;
	setValue: (value: string) => void;
	disabled: boolean;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
	null,
);

function useRadioGroupContext(component: string): RadioGroupContextValue {
	const ctx = React.useContext(RadioGroupContext);
	if (!ctx) {
		throw new Error(`${component} must be used within RadioGroup`);
	}
	return ctx;
}

export interface RadioGroupProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style" | "onChange"> {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	name?: string;
	disabled?: boolean;
	orientation?: "horizontal" | "vertical";
	sx?: SxProps;
	style?: React.CSSProperties;
	children: React.ReactNode;
}

export function RadioGroup({
	value: valueProp,
	defaultValue = "",
	onValueChange,
	name: nameProp,
	disabled = false,
	orientation = "vertical",
	sx,
	style,
	className,
	children,
	onKeyDown: onKeyDownProp,
	...props
}: RadioGroupProps) {
	const generatedName = React.useId();
	const name = nameProp ?? `radio-${generatedName}`;
	const [internalValue, setInternalValue] = React.useState(defaultValue);
	const value = valueProp !== undefined ? valueProp : internalValue;

	const setValue = React.useCallback(
		(next: string) => {
			onValueChange?.(next);
			if (valueProp === undefined) setInternalValue(next);
		},
		[valueProp, onValueChange],
	);

	const ctx = React.useMemo<RadioGroupContextValue>(
		() => ({ name, value, setValue, disabled }),
		[name, value, setValue, disabled],
	);

	const sxStyles = useSxStyles(sx);
	const groupRef = React.useRef<HTMLDivElement>(null);

	const onKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			onKeyDownProp?.(e);
			if (e.defaultPrevented) return;
			const root = groupRef.current;
			if (!root) return;
			const radios = Array.from(
				root.querySelectorAll<HTMLInputElement>(
					'input[type="radio"]:not(:disabled)',
				),
			).filter((el) => el.name === name);
			if (radios.length === 0) return;
			const active = document.activeElement;
			const i = radios.indexOf(active as HTMLInputElement);
			if (i === -1) return;

			let nextIndex = -1;
			if (e.key === "ArrowRight" || e.key === "ArrowDown") {
				nextIndex = (i + 1) % radios.length;
			} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
				nextIndex = (i - 1 + radios.length) % radios.length;
			}
			if (nextIndex === -1) return;
			e.preventDefault();
			const nextEl = radios[nextIndex];
			nextEl?.focus();
			const v = nextEl?.value;
			if (v != null) setValue(v);
		},
		[name, onKeyDownProp, setValue],
	);

	const rootStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: orientation === "horizontal" ? "row" : "column",
		gap: "0.5rem",
		alignItems: orientation === "horizontal" ? "center" : "stretch",
		...sxStyles,
		...style,
	};

	return (
		<RadioGroupContext.Provider value={ctx}>
			<div
				ref={groupRef}
				className={className}
				style={rootStyle}
				{...props}
				onKeyDown={onKeyDown}
			>
				{children}
			</div>
		</RadioGroupContext.Provider>
	);
}

export type RadioProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"checked" | "defaultChecked" | "onChange" | "style" | "type" | "name"
> & {
	value: string;
	label?: React.ReactNode;
	sx?: SxProps;
	style?: React.CSSProperties;
};

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
	function Radio(
		{
			value,
			label,
			disabled: disabledProp,
			sx,
			style,
			className,
			id: idProp,
			...inputProps
		},
		ref,
	) {
		const {
			name,
			value: groupValue,
			setValue,
			disabled: groupDisabled,
		} = useRadioGroupContext("Radio");
		const { colors, action } = useTheme();
		const sxStyles = useSxStyles(sx);
		const generatedId = React.useId();
		const inputId = idProp ?? generatedId;
		const isDisabled = Boolean(groupDisabled || disabledProp);
		const checked = groupValue === value;

		const rowStyle: React.CSSProperties = {
			display: "inline-flex",
			alignItems: "center",
			gap: "0.5rem",
			cursor: isDisabled ? "not-allowed" : "pointer",
			...sxStyles,
			...style,
		};

		const inputStyle: React.CSSProperties = {
			width: "1.125rem",
			height: "1.125rem",
			flexShrink: 0,
			accentColor: colors.primary[600],
			cursor: isDisabled ? "not-allowed" : "pointer",
			opacity: isDisabled ? (action.disabledOpacity ?? 0.5) : 1,
		};

		const labelTextStyle: React.CSSProperties = {
			fontSize: "0.875rem",
			color: isDisabled ? action.disabled : colors.secondary[900],
		};

		return (
			<label className={className} style={rowStyle} htmlFor={inputId}>
				<input
					ref={ref}
					id={inputId}
					type="radio"
					name={name}
					value={value}
					checked={checked}
					disabled={isDisabled}
					onChange={() => setValue(value)}
					{...inputProps}
					style={inputStyle}
				/>
				{label != null && label !== "" && (
					<span style={labelTextStyle}>{label}</span>
				)}
			</label>
		);
	},
);

Radio.displayName = "Radio";
