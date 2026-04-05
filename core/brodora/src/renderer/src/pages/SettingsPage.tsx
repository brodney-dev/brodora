import { Stack, Typography } from "@brodora/ui";

export function SettingsPage() {
	return (
		<Stack spacing={3} sx={{ p: 4, flex: 1 }}>
			<div>
				<Typography variant="h2" as="h1" style={{ margin: "0 0 0.35rem" }}>
					Settings
				</Typography>
				<Typography
					variant="body-sm"
					as="p"
					style={{ margin: 0 }}
					sx={{ color: (theme) => theme.colors.secondary.onMain }}
				>
					Preferences and app options will live here.
				</Typography>
			</div>
		</Stack>
	);
}
