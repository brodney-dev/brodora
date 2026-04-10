import { Stack, Typography } from "@brodora/ui";
import * as React from "react";

export const AppCard = ({
	app,
}: {
	app: {
		id: number;
		name: string;
		description: string;
		icon: string;
		installed: boolean;
	};
}) => {
	const [hovered, setHovered] = React.useState(false);

	return (
		<Stack
			direction="column"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			sx={{
				minWidth: 0,
				height: 300,
				border: (theme) => `1px solid ${theme.colors.background.border}`,
				borderRadius: (theme) => theme.shape.borderRadius,
				overflow: "hidden",
				backgroundColor: (theme) => theme.colors.background.main,
				cursor: "pointer",
				...(app.installed === false && {
					filter: "grayscale(100%)",
					opacity: 0.75,
				}),
			}}
		>
			<Stack
				sx={{
					width: "100%",
					position: "relative",
					alignItems: "flex-start",
					justifyContent: "flex-start",
					padding: (theme) => theme.spacing(2),
					gap: (theme) => theme.spacing(1),
					backgroundImage: `url(${app.icon})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					aspectRatio: hovered ? "6 / 1" : "4 / 1",
					transition: "aspect-ratio 0.30s ease",
					backgroundColor: (theme) => theme.colors.primary.container,
					borderBottom: (theme) =>
						`1px solid ${theme.colors.background.border}`,
				}}
			/>
			<Stack
				sx={{
					width: "100%",
					alignItems: "flex-start",
					justifyContent: "flex-start",
					padding: (theme) => theme.spacing(2),
					gap: (theme) => theme.spacing(1),
				}}
			>
				<Typography variant="body" color="background.onMain">
					{app.name}
				</Typography>
				<Typography variant="body" color="background.onContainer">
					{app.description}
				</Typography>
			</Stack>
		</Stack>
	);
};
