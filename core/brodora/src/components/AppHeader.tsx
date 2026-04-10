import { Stack, Typography } from "@brodora/ui";

export const AppHeader = () => {
	return (
		<Stack
			direction="row"
			sx={{
				position: "sticky",
				top: 0,
				zIndex: 10,
				borderBottom: (theme) => `1px solid ${theme.colors.background.border}`,
				background: (theme) => theme.colors.background.main,
				padding: (theme) => theme.spacing(2),
				justifyContent: "center",
			}}
		>
			<Typography variant="body">Brodora</Typography>
		</Stack>
	);
};
