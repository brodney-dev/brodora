import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export type SwitchProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"checked" | "defaultChecked" | "onChange" | "role" | "style" | "type"
> & {
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
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

const TRACK_W = "2.75rem";
const TRACK_H = "1.5rem";
const THUMB = "1.125rem";
const THUMB_OFFSET = "3px";

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
	function Switch(
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

		const [internalChecked, setInternalChecked] = React.useState(
			() => defaultChecked === true,
		);
		const checked = checkedProp !== undefined ? checkedProp : internalChecked;

		const handleChange = React.useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				onChange?.(e);
				const next = e.currentTarget.checked;
				onCheckedChange?.(next);
				if (checkedProp === undefined) setInternalChecked(next);
			},
			[onChange, onCheckedChange, checkedProp],
		);

		const on = checked === true;

		const rootStyle: React.CSSProperties = {
			position: "relative",
			display: "inline-flex",
			alignItems: "center",
			flexShrink: 0,
			cursor: isDisabled ? "not-allowed" : "pointer",
			...sxStyles,
			...style,
		};

		const trackStyle: React.CSSProperties = {
			position: "relative",
			width: TRACK_W,
			height: TRACK_H,
			borderRadius: "9999px",
			transition: "background-color 0.15s ease",
			...(isDisabled
				? {
						backgroundColor: action.disabledBackground,
						border: `1px solid ${action.disabledBorder}`,
						opacity: action.disabledOpacity ?? 0.5,
					}
				: on
					? { backgroundColor: colors.primary[600] }
					: {
							backgroundColor: colors.secondary[200],
							border: `1px solid ${colors.secondary[300]}`,
						}),
		};

		const thumbStyle: React.CSSProperties = {
			position: "absolute",
			top: "50%",
			width: THUMB,
			height: THUMB,
			borderRadius: "9999px",
			backgroundColor: "#ffffff",
			boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
			transition: "left 0.15s ease, right 0.15s ease",
			transform: "translateY(-50%)",
			left: on ? undefined : THUMB_OFFSET,
			right: on ? THUMB_OFFSET : undefined,
			pointerEvents: "none",
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
			<span className={className} style={rootStyle}>
				<span style={trackStyle}>
					<span style={thumbStyle} />
					<input
						ref={setRefs}
						type="checkbox"
						disabled={isDisabled}
						checked={on}
						onChange={handleChange}
						{...props}
						style={inputStyle}
					/>
				</span>
			</span>
		);
	},
);

Switch.displayName = "Switch";
