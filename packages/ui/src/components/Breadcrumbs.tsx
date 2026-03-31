import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";
import { Link } from "./Link";

export type BreadcrumbItem = {
	id: string;
	label: React.ReactNode;
	href?: string;
};

export interface BreadcrumbsProps
	extends Omit<React.HTMLAttributes<HTMLElement>, "style"> {
	items: BreadcrumbItem[];
	/** Character between items (ignored if `separator` is set). */
	separator?: React.ReactNode;
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
	function Breadcrumbs(
		{ items, separator = "/", sx, style, className, ...props },
		ref,
	) {
		const { colors } = useTheme();
		const sxStyles = useSxStyles(sx);

		const navStyle: React.CSSProperties = {
			fontSize: "0.875rem",
			color: colors.secondary[600],
			...sxStyles,
			...style,
		};

		const sepStyle: React.CSSProperties = {
			margin: "0 0.35rem",
			color: colors.secondary[400],
			userSelect: "none",
		};

		return (
			<nav
				ref={ref as React.Ref<HTMLElement>}
				className={className}
				style={navStyle}
				{...props}
			>
				<ol
					style={{
						display: "flex",
						flexWrap: "wrap",
						alignItems: "center",
						listStyle: "none",
						padding: 0,
						margin: 0,
					}}
				>
					{items.map((item, i) => {
						const isLast = i === items.length - 1;
						return (
							<li
								key={item.id}
								style={{ display: "inline-flex", alignItems: "center" }}
							>
								{i > 0 && <span style={sepStyle}>{separator}</span>}
								{isLast || !item.href ? (
									<span
										style={{
											color: isLast
												? colors.secondary[900]
												: colors.secondary[600],
											fontWeight: isLast ? 600 : 400,
										}}
									>
										{item.label}
									</span>
								) : (
									<Link
										href={item.href}
										sx={{ fontWeight: 500, textDecoration: "none" }}
									>
										{item.label}
									</Link>
								)}
							</li>
						);
					})}
				</ol>
			</nav>
		);
	},
);

Breadcrumbs.displayName = "Breadcrumbs";
