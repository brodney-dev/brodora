import {
	Badge,
	Box,
	Button,
	Card,
	CardBody,
	Stack,
	Typography,
} from "@brodora/ui";
import * as O from "fp-ts/Option";
import * as React from "react";
import { useDevApps } from "../../library/useDevApps";
import { useLibraryApps } from "../../library/useLibraryApps";

export function LibraryIndexPage() {
	const { refetch: refetchLibraryApps } = useLibraryApps();
	const { refetch: refetchDevApps } = useDevApps();

	const [libraryMessage, setLibraryMessage] = React.useState<string | null>(
		null,
	);
	const [addingLibrary, setAddingLibrary] = React.useState(false);

	const [devMessage, setDevMessage] = React.useState<string | null>(null);
	const [addingDev, setAddingDev] = React.useState(false);

	async function handleAddLocalLibraryApp(): Promise<void> {
		setLibraryMessage(null);
		setAddingLibrary(true);
		try {
			const result =
				await window.api.apps.addLocalLibraryAppFromDialog(undefined);
			if (O.isNone(result)) {
				setLibraryMessage("Could not add app (IPC error).");
				return;
			}
			const r = result.value;
			if (r.ok) {
				setLibraryMessage(`Added to library: ${r.row.name} (${r.row.appId}).`);
				refetchLibraryApps();
			} else {
				const labels: Record<typeof r.reason, string> = {
					cancelled: "Dialog cancelled.",
					invalid_manifest: "Invalid app.brodora manifest for a library app.",
					duplicate_app_id: "That app is already in your library.",
					read_error: "Could not read the selected file.",
					not_logged_in: "Sign in to add apps to your library.",
				};
				setLibraryMessage(labels[r.reason]);
			}
		} finally {
			setAddingLibrary(false);
		}
	}

	async function handleAddDevApp(): Promise<void> {
		setDevMessage(null);
		setAddingDev(true);
		try {
			const result = await window.api.apps.addDevAppFromDialog(undefined);
			if (O.isNone(result)) {
				setDevMessage("Could not add dev app (IPC error).");
				return;
			}
			const r = result.value;
			if (r.ok) {
				setDevMessage(`Added dev app: ${r.row.name} (${r.row.appId}).`);
				refetchDevApps();
			} else {
				const labels: Record<typeof r.reason, string> = {
					cancelled: "Dialog cancelled.",
					invalid_manifest: "Invalid app.brodora manifest.",
					duplicate_app_id: "That app is already registered.",
					read_error: "Could not read the selected file.",
				};
				setDevMessage(labels[r.reason]);
			}
		} finally {
			setAddingDev(false);
		}
	}

	function messageColor(
		t: {
			colors: { error: { main: string }; background: { onContainer: string } };
		},
		msg: string,
	): string {
		if (
			msg.startsWith("Could not") ||
			msg.includes("Invalid") ||
			msg.includes("already") ||
			msg.includes("Could not read") ||
			msg.includes("Sign in")
		) {
			return t.colors.error.main;
		}
		return t.colors.background.onContainer;
	}

	return (
		<Stack spacing={3} sx={{ p: 4, flex: 1 }}>
			<div>
				<Typography
					variant="h2"
					as="h1"
					style={{ margin: "0 0 0.35rem" }}
					sx={{ color: (t) => t.colors.background.onContainer }}
				>
					Library
				</Typography>
				<Typography
					variant="body-sm"
					as="p"
					style={{ margin: 0 }}
					sx={{
						color: (theme) => theme.colors.background.onContainer,
						opacity: 0.9,
					}}
				>
					Grow your collection—install apps, wire up local projects, and browse
					the marketplace when it launches.
				</Typography>
			</div>

			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					gap: 2,
					alignItems: "stretch",
				}}
			>
				<Card sx={{ flex: "1 1 280px", minWidth: 0, maxWidth: "100%" }}>
					<CardBody>
						<Stack spacing={2}>
							<Typography
								variant="h3"
								as="h2"
								style={{ margin: 0 }}
								sx={{ color: (t) => t.colors.background.onContainer }}
							>
								Add apps to your library
							</Typography>
							<Typography
								variant="body-sm"
								as="p"
								style={{ margin: 0 }}
								sx={{
									color: (t) => t.colors.background.onContainer,
									opacity: 0.88,
								}}
							>
								Add a built app from your machine by choosing its{" "}
								<code style={{ fontSize: "0.9em" }}>app.brodora</code> file.
								Brodora stores the manifest, points at your build output, and
								lists the app under <strong>Library</strong> in the sidebar.
							</Typography>
							<Button
								type="button"
								color="primary"
								disabled={addingLibrary || addingDev}
								onClick={() => void handleAddLocalLibraryApp()}
							>
								{addingLibrary ? "Opening…" : "Add local app…"}
							</Button>
							{libraryMessage ? (
								<Typography
									variant="body-sm"
									as="p"
									style={{ margin: 0 }}
									sx={{ color: (t) => messageColor(t, libraryMessage) }}
								>
									{libraryMessage}
								</Typography>
							) : null}
						</Stack>
					</CardBody>
				</Card>

				<Card sx={{ flex: "1 1 280px", minWidth: 0, maxWidth: "100%" }}>
					<CardBody>
						<Stack spacing={2}>
							<Typography
								variant="h3"
								as="h2"
								style={{ margin: 0 }}
								sx={{ color: (t) => t.colors.background.onContainer }}
							>
								Run a project from your machine
							</Typography>
							<Typography
								variant="body-sm"
								as="p"
								style={{ margin: 0 }}
								sx={{
									color: (t) => t.colors.background.onContainer,
									opacity: 0.88,
								}}
							>
								Register a local app with an{" "}
								<code
									style={{
										fontSize: "0.9em",
										opacity: 1,
									}}
								>
									app.brodora
								</code>{" "}
								manifest. Brodora remembers the project folder and dev script so
								you can start development from the dev app page whenever you are
								ready.
							</Typography>
							<Button
								type="button"
								color="primary"
								disabled={addingDev || addingLibrary}
								onClick={() => void handleAddDevApp()}
							>
								{addingDev ? "Opening…" : "Add Dev App"}
							</Button>
							{devMessage ? (
								<Typography
									variant="body-sm"
									as="p"
									style={{ margin: 0 }}
									sx={{ color: (t) => messageColor(t, devMessage) }}
								>
									{devMessage}
								</Typography>
							) : null}
						</Stack>
					</CardBody>
				</Card>
			</Box>

			<Card sx={{ width: "100%" }}>
				<CardBody>
					<Stack spacing={2}>
						<Stack
							direction="row"
							spacing={1.5}
							sx={{ alignItems: "center", flexWrap: "wrap" }}
						>
							<Typography
								variant="h3"
								as="h2"
								style={{ margin: 0 }}
								sx={{ color: (t) => t.colors.background.onContainer }}
							>
								Add apps from the marketplace
							</Typography>
							<Badge color="secondary" appearance="soft" size="sm">
								Coming soon
							</Badge>
						</Stack>
						<Typography
							variant="body-sm"
							as="p"
							style={{ margin: 0 }}
							sx={{
								color: (t) => t.colors.background.onContainer,
								opacity: 0.88,
							}}
						>
							Soon you will be able to discover and install Brodora apps from a
							curated marketplace—right inside the app, with updates and trust
							signals in one flow.
						</Typography>
					</Stack>
				</CardBody>
			</Card>
		</Stack>
	);
}
