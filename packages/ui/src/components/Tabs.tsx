import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

type TabsContextValue = {
	value: string;
	setValue: (next: string) => void;
	baseId: string;
	registerTab: (tabValue: string, el: HTMLElement | null) => void;
	unregisterTab: (tabValue: string) => void;
	tabOrderRef: React.MutableRefObject<string[]>;
	tabElementsRef: React.MutableRefObject<Map<string, HTMLElement>>;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
	const ctx = React.useContext(TabsContext);
	if (!ctx) {
		throw new Error(`${component} must be used within Tabs`);
	}
	return ctx;
}

function isTabEnabled(el: HTMLElement): boolean {
	if (el.tagName !== "BUTTON") return true;
	return !(el as HTMLButtonElement).disabled;
}

export interface TabsProps {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	children: React.ReactNode;
}

export function Tabs({
	value: valueProp,
	defaultValue = "",
	onValueChange,
	children,
}: TabsProps) {
	const baseId = React.useId();
	const [internalValue, setInternalValue] = React.useState(defaultValue);
	const value = valueProp !== undefined ? valueProp : internalValue;
	const tabOrderRef = React.useRef<string[]>([]);
	const tabElementsRef = React.useRef<Map<string, HTMLElement>>(new Map());

	const setValue = React.useCallback(
		(next: string) => {
			onValueChange?.(next);
			if (valueProp === undefined) setInternalValue(next);
		},
		[valueProp, onValueChange],
	);

	const registerTab = React.useCallback(
		(tabValue: string, el: HTMLElement | null) => {
			const map = tabElementsRef.current;
			if (el) map.set(tabValue, el);
			else map.delete(tabValue);
		},
		[],
	);

	const unregisterTab = React.useCallback((tabValue: string) => {
		tabElementsRef.current.delete(tabValue);
		tabOrderRef.current = tabOrderRef.current.filter((v) => v !== tabValue);
	}, []);

	const ctx = React.useMemo<TabsContextValue>(
		() => ({
			value,
			setValue,
			baseId,
			registerTab,
			unregisterTab,
			tabOrderRef,
			tabElementsRef,
		}),
		[value, setValue, baseId, registerTab, unregisterTab],
	);

	return <TabsContext.Provider value={ctx}>{children}</TabsContext.Provider>;
}

export interface TabListProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
	sx?: SxProps;
	style?: React.CSSProperties;
}

export function TabList({
	sx,
	style,
	className,
	children,
	onKeyDown: onKeyDownProp,
	...props
}: TabListProps) {
	const { value, setValue, tabOrderRef, tabElementsRef } =
		useTabsContext("TabList");
	const sxStyles = useSxStyles(sx);
	const { colors } = useTheme();

	const listStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: "0.25rem",
		borderBottom: `1px solid ${colors.neutral.border}`,
		...sxStyles,
		...style,
	};

	const focusAdjacent = React.useCallback(
		(delta: number) => {
			const order = tabOrderRef.current;
			if (order.length === 0) return;
			let idx = order.indexOf(value);
			if (idx === -1) idx = 0;
			for (let step = 0; step < order.length; step++) {
				idx = (idx + delta + order.length) % order.length;
				const v = order[idx];
				if (v == null) continue;
				const el = tabElementsRef.current.get(v);
				if (el && isTabEnabled(el)) {
					setValue(v);
					el.focus();
					return;
				}
			}
		},
		[setValue, tabElementsRef, tabOrderRef, value],
	);

	const focusFirstOrLast = React.useCallback(
		(which: "first" | "last") => {
			const order = tabOrderRef.current;
			if (order.length === 0) return;
			const seq = which === "first" ? [...order] : [...order].reverse();
			for (const v of seq) {
				const el = tabElementsRef.current.get(v);
				if (el && isTabEnabled(el)) {
					setValue(v);
					el.focus();
					return;
				}
			}
		},
		[setValue, tabElementsRef, tabOrderRef],
	);

	const onKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			onKeyDownProp?.(e);
			if (e.defaultPrevented) return;
			if (e.key === "ArrowRight" || e.key === "ArrowDown") {
				e.preventDefault();
				focusAdjacent(1);
			} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
				e.preventDefault();
				focusAdjacent(-1);
			} else if (e.key === "Home") {
				e.preventDefault();
				focusFirstOrLast("first");
			} else if (e.key === "End") {
				e.preventDefault();
				focusFirstOrLast("last");
			}
		},
		[focusAdjacent, focusFirstOrLast, onKeyDownProp],
	);

	return (
		<div
			className={className}
			style={listStyle}
			{...props}
			onKeyDown={onKeyDown}
		>
			{children}
		</div>
	);
}

export interface TabProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
	value: string;
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(function Tab(
	{ value: tabValue, sx, style, className, children, disabled, ...btnProps },
	ref,
) {
	const ctx = useTabsContext("Tab");
	const { colors, shape } = useTheme();
	const sxStyles = useSxStyles(sx);
	const selected = ctx.value === tabValue;
	const tabId = `${ctx.baseId}-tab-${tabValue}`;

	const setRefs = React.useCallback(
		(node: HTMLButtonElement | null) => {
			ctx.registerTab(tabValue, node);
			if (typeof ref === "function") ref(node);
			else if (ref)
				(ref as React.MutableRefObject<HTMLButtonElement | null>).current =
					node;
		},
		[ctx, ref, tabValue],
	);

	React.useEffect(() => {
		const order = ctx.tabOrderRef.current;
		if (!order.includes(tabValue)) {
			order.push(tabValue);
		}
		return () => {
			ctx.unregisterTab(tabValue);
		};
	}, [ctx, tabValue]);

	const tabStyle: React.CSSProperties = {
		position: "relative",
		padding: "0.5rem 0.75rem",
		marginBottom: -1,
		fontSize: "0.875rem",
		fontWeight: selected ? 600 : 500,
		lineHeight: 1.25,
		color: selected ? colors.primary.onContainer : colors.secondary.onMain,
		background: "transparent",
		border: "none",
		borderBottom: selected
			? `2px solid ${colors.primary.border}`
			: "2px solid transparent",
		borderRadius: `${shape.borderRadius}px ${shape.borderRadius}px 0 0`,
		cursor: disabled ? "not-allowed" : "pointer",
		opacity: disabled ? 0.5 : 1,
		...sxStyles,
		...style,
	};

	return (
		<button
			ref={setRefs}
			type="button"
			id={tabId}
			className={className}
			tabIndex={selected ? 0 : -1}
			disabled={disabled}
			style={tabStyle}
			{...btnProps}
			onClick={(e) => {
				btnProps.onClick?.(e);
				if (!disabled) ctx.setValue(tabValue);
			}}
		>
			{children}
		</button>
	);
});

Tab.displayName = "Tab";

export interface TabPanelProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
	value: string;
	forceMount?: boolean;
	sx?: SxProps;
	style?: React.CSSProperties;
}

export function TabPanel({
	value: panelValue,
	forceMount = false,
	sx,
	style,
	className,
	children,
	...props
}: TabPanelProps) {
	const { value, baseId } = useTabsContext("TabPanel");
	const sxStyles = useSxStyles(sx);
	const selected = value === panelValue;
	const panelId = `${baseId}-panel-${panelValue}`;

	const panelStyle: React.CSSProperties = {
		padding: "1rem 0",
		...sxStyles,
		...style,
	};

	if (!selected && !forceMount) {
		return null;
	}

	return (
		<div
			id={panelId}
			hidden={!selected}
			className={className}
			style={panelStyle}
			{...props}
		>
			{children}
		</div>
	);
}
