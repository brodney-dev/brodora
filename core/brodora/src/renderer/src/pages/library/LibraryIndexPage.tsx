import { Stack, Typography } from "@brodora/ui";

export function LibraryIndexPage() {
	return (
		<Stack spacing={2} sx={{ p: 4, flex: 1 }}>
			<Typography variant="h2" as="h1" style={{ margin: 0 }}>
				Library
			</Typography>
			<Typography
				variant="body-sm"
				as="p"
				style={{ margin: 0 }}
				sx={{ color: (theme) => theme.colors.secondary.onMain }}
			>
				Select an installed app in the sidebar to open it and launch.
			</Typography>
		</Stack>
	);
}
