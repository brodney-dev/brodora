import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface TableProps
	extends Omit<React.TableHTMLAttributes<HTMLTableElement>, "style"> {
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
	function Table({ sx, style, className, children, ...props }, ref) {
		const { colors, shape } = useTheme();
		const sxStyles = useSxStyles(sx);
		const tableStyle: React.CSSProperties = {
			width: "100%",
			borderCollapse: "collapse",
			fontSize: "0.875rem",
			border: `1px solid ${colors.neutral.border}`,
			borderRadius: `${shape.borderRadius}px`,
			overflow: "hidden",
			...sxStyles,
			...style,
		};
		return (
			<table ref={ref} className={className} style={tableStyle} {...props}>
				{children}
			</table>
		);
	},
);

Table.displayName = "Table";

export interface TableSectionProps
	extends Omit<React.HTMLAttributes<HTMLTableSectionElement>, "style"> {
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const TableHead = React.forwardRef<
	HTMLTableSectionElement,
	TableSectionProps
>(function TableHead({ sx, style, className, children, ...props }, ref) {
	const { colors } = useTheme();
	const sxStyles = useSxStyles(sx);
	return (
		<thead
			ref={ref}
			className={className}
			style={{
				backgroundColor: colors.secondary.container,
				...sxStyles,
				...style,
			}}
			{...props}
		>
			{children}
		</thead>
	);
});

TableHead.displayName = "TableHead";

export const TableBody = React.forwardRef<
	HTMLTableSectionElement,
	TableSectionProps
>(function TableBody({ sx, style, className, children, ...props }, ref) {
	const sxStyles = useSxStyles(sx);
	return (
		<tbody
			ref={ref}
			className={className}
			style={{ ...sxStyles, ...style }}
			{...props}
		>
			{children}
		</tbody>
	);
});

TableBody.displayName = "TableBody";

export interface TableRowProps
	extends Omit<React.HTMLAttributes<HTMLTableRowElement>, "style"> {
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
	function TableRow({ sx, style, className, children, ...props }, ref) {
		const { colors } = useTheme();
		const sxStyles = useSxStyles(sx);
		return (
			<tr
				ref={ref}
				className={className}
				style={{
					borderTop: `1px solid ${colors.neutral.border}`,
					...sxStyles,
					...style,
				}}
				{...props}
			>
				{children}
			</tr>
		);
	},
);

TableRow.displayName = "TableRow";

export interface TableCellProps
	extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "style"> {
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
	function TableCell({ sx, style, className, children, ...props }, ref) {
		const sxStyles = useSxStyles(sx);
		return (
			<td
				ref={ref}
				className={className}
				style={{ padding: "0.625rem 0.75rem", ...sxStyles, ...style }}
				{...props}
			>
				{children}
			</td>
		);
	},
);

TableCell.displayName = "TableCell";

export interface TableHeaderCellProps
	extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "style"> {
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const TableHeaderCell = React.forwardRef<
	HTMLTableCellElement,
	TableHeaderCellProps
>(function TableHeaderCell({ sx, style, className, children, ...props }, ref) {
	const { colors } = useTheme();
	const sxStyles = useSxStyles(sx);
	return (
		<th
			ref={ref}
			className={className}
			scope="col"
			style={{
				padding: "0.625rem 0.75rem",
				textAlign: "left",
				fontWeight: 600,
				color: colors.secondary.onContainer,
				...sxStyles,
				...style,
			}}
			{...props}
		>
			{children}
		</th>
	);
});

TableHeaderCell.displayName = "TableHeaderCell";
