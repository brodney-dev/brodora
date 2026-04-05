import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { hexToRgba, useTheme } from "../theme";

export type AutocompleteOption =
	| string
	| {
			value: string;
			label?: React.ReactNode;
	  };

function normalizeOption(opt: AutocompleteOption): {
	value: string;
	label: React.ReactNode;
} {
	if (typeof opt === "string") {
		return { value: opt, label: opt };
	}
	return {
		value: opt.value,
		label: opt.label ?? opt.value,
	};
}

export interface AutocompleteProps
	extends Omit<
		React.HTMLAttributes<HTMLDivElement>,
		"style" | "onChange" | "defaultValue"
	> {
	options: AutocompleteOption[];
	/** Selected option `value` (controlled). */
	value?: string;
	/** Uncontrolled initial selected `value`. */
	defaultValue?: string;
	onChange?: (value: string) => void;
	/** Filter text (controlled). */
	inputValue?: string;
	/** Called when filter text changes. */
	onInputChange?: (inputValue: string) => void;
	placeholder?: string;
	label?: React.ReactNode;
	helperText?: React.ReactNode;
	error?: boolean;
	fullWidth?: boolean;
	disabled?: boolean;
	/** Override default substring filter (case-insensitive). */
	filterOptions?: (
		options: { value: string; label: React.ReactNode }[],
		input: string,
	) => { value: string; label: React.ReactNode }[];
	/** Text when `filterOptions` returns an empty list. */
	noOptionsText?: string;
	sx?: SxProps;
	style?: React.CSSProperties;
	inputClassName?: string;
}

function defaultFilter(
	options: { value: string; label: React.ReactNode }[],
	input: string,
): { value: string; label: React.ReactNode }[] {
	const q = input.trim().toLowerCase();
	if (!q) return options;
	return options.filter((o) => {
		const text = typeof o.label === "string" ? o.label : o.value;
		return text.toLowerCase().includes(q);
	});
}

