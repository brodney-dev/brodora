import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface PaginationProps
	extends Omit<React.HTMLAttributes<HTMLElement>, "style"> {
	/** Current page (1-based). */
	page: number;
	/** Total pages (>= 1). */
	pageCount: number;
	onPageChange: (page: number) => void;
	/** Pages shown on each side of current (default 1 => 1 … 5 … 10 style when many pages). */
	siblingCount?: number;
	sx?: SxProps;
	style?: React.CSSProperties;
}

function getPageItems(
	current: number,
	pageCount: number,
	siblingCount: number,
): Array<number | "ellipsis"> {
	if (pageCount <= 7) {
		return Array.from({ length: pageCount }, (_, i) => i + 1);
	}
	const items: Array<number | "ellipsis"> = [1];
	const left = Math.max(2, current - siblingCount);
	const right = Math.min(pageCount - 1, current + siblingCount);
	if (left > 2) items.push("ellipsis");
	for (let p = left; p <= right; p++) items.push(p);
	if (right < pageCount - 1) items.push("ellipsis");
	items.push(pageCount);
	return items;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
	function Pagination(
		{
			page,
			pageCount,
			onPageChange,
			siblingCount = 1,
			sx,
			style,
			className,
			...props
		},
		ref,
	) {
		const { colors, shape } = useTheme();
		const sxStyles = useSxStyles(sx);

		const safeCount = Math.max(1, Math.floor(pageCount));
		const current = Math.min(safeCount, Math.max(1, Math.floor(page)));

		const items = React.useMemo(
			() => getPageItems(current, safeCount, siblingCount),
			[current, safeCount, siblingCount],
		);

		const btnBase: React.CSSProperties = {
			minWidth: "2.25rem",
			height: "2.25rem",
			padding: "0 0.5rem",
			borderRadius: `${shape.borderRadius}px`,
			border: `1px solid ${colors.secondary[300]}`,
			background: "#ffffff",
			color: colors.secondary[800],
			fontSize: "0.875rem",
			cursor: "pointer",
		};

		const navStyle: React.CSSProperties = {
			display: "flex",
			flexWrap: "wrap",
			alignItems: "center",
			gap: "0.35rem",
			...sxStyles,
			...style,
		};

		const pageBtn = (p: number) => {
			const active = p === current;
			return (
				<button
					key={p}
					type="button"
					onClick={() => onPageChange(p)}
					style={{
						...btnBase,
						...(active
							? {
									background: colors.primary[600],
									borderColor: colors.primary[700],
									color: "#ffffff",
									fontWeight: 600,
								}
							: {}),
					}}
				>
					{p}
				</button>
			);
		};

		return (
			<nav ref={ref} className={className} style={navStyle} {...props}>
				<button
					type="button"
					disabled={current <= 1}
					onClick={() => onPageChange(current - 1)}
					style={{
						...btnBase,
						opacity: current <= 1 ? 0.5 : 1,
						cursor: current <= 1 ? "not-allowed" : "pointer",
					}}
				>
					‹
				</button>
				{items.map((it, i) =>
					it === "ellipsis" ? (
						<span
							key={`e-${i}`}
							style={{ padding: "0 0.25rem", color: colors.secondary[500] }}
						>
							…
						</span>
					) : (
						pageBtn(it)
					),
				)}
				<button
					type="button"
					disabled={current >= safeCount}
					onClick={() => onPageChange(current + 1)}
					style={{
						...btnBase,
						opacity: current >= safeCount ? 0.5 : 1,
						cursor: current >= safeCount ? "not-allowed" : "pointer",
					}}
				>
					›
				</button>
			</nav>
		);
	},
);

Pagination.displayName = "Pagination";
