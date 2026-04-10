import { Stack, Typography } from "@brodora/ui";

export const PageHeader = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => {
	return (
		<Stack
			sx={{
				width: "100%",
				alignItems: "flex-start",
				justifyContent: "flex-start",
				gap: (theme) => theme.spacing(0.5),
				border: (theme) => `1px solid ${theme.colors.primary.border}`,
				borderRadius: (theme) => theme.shape.borderRadius,
				padding: (theme) => theme.spacing(2),
				background: (theme) =>
					`linear-gradient(145deg, ${theme.colors.primary.container} 0%, ${theme.colors.primary.main} 52%, ${theme.colors.primary.border} 100%)`,
			}}
		>
			<Typography
				variant="h1"
				sx={{ color: (theme) => theme.colors.primary.onContainer }}
			>
				{title}
			</Typography>
			<Typography
				variant="body"
				sx={{
					color: (theme) => theme.colors.primary.onContainer,
					opacity: 0.9,
				}}
			>
				{description}
			</Typography>
		</Stack>
	);
};
