import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface ButtonGroupProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
	orientation?: "horizontal" | "vertical";
	sx?: SxProps;
	style?: React.CSSProperties;
}

export function ButtonGroup({
	children,
	orientation = "horizontal",
	sx,
	style,
	className,
	...props
}: ButtonGroupProps) {
	const { shape } = useTheme();
	const sxStyles = useSxStyles(sx);
	const radius = `${shape.borderRadius}px`;
	const count = React.Children.count(children);
	const horizontal = orientation === "horizontal";

	const rootStyle: React.CSSProperties = {
		display: "inline-flex",
		flexDirection: horizontal ? "row" : "column",
		alignItems: "stretch",
		...sxStyles,
		...style,
	};

	return (
		<div role="group" className={className} style={rootStyle} {...props}>
			{React.Children.map(children, (child, index) => {
				if (!React.isValidElement(child)) return child;
				const isFirst = index === 0;
				const isLast = index === count - 1;

				const merge: React.CSSProperties = {
					...(horizontal
						? {
								borderRadius:
									isFirst && isLast
										? radius
										: isFirst
											? `${radius} 0 0 ${radius}`
											: isLast
												? `0 ${radius} ${radius} 0`
												: 0,
								borderRight: isLast ? undefined : "none",
								marginLeft: isFirst ? 0 : -1,
								position: "relative" as const,
								zIndex: 0,
							}
						: {
								borderRadius:
									isFirst && isLast
										? radius
										: isFirst
											? `${radius} ${radius} 0 0`
											: isLast
												? `0 0 ${radius} ${radius}`
												: 0,
								borderBottom: isLast ? undefined : "none",
								marginTop: isFirst ? 0 : -1,
								position: "relative" as const,
								zIndex: 0,
							}),
				};

				const prev = child.props as {
					style?: React.CSSProperties;
					onMouseEnter?: React.MouseEventHandler;
					onMouseLeave?: React.MouseEventHandler;
				};
				return React.cloneElement(child, {
					style: { ...merge, ...prev.style },
					onMouseEnter: (e: React.MouseEvent) => {
						prev.onMouseEnter?.(e);
						(e.currentTarget as HTMLElement).style.zIndex = "1";
					},
					onMouseLeave: (e: React.MouseEvent) => {
						prev.onMouseLeave?.(e);
						(e.currentTarget as HTMLElement).style.zIndex = "0";
					},
				} as Record<string, unknown>);
			})}
		</div>
	);
}

ButtonGroup.displayName = "ButtonGroup";
