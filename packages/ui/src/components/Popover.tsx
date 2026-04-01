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

type PopoverContextValue = {
	open: boolean;
	setOpen: (open: boolean) => void;
	baseId: string;
	triggerRef: React.MutableRefObject<HTMLElement | null>;
	contentId: string;
};

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

function usePopoverContext(component: string): PopoverContextValue {
	const ctx = React.useContext(PopoverContext);
	if (!ctx) throw new Error(`${component} must be used within Popover`);
	return ctx;
}

export interface PopoverProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
}

export function Popover({
	open: openProp,
	defaultOpen = false,
	onOpenChange,
	children,
}: PopoverProps) {
	const baseId = React.useId();
	const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
	const open = openProp !== undefined ? openProp : internalOpen;
	const triggerRef = React.useRef<HTMLElement | null>(null);
	const contentId = `${baseId}-content`;

	const setOpen = React.useCallback(
		(next: boolean) => {
			onOpenChange?.(next);
			if (openProp === undefined) setInternalOpen(next);
		},
		[onOpenChange, openProp],
	);

	const ctx = React.useMemo<PopoverContextValue>(
		() => ({ open, setOpen, baseId, triggerRef, contentId }),
		[open, setOpen, baseId, contentId],
	);

	return (
		<PopoverContext.Provider value={ctx}>{children}</PopoverContext.Provider>
	);
}

type TriggerEl = React.HTMLAttributes<HTMLElement> & {
	ref?: React.Ref<HTMLElement>;
};

export interface PopoverTriggerProps {
	children: React.ReactElement;
}

export function PopoverTrigger({ children }: PopoverTriggerProps) {
	const { open, setOpen, triggerRef } = usePopoverContext("PopoverTrigger");
	const child = React.Children.only(children) as React.ReactElement<TriggerEl>;

	return React.cloneElement(child, {
		ref: mergeRefs(child.props.ref, (node) => {
			triggerRef.current = node as HTMLElement | null;
		}),
		onClick: (e: React.MouseEvent) => {
			child.props.onClick?.(e as unknown as React.MouseEvent<HTMLElement>);
			if (e.defaultPrevented) return;
			setOpen(!open);
		},
	});
}

export interface PopoverContentProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
	placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
	/** Gap between trigger and panel (px). */
	offset?: number;
	sx?: SxProps;
	style?: React.CSSProperties;
	children: React.ReactNode;
}

export const PopoverContent = React.forwardRef<
	HTMLDivElement,
	PopoverContentProps
>(function PopoverContent(
	{
		placement = "bottom-start",
		offset = 8,
		sx,
		style,
		className,
		children,
		...props
	},
	ref,
) {
	const { open, setOpen, triggerRef, contentId } =
		usePopoverContext("PopoverContent");
	const { colors, shape } = useTheme();
	const sxStyles = useSxStyles(sx);
	const panelRef = React.useRef<HTMLDivElement | null>(null);
	const setRefs = mergeRefs(ref, (node) => {
		panelRef.current = node;
	});

	React.useEffect(() => {
		if (!open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				setOpen(false);
				triggerRef.current?.focus?.();
			}
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [open, setOpen, triggerRef]);

	React.useEffect(() => {
		if (!open) return;
		const onPointerDown = (e: PointerEvent) => {
			const panel = panelRef.current;
			const trigger = triggerRef.current;
			const target = e.target as Node | null;
			if (!target) return;
			if (panel && panel.contains(target)) return;
			if (trigger && trigger.contains(target)) return;
			setOpen(false);
		};
		document.addEventListener("pointerdown", onPointerDown);
		return () => document.removeEventListener("pointerdown", onPointerDown);
	}, [open, setOpen, triggerRef]);

	if (!open) return null;

	const baseStyle: React.CSSProperties = {
		position: "absolute",
		zIndex: 1050,
		minWidth: 220,
		maxWidth: "min(24rem, calc(100vw - 2rem))",
		padding: "0.75rem 0.875rem",
		borderRadius: `${shape.borderRadius}px`,
		border: `1px solid ${colors.secondary[200]}`,
		background: "#ffffff",
		color: colors.secondary[900],
		boxShadow: `0 18px 45px -20px ${colors.secondary[400]}`,
		...(() => {
			const isTop = placement.startsWith("top");
			const isEnd = placement.endsWith("end");
			return {
				...(isTop
					? { bottom: `calc(100% + ${offset}px)` }
					: { top: `calc(100% + ${offset}px)` }),
				...(isEnd ? { right: 0 } : { left: 0 }),
			};
		})(),
		...sxStyles,
		...style,
	};

	return (
		<div
			ref={setRefs}
			id={contentId}
			role="dialog"
			className={className}
			style={baseStyle}
			{...props}
		>
			{children}
		</div>
	);
});

PopoverContent.displayName = "PopoverContent";

export interface PopoverAnchorProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
	sx?: SxProps;
	style?: React.CSSProperties;
	children: React.ReactNode;
}

export function PopoverAnchor({
	sx,
	style,
	className,
	children,
	...props
}: PopoverAnchorProps) {
	const sxStyles = useSxStyles(sx);
	return (
		<div
			className={className}
			style={{
				position: "relative",
				display: "inline-flex",
				...sxStyles,
				...style,
			}}
			{...props}
		>
			{children}
		</div>
	);
}
