import { Star } from "@brodora/icons";
import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface RatingProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style" | "onChange"> {
	max?: number;
	value?: number;
	defaultValue?: number;
	onChange?: (value: number) => void;
	readOnly?: boolean;
	disabled?: boolean;
	/** Icon size in px. */
	size?: number;
	sx?: SxProps;
	style?: React.CSSProperties;
}

export function Rating({
	max = 5,
	value: valueProp,
	defaultValue = 0,
	onChange,
	readOnly,
	disabled,
	size = 22,
	sx,
	style,
	className,
	...props
}: RatingProps) {
	const { colors, action } = useTheme();
	const sxStyles = useSxStyles(sx);
	const isControlled = valueProp !== undefined;
	const [internal, setInternal] = React.useState(defaultValue);
	const value = isControlled ? valueProp : internal;
	const isDisabled = Boolean(disabled);
	const canInteract = !readOnly && !isDisabled;

	const setValue = React.useCallback(
		(next: number) => {
			if (!isControlled) setInternal(next);
			onChange?.(next);
		},
		[isControlled, onChange],
	);

	const rootStyle: React.CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		gap: "0.15rem",
		...sxStyles,
		...style,
	};

	const empty = colors.secondary.main;
	const filled = colors.warning.main;

	return (
		<div className={className} style={rootStyle} {...props}>
			{Array.from({ length: max }, (_, i) => {
				const index = i + 1;
				const active = index <= value;
				return (
					<button
						key={index}
						type="button"
						disabled={!canInteract}
						onClick={() => {
							if (!canInteract) return;
							setValue(index === value ? 0 : index);
						}}
						style={{
							display: "inline-flex",
							padding: 2,
							border: "none",
							background: "transparent",
							cursor: canInteract ? "pointer" : "default",
							opacity: isDisabled ? (action.disabledOpacity ?? 0.5) : 1,
							color: active ? filled : empty,
						}}
					>
						<Star
							size={size}
							strokeWidth={2}
							fill={active ? filled : "none"}
							stroke={active ? filled : empty}
						/>
					</button>
				);
			})}
		</div>
	);
}

Rating.displayName = "Rating";
