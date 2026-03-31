import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export type ToastVariant = "default" | "success" | "error";

export type ToastOptions = {
	variant?: ToastVariant;
	/** Auto-dismiss duration in ms. Set to 0 to disable. */
	durationMs?: number;
	dismissLabel?: string;
};

export type ToastItem = {
	id: string;
	message: React.ReactNode;
	variant: ToastVariant;
	durationMs: number;
	createdAt: number;
};

type ToastSubscriber = (event: {
	type: "show" | "dismiss";
	toast?: ToastItem;
	id?: string;
}) => void;

const subscribers = new Set<ToastSubscriber>();

function publish(event: Parameters<ToastSubscriber>[0]) {
	for (const sub of subscribers) sub(event);
}

function randomId(): string {
	// good enough for UI keys; avoids bringing in a uuid dep
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeOptions(options?: ToastOptions): Required<ToastOptions> {
	return {
		variant: options?.variant ?? "default",
		durationMs: options?.durationMs ?? 5000,
		dismissLabel: options?.dismissLabel ?? "Dismiss notification",
	};
}

export const toast = Object.assign(
	(message: React.ReactNode, options?: ToastOptions) => {
		const id = randomId();
		const o = normalizeOptions(options);
		publish({
			type: "show",
			toast: {
				id,
				message,
				variant: o.variant,
				durationMs: o.durationMs,
				createdAt: Date.now(),
			},
		});
		return id;
	},
	{
		success: (
			message: React.ReactNode,
			options?: Omit<ToastOptions, "variant">,
		) => toast(message, { ...options, variant: "success" }),
		error: (
			message: React.ReactNode,
			options?: Omit<ToastOptions, "variant">,
		) => toast(message, { ...options, variant: "error" }),
		dismiss: (id: string) => publish({ type: "dismiss", id }),
	},
);

type ToastContextValue = {
	dismiss: (id: string) => void;
	dismissLabel: string;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

function useToastContext(component: string): ToastContextValue {
	const ctx = React.useContext(ToastContext);
	if (!ctx) throw new Error(`${component} must be used within ToastProvider`);
	return ctx;
}

function prefersReducedMotion(): boolean {
	if (typeof window === "undefined") return false;
	return (
		window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
	);
}

export interface ToastProviderProps {
	children: React.ReactNode;
	/** Override default duration for toasts that don't pass `durationMs`. */
	defaultDurationMs?: number;
	/** Where to place the toast stack. */
	placement?: "top-right" | "bottom-right";
	/** Styles applied to the viewport container. */
	sx?: SxProps;
}

export function ToastProvider({
	children,
	defaultDurationMs = 5000,
	placement = "top-right",
	sx,
}: ToastProviderProps) {
	const [items, setItems] = React.useState<ToastItem[]>([]);
	const { action } = useTheme();
	const sxStyles = useSxStyles(sx);

	React.useEffect(() => {
		const sub: ToastSubscriber = (event) => {
			if (event.type === "show" && event.toast) {
				setItems((prev) => {
					const t = event.toast!;
					const durationMs = t.durationMs ?? defaultDurationMs;
					return [{ ...t, durationMs }, ...prev].slice(0, 5);
				});
			} else if (event.type === "dismiss" && event.id) {
				setItems((prev) => prev.filter((t) => t.id !== event.id));
			}
		};
		subscribers.add(sub);
		return () => {
			subscribers.delete(sub);
		};
	}, [defaultDurationMs]);

	const dismiss = React.useCallback((id: string) => {
		setItems((prev) => prev.filter((t) => t.id !== id));
	}, []);

	const viewportStyle: React.CSSProperties = {
		position: "fixed",
		right: "1rem",
		...(placement === "top-right" ? { top: "1rem" } : { bottom: "1rem" }),
		zIndex: 1100,
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem",
		width: "min(22rem, calc(100vw - 2rem))",
		pointerEvents: "none",
		...sxStyles,
	};

	const ctx = React.useMemo<ToastContextValue>(
		() => ({ dismiss, dismissLabel: "Dismiss notification" }),
		[dismiss],
	);

	return (
		<ToastContext.Provider value={ctx}>
			{children}
			<div style={viewportStyle}>
				{items.map((t) => (
					<ToastView key={t.id} toast={t} />
				))}
				{/* prevent pointer events on empty viewport */}
				{items.length === 0 && (
					<div style={{ height: 0, opacity: 0, pointerEvents: "none" }} />
				)}
			</div>
			<style>
				{`@media (prefers-reduced-motion: reduce) { .brodora-toast { transition: none !important; } }`}
			</style>
			{/* keep disabled opacity consistent */}
			<style>{`.brodora-toast [data-brodora-toast-dismiss]{opacity:${action.disabledOpacity ?? 0.9};}`}</style>
		</ToastContext.Provider>
	);
}

type ToastViewProps = {
	toast: ToastItem;
};

function ToastView({ toast: t }: ToastViewProps) {
	const { colors, shape } = useTheme();
	const { dismiss } = useToastContext("Toast");
	const [hovered, setHovered] = React.useState(false);
	const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

	const role = t.variant === "error" ? "alert" : "status";

	const palette =
		t.variant === "success"
			? {
					border: colors.success[200],
					bg: colors.success[50],
					fg: colors.success[900],
				}
			: t.variant === "error"
				? {
						border: colors.error[200],
						bg: colors.error[50],
						fg: colors.error[900],
					}
				: {
						border: colors.secondary[200],
						bg: "#ffffff",
						fg: colors.secondary[900],
					};

	const schedule = React.useCallback(() => {
		if (timerRef.current) clearTimeout(timerRef.current);
		if (t.durationMs <= 0) return;
		timerRef.current = setTimeout(() => dismiss(t.id), t.durationMs);
	}, [dismiss, t.durationMs, t.id]);

	React.useEffect(() => {
		if (prefersReducedMotion()) {
			// still auto-dismiss, but no special handling
			schedule();
			return;
		}
		if (!hovered) schedule();
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [hovered, schedule]);

	const rootStyle: React.CSSProperties = {
		pointerEvents: "auto",
		display: "flex",
		gap: "0.75rem",
		alignItems: "flex-start",
		padding: "0.75rem 0.875rem",
		borderRadius: `${shape.borderRadius}px`,
		border: `1px solid ${palette.border}`,
		background: palette.bg,
		color: palette.fg,
		boxShadow: `0 10px 30px -12px ${colors.secondary[400]}`,
		transition: "transform 0.15s ease, opacity 0.15s ease",
	};

	const messageStyle: React.CSSProperties = {
		flex: 1,
		fontSize: "0.875rem",
		lineHeight: 1.45,
	};

	const dismissStyle: React.CSSProperties = {
		border: "none",
		background: "transparent",
		color: palette.fg,
		cursor: "pointer",
		padding: 2,
		lineHeight: 1,
		fontSize: "1rem",
	};

	return (
		<div
			className="brodora-toast"
			role={role}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={rootStyle}
		>
			<div style={messageStyle}>{t.message}</div>
			<button
				type="button"
				data-brodora-toast-dismiss
				onFocus={() => setHovered(true)}
				onBlur={() => setHovered(false)}
				onClick={() => dismiss(t.id)}
				style={dismissStyle}
			>
				×
			</button>
		</div>
	);
}

ToastView.displayName = "Toast";
