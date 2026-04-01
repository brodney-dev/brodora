import { Stack, Typography } from "@brodora/ui";

export function SettingsPage() {
	return (
		<Stack spacing={2} sx={{ p: 4, flex: 1 }}>
			<Typography variant="h2" as="h1" style={{ margin: 0 }}>
				Settings
			</Typography>
			<Typography
				variant="body-sm"
				as="p"
				style={{ margin: 0 }}
				sx={{ color: (theme) => theme.colors.secondary[600] }}
			>
				App preferences and configuration will go here.
			</Typography>
		</Stack>
	);
}
