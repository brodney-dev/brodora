import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface ListProps
	extends Omit<React.HTMLAttributes<HTMLUListElement>, "style"> {
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(function List(
	{ sx, style, className, children, ...props },
	ref,
) {
	const sxStyles = useSxStyles(sx);
	const rootStyle: React.CSSProperties = {
		listStyle: "none",
		padding: 0,
		margin: 0,
		...sxStyles,
		...style,
	};
	return (
		<ul ref={ref} className={className} style={rootStyle} {...props}>
			{children}
		</ul>
	);
});

List.displayName = "List";

export interface ListItemProps
	extends Omit<React.HTMLAttributes<HTMLLIElement>, "style"> {
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
	function ListItem({ sx, style, className, children, ...props }, ref) {
		const { colors } = useTheme();
		const sxStyles = useSxStyles(sx);
		const rootStyle: React.CSSProperties = {
			padding: "0.5rem 0",
			borderBottom: `1px solid ${colors.secondary[100]}`,
			...sxStyles,
			...style,
		};
		return (
			<li ref={ref} className={className} style={rootStyle} {...props}>
				{children}
			</li>
		);
	},
);

ListItem.displayName = "ListItem";

export interface ListDividerProps
	extends Omit<React.HTMLAttributes<HTMLLIElement>, "style"> {
	sx?: SxProps;
	style?: React.CSSProperties;
}

export function ListDivider({
	sx,
	style,
	className,
	...props
}: ListDividerProps) {
	const { colors } = useTheme();
	const sxStyles = useSxStyles(sx);
	return (
		<li
			className={className}
			style={{
				listStyle: "none",
				height: 1,
				margin: "0.5rem 0",
				backgroundColor: colors.secondary[200],
				border: "none",
				padding: 0,
				...sxStyles,
				...style,
			}}
			{...props}
		/>
	);
}

ListDivider.displayName = "ListDivider";
