import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

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

type TooltipTriggerProps = React.HTMLAttributes<HTMLElement> & {
	ref?: React.Ref<HTMLElement>;
};

export interface TooltipProps {
	/** Short description shown on hover or keyboard focus. */
	title: React.ReactNode;
	children: React.ReactElement;
	placement?: "top" | "bottom";
	/** Delay before showing (ms). */
	delayEnterMs?: number;
	/** Delay before hiding after leave (ms). */
	delayLeaveMs?: number;
	sx?: SxProps;
	style?: React.CSSProperties;
}

export function Tooltip({
	title,
	children,
	placement = "top",
	delayEnterMs = 400,
	delayLeaveMs = 0,
	sx,
	style,
}: TooltipProps) {
	const { colors, shape, action } = useTheme();
	const sxStyles = useSxStyles(sx);
	const tipId = React.useId();
	const [visible, setVisible] = React.useState(false);
	const showTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
	const hideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

	const clearShow = React.useCallback(() => {
		if (showTimer.current != null) {
			clearTimeout(showTimer.current);
			showTimer.current = null;
		}
	}, []);

	const clearHide = React.useCallback(() => {
		if (hideTimer.current != null) {
			clearTimeout(hideTimer.current);
			hideTimer.current = null;
		}
	}, []);

	const scheduleShow = React.useCallback(() => {
		clearHide();
		clearShow();
		showTimer.current = setTimeout(() => {
			showTimer.current = null;
			setVisible(true);
		}, delayEnterMs);
	}, [clearHide, clearShow, delayEnterMs]);

	const scheduleHide = React.useCallback(() => {
		clearShow();
		clearHide();
		hideTimer.current = setTimeout(() => {
			hideTimer.current = null;
			setVisible(false);
		}, delayLeaveMs);
	}, [clearHide, clearShow, delayLeaveMs]);

	React.useEffect(() => {
		return () => {
			clearShow();
			clearHide();
		};
	}, [clearHide, clearShow]);

	const child = React.Children.only(
		children,
	) as React.ReactElement<TooltipTriggerProps>;

	const wrapperStyle: React.CSSProperties = {
		position: "relative",
		display: "inline-flex",
		verticalAlign: "middle",
	};

	const tipStyle: React.CSSProperties = {
		position: "absolute",
		left: "50%",
		transform: "translateX(-50%)",
		zIndex: 1000,
		maxWidth: "16rem",
		padding: "0.375rem 0.5rem",
		borderRadius: `${shape.borderRadius}px`,
		fontSize: "0.75rem",
		lineHeight: 1.4,
		color: colors.inverse.onMain,
		backgroundColor: colors.inverse.main,
		border: `1px solid ${colors.inverse.border}`,
		boxShadow: `0 4px 6px -1px ${action.disabledBorder}`,
		pointerEvents: "none",
		whiteSpace: "normal",
		wordBreak: "break-word",
		...(placement === "top"
			? { bottom: "calc(100% + 6px)" }
			: { top: "calc(100% + 6px)" }),
		...sxStyles,
		...style,
	};

	return (
		<span style={wrapperStyle}>
			{React.cloneElement(child, {
				ref: mergeRefs(child.props.ref),
				onFocus: (e) => {
					child.props.onFocus?.(e);
					scheduleShow();
				},
				onBlur: (e) => {
					child.props.onBlur?.(e);
					scheduleHide();
				},
				onMouseEnter: (e) => {
					child.props.onMouseEnter?.(e);
					scheduleShow();
				},
				onMouseLeave: (e) => {
					child.props.onMouseLeave?.(e);
					scheduleHide();
				},
			})}
			{visible && (
				<span id={tipId} style={tipStyle}>
					{title}
				</span>
			)}
		</span>
	);
}
