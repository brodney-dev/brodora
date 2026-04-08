import { Button, Stack, Typography } from "@brodora/ui";
import * as O from "fp-ts/Option";
import * as React from "react";
import { useParams } from "react-router-dom";
import type {
	InstallLibraryAppResult,
	UninstallLibraryAppResult,
} from "../../../../shared/api/apps.api";
import { useLibraryApps } from "../../library/useLibraryApps";

const INSTALL_MUTATION_MESSAGES: Record<
	Extract<InstallLibraryAppResult, { ok: false }>["reason"],
	string
> = {
	not_logged_in: "Sign in to install apps.",
	not_found: "Library entry not found.",
	not_local: "Install is only supported for local library apps for now.",
	already_installed: "This app is already installed.",
	invalid_manifest: "Stored manifest is invalid.",
	source_missing: "The app folder on disk is missing or not a directory.",
	copy_failed:
		"Could not copy the app into Brodora data. Check disk space and permissions.",
	installer_missing:
		"The installer file from the manifest (e.g. AppImage) was not found on disk.",
	remote_installer_not_supported:
		"Downloading installers from a URL is not supported yet. Use a local file path in the manifest.",
};

const UNINSTALL_MUTATION_MESSAGES: Record<
	Extract<UninstallLibraryAppResult, { ok: false }>["reason"],
	string
> = {
	not_logged_in: "Sign in to change installs.",
	not_found: "Library entry not found.",
	not_local: "Uninstall is only supported for local library apps for now.",
	not_installed: "This app is not installed.",
	cleanup_failed:
		"Could not remove install files from disk. Quit the app if it is running and try again.",
};

export function LibraryAppPage() {
	const { id } = useParams<{ id: string }>();
	const { rows, refetch } = useLibraryApps();
	const numericId = id != null ? Number.parseInt(id, 10) : Number.NaN;
	const row = rows.find((r) => r.id === numericId);

	const [actionMessage, setActionMessage] = React.useState<string | null>(null);
	const [installing, setInstalling] = React.useState(false);
	const [uninstalling, setUninstalling] = React.useState(false);
	const [launching, setLaunching] = React.useState(false);

	const isLocal = row?.sourceType === "local";
	const isInstalled = row?.install != null;
	const canInstallLocal = row != null && isLocal && !isInstalled;
	const actionLocked = installing || uninstalling || launching;

	async function handleInstall(): Promise<void> {
		if (row == null) {
			return;
		}
		setActionMessage(null);
		setInstalling(true);
		try {
			const result = await window.api.apps.installLibraryApp({
				libraryAppId: row.id,
			});
			if (O.isNone(result)) {
				setActionMessage("Could not install (IPC error).");
				return;
			}
			const r = result.value;
			if (r.ok) {
				setActionMessage("Installed. You can launch the app now.");
				refetch();
			} else {
				setActionMessage(INSTALL_MUTATION_MESSAGES[r.reason]);
			}
		} finally {
			setInstalling(false);
		}
	}

	async function handleUninstall(): Promise<void> {
		if (row == null) {
			return;
		}
		setActionMessage(null);
		setUninstalling(true);
		try {
			const result = await window.api.apps.uninstallLibraryApp({
				libraryAppId: row.id,
			});
			if (O.isNone(result)) {
				setActionMessage("Could not uninstall (IPC error).");
				return;
			}
			const r = result.value;
			if (r.ok) {
				setActionMessage("Uninstalled. Install again when you want it back.");
				refetch();
			} else {
				setActionMessage(UNINSTALL_MUTATION_MESSAGES[r.reason]);
			}
		} finally {
			setUninstalling(false);
		}
	}

	async function handleLaunch(): Promise<void> {
		if (row == null) {
			return;
		}
		setActionMessage(null);
		setLaunching(true);
		try {
			const result = await window.api.apps.launchLibraryApp({
				libraryAppId: row.id,
			});
			if (O.isNone(result)) {
				setActionMessage("Could not launch (IPC error).");
				return;
			}
			setActionMessage(
				result.value
					? "App started."
					: "Could not launch (not installed or launch failed).",
			);
		} finally {
			setLaunching(false);
		}
	}

	return (
		<Stack spacing={2} sx={{ p: 4, flex: 1 }}>
			<Typography variant="h2" as="h1" style={{ margin: 0 }}>
				{row?.name ?? "Library app"}
			</Typography>
			{row ? (
				<Stack spacing={2}>
					<Stack spacing={1}>
						<Typography
							variant="body-sm"
							as="p"
							style={{ margin: 0 }}
							sx={{
								color: (t) => t.colors.background.onContainer,
								opacity: 0.9,
							}}
						>
							{row.appId} · {row.sourceType}
						</Typography>
						<Typography
							variant="body-sm"
							as="p"
							style={{ margin: 0, wordBreak: "break-all" }}
							sx={{
								color: (t) => t.colors.background.onContainer,
								opacity: 0.9,
							}}
						>
							{row.sourceRef}
						</Typography>
						{isInstalled && row.install ? (
							<Typography
								variant="body-sm"
								as="p"
								style={{ margin: 0, wordBreak: "break-all" }}
								sx={{
									color: (t) => t.colors.background.onContainer,
									opacity: 0.85,
								}}
							>
								Installed at {row.install.installedPath} (v{row.install.version}
								)
							</Typography>
						) : null}
					</Stack>

					<Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
						{isInstalled ? (
							<>
								<Button
									type="button"
									color="primary"
									disabled={actionLocked}
									onClick={() => void handleLaunch()}
								>
									{launching ? "Launching…" : "Launch app"}
								</Button>
								{isLocal ? (
									<Button
										type="button"
										color="secondary"
										disabled={actionLocked}
										onClick={() => void handleUninstall()}
									>
										{uninstalling ? "Uninstalling…" : "Uninstall"}
									</Button>
								) : null}
							</>
						) : (
							<Button
								type="button"
								color="primary"
								disabled={!canInstallLocal || actionLocked}
								onClick={() => void handleInstall()}
								title={
									!isLocal
										? "Install is only available for local apps right now."
										: undefined
								}
							>
								{installing ? "Installing…" : "Install"}
							</Button>
						)}
						{isInstalled && row.updateAvailable ? (
							<Button type="button" color="secondary" disabled>
								Update
							</Button>
						) : null}
					</Stack>

					{actionMessage ? (
						<Typography
							variant="body-sm"
							as="p"
							style={{ margin: 0 }}
							sx={{
								color: (t) =>
									actionMessage.startsWith("Could not") ||
									actionMessage.includes("Sign in") ||
									actionMessage.includes("only supported")
										? t.colors.error.main
										: t.colors.background.onContainer,
							}}
						>
							{actionMessage}
						</Typography>
					) : null}
				</Stack>
			) : (
				<Typography
					variant="body-sm"
					as="p"
					style={{ margin: 0 }}
					sx={{ color: (t) => t.colors.background.onContainer, opacity: 0.9 }}
				>
					This app is not in your library or the list is still loading.
				</Typography>
			)}
		</Stack>
	);
}
