import { Button, Card, CardBody, Stack, Typography } from "@brodora/ui";
import * as O from "fp-ts/Option";
import * as React from "react";
import { useLaunchedApps } from "../../launcher/useLaunchedApps";

export function LibraryTestAppPage() {
	const launchedApps = useLaunchedApps();
	const [launchMessage, setLaunchMessage] = React.useState<string | null>(null);
	const [launching, setLaunching] = React.useState(false);
	const [launchingDev, setLaunchingDev] = React.useState(false);

	const runningForTestApp = launchedApps.filter((a) =>
		a.appRoot.includes("test-app"),
	);

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
				result.value ? "Test app started." : "Failed to start test app.",
			);
		} finally {
			setLaunching(false);
		}
	}

	async function handleLaunchTestAppDev(): Promise<void> {
		setLaunchMessage(null);
		setLaunchingDev(true);
		try {
			const result = await window.api.launcher.launchTestAppDev(undefined);
			if (O.isNone(result)) {
				setLaunchMessage("Could not start test app dev (IPC error).");
				return;
			}
			setLaunchMessage(
				result.value
					? "Test app dev (electron-vite) started."
					: "Failed to start test app dev.",
			);
		} finally {
			setLaunchingDev(false);
		}
	}

	return (
		<Stack spacing={3} sx={{ p: 4, flex: 1 }}>
			<div>
				<Typography variant="h2" as="h1" style={{ margin: "0 0 0.35rem" }}>
					Test app
				</Typography>
				<Typography
					variant="body-sm"
					as="p"
					style={{ margin: 0 }}
					sx={{ color: (theme) => theme.colors.secondary.onMain }}
				>
					Development sandbox app in the Brodora monorepo.
				</Typography>
			</div>

			<Card sx={{ maxWidth: "32rem" }}>
				<CardBody>
					<Stack spacing={2}>
						<Stack spacing={1} direction="row" style={{ flexWrap: "wrap" }}>
							<Button
								type="button"
								color="primary"
								disabled={launching || launchingDev}
								onClick={() => void handleLaunchTestApp()}
							>
								{launching ? "Starting…" : "Start"}
							</Button>
							<Button
								type="button"
								color="secondary"
								disabled={launching || launchingDev}
								onClick={() => void handleLaunchTestAppDev()}
							>
								{launchingDev ? "Starting dev…" : "Start (dev)"}
							</Button>
						</Stack>
						{launchMessage ? (
							<Typography
								variant="body-sm"
								as="p"
								style={{ margin: 0 }}
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
						{runningForTestApp.length > 0 ? (
							<div>
								<Typography
									variant="h3"
									as="h2"
									style={{ margin: "0 0 0.35rem" }}
								>
									Running
								</Typography>
								<ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
									{runningForTestApp.map((a) => (
										<li key={a.id}>
											<Typography variant="body-sm" as="span">
												{a.label} ({a.mode}
												{a.pid != null ? `, pid ${a.pid}` : ""})
											</Typography>
										</li>
									))}
								</ul>
							</div>
						) : null}
					</Stack>
				</CardBody>
			</Card>
		</Stack>
	);
}
