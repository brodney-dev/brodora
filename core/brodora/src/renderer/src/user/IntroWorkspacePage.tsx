import {
	Box,
	Button,
	Card,
	CardBody,
	Stack,
	TextField,
	Typography,
	useTheme,
} from "@brodora/ui";
import * as O from "fp-ts/Option";
import * as React from "react";

type IntroWorkspacePageProps = {
	onComplete: () => void;
};

/** First-time workspace creation when no users exist in the local database. */
export function IntroWorkspacePage({ onComplete }: IntroWorkspacePageProps) {
	const { colors } = useTheme();
	const [name, setName] = React.useState("");
	const [error, setError] = React.useState<string | null>(null);
	const [submitting, setSubmitting] = React.useState(false);

	async function handleSubmit(e: React.FormEvent): Promise<void> {
		e.preventDefault();
		const trimmed = name.trim();
		if (!trimmed) {
			setError("Enter a workspace name to continue.");
			return;
		}
		setError(null);
		setSubmitting(true);
		try {
			const created = await window.api.users.create({ name: trimmed });
			if (O.isNone(created)) {
				setError("Could not create workspace. Try again.");
				return;
			}
			const access = await window.api.users.recordAccess({
				id: created.value.id,
			});
			if (O.isNone(access)) {
				setError("Could not start workspace. Try again.");
				return;
			}
			const login = await window.api.users.setLoggedIn({
				id: created.value.id,
			});
			if (O.isNone(login) || !login.value) {
				setError("Could not start workspace. Try again.");
				return;
			}
			onComplete();
		} catch {
			setError("Could not create workspace. Try again.");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Box
			sx={{
				minHeight: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "2rem",
				backgroundColor: colors.background.main,
			}}
		>
			<Card sx={{ width: "100%", maxWidth: "28rem" }}>
				<CardBody>
					<form onSubmit={(e) => void handleSubmit(e)}>
						<Stack spacing={3}>
							<div>
								<Typography
									variant="h2"
									as="h1"
									style={{ margin: "0 0 0.35rem" }}
								>
									Welcome to Brodora
								</Typography>
								<Typography
									variant="body-sm"
									as="p"
									style={{ margin: 0 }}
									sx={{ color: (theme) => theme.colors.secondary.onMain }}
								>
									Create your first workspace. You can add more later; there is
									no sign-in.
								</Typography>
							</div>
							<TextField
								label="Workspace name"
								value={name}
								onChange={(ev) => setName(ev.target.value)}
								autoFocus
								fullWidth
								disabled={submitting}
								error={Boolean(error)}
								helperText={error ?? undefined}
							/>
							<Button type="submit" disabled={submitting}>
								{submitting ? "Creating…" : "Continue"}
							</Button>
						</Stack>
					</form>
				</CardBody>
			</Card>
		</Box>
	);
}
