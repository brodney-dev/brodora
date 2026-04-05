import {
	Avatar,
	Box,
	Button,
	Spinner,
	Stack,
	TextField,
	Typography,
	useTheme,
} from "@brodora/ui";
import * as O from "fp-ts/Option";
import * as React from "react";
import { HyperspaceCanvas } from "./HyperspaceCanvas";

function sortUsersForLockScreen<
	T extends { name: string; lastAccessed: string | null },
>(rows: T[]): T[] {
	return [...rows].sort((a, b) => {
		const ta = a.lastAccessed ? new Date(a.lastAccessed).getTime() : 0;
		const tb = b.lastAccessed ? new Date(b.lastAccessed).getTime() : 0;
		if (tb !== ta) {
			return tb - ta;
		}
		return a.name.localeCompare(b.name);
	});
}

/**
 * Session picker: choose an existing local user or create one, then continue into the app.
 */
export function LockScreen() {
	const { colors } = useTheme();
	const [users, setUsers] = React.useState<
		Array<{
			id: number;
			name: string;
			lastAccessed: string | null;
			deletedAt: string | null;
		}>
	>([]);
	const [loadState, setLoadState] = React.useState<
		"loading" | "ready" | "error"
	>("loading");
	const [showAddUser, setShowAddUser] = React.useState(false);
	const [newName, setNewName] = React.useState("");
	const [addError, setAddError] = React.useState<string | null>(null);
	const [submitting, setSubmitting] = React.useState(false);

	const handleSelectUser = React.useCallback(
		async (user: { id: number; name: string }): Promise<void> => {
			const ok = await window.api.users.setLoggedIn({ id: user.id });
			if (O.isNone(ok) || !ok.value) {
				return;
			}
			await window.api.users.recordAccess({ id: user.id });
		},
		[],
	);

	const loadUsers = React.useCallback(async () => {
		setLoadState("loading");
		try {
			const listed = await window.api.users.list(undefined);
			if (O.isNone(listed)) {
				setLoadState("error");
				return;
			}
			const active = listed.value.filter((u) => u.deletedAt === null);
			setUsers(sortUsersForLockScreen(active));
			setLoadState("ready");
		} catch {
			setLoadState("error");
		}
	}, []);

	React.useEffect(() => {
		void loadUsers();
	}, [loadUsers]);

	async function handleCreateUser(e: React.FormEvent): Promise<void> {
		e.preventDefault();
		const trimmed = newName.trim();
		if (!trimmed) {
			setAddError("Enter a name for this user.");
			return;
		}
		setAddError(null);
		setSubmitting(true);
		try {
			const created = await window.api.users.create({ name: trimmed });
			if (O.isNone(created)) {
				setAddError("Could not create user. Try again.");
				return;
			}

			void handleSelectUser({
				id: created.value.id,
				name: created.value.name,
			});
		} catch {
			setAddError("Could not create user. Try again.");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Box
			sx={{
				position: "fixed",
				inset: 0,
				zIndex: 1000,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: "2rem",
				backgroundColor: colors.background.main,
				outline: "none",
				overflow: "hidden",
			}}
		>
			<HyperspaceCanvas
				backgroundColor={colors.background.main}
				streakColor={colors.background.onMain}
			/>
			<Box
				sx={{
					position: "relative",
					zIndex: 1,
					width: "100%",
					maxWidth: "26rem",
					pointerEvents: "auto",
				}}
			>
				<Stack spacing={3}>
					<div>
						<Typography
							variant="display"
							as="h1"
							style={{ margin: "0 0 0.25rem", textAlign: "center" }}
							sx={{ color: (t) => t.colors.inverse.main }}
						>
							Brodora
						</Typography>
						<Typography
							variant="body"
							as="p"
							style={{ margin: 0, textAlign: "center" }}
							sx={{ color: (t) => t.colors.inverse.main }}
						>
							Choose who is using the app, or add someone new.
						</Typography>
					</div>

					{loadState === "loading" && (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								py: 3,
							}}
						>
							<Spinner size={36} aria-label="Loading users" />
						</Box>
					)}

					{loadState === "error" && (
						<Stack spacing={2}>
							<Typography
								variant="body-sm"
								as="p"
								style={{ margin: 0, textAlign: "center" }}
								sx={{ color: (t) => t.colors.error.main }}
							>
								Could not load users.
							</Typography>
							<Button
								type="button"
								color="secondary"
								onClick={() => void loadUsers()}
							>
								Try again
							</Button>
						</Stack>
					)}

					{loadState === "ready" && (
						<>
							{users.length === 0 && !showAddUser ? (
								<Typography
									variant="body-sm"
									as="p"
									style={{ margin: 0, textAlign: "center" }}
									sx={{ color: (t) => t.colors.secondary.onMain }}
								>
									No users yet. Add one to get started.
								</Typography>
							) : null}

							{users.length > 0 ? (
								<Stack spacing={2}>
									{users.map((u) => (
										<Button
											key={u.id}
											type="button"
											color="secondary"
											onClick={() =>
												handleSelectUser({ id: u.id, name: u.name })
											}
											startNode={<Avatar alt={u.name} size={40} fallback="?" />}
											style={{
												width: "100%",
												justifyContent: "flex-start",
												padding: "0.65rem 1rem",
											}}
										>
											<span style={{ textAlign: "left" }}>{u.name}</span>
										</Button>
									))}
								</Stack>
							) : null}

							{showAddUser ? (
								<form onSubmit={(ev) => void handleCreateUser(ev)}>
									<Stack spacing={2}>
										<TextField
											label="New user name"
											value={newName}
											onChange={(ev) => setNewName(ev.target.value)}
											autoFocus
											fullWidth
											disabled={submitting}
											error={Boolean(addError)}
											helperText={addError ?? undefined}
										/>
										<Stack spacing={1.5} direction="row">
											<Button
												type="button"
												color="secondary"
												disabled={submitting}
												onClick={() => {
													setShowAddUser(false);
													setNewName("");
													setAddError(null);
												}}
												style={{ flex: 1 }}
											>
												Cancel
											</Button>
											<Button
												type="submit"
												disabled={submitting}
												style={{ flex: 1 }}
											>
												{submitting ? "Creating…" : "Create & continue"}
											</Button>
										</Stack>
									</Stack>
								</form>
							) : (
								<Button
									type="button"
									color="primary"
									onClick={() => setShowAddUser(true)}
									style={{ width: "100%" }}
								>
									Add user
								</Button>
							)}
						</>
					)}
				</Stack>
			</Box>
		</Box>
	);
}
