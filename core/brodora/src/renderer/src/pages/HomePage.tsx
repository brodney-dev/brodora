import { Card, CardBody, Stack, Typography } from "@brodora/ui";
import Versions from "../components/Versions";

export function HomePage() {
	return (
		<Stack spacing={3} sx={{ p: 4, flex: 1 }}>
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
					Use the sidebar to move around the app. This is the main content area.
				</Typography>
			</div>
			<Card sx={{ maxWidth: "36rem" }}>
				<CardBody>
					<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
						Build screens here with components from{" "}
						<code style={{ fontSize: "0.9em" }}>@brodora/ui</code>.
					</Typography>
				</CardBody>
			</Card>
			<div style={{ marginTop: "auto" }}>
				<Versions />
			</div>
		</Stack>
	);
}
