import { Check, Minus } from "@brodora/icons";
import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

type CheckedState = boolean | "indeterminate";

export type CheckboxProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"checked" | "defaultChecked" | "onChange" | "size" | "type"
> & {
	checked?: boolean | "indeterminate";
	defaultChecked?: boolean | "indeterminate";
	onCheckedChange?: (checked: CheckedState) => void;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	sx?: SxProps;
	style?: React.CSSProperties;
};

function mergeRefs<T>(
	...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
	return (node) => {
		for (const ref of refs) {
			if (ref == null) continue;
			if (typeof ref === "function") ref(node);
			else (ref as React.MutableRefObject<T | null>).current = node;
		}
	};
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	function Checkbox(
		{
			sx,
			style,
			disabled,
			checked: checkedProp,
			defaultChecked,
			onCheckedChange,
			onChange,
			className,
			...props
		},
		ref,
	) {
		const { colors, action } = useTheme();
		const sxStyles = useSxStyles(sx);
		const isDisabled = Boolean(disabled);
		const inputRef = React.useRef<HTMLInputElement>(null);
		const setRefs = mergeRefs(ref, inputRef);

		const [internalChecked, setInternalChecked] = React.useState<CheckedState>(
			() => {
				if (defaultChecked === true) return true;
				if (defaultChecked === "indeterminate") return "indeterminate";
				return false;
			},
		);

		const checked: CheckedState =
			checkedProp !== undefined ? checkedProp : internalChecked;

		const handleCheckedChange = React.useCallback(
			(next: CheckedState) => {
				onCheckedChange?.(next);
				if (checkedProp === undefined) setInternalChecked(next);
			},
			[checkedProp, onCheckedChange],
		);

		const handleChange = React.useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				onChange?.(e);
				const el = e.currentTarget;
				const next: CheckedState = el.indeterminate
					? "indeterminate"
					: el.checked;
				handleCheckedChange(next);
			},
			[onChange, handleCheckedChange],
		);

		React.useLayoutEffect(() => {
			const el = inputRef.current;
			if (!el) return;
			el.indeterminate = checked === "indeterminate";
		}, [checked]);

		const isChecked = checked === true;
		const isIndeterminate = checked === "indeterminate";
		const showIndicator = isChecked || isIndeterminate;

		const boxStyle: React.CSSProperties = {
			position: "relative",
			width: "1.125rem",
			height: "1.125rem",
			flexShrink: 0,
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			borderRadius: "0.25rem",
			borderWidth: 1,
			borderStyle: "solid",
			cursor: isDisabled ? "not-allowed" : "pointer",
			transition: "background-color 0.15s ease, border-color 0.15s ease",
			...(isDisabled
				? {
						borderColor: action.disabledBorder,
						backgroundColor: action.disabledBackground,
						color: action.disabled,
						opacity: action.disabledOpacity ?? 0.5,
					}
				: showIndicator
					? {
							borderColor: colors.primary[600],
							backgroundColor: colors.primary[600],
							color: "#ffffff",
						}
					: {
							borderColor: colors.secondary[300],
							backgroundColor: colors.secondary[50],
						}),
			...sxStyles,
			...style,
		};

		const inputStyle: React.CSSProperties = {
			position: "absolute",
			inset: 0,
			width: "100%",
			height: "100%",
			margin: 0,
			opacity: 0,
			cursor: "inherit",
			zIndex: 1,
		};

		return (
			<span className={className} style={boxStyle}>
				<span
					aria-hidden
					style={{
						position: "absolute",
						inset: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						pointerEvents: "none",
					}}
				>
					{showIndicator &&
						(isIndeterminate ? (
							<Minus size={12} strokeWidth={2} aria-hidden />
						) : (
							<Check size={12} strokeWidth={2} aria-hidden />
						))}
				</span>
				<input
					ref={setRefs}
					type="checkbox"
					disabled={isDisabled}
					checked={checked === true}
					onChange={handleChange}
					{...props}
					style={inputStyle}
				/>
			</span>
		);
	},
);

Checkbox.displayName = "Checkbox";