export const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(
	function Autocomplete(
		{
			options: optionsProp,
			value: valueProp,
			defaultValue,
			onChange,
			inputValue: inputValueProp,
			onInputChange,
			placeholder,
			label,
			helperText,
			error,
			fullWidth,
			disabled,
			filterOptions = defaultFilter,
			noOptionsText = "No options",
			sx,
			style,
			className,
			inputClassName,
			id: idProp,
			...rootProps
		},
		ref,
	) {
		const { colors, action, shape } = useTheme();
		const sxStyles = useSxStyles(sx);
		const generatedId = React.useId();
		const rootId = idProp ?? generatedId;
		const listId = `${rootId}-list`;
		const inputId = `${rootId}-input`;

		const normalized = React.useMemo(
			() => optionsProp.map(normalizeOption),
			[optionsProp],
		);

		const isValueControlled = valueProp !== undefined;

		const isInputControlled = inputValueProp !== undefined;
		const [internalInput, setInternalInput] = React.useState(() => {
			if (defaultValue) {
				const hit = normalized.find((o) => o.value === defaultValue);
				return hit
					? typeof hit.label === "string"
						? hit.label
						: String(hit.value)
					: "";
			}
			return "";
		});
		const inputValue = isInputControlled ? inputValueProp : internalInput;

		const setSelectedValue = React.useCallback(
			(next: string) => {
				onChange?.(next);
			},
			[onChange],
		);

		const setFilterInput = React.useCallback(
			(next: string) => {
				if (!isInputControlled) setInternalInput(next);
				onInputChange?.(next);
			},
			[isInputControlled, onInputChange],
		);

		React.useEffect(() => {
			if (!isValueControlled) return;
			const hit = normalized.find((o) => o.value === valueProp);
			const text = hit
				? typeof hit.label === "string"
					? hit.label
					: String(hit.value)
				: "";
			if (!isInputControlled) setInternalInput(text);
		}, [valueProp, normalized, isValueControlled, isInputControlled]);

		const [open, setOpen] = React.useState(false);
		const [highlighted, setHighlighted] = React.useState(0);
		const rootRef = React.useRef<HTMLDivElement | null>(null);
		const inputRef = React.useRef<HTMLInputElement | null>(null);
		const setRefs = mergeRefs(ref, (n) => {
			rootRef.current = n;
		});

		const filtered = React.useMemo(
			() => filterOptions(normalized, inputValue),
			[normalized, inputValue, filterOptions],
		);

		React.useEffect(() => {
			if (highlighted >= filtered.length) {
				setHighlighted(Math.max(0, filtered.length - 1));
			}
		}, [filtered.length, highlighted]);

		React.useEffect(() => {
			if (!open) return;
			const onDoc = (e: MouseEvent) => {
				const t = e.target as Node;
				if (rootRef.current?.contains(t)) return;
				setOpen(false);
			};
			document.addEventListener("mousedown", onDoc);
			return () => document.removeEventListener("mousedown", onDoc);
		}, [open]);

		const isDisabled = Boolean(disabled);
		const showHelper = helperText != null && helperText !== "";
		const [focused, setFocused] = React.useState(false);

		const rootStyle: React.CSSProperties = {
			position: "relative",
			display: "flex",
			flexDirection: "column",
			gap: "0.25rem",
			width: fullWidth ? "100%" : undefined,
			minWidth: fullWidth ? 0 : undefined,
			...sxStyles,
			...style,
		};

		const labelStyle: React.CSSProperties = {
			fontSize: "0.875rem",
			fontWeight: 500,
			color: colors.secondary.onContainer,
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

		const helperStyle: React.CSSProperties = {
			fontSize: "0.75rem",
			lineHeight: 1.4,
			color: error ? colors.error.main : colors.secondary.onMain,
		};

		const listStyle: React.CSSProperties = {
			position: "absolute",
			left: 0,
			right: 0,
			top: "calc(100% + 4px)",
			zIndex: 1200,
			maxHeight: "min(16rem, 40vh)",
			overflowY: "auto",
			margin: 0,
			padding: "0.35rem 0",
			listStyle: "none",
			backgroundColor: colors.background.container,
			border: `1px solid ${colors.neutral.border}`,
			borderRadius: `${shape.borderRadius}px`,
			boxShadow: `0 12px 28px -12px ${hexToRgba(colors.secondary.onContainer, 0.14)}`,
		};

		const selectOption = (opt: { value: string; label: React.ReactNode }) => {
			setSelectedValue(opt.value);
			const text =
				typeof opt.label === "string" ? opt.label : String(opt.value);
			setFilterInput(text);
			setOpen(false);
			inputRef.current?.blur();
		};

		const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (isDisabled) return;
			if (e.key === "ArrowDown") {
				e.preventDefault();
				if (!open) setOpen(true);
				setHighlighted((i) =>
					filtered.length === 0 ? 0 : (i + 1) % filtered.length,
				);
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				if (!open) setOpen(true);
				setHighlighted((i) =>
					filtered.length === 0
						? 0
						: (i - 1 + filtered.length) % filtered.length,
				);
			} else if (e.key === "Enter" && open) {
				const picked = filtered[highlighted];
				if (picked) {
					e.preventDefault();
					selectOption(picked);
				}
			} else if (e.key === "Escape") {
				setOpen(false);
			}
		};

		return (
			<div ref={setRefs} className={className} style={rootStyle} {...rootProps}>
				{label != null && label !== "" && (
					<label htmlFor={inputId} style={labelStyle}>
						{label}
					</label>
				)}
				<div style={{ position: "relative" }}>
					<input
						ref={inputRef}
						id={inputId}
						type="text"
						className={inputClassName}
						disabled={isDisabled}
						placeholder={placeholder}
						value={inputValue}
						onChange={(e) => {
							setFilterInput(e.target.value);
							setOpen(true);
							setHighlighted(0);
						}}
						onFocus={() => {
							setFocused(true);
							setOpen(true);
						}}
						onBlur={() => setFocused(false)}
						onKeyDown={onKeyDown}
						autoComplete="off"
						style={inputStyle}
					/>
					{open && !isDisabled && (
						<ul id={listId} style={listStyle}>
							{filtered.length === 0 ? (
								<li
									style={{
										padding: "0.5rem 0.75rem",
										fontSize: "0.875rem",
										color: colors.secondary.onMain,
									}}
								>
									{noOptionsText}
								</li>
							) : (
								filtered.map((opt, index) => {
									const active = index === highlighted;
									return (
										<li
											key={opt.value}
											tabIndex={-1}
											onMouseEnter={() => setHighlighted(index)}
											onMouseDown={(e) => e.preventDefault()}
											onClick={() => selectOption(opt)}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ") {
													e.preventDefault();
													selectOption(opt);
												}
											}}
											style={{
												padding: "0.5rem 0.75rem",
												fontSize: "0.875rem",
												cursor: "pointer",
												backgroundColor: active
													? colors.primary.container
													: "transparent",
												color: colors.secondary.onContainer,
											}}
										>
											{opt.label}
										</li>
									);
								})
							)}
						</ul>
					)}
				</div>
				{showHelper && <span style={helperStyle}>{helperText}</span>}
			</div>
		);
	},
);

Autocomplete.displayName = "Autocomplete";

function mergeRefs<T>(
	...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
	return (value) => {
		for (const ref of refs) {
			if (ref == null) continue;
			if (typeof ref === "function") ref(value);
			else (ref as React.MutableRefObject<T | null>).current = value;
		}
	};
}
