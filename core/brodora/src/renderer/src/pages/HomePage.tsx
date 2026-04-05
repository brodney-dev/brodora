import { Stack, Typography } from "@brodora/ui";
import Versions from "../components/Versions";

export function HomePage() {
	return (
		<Stack spacing={3} sx={{ p: 4, flex: 1, overflow: "auto" }}>
			<div>
				<Typography variant="h2" as="h1" style={{ margin: "0 0 0.35rem" }}>
					Home
				</Typography>
				<Typography
					variant="body-sm"
					as="p"
					style={{ margin: 0 }}
					sx={{ color: (theme) => theme.colors.secondary.onMain }}
				>
					Use the sidebar to open your library, profile menu, and installed
					apps.
				</Typography>
			</div>
			<div style={{ marginTop: "auto" }}>
				<Versions />
			</div>
		</Stack>
	);
}
