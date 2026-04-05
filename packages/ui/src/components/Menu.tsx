import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { hexToRgba, useTheme } from "../theme";

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

type MenuCtx = {
	open: boolean;
	setOpen: (v: boolean) => void;
	triggerRef: React.MutableRefObject<HTMLElement | null>;
	menuId: string;
};

const MenuContext = React.createContext<MenuCtx | null>(null);

function useMenuCtx(name: string): MenuCtx {
	const ctx = React.useContext(MenuContext);
	if (!ctx) throw new Error(`${name} must be used within Menu`);
	return ctx;
}

export interface MenuProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
}

export function Menu({
	open: openProp,
	defaultOpen = false,
	onOpenChange,
	children,
}: MenuProps) {
	const baseId = React.useId();
	const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
	const open = openProp !== undefined ? openProp : internalOpen;
	const triggerRef = React.useRef<HTMLElement | null>(null);
	const menuId = `${baseId}-menu`;

	const setOpen = React.useCallback(
		(next: boolean) => {
			onOpenChange?.(next);
			if (openProp === undefined) setInternalOpen(next);
		},
		[onOpenChange, openProp],
	);

	const ctx = React.useMemo<MenuCtx>(
		() => ({ open, setOpen, triggerRef, menuId }),
		[open, setOpen, menuId],
	);

	return <MenuContext.Provider value={ctx}>{children}</MenuContext.Provider>;
}

type TriggerEl = React.HTMLAttributes<HTMLElement> & {
	ref?: React.Ref<HTMLElement>;
};

export interface MenuTriggerProps {
	children: React.ReactElement;
}

export function MenuTrigger({ children }: MenuTriggerProps) {
	const { open, setOpen, triggerRef } = useMenuCtx("MenuTrigger");
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

export interface MenuContentProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
	placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
	offset?: number;
	sx?: SxProps;
	style?: React.CSSProperties;
	children: React.ReactNode;
}

export const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
	function MenuContent(
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
		const { open, setOpen, triggerRef, menuId } = useMenuCtx("MenuContent");
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
					return;
				}
				if (e.key === "ArrowDown" || e.key === "ArrowUp") {
					e.preventDefault();
					const root = panelRef.current;
					if (!root) return;
					const items = Array.from(
						root.querySelectorAll<HTMLElement>(
							'[role="menuitem"]:not([disabled])',
						),
					);
					if (items.length === 0) return;
					const active = document.activeElement as HTMLElement | null;
					const idx = items.indexOf(active as HTMLElement);
					let next = 0;
					if (e.key === "ArrowDown") {
						next = idx === -1 ? 0 : (idx + 1) % items.length;
					} else {
						next =
							idx === -1
								? items.length - 1
								: (idx - 1 + items.length) % items.length;
					}
					items[next]?.focus();
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

		React.useEffect(() => {
			if (!open) return;
			const t = requestAnimationFrame(() => {
				const root = panelRef.current;
				if (!root) return;
				const first = root.querySelector<HTMLElement>(
					'[role="menuitem"]:not([disabled])',
				);
				first?.focus();
			});
			return () => cancelAnimationFrame(t);
		}, [open]);

		if (!open) return null;

		const baseStyle: React.CSSProperties = {
			position: "absolute",
			zIndex: 1060,
			minWidth: 200,
			maxWidth: "min(20rem, calc(100vw - 2rem))",
			padding: "0.35rem 0",
			borderRadius: `${shape.borderRadius}px`,
			border: `1px solid ${colors.neutral.border}`,
			background: colors.background.container,
			color: colors.secondary.onContainer,
			boxShadow: `0 18px 45px -20px ${hexToRgba(colors.secondary.onContainer, 0.14)}`,
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
				id={menuId}
				role="menu"
				className={className}
				style={baseStyle}
				{...props}
			>
				{children}
			</div>
		);
	},
);

MenuContent.displayName = "MenuContent";

export interface MenuAnchorProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
	sx?: SxProps;
	style?: React.CSSProperties;
	children: React.ReactNode;
}

export function MenuAnchor({
	sx,
	style,
	className,
	children,
	...props
}: MenuAnchorProps) {
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

export interface MenuItemProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
	function MenuItem(
		{ sx, style, className, children, onClick, ...props },
		ref,
	) {
		const { setOpen } = useMenuCtx("MenuItem");
		const { colors } = useTheme();
		const sxStyles = useSxStyles(sx);

		const btnStyle: React.CSSProperties = {
			display: "block",
			width: "100%",
			textAlign: "left",
			padding: "0.5rem 0.875rem",
			fontSize: "0.875rem",
			border: "none",
			background: "transparent",
			color: colors.secondary.onContainer,
			cursor: "pointer",
			...sxStyles,
			...style,
		};

		return (
			<button
				ref={ref}
				type="button"
				role="menuitem"
				className={className}
				style={btnStyle}
				{...props}
				onClick={(e) => {
					onClick?.(e);
					if (e.defaultPrevented) return;
					setOpen(false);
				}}
			>
				{children}
			</button>
		);
	},
);

MenuItem.displayName = "MenuItem";

export interface MenuSeparatorProps {
	sx?: SxProps;
	style?: React.CSSProperties;
}

export function MenuSeparator({ sx, style }: MenuSeparatorProps) {
	const { colors } = useTheme();
	const sxStyles = useSxStyles(sx);
	return (
		<div
			role="separator"
			style={{
				height: 1,
				margin: "0.35rem 0",
				backgroundColor: colors.neutral.border,
				border: "none",
				...sxStyles,
				...style,
			}}
		/>
	);
}
