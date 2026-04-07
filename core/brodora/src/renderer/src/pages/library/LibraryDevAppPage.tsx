import { Button, Stack, Typography } from "@brodora/ui";
import * as O from "fp-ts/Option";
import * as React from "react";
import { useParams } from "react-router-dom";
import { useLaunchedApps } from "../../launcher/useLaunchedApps";
import { useDevApps } from "../../library/useDevApps";

export function LibraryDevAppPage() {
	const { id } = useParams<{ id: string }>();
	const { rows } = useDevApps();
	const launchedApps = useLaunchedApps();
	const numericId = id != null ? Number.parseInt(id, 10) : Number.NaN;
	const row = rows.find((r) => r.id === numericId);

	const [launchMessage, setLaunchMessage] = React.useState<string | null>(null);
	const [launchingDev, setLaunchingDev] = React.useState(false);

	const runningForThisApp =
		row != null
			? launchedApps.filter(
					(a) => a.mode === "development" && a.appRoot === row.sourcePath,
				)
			: [];

	async function handleLaunchDev(): Promise<void> {
		if (row == null) {
			return;
		}
		setLaunchMessage(null);
		setLaunchingDev(true);
		try {
			const result = await window.api.launcher.launchDevApp({
				devAppId: row.id,
			});
			if (O.isNone(result)) {
				setLaunchMessage("Could not start dev app (IPC error).");
				return;
			}
			setLaunchMessage(
				result.value
					? `Started npm run ${row.devScript} in project folder.`
					: "Could not start dev app (not found or launch failed).",
			);
		} finally {
			setLaunchingDev(false);
		}
	}

	return (
		<Stack spacing={2} sx={{ p: 4, flex: 1 }}>
			<Typography variant="h2" as="h1" style={{ margin: 0 }}>
				{row?.name ?? "Dev app"}
			</Typography>
			{row ? (
				<Stack spacing={2}>
					<Stack spacing={1}>
						<Typography
							variant="body-sm"
							as="p"
							style={{ margin: 0 }}
							sx={{ color: (t) => t.colors.secondary.onMain }}
						>
							<code>{row.appId}</code> · dev script <code>{row.devScript}</code>
						</Typography>
						<Typography
							variant="body-sm"
							as="p"
							style={{ margin: 0, wordBreak: "break-all" }}
							sx={{ color: (t) => t.colors.secondary.onMain }}
						>
							{row.sourcePath}
						</Typography>
						<Typography
							variant="body-sm"
							as="p"
							style={{ margin: 0 }}
							sx={{ color: (t) => t.colors.secondary.onMain }}
						>
							Added {row.addedAt}
						</Typography>
					</Stack>

					<Stack spacing={1}>
						<Button
							type="button"
							color="primary"
							disabled={launchingDev}
							onClick={() => void handleLaunchDev()}
						>
							{launchingDev ? "Starting…" : "Launch (dev)"}
						</Button>
						<Typography
							variant="body-sm"
							as="p"
							style={{ margin: 0 }}
							sx={{ color: (t) => t.colors.secondary.onMain }}
						>
							Runs <code>npm run {row.devScript}</code> with the project folder
							as the working directory.
						</Typography>
					</Stack>

					{launchMessage ? (
						<Typography
							variant="body-sm"
							as="p"
							style={{ margin: 0 }}
							sx={{
								color: (t) =>
									launchMessage.startsWith("Could not")
										? t.colors.error.main
										: t.colors.secondary.onMain,
							}}
						>
							{launchMessage}
						</Typography>
					) : null}

					{runningForThisApp.length > 0 ? (
						<div>
							<Typography
								variant="h3"
								as="h2"
								style={{ margin: "0 0 0.35rem" }}
							>
								Running (dev)
							</Typography>
							<ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
								{runningForThisApp.map((a) => (
									<li key={a.id}>
										<Typography variant="body-sm" as="span">
											{a.label}
											{a.pid != null ? ` (pid ${a.pid})` : ""}
										</Typography>
									</li>
								))}
							</ul>
						</div>
					) : null}
				</Stack>
			) : (
				<Typography
					variant="body-sm"
					as="p"
					style={{ margin: 0 }}
					sx={{ color: (t) => t.colors.secondary.onMain }}
				>
					This dev app is not registered or the list is still loading.
				</Typography>
			)}
		</Stack>
	);
}
