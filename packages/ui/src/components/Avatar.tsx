import * as React from "react";
import { type SxProps, useSxStyles } from "../system/sx";
import { useTheme } from "../theme";

function initialsFromName(name: string): string {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "?";
	if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
	return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
}

export interface AvatarProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
	src?: string;
	alt?: string;
	/** Shown when `src` is missing or fails to load. */
	fallback?: string;
	size?: number;
	sx?: SxProps;
	style?: React.CSSProperties;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
	function Avatar(
		{
			src,
			alt = "",
			fallback = "?",
			size = 40,
			sx,
			style,
			className,
			children,
			...props
		},
		ref,
	) {
		const { colors } = useTheme();
		const sxStyles = useSxStyles(sx);
		const [failed, setFailed] = React.useState(false);
		const showImg = Boolean(src) && !failed;
		const label = initialsFromName(alt || fallback);

		const rootStyle: React.CSSProperties = {
			position: "relative",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: size,
			height: size,
			borderRadius: "9999px",
			overflow: "hidden",
			flexShrink: 0,
			backgroundColor: colors.secondary[200],
			color: colors.secondary[800],
			fontSize: Math.max(10, Math.round(size * 0.35)),
			fontWeight: 600,
			userSelect: "none",
			...sxStyles,
			...style,
		};

		const imgStyle: React.CSSProperties = {
			width: "100%",
			height: "100%",
			objectFit: "cover",
		};

		return (
			<div ref={ref} className={className} style={rootStyle} {...props}>
				{showImg ? (
					<img
						src={src}
						alt={alt}
						style={imgStyle}
						onError={() => setFailed(true)}
					/>
				) : (
					<span>{children ?? label}</span>
				)}
			</div>
		);
	},
);

Avatar.displayName = "Avatar";
