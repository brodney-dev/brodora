import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { hexToRgba, useTheme } from "../theme";

const BACKDROP_STYLE_ID = "brodora-dialog-backdrop";

function syncDialogBackdropCss(backdropColor: string) {
	if (typeof document === "undefined") return;
	let el = document.getElementById(
		BACKDROP_STYLE_ID,
	) as HTMLStyleElement | null;
	if (!el) {
		el = document.createElement("style");
		el.id = BACKDROP_STYLE_ID;
		document.head.appendChild(el);
	}
	el.textContent = `dialog.brodora-dialog-panel::backdrop { background: ${backdropColor}; }`;
}

export interface DialogProps {
	open: boolean;
	onOpenChange?: (open: boolean) => void;
	title?: React.ReactNode;
	children: React.ReactNode;
	footer?: React.ReactNode;
	sx?: SxProps;
	style?: React.CSSProperties;
	className?: string;
}

export function Dialog({
	open,
	onOpenChange,
	title,
	children,
	footer,
	sx,
	style,
	className,
}: DialogProps) {
	const { colors, shape } = useTheme();
	const sxStyles = useSxStyles(sx);
	const dialogRef = React.useRef<HTMLDialogElement>(null);
	const backdropColor = hexToRgba(colors.secondary.onContainer, 0.45);

	React.useLayoutEffect(() => {
		syncDialogBackdropCss(backdropColor);
	}, [backdropColor]);

	React.useEffect(() => {
		const d = dialogRef.current;
		if (!d) return;
		if (open) {
			if (!d.open) d.showModal();
		} else if (d.open) {
			d.close();
		}
	}, [open]);

	React.useEffect(() => {
		const d = dialogRef.current;
		if (!d) return;
		const onClose = () => onOpenChange?.(false);
		d.addEventListener("close", onClose);
		return () => d.removeEventListener("close", onClose);
	}, [onOpenChange]);

	const panelStyle: React.CSSProperties = {
		border: "none",
		padding: 0,
		margin: "auto",
		maxWidth: "min(32rem, calc(100vw - 2rem))",
		width: "100%",
		borderRadius: `${shape.borderRadius}px`,
		backgroundColor: colors.background.container,
		color: colors.secondary.onContainer,
		boxShadow: `0 25px 50px -12px ${hexToRgba(colors.secondary.onContainer, 0.25)}`,
		...sxStyles,
		...style,
	};

	const headerStyle: React.CSSProperties = {
		padding: "1rem 1.25rem",
		borderBottom: `1px solid ${colors.neutral.border}`,
		fontSize: "1.125rem",
		fontWeight: 600,
	};

	const bodyStyle: React.CSSProperties = {
		padding: "1rem 1.25rem",
	};

	const footerStyle: React.CSSProperties = {
		padding: "1rem 1.25rem",
		borderTop: `1px solid ${colors.neutral.border}`,
		display: "flex",
		justifyContent: "flex-end",
		gap: "0.5rem",
		flexWrap: "wrap",
	};

	return (
		<dialog
			ref={dialogRef}
			className={`brodora-dialog-panel ${className ?? ""}`.trim()}
			style={panelStyle}
		>
			{title != null && title !== "" && (
				<header style={headerStyle}>{title}</header>
			)}
			<div style={bodyStyle}>{children}</div>
			{footer != null && footer !== "" && (
				<footer style={footerStyle}>{footer}</footer>
			)}
		</dialog>
	);
}
