import { Button, Card, CardBody, Stack, Typography } from "@brodora/ui";
import * as O from "fp-ts/Option";
import * as React from "react";
import Versions from "../components/Versions";

export function HomePage() {
	const [launchMessage, setLaunchMessage] = React.useState<string | null>(null);
	const [launching, setLaunching] = React.useState(false);

	async function handleLaunchTestApp(): Promise<void> {
		setLaunchMessage(null);
		setLaunching(true);
		try {
			const result = await window.api.launcher.launchTestApp(undefined);
			if (O.isNone(result)) {
				setLaunchMessage("Could not start test app (IPC error).");
				return;
			}
			setLaunchMessage(
				result.value
					? "Test app process started."
					: "Failed to start test app.",
			);
		} finally {
			setLaunching(false);
		}
	}

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
					<Stack spacing={2}>
						<Typography variant="body-sm" as="p" style={{ margin: 0 }}>
							Build screens here with components from{" "}
							<code style={{ fontSize: "0.9em" }}>@brodora/ui</code>.
						</Typography>
						<div>
							<Button
								type="button"
								color="secondary"
								disabled={launching}
								onClick={() => void handleLaunchTestApp()}
							>
								{launching ? "Starting…" : "Launch test app"}
							</Button>
							{launchMessage ? (
								<Typography
									variant="body-sm"
									as="p"
									style={{ margin: "0.5rem 0 0" }}
									sx={{
										color: (t) =>
											launchMessage.startsWith("Could not") ||
											launchMessage.startsWith("Failed")
												? t.colors.error.main
												: t.colors.secondary.onMain,
									}}
								>
									{launchMessage}
								</Typography>
							) : null}
						</div>
					</Stack>
				</CardBody>
			</Card>
			<div style={{ marginTop: "auto" }}>
				<Versions />
			</div>
		</Stack>
	);
}
