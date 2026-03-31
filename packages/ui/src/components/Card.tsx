import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

export interface CardProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
	{ sx, style, className, children, ...props },
	ref,
) {
	const { colors, shape } = useTheme();
	const sxStyles = useSxStyles(sx);

	const rootStyle: React.CSSProperties = {
		backgroundColor: "#ffffff",
		border: `1px solid ${colors.secondary[200]}`,
		borderRadius: `${shape.borderRadius}px`,
		boxShadow: `0 1px 2px ${colors.secondary[200]}`,
		overflow: "hidden",
		...sxStyles,
		...style,
	};

	return (
		<div ref={ref} className={className} style={rootStyle} {...props}>
			{children}
		</div>
	);
});

Card.displayName = "Card";

export interface CardSectionProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardSectionProps>(
	function CardHeader({ sx, style, className, children, ...props }, ref) {
		const { colors } = useTheme();
		const sxStyles = useSxStyles(sx);
		return (
			<div
				ref={ref}
				className={className}
				style={{
					padding: "1rem 1.25rem",
					borderBottom: `1px solid ${colors.secondary[200]}`,
					...sxStyles,
					...style,
				}}
				{...props}
			>
				{children}
			</div>
		);
	},
);

CardHeader.displayName = "CardHeader";

export const CardBody = React.forwardRef<HTMLDivElement, CardSectionProps>(
	function CardBody({ sx, style, className, children, ...props }, ref) {
		const sxStyles = useSxStyles(sx);
		return (
			<div
				ref={ref}
				className={className}
				style={{ padding: "1rem 1.25rem", ...sxStyles, ...style }}
				{...props}
			>
				{children}
			</div>
		);
	},
);

CardBody.displayName = "CardBody";

export const CardFooter = React.forwardRef<HTMLDivElement, CardSectionProps>(
	function CardFooter({ sx, style, className, children, ...props }, ref) {
		const { colors } = useTheme();
		const sxStyles = useSxStyles(sx);
		return (
			<div
				ref={ref}
				className={className}
				style={{
					padding: "1rem 1.25rem",
					borderTop: `1px solid ${colors.secondary[200]}`,
					display: "flex",
					justifyContent: "flex-end",
					gap: "0.5rem",
					flexWrap: "wrap",
					...sxStyles,
					...style,
				}}
				{...props}
			>
				{children}
			</div>
		);
	},
);

CardFooter.displayName = "CardFooter";
